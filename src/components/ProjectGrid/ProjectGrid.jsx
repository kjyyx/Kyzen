import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, Calendar, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CNImage from '../../assets/CN-3.png';
import ITSImage from '../../assets/ITS-1.png';
import LCImage from '../../assets/LC-1.png';
import REImage from '../../assets/RE-1.png';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';

// ===== DATA CONFIGURATION =====
const projects = [
    {
        title: "Clarknav",
        image: CNImage,
        link: "/projects/clarknav",
        description: "Navigation system",
        tech: ["Angular", "Laravel", "PostgreSQL"],
        category: "Full-Stack",
        year: "2025",
        status: "Live",
    },
    {
        title: "ITS ATS",
        image: ITSImage,
        link: "#",
        description: "Applicant tracking system",
        tech: ["Angular", ".NET", "PostgreSQL"],
        category: "Enterprise",
        year: "2024",
        status: "Completed",
    },
    {
        title: "Lavacraze",
        image: LCImage,
        link: "/projects/lavacraze",
        description: "E-commerce platform",
        tech: ["Wordpress", "Elementor"],
        category: "E-commerce",
        year: "2023",
        status: "Live",
    },
    {
        title: "Railroad-ed",
        image: REImage,
        link: "#",
        description: "Educational rail system",
        tech: ["Wordpress", "D3.js", "Firebase"],
        category: "Educational",
        year: "2023",
        status: "Live",
    },
];

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// Background Effects Component
const BackgroundEffects = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeIn"
        delay={0.1}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
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
    </ScrollAnimatedSection>
));

// Bottom Decoration Component
const BottomDecoration = memo(() => (
    <ScrollAnimatedSection
        animationType="scale"
        delay={0.3}
        className="w-full mt-12 sm:mt-20 flex justify-center"
    >
        <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#ff75df]/50 to-transparent" />
    </ScrollAnimatedSection>
));

// Page Header Component
const PageHeader = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeDown"
        delay={0.2}
        className="w-full flex justify-start mb-12 sm:mb-16 md:mb-20 lg:mb-28 relative z-10"
    >
        <div className="relative w-full">
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

            <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "10rem" }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </div>
    </ScrollAnimatedSection>
));

// Project Card Background Glow Component
const ProjectCardGlow = memo(({ showEffects }) => (
    <AnimatePresence>
        {showEffects && (
            <motion.div
                className="absolute -inset-3 sm:-inset-4 md:-inset-6 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-xl"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
            />
        )}
    </AnimatePresence>
));

// Project Card Corner Accents Component
const ProjectCardCornerAccents = memo(({ showEffects }) => (
    <AnimatePresence>
        {showEffects && (
            <>
                <motion.div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#ff75df]/80 rounded-tr-lg z-30"
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#ff75df]/80 rounded-bl-lg z-30"
                    initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    transition={{ duration: 0.15, delay: 0.02, ease: "easeOut" }}
                />
            </>
        )}
    </AnimatePresence>
));

// Project Card Description Overlay Component
const ProjectCardDescription = memo(({ project, showEffects }) => (
    <AnimatePresence>
        {showEffects && (
            <motion.div
                className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 right-4 sm:right-6 z-30"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{
                    duration: 0.15,
                    ease: "easeOut"
                }}
            >
                <motion.div
                    className="p-3 sm:p-4 border border-white/30 rounded-lg sm:rounded-xl backdrop-blur-md bg-black/20"
                    initial={{ backdropFilter: "blur(0px)" }}
                    animate={{ backdropFilter: "blur(12px)" }}
                    transition={{ duration: 0.1 }}
                >
                    <motion.p
                        className="text-white/90 text-base sm:text-lg font-normal italic tracking-wide mb-2 sm:mb-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: 0.05 }}
                    >
                        {project.description}
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap gap-1.5 sm:gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15, delay: 0.08 }}
                    >
                        {project.tech.map((tech, techIndex) => (
                            <ProjectTechBadge
                                key={tech}
                                tech={tech}
                                index={techIndex}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
));

// Project Card Floating Button Component
const ProjectCardFloatingButton = memo(({ 
    project, 
    showEffects, 
    isMobile, 
    isTablet, 
    verticalRectangle, 
    onProjectClick 
}) => (
    <motion.div
        className={`absolute ${isMobile || isTablet
                ? "top-3 sm:top-4 -right-3 sm:-right-4"
                : verticalRectangle
                    ? "top-12 sm:top-16 -right-12 sm:-right-16"
                    : "top-8 sm:top-10 -left-12 sm:-left-16"
            } z-40`}
        initial={{
            opacity: 1,
            scale: 1,
            x: (isMobile || isTablet) ? -150 : 0,
            y: (isMobile || isTablet) ? -5 : 0,
        }}
        animate={{
            opacity: 1,
            scale: showEffects ? 1.02 : 1,
            x: (isMobile || isTablet)
                ? (showEffects ? -120 : -200)
                : showEffects
                    ? (verticalRectangle ? 0 : -80)
                    : 0,
            y: (isMobile || isTablet)
                ? (showEffects ? 20 : 15)
                : showEffects
                    ? (verticalRectangle ? -80 : 0)
                    : 0,
        }}
        transition={{
            type: "spring",
            stiffness: (isMobile || isTablet) ? 200 : 150,
            damping: (isMobile || isTablet) ? 25 : 20,
            duration: (isMobile || isTablet) ? 0.3 : 0.4,
        }}
    >
        <motion.div
            className={`rounded-lg sm:rounded-xl bg-gradient-to-r from-white/30 to-white/20 border border-white/50 backdrop-blur-xl shadow-2xl shadow-white/10 ${isMobile
                    ? "w-[240px] h-[40px]"
                    : isTablet
                        ? "w-[260px] h-[45px]"
                        : "w-[340px] h-[60px]"
                } ${verticalRectangle && !isMobile && !isTablet ? "rotate-90" : ""}`}
            animate={{
                borderColor: showEffects ? "rgba(255, 117, 223, 0.6)" : "rgba(255, 255, 255, 0.5)",
                boxShadow: showEffects
                    ? "0 25px 50px -12px rgba(255, 117, 223, 0.25)"
                    : "0 25px 50px -12px rgba(255, 255, 255, 0.1)"
            }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onClick={onProjectClick}
        >
            <div className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between h-full`}>
                <ProjectFloatingButtonText showEffects={showEffects} isMobile={isMobile} isTablet={isTablet} />
                <ProjectFloatingButtonIcon showEffects={showEffects} isMobile={isMobile} isTablet={isTablet} />
            </div>
        </motion.div>
    </motion.div>
));

// Project Card Image Component
const ProjectCardImage = memo(({ project, showEffects, isMobile, imageLoaded, setImageLoaded }) => (
    <motion.div
        className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border border-white/20 backdrop-blur-sm"
        animate={{
            scale: showEffects ? (isMobile ? 1.01 : 1.02) : 1,
            borderColor: showEffects
                ? "rgba(255, 117, 223, 0.4)"
                : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.3 }}
    >
        <motion.img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover object-center transition-all duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            style={{
                filter: showEffects
                    ? "grayscale(0.2) saturate(1.1) brightness(1.1)"
                    : "grayscale(0.8) saturate(0.7) brightness(0.9)",
            }}
            animate={{
                scale: showEffects ? (isMobile ? 1.02 : 1.05) : 1,
            }}
            transition={{ duration: 0.3 }}
        />

        <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
                background: showEffects
                    ? "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(255,117,223,0.2) 50%, rgba(0,0,0,0.8) 100%)"
                    : "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
            }}
            transition={{ duration: 0.3 }}
        />
    </motion.div>
));

// Project Card Status Badge Component
const ProjectCardStatusBadge = memo(({ project, statusStyle, showEffects }) => (
    <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 right-3 sm:right-4 flex flex-col gap-2 z-30">
        <motion.div
            className="px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-white/30 self-end"
            style={{ backgroundColor: `${statusStyle.color}20` }}
            animate={{
                opacity: showEffects ? 1 : 0.8,
                scale: showEffects ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
        >
            <span
                className="text-xs sm:text-sm italic tracking-tight font-black flex items-center gap-1"
                style={{ color: statusStyle.color }}
            >
                <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: statusStyle.color }}
                />
                {project.status} | {project.year}
            </span>
        </motion.div>
    </div>
));

// Project Card Title Component
const ProjectCardTitle = memo(({ project, index, showEffects }) => (
    <motion.div
        className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-6 z-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.05 }}
    >
        <motion.span
            className="block text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tight leading-none pr-1"
            style={{
                textShadow: showEffects
                    ? "0 0 30px rgba(255, 117, 223, 0.5)"
                    : "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
        >
            {project.title}
        </motion.span>
    </motion.div>
));

// Project Floating Button Icon Component
const ProjectFloatingButtonIcon = memo(({ showEffects, isMobile, isTablet }) => (
    <AnimatePresence mode="wait">
        {showEffects && (
            <motion.div
                className={`ml-2 sm:ml-3 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0 ${isMobile ? "w-5 h-5" : isTablet ? "w-6 h-6" : "w-8 h-8"
                    }`}
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.15, rotate: 5 }}
            >
                <ExternalLink
                    className={`text-white ${isMobile ? "w-2.5 h-2.5" : isTablet ? "w-3 h-3" : "w-4 h-4"
                        }`}
                />
            </motion.div>
        )}
    </AnimatePresence>
));

// Project Floating Button Text Component
const ProjectFloatingButtonText = memo(({ showEffects, isMobile, isTablet }) => (
    <div className="flex-1">
        <AnimatePresence mode="wait">
            {showEffects && (
                <motion.span
                    className={`text-white italic tracking-tight font-black whitespace-nowrap ${isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg"
                        }`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                >
                    explore project
                </motion.span>
            )}
        </AnimatePresence>
    </div>
));

// Project Grid Container Component
const ProjectGridContainer = memo(({ projects, isMobile, isTablet, activeCard, onCardClick }) => (
    <ScrollAnimatedSection
        animationType="fadeUp"
        delay={0.2}
        className="w-full flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20 relative z-10"
    >
        <StaggerContainer
            staggerDelay={0.15}
            className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20"
        >
            {projects.map((project, idx) => (
                <ProjectGridItem
                    key={project.title}
                    project={project}
                    index={idx}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeCard={activeCard}
                    onCardClick={onCardClick}
                />
            ))}
        </StaggerContainer>
    </ScrollAnimatedSection>
));

// Project Grid Item Component
const ProjectGridItem = memo(({ project, index, isMobile, isTablet, activeCard, onCardClick }) => (
    <motion.div
        className={`
            ${isMobile || isTablet
                ? "w-full flex justify-center"
                : `flex ${index % 2 === 0
                    ? "justify-start ml-0 lg:ml-32"
                    : "justify-end mr-0 lg:mr-32"
                }`
            }
            ${!isMobile && !isTablet && index !== 0 ? "-mt-20 lg:-mt-28" : ""}
            relative
        `}
        style={{ zIndex: 10 - index }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut"
        }}
    >
        <ProjectNumberIndicator index={index} isMobile={isMobile} isTablet={isTablet} />
        <ProjectCard
            project={project}
            align={isMobile || isTablet ? "center" : index % 2 === 0 ? "start" : "end"}
            verticalRectangle={!isMobile && !isTablet && index % 2 === 1}
            index={index}
            isMobile={isMobile}
            isTablet={isTablet}
            isActive={activeCard === index}
            onClick={() => onCardClick(index)}
        />
    </motion.div>
));

// Project Number Indicator Component
const ProjectNumberIndicator = memo(({ index, isMobile, isTablet }) => (
    <>
        {!isMobile && !isTablet && (
            <motion.div
                className={`absolute ${index % 2 === 0
                    ? "-left-16 lg:-left-20 xl:-left-40"
                    : "-right-16 lg:-right-20 xl:-right-40"
                    } top-1/2 transform -translate-y-1/2`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
            >
                <span className="text-white/20 text-4xl lg:text-6xl xl:text-8xl font-black italic">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </motion.div>
        )}
    </>
));

// Project Tech Badge Component
const ProjectTechBadge = memo(({ tech, index }) => (
    <motion.span
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm tracking-tight font-normal text-white/80 bg-white/15 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/20 transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.1,
            delay: 0.1 + (index * 0.02)
        }}
        whileHover={{ scale: 1.05 }}
    >
        {tech}
    </motion.span>
));

// Statistics Section Component (Optional)
const StatisticsSection = memo(({ statistics }) => (
    <ScrollAnimatedSection
        animationType="fadeUp"
        delay={0.3}
        className="w-full flex justify-center mb-12 sm:mb-16 relative z-20"
    >
        <StaggerContainer
            staggerDelay={0.1}
            className="flex flex-wrap gap-6 sm:gap-8 justify-center"
        >
            {statistics.map((stat) => (
                <motion.div
                    key={stat.label}
                    className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <stat.icon className="w-4 h-4 text-[#ff75df]" />
                    <span className="text-white italic tracking-tight font-black text-sm">
                        {stat.value}
                    </span>
                    <span className="text-white/60 text-xs">{stat.label}</span>
                </motion.div>
            ))}
        </StaggerContainer>
    </ScrollAnimatedSection>
));

// ===== MAIN PROJECT CARD COMPONENT =====

const ProjectCard = memo(({
    project,
    align = "right",
    verticalRectangle = false,
    index,
    isMobile,
    isTablet,
    isActive,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    // For desktop, use hover state; for mobile, use the isActive prop
    const showEffects = isMobile || isTablet ? isActive : isHovered;

    const handleProjectClick = useCallback(() => {
        if (project.link && project.link !== "#") {
            navigate(project.link);
        }
    }, [project.link, navigate]);

    const getCardSize = useCallback(() => {
        if (isMobile) return "w-full h-auto aspect-square max-w-sm mx-auto";
        if (isTablet) return "w-[320px] h-[320px]";
        return "w-[380px] h-[380px]";
    }, [isMobile, isTablet]);

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(isMobile || isTablet) ? onClick : undefined}
        >
            <div className={`relative ${getCardSize()} cursor-pointer`} onClick={handleProjectClick}>
                <ProjectCardGlow showEffects={showEffects} />
                
                <ProjectCardImage 
                    project={project}
                    showEffects={showEffects}
                    isMobile={isMobile}
                    imageLoaded={imageLoaded}
                    setImageLoaded={setImageLoaded}
                />

                <ProjectCardStatusBadge 
                    project={project}
                    statusStyle={statusStyle}
                    showEffects={showEffects}
                />

                <ProjectCardFloatingButton
                    project={project}
                    showEffects={showEffects}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    verticalRectangle={verticalRectangle}
                    onProjectClick={handleProjectClick}
                />

                <ProjectCardDescription 
                    project={project}
                    showEffects={showEffects}
                />

                <ProjectCardTitle 
                    project={project}
                    index={index}
                    showEffects={showEffects}
                />

                <ProjectCardCornerAccents showEffects={showEffects} />
            </div>
        </motion.div>
    );
});

// ===== MAIN COMPONENT =====

/**
 * ProjectGrid Component
 * 
 * Component Tree Structure:
 * ProjectGrid
 * ├── BackgroundEffects
 * ├── PageHeader
 * ├── StatisticsSection (optional)
 * │   └── StatItem
 * ├── ProjectGridContainer
 * │   └── ProjectGridItem
 * │       ├── ProjectNumberIndicator
 * │       └── ProjectCard
 * │           ├── ProjectCardGlow
 * │           ├── ProjectCardImage
 * │           ├── ProjectCardStatusBadge
 * │           ├── ProjectCardFloatingButton
 * │           │   ├── ProjectFloatingButtonText
 * │           │   └── ProjectFloatingButtonIcon
 * │           ├── ProjectCardDescription
 * │           │   └── ProjectTechBadge
 * │           ├── ProjectCardTitle
 * │           └── ProjectCardCornerAccents
 * └── BottomDecoration
 */
function ProjectGrid() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);  // sm breakpoint
            setIsTablet(width >= 640 && width < 1024);  // sm to lg
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCardClick = useCallback(
        (index) => {
            if (!isMobile && !isTablet) return;
            setActiveCard(activeCard === index ? null : index);
        },
        [isMobile, isTablet, activeCard]
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
        <div id="projects" className="flex flex-col items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 relative">
            
            {/* Background Effects */}
            <BackgroundEffects />

            {/* Page Header */}
            <PageHeader />

            {/* Statistics Section (optional - uncomment if needed) */}
            {/* <StatisticsSection statistics={statistics} /> */}

            {/* Projects Grid */}
            <ProjectGridContainer 
                projects={projects}
                isMobile={isMobile}
                isTablet={isTablet}
                activeCard={activeCard}
                onCardClick={handleCardClick}
            />

            {/* Bottom Decoration */}
            <BottomDecoration />
        </div>
    );
}

export default memo(ProjectGrid);