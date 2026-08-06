import React, { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { projects } from "./ProjectData";

const projectOrder = projects.map((project) => `/projects/${project.slug}`);
const projectLookup = projects.reduce((lookup, project) => {
    lookup[`/projects/${project.slug}`] = project;
    return lookup;
}, {});

const NextProjectSection = memo(() => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname.toLowerCase();
    const currentIndex = projectOrder.findIndex(
        (path) => currentPath.endsWith(path)
    );

    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % projectOrder.length : 0;
    const nextProjectPath = projectOrder[nextIndex];
    const nextProject = projectLookup[nextProjectPath];
    const nextProjectName = nextProject?.title?.toUpperCase() || "PROJECT";
    const nextProjectFullName = nextProject?.subtitle || nextProject?.title || "View next project";

    const handleProjectClick = useCallback(() => {
        navigate(nextProjectPath);
    }, [navigate, nextProjectPath]);

    return (
        <motion.div
            className="relative h-full flex flex-col items-end justify-end overflow-visible py-12 pr-0 sm:pr-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Next Project Label */}
            <motion.div
                className="mb-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.4 }}
            >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
                    next project
                </span>
            </motion.div>

            {/* Interactive Project Title */}
            <motion.div
                className="relative cursor-pointer flex flex-col items-end w-full max-w-full"
                style={{
                    transformOrigin: "100% 50%",
                    perspective: "1000px"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleProjectClick}
            >
                {/* Outlined text (default swung out state) */}
                <motion.h2
                    className="w-full max-w-[90vw] break-words text-3xl sm:text-4xl md:text-5xl xl:text-8xl font-display-black-italic uppercase text-transparent select-none text-right"
                    style={{
                        WebkitTextStroke: '1.5px rgba(243, 250, 249, 0.72)',
                        position: 'relative',
                        zIndex: 1,
                        transformOrigin: "100% 50%",
                        lineHeight: 1.05,
                        wordBreak: "break-word"
                    }}
                    initial={{
                        rotateY: -20,
                        opacity: 1
                    }}
                    animate={{
                        rotateY: isHovered ? 0 : -20,
                        opacity: isHovered ? 0 : 1
                    }}
                    transition={{
                        duration: 0.35,
                        ease: [0.23, 1, 0.32, 1]
                    }}
                >
                    {nextProjectName}
                </motion.h2>
                {/* Solid filled text (appears on hover) */}
                <motion.h2
                    className="w-full max-w-[90vw] break-words text-3xl sm:text-4xl md:text-5xl xl:text-8xl font-display-black-italic uppercase text-display select-none text-right"
                    initial={{
                        opacity: 0,
                        rotateY: -20
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        rotateY: isHovered ? 0 : -20
                    }}
                    transition={{
                        duration: 0.35,
                        ease: [0.23, 1, 0.32, 1]
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 2,
                        transformOrigin: "100% 50%",
                        lineHeight: 1.05,
                        wordBreak: "break-word"
                    }}
                >
                    {nextProjectName}
                </motion.h2>
                {/* Full name subtitle, fades in on hover */}
                <motion.span
                    className="block text-sm sm:text-base text-foreground-secondary/80 font-display-medium mt-3 text-right pr-1 max-w-[80vw] truncate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.4 }}
                    title={nextProjectFullName}
                >
                    {nextProjectFullName}
                </motion.span>
            </motion.div>
        </motion.div>
    );
});

export default NextProjectSection;
