import React, { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

// Project order hierarchy
const projectOrder = [
    "/projects/clarknav",
    "/projects/itsats",
    "/projects/lavacraze",
    "/projects/railroaded",
    "/projects/brisk",
    "/projects/gpt",
    "/projects/kairos",
    "/projects/sprint"
];

const projectNames = {
    "/projects/clarknav": "CLARKNAV",
    "/projects/itsats": "ITS ATS",
    "/projects/lavacraze": "LAVACRAZE",
    "/projects/railroaded": "RAILROADED",
    "/projects/brisk": "BRISK",
    "/projects/gpt": "GPT",
    "/projects/kairos": "KAIROS",
    "/projects/sprint": "SPRINT"
};

const projectFullNames = {
    "/projects/clarknav": "Clarknav",
    "/projects/itsats": "Applicant Tracking System",
    "/projects/lavacraze": "Lavacraze",
    "/projects/railroaded": "Railroad-ed",
    "/projects/brisk": "Brisk",
    "/projects/gpt": "Galactic Pressed Tasting",
    "/projects/kairos": "Kairos",
    "/projects/sprint": "Sprint"
};

const NextProjectSection = memo(() => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Find current project index
    const currentPath = location.pathname.toLowerCase();
    const currentIndex = projectOrder.findIndex(
        (path) => currentPath.endsWith(path)
    );

    // Get next project index (wrap around)
    const nextIndex = (currentIndex + 1) % projectOrder.length;
    const nextProjectPath = projectOrder[nextIndex];
    const nextProjectName = projectNames[nextProjectPath];
    const nextProjectFullName = projectFullNames[nextProjectPath];

    const handleProjectClick = useCallback(() => {
        navigate(nextProjectPath);
    }, [navigate, nextProjectPath]);

    return (
        <motion.div
            className="relative h-full flex flex-col items-end justify-end overflow-visible py-12 pr-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            {/* Next Project Label */}
            <motion.div
                className="mb-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <span className="text-white/60 text-sm tracking-wider font-medium">
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
                    className="w-full max-w-[90vw] break-words text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] italic font-black uppercase tracking-tight text-transparent select-none text-right"
                    style={{
                        WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
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
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1]
                    }}
                >
                    {nextProjectName}
                </motion.h2>
                {/* Solid filled text (appears on hover) */}
                <motion.h2
                    className="w-full max-w-[90vw] break-words text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] italic font-black uppercase tracking-tight text-white select-none text-right"
                    initial={{
                        opacity: 0,
                        rotateY: -20
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        rotateY: isHovered ? 0 : -20
                    }}
                    transition={{
                        duration: 0.6,
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
                    className="block text-base sm:text-lg md:text-xl text-white/70 font-medium mt-3 text-right pr-1 max-w-[80vw] truncate"
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