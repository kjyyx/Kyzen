import AtsBg from '../../assets/Projects_Icons/ATS_bg.webp';
import ClarknavBg from '../../assets/Projects_Icons/Clarknav_bg.webp';
import GptBg from '../../assets/Projects_Icons/GPT_bg.webp';
import BriskBg from '../../assets/Projects_Icons/Brisk_bg.webp';
import LavaCrazeBg from '../../assets/Projects_Icons/Lavacraze_bg.webp';
import SprintBg from '../../assets/Projects_Icons/Sprint_bg.webp';
import RailroadedBg from '../../assets/Projects_Icons/Railroaded_bg.webp';
import KairosBg from '../../assets/Projects_Icons/Kairos_bg.webp';
import PlaceholderBg from '../../assets/BG-static.png';
import AtsIcon from '../../assets/Projects_Icons/ATS_ico.webp';
import ClarknavIcon from '../../assets/Projects_Icons/Clarknav_ico.webp';
import GptIcon from '../../assets/Projects_Icons/GPT_ico.webp';
import BriskIcon from '../../assets/Projects_Icons/Brisk_ico.webp';
import LavaCrazeIcon from '../../assets/Projects_Icons/Lavacraze_ico.webp';
import SprintIcon from '../../assets/Projects_Icons/Sprint_ico.webp';
import RailroadedIcon from '../../assets/Projects_Icons/Railroaded_ico.webp';
import KairosIcon from '../../assets/Projects_Icons/Kairos_ico.webp';
import BrainboxLogo from '../../assets/Projects_Icons/BB_Logo.webp';
import RazorPaymentsLogo from '../../assets/Projects_Icons/RP_Logo.webp';
import SbnLogo from '../../assets/Projects_Icons/SBN_Logo.webp';
import WeldEastLogo from '../../assets/Projects_Icons/WE_Logo.webp';

import BriskSS1 from '../../assets/Webpage_Screenshots/Brisk_ss1.webp';
import BriskSS2 from '../../assets/Webpage_Screenshots/Brisk_ss2.webp';
import BriskSS3 from '../../assets/Webpage_Screenshots/Brisk_ss3.webp';
import BriskSS4 from '../../assets/Webpage_Screenshots/Brisk_ss4.webp';

import GPTSS1 from '../../assets/Webpage_Screenshots/GPT_ss1.webp';
import GPTSS2 from '../../assets/Webpage_Screenshots/GPT_ss2.webp';
import GPTSS3 from '../../assets/Webpage_Screenshots/GPT_ss3.webp';
import GPTSS4 from '../../assets/Webpage_Screenshots/GPT_ss4.webp';
import GPTSS5 from '../../assets/Webpage_Screenshots/GPT_ss5.webp';

import KairosSS1 from '../../assets/Webpage_Screenshots/Kairos_ss1.webp';
import KairosSS2 from '../../assets/Webpage_Screenshots/Kairos_ss2.webp';
import KairosSS3 from '../../assets/Webpage_Screenshots/Kairos_ss3.webp';
import KairosSS4 from '../../assets/Webpage_Screenshots/Kairos_ss4.webp';

import LavacrazeSS1 from '../../assets/Webpage_Screenshots/Lavacraze_ss1.webp';
import LavacrazeSS2 from '../../assets/Webpage_Screenshots/Lavacraze_ss2.webp';

import RailroadedSS1 from '../../assets/Webpage_Screenshots/Railroaded_ss1.webp';
import RailroadedSS2 from '../../assets/Webpage_Screenshots/Railroaded_ss2.webp';
import RailroadedSS3 from '../../assets/Webpage_Screenshots/Railroaded_ss3.webp';
import RailroadedSS4 from '../../assets/Webpage_Screenshots/Railroaded_ss4.webp';
import RailroadedSS5 from '../../assets/Webpage_Screenshots/Railroaded_ss5.webp';

import SprintSS1 from '../../assets/Webpage_Screenshots/Sprint_ss1.webp';
import SprintSS2 from '../../assets/Webpage_Screenshots/Sprint_ss2.webp';

export const projects = [
    {
        slug: "razor-payments",
        title: "Razor Payments",
        subtitle: "Payments Website, DNS, and Lead Pipeline",
        category: "WordPress Development",
        description: "Built and deployed the Razor Payments website from staging to production using WordPress, Elementor Pro, and the Blocksy theme. The work covered front-end alignment, custom landing pages, GoHighLevel lead capture, DNS subdomain setup, Mailgun sender authentication, SSL, and SiteGround production management.",
        backgroundImage: RazorPaymentsLogo,
        meta: {
            year: "2026",
            status: "Live"
        },
        techStack: [
            { name: "WordPress", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "Elementor Pro", color: "#92003B", icon: "https://elementor.com/favicon.ico" },
            { name: "Blocksy", color: "#0ea5e9", icon: "https://creativethemes.com/blocksy/wp-content/uploads/2021/10/favicon.png" },
            { name: "GoHighLevel", color: "#38bdf8", icon: "https://www.gohighlevel.com/favicon.ico" },
            { name: "SiteGround", color: "#84cc16", icon: "https://www.siteground.com/favicon.ico" },
            { name: "Mailgun", color: "#ef4444", icon: "https://www.mailgun.com/favicon.ico" }
        ],
        links: {
            website: "https://razorpayments.com.au",
            live: "https://razorpayments.com.au"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Junior Web Developer" }
        ],
        highlights: [
            "Built the site from scratch on a staging environment",
            "Promoted staging to SiteGround production with SSL configured",
            "Integrated Elementor Forms with GoHighLevel inbound webhooks",
            "Configured go, books, links, and mail subdomains for GHL",
            "Set up Mailgun/LC Email SPF, DKIM, and MX records",
            "Resolved email authentication and Outlook formatting issues"
        ]
    },
    {
        slug: "superior-business-networks",
        title: "SBN",
        subtitle: "Custom WordPress Block Theme Migration",
        category: "WordPress Full Site Editing",
        description: "Designed and built a custom WordPress Full Site Editing block theme from scratch in VS Code, migrating a Divi-based site into a modern block architecture for a Perth business networking organisation. The build supports dynamic directory and event workflows with ACF, The Events Calendar, and Event Tickets.",
        backgroundImage: SbnLogo,
        meta: {
            year: "2026",
            status: "Live"
        },
        techStack: [
            { name: "WordPress FSE", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "Custom Block Theme", color: "#6366f1", icon: "https://wordpress.org/favicon.ico" },
            { name: "ACF", color: "#00d084", icon: "https://www.advancedcustomfields.com/favicon.ico" },
            { name: "The Events Calendar", color: "#f97316", icon: "https://theeventscalendar.com/favicon.ico" },
            { name: "Event Tickets", color: "#028582", icon: "https://theeventscalendar.com/favicon.ico" },
            { name: "SiteGround", color: "#84cc16", icon: "https://www.siteground.com/favicon.ico" }
        ],
        links: {
            website: "https://superiorbusinessnetworks.com.au",
            live: "https://superiorbusinessnetworks.com.au"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Junior Web Developer" }
        ],
        highlights: [
            "Migrated from legacy Divi setup to custom block architecture",
            "Built a custom FSE theme from scratch in VS Code",
            "Implemented ACF-powered content management",
            "Added events and ticketing functionality",
            "Promoted staging to production with zero downtime",
            "Performed broken-link audits, QA checks, and handover documentation"
        ]
    },
    {
        slug: "weld-east",
        title: "Weld East",
        subtitle: "WordPress Performance and Hosting Support",
        category: "WordPress Maintenance",
        description: "Supported Weld East's WordPress site with domain configuration, Full Site Editing page updates, and performance optimisation for an Australian custom metal solutions brand. The work focused on Core Web Vitals, blog template fixes, LCP image preloading, and delayed non-critical scripts.",
        backgroundImage: WeldEastLogo,
        meta: {
            year: "2026",
            status: "Live"
        },
        techStack: [
            { name: "WordPress FSE", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "Crazy Domains", color: "#f59e0b", icon: "https://www.crazydomains.com.au/favicon.ico" },
            { name: "PageSpeed Insights", color: "#4285f4", icon: "https://pagespeed.web.dev/favicon.ico" },
            { name: "Flying Scripts", color: "#028582", icon: "https://wordpress.org/favicon.ico" },
            { name: "Speed Optimizer", color: "#22c55e", icon: "https://www.siteground.com/favicon.ico" }
        ],
        links: {
            website: "https://www.weldeast.com.au",
            live: "https://www.weldeast.com.au"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Junior Web Developer" }
        ],
        highlights: [
            "Managed domain configuration through Crazy Domains",
            "Handled new-page requests using WordPress Full Site Editing",
            "Improved PageSpeed Insights scores to 90+",
            "Fixed blog template performance issues",
            "Preloaded LCP hero images and delayed non-critical scripts"
        ]
    },
    {
        slug: "brainbox-corporate-sites",
        title: "Brainbox",
        subtitle: "Multi-Site WordPress Maintenance and UX Modernisation",
        category: "WordPress Operations",
        description: "Maintained and modernised multiple Brainbox ecosystem sites, including Brainbox, Blue Zoo, and Governance Manager. The work included landing-page restructuring, mobile UX improvements, security audits, plugin compatibility updates, asset compression, backups, staging workflows, and SiteGround administration.",
        backgroundImage: BrainboxLogo,
        meta: {
            year: "2026",
            status: "Maintained"
        },
        techStack: [
            { name: "WordPress", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "SiteGround", color: "#84cc16", icon: "https://www.siteground.com/favicon.ico" },
            { name: "Mobile UX", color: "#06b6d4", icon: "https://developer.mozilla.org/favicon-48x48.cbbd161b.png" },
            { name: "Security Audits", color: "#ef4444", icon: "https://wordpress.org/favicon.ico" },
            { name: "Image Optimisation", color: "#22c55e", icon: "https://developer.mozilla.org/favicon-48x48.cbbd161b.png" }
        ],
        links: {
            website: "https://brain-box.com.au",
            live: "https://brain-box.com.au",
            additional: [
                { label: "Blue Zoo", url: "https://bluezoo.com.au" },
                { label: "Governance Manager", url: "https://governancemanager.org" }
            ]
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Junior Web Developer" }
        ],
        highlights: [
            "Maintained Blue Zoo, Brainbox, and Governance Manager sites",
            "Reworked landing-page layouts for stronger mobile UX",
            "Replaced legacy stacked-card sections with custom swiping components",
            "Handled plugin compatibility updates and security audits",
            "Managed SiteGround staging, backups, and production upkeep",
            "Compressed core visual assets for better page performance"
        ]
    },
    {
        slug: "clarknav",
        title: "Clarknav",
        subtitle: "Navigation Enhancement Project",
        category: "Web Development",
        description: "A comprehensive navigation system designed to enhance user experience and streamline digital workflows for modern applications.",
        backgroundImage: ClarknavBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "Angular", color: "#dd0031", icon: "https://angular.io/assets/images/logos/angular/angular.svg" },
            { name: "Laravel", color: "#ff2d20", icon: "https://laravel.com/img/logomark.min.svg" },
            { name: "PostgreSQL", color: "#336791", icon: "https://www.postgresql.org/media/img/about/press/elephant.webp" },
            { name: "TypeScript", color: "#3178c6", icon: "https://www.typescriptlang.org/favicon-32x32.webp" }
        ],
        links: {
            website: "https://www.clarknav.com",
            live: "https://demo.clarknav.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Full-Stack Developer" },
            { name: "Sarah Johnson", role: "UI/UX Designer" },
            { name: "Mike Chen", role: "Backend Developer" },
            { name: "Lisa Rodriguez", role: "Project Manager" },
            { name: "David Kim", role: "QA Engineer" }
        ],
        highlights: [
            "Capstone project achievement",
            "Real-time navigation updates",
            "Mobile-first responsive design",
            "Advanced user authentication"
        ],
        screenshots: [],
        // extraSections: ["ProjectStatistics", "KeyFeatures", "ProjectShowcase", "MobileExperience", "ProjectImpact"]
    },
    {
        slug: "itsats",
        title: "ITSquarehub",
        subtitle: "Applicant Tracking System",
        category: "Enterprise Software",
        description: "A comprehensive applicant tracking system designed to streamline recruitment processes and enhance HR efficiency for modern organizations.",
        backgroundImage: AtsBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "Angular", color: "#dd0031", icon: "https://angular.io/assets/images/logos/angular/angular.svg" },
            { name: ".NET", color: "#512bd4", icon: "https://dotnet.microsoft.com/favicon.ico" },
            { name: "PostgreSQL", color: "#336791", icon: "https://www.postgresql.org/media/img/about/press/elephant.webp" },
            { name: "Azure", color: "#0078d4", icon: "https://azure.microsoft.com/favicon.ico" }
        ],
        links: {
            website: "https://www.itsats.com",
            live: "https://demo.itsats.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Full-Stack Developer" },
            { name: "Shane Paras", role: "Senior Developer" },
            { name: "CJ Ocampo", role: "System Architect" }
        ],
        highlights: [
            "Internship project success",
            "Advanced applicant filtering",
            "Automated resume parsing",
            "Real-time collaboration tools"
        ],
        screenshots: [],
        // extraSections: ["ProjectStatistics", "KeyFeatures", "ProjectShowcase", "MobileExperience", "ProjectImpact"]
    },
    {
        slug: "lavacraze",
        title: "LavaCraze",
        subtitle: "First Client Website Project",
        category: "Client Web Development",
        description: "Lava Craze marks our debut website project tailored for a client, constructed using WordPress and powered by Hostinger hosting services. By integrating an array of plugins such as Site Kit, All-in-one SEO, Elementor, Google Analytics, and Autoptimize, our website seamlessly merges cutting-edge technology with captivating design, promising a delightful and user-friendly experience.",
        backgroundImage: LavaCrazeBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "WordPress", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "Elementor", color: "#92003B", icon: "https://elementor.com/favicon.ico" },
            { name: "Hostinger", color: "#673de6", icon: "https://hostinger.com/favicon.ico" },
            { name: "Google Analytics", color: "#fbbc05", icon: "https://analytics.google.com/favicon.ico" },
            { name: "Site Kit", color: "#4285f4", icon: "https://sitekit.withgoogle.com/favicon.ico" },
            { name: "All-in-One SEO", color: "#00aa63", icon: "https://aioseo.com/favicon.ico" }
        ],
        links: {
            website: "https://www.lavacraze.com",
            live: "https://www.lavacraze.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Dennis Dela Rosa", role: "Developer" },
            { name: "Dayson Delfin", role: "Developer" },
            { name: "Reuben Rob Sibal", role: "Developer" }
        ],
        highlights: [
            "First client website project",
            "SEO optimized with multiple plugins",
            "Performance enhanced with Autoptimize",
            "Professional hosting on Hostinger",
            "Comprehensive analytics integration",
            "User-friendly Elementor design"
        ],
        screenshots: [
            {
                src: LavacrazeSS1,
                alt: "LavaCraze Homepage Design"
            },
            {
                src: LavacrazeSS2,
                alt: "LavaCraze Content Pages"
            }
        ]
    },
    {
        slug: "railroaded",
        title: "RailroadED",
        subtitle: "Philippine Railroad History Platform",
        category: "Educational Content Website",
        description: "Railroad-ED is an interesting website all about the history of the Philippine Railroad. It has blogs about its past, present, and future. The site is made with WordPress, making it easy for you to dive into the exciting story of the Philippine Railroad.",
        backgroundImage: RailroadedBg,
        meta: {
            year: "2023",
            status: "Live"
        },
        techStack: [
            { name: "WordPress", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "PHP", color: "#777bb4", icon: "https://www.php.net/favicon.ico" },
            { name: "MySQL", color: "#4479a1", icon: "https://www.mysql.com/favicon.ico" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" }
        ],
        links: {
            website: "https://railroaded8.wordpress.com/",
            live: "https://railroaded8.wordpress.com/"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" }
        ],
        highlights: [
            "Historical content platform",
            "Past, present, and future coverage",
            "Educational blog format",
            "WordPress CMS integration",
            "Philippine Railroad focused",
            "Easy content management"
        ],
        screenshots: [
            {
                src: RailroadedSS1,
                alt: "Railroaded Homepage Interface"
            },
            {
                src: RailroadedSS2,
                alt: "Railroaded Blog Articles"
            },
            {
                src: RailroadedSS3,
                alt: "Railroaded Historical Content"
            },
            {
                src: RailroadedSS4,
                alt: "Railroaded Navigation Menu"
            },
            {
                src: RailroadedSS5,
                alt: "Railroaded Content Management"
            }
        ]
    },
    {
        slug: "brisk",
        title: "Brisk",
        subtitle: "Advanced Vehicle Rental Service",
        category: "Web Application",
        description: "Brisk is an advanced vehicle rental service. It uses mySQL for a strong database and PHP, CSS, and JavaScript for a smooth and enjoyable user experience. Brisk incorporates CRUD operations (CREATE, READ, UPDATE, DELETE) to efficiently manage data. It redefines vehicle rental with a dynamic and user-friendly approach, blending cutting-edge technologies seamlessly.",
        backgroundImage: BriskBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "PHP", color: "#777bb4", icon: "https://www.php.net/favicon.ico" },
            { name: "MySQL", color: "#4479a1", icon: "https://www.mysql.com/favicon.ico" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" }
        ],
        links: {
            website: "https://www.brisk.app",
            live: "https://demo.brisk.app"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Miguel Enriquez", role: "Developer" },
            { name: "Daryll Medina", role: "Developer" },
            { name: "Charmagne Maniago", role: "Developer" }
        ],
        highlights: [
            "Complete CRUD operations",
            "Strong MySQL database foundation",
            "Dynamic user interface",
            "Efficient data management",
            "Vehicle rental optimization",
            "Seamless technology integration"
        ],
        screenshots: [
            {
                src: BriskSS1,
                alt: "Brisk Vehicle Rental Dashboard"
            },
            {
                src: BriskSS2,
                alt: "Brisk Vehicle Listing Page"
            },
            {
                src: BriskSS3,
                alt: "Brisk Booking Interface"
            },
            {
                src: BriskSS4,
                alt: "Brisk User Management System"
            }
        ]
    },
    {
        slug: "gpt",
        title: "GPT",
        subtitle: "Delightful Coffee Shop Experience",
        category: "E-commerce Web Application",
        description: "Galactic Pressed Tasting brings you a delightful coffee shop website, made with HTML, CSS, and JS for an enjoyable online experience. We've added MongoDB, a fancy database system, and integrated CRUD operations to make sure everything runs smoothly. This creates a strong and reliable platform for all coffee lovers out there.",
        backgroundImage: GptBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "MongoDB", color: "#47a248", icon: "https://www.mongodb.com/favicon.ico" }
        ],
        links: {
            website: "https://www.gpt-tasting.com",
            live: "https://demo.gpt-tasting.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Dennis Dela Rosa", role: "Developer" },
            { name: "Dayson Delfin", role: "Developer" },
            { name: "Reuben Rob Sibal", role: "Developer" },
            { name: "Jose Raphael Quiambao", role: "Developer" }
        ],
        highlights: [
            "Coffee shop focused platform",
            "MongoDB database integration",
            "Complete CRUD functionality",
            "Enjoyable user experience",
            "Reliable and strong foundation",
            "Coffee lover community platform"
        ],
        screenshots: [
            {
                src: GPTSS1,
                alt: "GPT Coffee Shop Homepage"
            },
            {
                src: GPTSS2,
                alt: "GPT Menu and Products"
            },
            {
                src: GPTSS3,
                alt: "GPT Order Management"
            },
            {
                src: GPTSS4,
                alt: "GPT Customer Interface"
            },
            {
                src: GPTSS5,
                alt: "GPT Admin Dashboard"
            }
        ]
    },
    {
        slug: "kairos",
        title: "Kairos",
        subtitle: "Airport Terminal Navigation System",
        category: "Navigation Web Application",
        description: "At KAIROS, we've developed a cutting-edge website for Clark International Airport Terminal 2. Utilizing QR codes strategically placed throughout the terminal, our website instantly guides users to the nearest comfort room. Built with HTML, CSS, JavaScript, and Bootstrap, our site dynamically displays maps, enables zooming, and centers the map to the user's location for seamless navigation.",
        backgroundImage: KairosBg,
        meta: {
            year: "2024",
            status: "Live"
        },
        techStack: [
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "Bootstrap", color: "#7952b3", icon: "https://getbootstrap.com/favicon.ico" }
        ],
        links: {
            website: "https://kairosqr.bitbucket.io/",
            live: "https://kairosqr.bitbucket.io/"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Front-End Developer" },
            { name: "Jazper Garcia", role: "Back-End Developer" }
        ],
        highlights: [
            "QR code navigation system",
            "Clark International Airport integration",
            "Dynamic interactive maps",
            "Location-based guidance",
            "Real-time comfort room finder",
            "Seamless user navigation experience"
        ],
        screenshots: [
            {
                src: KairosSS1,
                alt: "Kairos Airport Navigation Map"
            },
            {
                src: KairosSS2,
                alt: "Kairos QR Code Interface"
            },
            {
                src: KairosSS3,
                alt: "Kairos Location Finder"
            },
            {
                src: KairosSS4,
                alt: "Kairos Mobile Navigation"
            }
        ]
    },
    {
        slug: "sprint",
        title: "Sprint",
        subtitle: "Modern Vehicle Rental Platform",
        category: "Service Web Application",
        description: "Sprint Auto Care is a modern vehicle rental service, designed with a blend of Bootstrap, HTML, CSS, and JS, enriched with the power of APIs (Application Programming Interfaces). Utilizing Atlassian's Jira Software and Bitbucket, along with Google's App Script, Form, Gmail, and Spreadsheet, the website becomes a dynamic and functional platform.",
        backgroundImage: SprintBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "Bootstrap", color: "#7952b3", icon: "https://getbootstrap.com/favicon.ico" },
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "Google APIs", color: "#4285f4", icon: "https://developers.google.com/favicon.ico" },
            { name: "Jira", color: "#0052cc", icon: "https://www.atlassian.com/favicon.ico" }
        ],
        links: {
            website: "https://sprintersasi.bitbucket.io/SPRINTAutoCare1/",
            live: "https://sprintersasi.bitbucket.io/SPRINTAutoCare1/"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Dennis Dela Rosa", role: "Developer" },
            { name: "Dayson Delfin", role: "Developer" },
            { name: "Reuben Rob Sibal", role: "Developer" }
        ],
        highlights: [
            "Modern vehicle rental service",
            "API integration for functionality",
            "Atlassian Jira project management",
            "Google Workspace integration",
            "Dynamic platform architecture",
            "Professional development workflow"
        ],
        screenshots: [
            {
                src: SprintSS1,
                alt: "Sprint Project Management Interface"
            },
                        {
                src: SprintSS2,
                alt: "Sprint Project Management Interface"
            }
        ]
    }
];

export const featuredProjectSlugs = [
    "razor-payments",
    "superior-business-networks",
    "weld-east",
    "brainbox-corporate-sites"
];

const projectCardMeta = {
    "razor-payments": {
        image: RazorPaymentsLogo,
        description: "Payments website and lead pipeline",
        tech: ["WordPress", "Elementor Pro", "GoHighLevel"],
        category: "WordPress"
    },
    "superior-business-networks": {
        image: SbnLogo,
        description: "Custom FSE block theme migration",
        tech: ["WordPress FSE", "ACF", "SiteGround"],
        category: "WordPress"
    },
    "weld-east": {
        image: WeldEastLogo,
        description: "Performance and hosting support",
        tech: ["WordPress FSE", "PageSpeed", "DNS"],
        category: "Maintenance"
    },
    "brainbox-corporate-sites": {
        title: "Brainbox",
        image: BrainboxLogo,
        description: "Multi-site UX and maintenance work",
        tech: ["WordPress", "SiteGround", "Security"],
        category: "Operations"
    },
    clarknav: {
        image: ClarknavIcon,
        description: "Navigation system",
        tech: ["Angular", "Laravel", "PostgreSQL"],
        category: "Full-Stack"
    },
    itsats: {
        image: AtsIcon,
        description: "Applicant tracking system",
        tech: ["Angular", ".NET", "PostgreSQL"],
        category: "Enterprise"
    },
    lavacraze: {
        image: LavaCrazeIcon,
        description: "E-commerce platform",
        tech: ["WordPress", "Elementor"],
        category: "E-commerce"
    },
    railroaded: {
        title: "Railroad-ed",
        image: RailroadedIcon,
        description: "Educational rail system",
        tech: ["WordPress", "PHP", "MySQL"],
        category: "Educational"
    },
    brisk: {
        image: BriskIcon,
        description: "Vehicle rental web app",
        tech: ["PHP", "MySQL", "JavaScript"],
        category: "Web App"
    },
    gpt: {
        image: GptIcon,
        description: "Coffee shop web app",
        tech: ["HTML", "CSS", "MongoDB"],
        category: "E-commerce"
    },
    kairos: {
        image: KairosIcon,
        description: "Airport terminal navigation",
        tech: ["HTML", "JavaScript", "Bootstrap"],
        category: "Navigation"
    },
    sprint: {
        image: SprintIcon,
        description: "Vehicle rental service platform",
        tech: ["Bootstrap", "JavaScript", "Google APIs"],
        category: "Service"
    }
};

export const toProjectCard = (project) => {
    const cardMeta = projectCardMeta[project.slug] || {};

    return {
        title: cardMeta.title || project.title,
        image: cardMeta.image || project.backgroundImage,
        link: `/projects/${project.slug}`,
        description: cardMeta.description || project.subtitle,
        tech: cardMeta.tech || project.techStack.slice(0, 3).map((tech) => tech.name),
        category: cardMeta.category || project.category,
        year: project.meta?.year || "",
        status: project.meta?.status || "Completed"
    };
};

export const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean)
    .map(toProjectCard);

export const remainingProjects = projects
    .filter((project) => !featuredProjectSlugs.includes(project.slug))
    .map(toProjectCard);
