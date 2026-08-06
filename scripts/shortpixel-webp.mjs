import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import SHORTPIXEL from "@shortpixel-com/shortpixel";

const { ShortPixelClient } = SHORTPIXEL;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.join(rootDir, "src", "assets");
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);
const ignoredDirectories = new Set(["node_modules", "dist", ".git"]);

const apiKey = process.env.SHORTPIXEL_API_KEY;
const lossy = Number(process.env.SHORTPIXEL_LOSSY ?? 1);

if (!apiKey) {
  console.error("Missing SHORTPIXEL_API_KEY.");
  console.error("Example: $env:SHORTPIXEL_API_KEY='your-key'; npm run assets:webp");
  process.exit(1);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectConvertibleFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...await collectConvertibleFiles(fullPath));
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!supportedExtensions.has(ext)) continue;

    const webpPath = path.join(directory, `${path.basename(entry.name, ext)}.webp`);
    if (await fileExists(webpPath)) continue;

    files.push(fullPath);
  }

  return files;
}

const cli = new ShortPixelClient({
  apiKey,
  pluginVersion: "KYZEN",
});

cli.set("timeout", 60000);
cli.set("retries", 3);
cli.set("retryDelay", 1500);
cli.set("poll", {
  enabled: true,
  interval: 2500,
  maxAttempts: 24,
});

const files = await collectConvertibleFiles(assetsDir);

if (!files.length) {
  console.log("No PNG/JPG assets need WebP conversion.");
  process.exit(0);
}

console.log(`Converting ${files.length} asset(s) to WebP via ShortPixel...`);

for (const file of files) {
  const relative = path.relative(rootDir, file);
  const outputDir = path.dirname(file);

  try {
    const source = await cli.optimizeFile(file, {
      lossy,
      convertto: "webp",
      keep_exif: 0,
    });
    const downloads = await source.downloadTo(outputDir);
    const output = downloads.map((item) => path.relative(rootDir, item.path)).join(", ");
    console.log(`OK ${relative} -> ${output}`);
  } catch (error) {
    console.error(`FAILED ${relative}`);
    console.error(error?.spMessage || error?.message || error);
  }
}
