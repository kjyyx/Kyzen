import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, Calendar, Users, Award } from "lucide-react";

const projects = [
    {
        title: "Clarknav",
        image: "/src/assets/CN-3.png",
        link: "#",
        description: "Navigation system",
        tech: ["Angular", "Laravel", "PostgreSQL"],
        category: "Full-Stack",
        year: "2024",
        status: "Live",
    },
    {
        title: "ITS ATS",
        image: "/src/assets/ITS-1.png",
        link: "#",
        description: "Applicant tracking system",
        tech: ["Angular", ".NET", "PostgreSQL"],
        category: "Enterprise",
        year: "2024",
        status: "Completed",
    },
    {
        title: "Lavacraze",
        image: "/src/assets/LC-1.png",
        link: "#",
        description: "E-commerce platform",
        tech: ["Wordpress", "Elementor"],
        category: "E-commerce",
        year: "2023",
        status: "Live",
    },
    {
        title: "Railroad-ed",
        image: "/src/assets/RE-1.png",
        link: "#",
        description: "Educational rail system",
        tech: ["Wordpress", "D3.js", "Firebase"],
        category: "Educational",
        year: "2023",
        status: "Live",
    },
];

// Optimized animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            duration: 0.6,
        },
    },
};

function ProjectCard({
    project,
    align = "right",
    verticalRectangle = false,
    index,
    isMobile,
    isActive,
    onClick,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // For desktop, use hover state; for mobile, use the isActive prop
    const showEffects = isMobile ? isActive : isHovered;

    // Memoize status color calculation
    const statusStyle = useMemo(() => {
        const colors = {
            Live: { color: "#10b981", glow: "shadow-green-500/20" },
            Completed: { color: "#3b82f6", glow: "shadow-blue-500/20" },
            "In Progress": { color: "#f59e0b", glow: "shadow-amber-500/20" },
        };
        return (
            colors[project.status] || { color: "#6b7280", glow: "shadow-gray-500/20" }
        );
    }, [project.status]);

    // Optimized hover handlers
    const handleMouseEnter = useCallback(() => {
        if (!isMobile) setIsHovered(true);
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        if (!isMobile) setIsHovered(false);
    }, [isMobile]);

    return (
        <motion.div
            className={`flex flex-col items-${align} relative group`}
            variants={cardVariants}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={isMobile ? onClick : undefined}
        >
            <div
                className={`relative ${isMobile ? "w-full h-auto aspect-square" : "w-[380px] h-[380px]"
                    } cursor-pointer`}
            >
                {/* Simplified background glow effect */}
                {showEffects && (
                    <motion.div
                        className="absolute -inset-6 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-xl"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                {/* Main image container */}
                <motion.div
                    className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 backdrop-blur-sm"
                    animate={{
                        scale: showEffects ? 1.02 : 1,
                        borderColor: showEffects
                            ? "rgba(255, 117, 223, 0.4)"
                            : "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Image with simplified styling */}
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover object-center transition-all duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            filter: showEffects
                                ? "grayscale(0.2) saturate(1.1) brightness(1.1)"
                                : "grayscale(0.8) saturate(0.7) brightness(0.9)",
                        }}
                        animate={{
                            scale: showEffects ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Simplified overlay */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                            background: showEffects
                                ? "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(255,117,223,0.2) 50%, rgba(0,0,0,0.8) 100%)"
                                : "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Year and Status badges - moved to bottom right */}
                    <div className="absolute bottom-10 right-4 flex flex-col gap-2 z-30">
                        <motion.div
                            className="px-3 py-1 rounded-full backdrop-blur-sm border border-white/30 self-end"
                            style={{ backgroundColor: `${statusStyle.color}20` }}
                            animate={{
                                opacity: showEffects ? 1 : 0.8,
                                scale: showEffects ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <span
                                className="text-xs italic tracking-tight font-black flex items-center gap-1"
                                style={{ color: statusStyle.color }}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: statusStyle.color }}
                                />
                                {project.status} | {project.year}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating rectangle - optimized */}
                <motion.div
                    className={`absolute ${isMobile
                            ? "top-4 -right-4"
                            : verticalRectangle
                                ? "top-16 -right-16"
                                : "top-10 -left-16"
                        } z-40`}
                    initial={{
                        opacity: 1,
                        scale: 1,
                        x: isMobile ? -10 : 0,
                        y: isMobile ? -5 : 0,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: isMobile ? -10 : showEffects ? (verticalRectangle ? 0 : -80) : 0,
                        y: isMobile ? -5 : showEffects ? (verticalRectangle ? -80 : 0) : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        duration: 0.4,
                    }}
                >
                    <motion.div
                        className={`rounded-xl bg-gradient-to-r from-white/25 to-white/15 border border-white/40 backdrop-blur-xl shadow-2xl shadow-white/10 ${isMobile ? "w-[280px] h-[50px]" : "w-[340px] h-[60px]"
                            } ${verticalRectangle && !isMobile ? "rotate-90" : ""}`}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div
                            className={`px-4 py-3 flex items-center justify-between h-full ${isMobile ? "px-3 py-2" : "px-6 py-4"
                                }`}
                        >
                            <div className="flex-1">
                                <AnimatePresence>
                                    {showEffects && (
                                        <motion.span
                                            className={`text-white italic tracking-tight font-black whitespace-nowrap ${isMobile ? "text-base" : "text-lg"
                                                }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: 0.1, duration: 0.2 }}
                                        >
                                            explore project
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {showEffects && (
                                    <motion.div
                                        className={`ml-3 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 ${isMobile ? "w-6 h-6" : "w-8 h-8"
                                            }`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <ExternalLink
                                            className={`text-white ${isMobile ? "w-3 h-3" : "w-4 h-4"
                                                }`}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Project description overlay - simplified */}
                {showEffects && (
                    <motion.div
                        className="absolute bottom-20 left-6 right-6 z-30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-4 border border-white/20 rounded-xl backdrop-blur-sm">
                            <p className="text-white/90 text-lg font-light italic tracking-wide mb-3">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs italic tracking-tight font-black text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Project title - simplified animation */}
                <motion.div
                    className="absolute -bottom-6 left-6 z-30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                >
                    <motion.span
                        className="block text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight leading-none pr-1"
                        style={{
                            textShadow: showEffects
                                ? "0 0 30px rgba(255, 117, 223, 0.5)"
                                : "0 10px 30px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        {project.title}
                    </motion.span>
                </motion.div>

                {/* Simplified corner accents */}
                {showEffects && (
                    <>
                        <motion.div
                            className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#ff75df]/60 rounded-tr-lg z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.div
                            className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#ff75df]/60 rounded-bl-lg z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                        />
                    </>
                )}
            </div>
        </motion.div>
    );
}

function ProjectGrid() {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCardClick = useCallback(
        (index) => {
            if (!isMobile) return;
            setActiveCard(activeCard === index ? null : index);
        },
        [isMobile, activeCard]
    );

    // Memoize statistics data
    const statistics = useMemo(
        () => [
            { value: projects.length, label: "Projects", icon: Code },
            { value: "4+", label: "Technologies", icon: Award },
            { value: "2024", label: "Latest", icon: Calendar },
        ],
        []
    );

    return (
        <div className="flex flex-col items-center py-12 sm:py-20 max-w-6xl mx-auto w-11/12 sm:w-2/3 relative px-4 sm:px-6">
            {/* Simplified background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>

            {/* Title */}
            <motion.div 
                className="w-full flex justify-start mb-16 sm:mb-28 relative z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="relative">
                    <motion.h2 
                        className="pl-2 text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none italic tracking-tight text-left"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            textShadow: '0 0 40px rgba(255, 117, 223, 0.3)'
                        }}
                    >
                        Featured<span className="text-[#ff75df]">_</span>
                        <br />
                        works<span className="text-[#ff75df]">:</span>
                    </motion.h2>
                    
                    {/* Enhanced underline with gradient */}
                    <motion.div 
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "10rem" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </motion.div>

            {/* Statistics bar */}
            {/* <motion.div
                className="w-full flex justify-center mb-12 sm:mb-16 relative z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <div className="flex flex-wrap gap-6 sm:gap-8 justify-center">
                    {statistics.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <stat.icon className="w-4 h-4 text-[#ff75df]" />
                            <span className="text-white italic tracking-tight font-black text-sm">
                                {stat.value}
                            </span>
                            <span className="text-white/60 text-xs">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div> */}

            {/* Projects grid */}
            <motion.div
                className="w-full flex flex-col gap-12 sm:gap-20 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.title}
                        className={`
                            ${isMobile
                                ? "w-full flex justify-center"
                                : `flex ${idx % 2 === 0
                                    ? "justify-start ml-0 sm:ml-32"
                                    : "justify-end mr-0 sm:mr-32"
                                }`
                            }
                            ${!isMobile && idx !== 0 ? "-mt-28" : ""}
                            relative
                        `}
                        style={{ zIndex: 10 - idx }}
                        variants={cardVariants}
                    >
                        {/* Project number indicator */}
                        {!isMobile && (
                            <motion.div
                                className={`absolute ${idx % 2 === 0
                                        ? "-left-20 sm:-left-40"
                                        : "-right-20 sm:-right-40"
                                    } top-1/2 transform -translate-y-1/2`}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                            >
                                <span className="text-white/20 text-6xl sm:text-8xl font-black italic">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                            </motion.div>
                        )}

                        <ProjectCard
                            project={project}
                            align={isMobile ? "center" : idx % 2 === 0 ? "start" : "end"}
                            verticalRectangle={!isMobile && idx % 2 === 1}
                            index={idx}
                            isMobile={isMobile}
                            isActive={activeCard === idx}
                            onClick={() => handleCardClick(idx)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom decoration */}
            <motion.div 
                className="w-full mt-12 sm:mt-20 flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#ff75df]/50 to-transparent" />
            </motion.div>
        </div>
    );
}

export default ProjectGrid;
