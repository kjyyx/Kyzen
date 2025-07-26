import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2,
    Palette,
    Smartphone,
    Database,
    Coffee,
    Download,
    Heart,
    BookOpen,
    Music,
    Camera,
    Gamepad2,
    Plane,
    Mail,
    Github,
    Linkedin,
    MapPin,
    Calendar,
    Sparkles
} from 'lucide-react';

import ProfileImage from '../../assets/PROFILE-1.jpg';
import ResumePDF from '../../assets/KenjiJaculbia_Curriculum_Vitae.pdf';

// Static data moved outside component
const techStacks = [
    {
        category: "Frontend",
        icon: Code2,
        color: "#ff6b6b",
        bgGradient: "from-red-500/10 to-pink-500/10",
        skills: [
            { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
            { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
            { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "#DD0031" },
            { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" }
        ]
    },
    {
        category: "Backend",
        icon: Database,
        color: "#45b7d1",
        bgGradient: "from-blue-500/10 to-indigo-500/10",
        skills: [
            { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-plain.svg", color: "#512BD4" },
            { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", color: "#FF2D20" }
        ]
    },
    {
        category: "Database",
        icon: Database,
        color: "#4ecdc4",
        bgGradient: "from-teal-500/10 to-cyan-500/10",
        skills: [
            { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" },
            { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" }
        ]
    },
    {
        category: "DevOps & Tools",
        icon: Smartphone,
        color: "#f9ca24",
        bgGradient: "from-yellow-500/10 to-orange-500/10",
        skills: [
            { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
            { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#181717" },
            { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" }
        ]
    },
    {
        category: "API & Integration",
        icon: Code2,
        color: "#a855f7",
        bgGradient: "from-purple-500/10 to-violet-500/10",
        skills: [
            { name: "REST API", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", color: "#6DB33F" },
            { name: "Swagger", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg", color: "#85EA2D" },
            { name: "OpenAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-plain.svg", color: "#6BA539" }
        ]
    },
    {
        category: "Design & UX",
        icon: Palette,
        color: "#10b981",
        bgGradient: "from-green-500/10 to-emerald-500/10",
        skills: [
            { name: "Adobe XD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg", color: "#FF61F6" }
        ]
    }
];

const hobbies = [
    {
        name: "Photography",
        icon: Camera,
        emoji: "📸",
        color: "#60a5fa",
        gradient: "from-blue-500/30 to-cyan-500/30",
        border: "border-blue-400/40"
    },
    {
        name: "Music",
        icon: Music,
        emoji: "🎵",
        color: "#a855f7",
        gradient: "from-purple-500/30 to-pink-500/30",
        border: "border-purple-400/40"
    },
    {
        name: "Gaming",
        icon: Gamepad2,
        emoji: "🎮",
        color: "#10b981",
        gradient: "from-green-500/30 to-emerald-500/30",
        border: "border-green-400/40"
    },
    {
        name: "Travel",
        icon: Plane,
        emoji: "✈️",
        color: "#f97316",
        gradient: "from-orange-500/30 to-red-500/30",
        border: "border-orange-400/40"
    },
    {
        name: "Reading",
        icon: BookOpen,
        emoji: "📚",
        color: "#ef4444",
        gradient: "from-red-500/30 to-pink-500/30",
        border: "border-red-400/40"
    }
];

const currentTechSkills = [
    {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        color: '#61DAFB'
    },
    {
        name: 'Vite',
        icon: 'https://vitejs.dev/logo.svg',
        color: '#646CFF'
    },
    {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        color: '#06B6D4'
    },
    {
        name: 'Framer Motion',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
        color: '#BB6BD9'
    },
    {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        color: '#F7DF1E'
    }
];

const socialLinks = [
    {
        icon: Mail,
        href: "mailto:kpjaculbia@gmail.com",
        color: "#ff75df",
        label: "Email",
        hoverColor: "#ff8de6"
    },
    {
        icon: Github,
        href: "https://github.com",
        color: "#60a5fa",
        label: "GitHub",
        hoverColor: "#7db6fb"
    },
    {
        icon: Linkedin,
        href: "https://linkedin.com",
        color: "#10b981",
        label: "LinkedIn",
        hoverColor: "#34d399"
    }
];

// Memoized animation variants
const titleVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
};

const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

// Memoized components
const FloatingParticles = memo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            className="absolute w-2 h-2 bg-[#ff75df] rounded-full top-20 left-1/4"
            animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
            className="absolute w-1 h-1 bg-blue-400 rounded-full top-40 right-1/3"
            animate={{
                y: [0, -30, 0],
                opacity: [0.5, 1, 0.5],
                x: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
            className="absolute w-3 h-3 bg-purple-400 rounded-full bottom-32 left-1/3"
            animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.8, 0.2],
                rotate: [0, 180, 360]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
        <motion.div
            className="absolute w-1.5 h-1.5 bg-green-400 rounded-full top-1/2 left-1/6"
            animate={{
                y: [0, -15, 0],
                x: [0, 15, 0],
                opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
    </div>
));

const EnhancedAvatar = memo(() => (
    <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
    >
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#ff75df]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute inset-2 rounded-full border border-purple-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-[#ff75df]/20 to-purple-500/20 blur-xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.div
                className="absolute inset-4 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                    boxShadow: '0 0 50px rgba(255, 117, 223, 0.3)'
                }}
            >
                <img
                    src={ProfileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
    </motion.div>
));

const NameDisplay = memo(({ showRealName, onToggle }) => (
    <motion.div
        className="relative cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        onClick={onToggle}
    >
        <AnimatePresence mode="wait">
            {showRealName ? (
                <motion.h1
                    key="real"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-black tracking-tight text-transparent bg-gradient-to-r from-[#ff75df] via-purple-400 to-blue-400 bg-clip-text text-center"
                    initial={{ opacity: 0, y: 10, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -10, rotateX: 90 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    style={{
                        textShadow: '0 0 30px rgba(255, 117, 223, 0.5)'
                    }}
                >
                    Kenji Jaculbia
                </motion.h1>
            ) : (
                <motion.h1
                    key="dev"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-black text-white tracking-tight text-center"
                    initial={{ opacity: 0, y: 10, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -10, rotateX: 90 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                    }}
                >
                    Kyzen
                </motion.h1>
            )}
        </AnimatePresence>

        <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1 h-1 bg-white/40 rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity
                    }}
                />
            ))}
        </motion.div>
    </motion.div>
));

const ResumeButton = memo(() => {
    const handleDownload = useCallback(() => {
        window.open(ResumePDF, '_blank');
    }, []);

    return (
        <motion.button
            className="group relative px-8 py-5 bg-gradient-to-r from-[#ff75df] to-purple-500 text-black italic tracking-tight font-black rounded-3xl overflow-hidden shadow-lg"
            whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(255, 117, 223, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: "-150%" }}
                whileHover={{ x: "150%" }}
                transition={{ duration: 0.8 }}
            />

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.3,
                            repeat: Infinity
                        }}
                    />
                ))}
            </div>

            <div className="relative flex items-center justify-center gap-3">
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Download className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-lg text-white">Download Resume</span>
            </div>
        </motion.button>
    );
});

const SocialLink = memo(({ social, index }) => (
    <motion.a
        href={social.href}
        className="relative group w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.1 }}
    >
        <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md"
            style={{ backgroundColor: social.color }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <social.icon
                className="w-6 h-6 relative z-10 transition-colors duration-300"
                style={{ color: social.color }}
            />
        </motion.div>

        <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ color: social.color }}
        >
            {social.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
        </motion.div>
    </motion.a>
));

const CurrentTechSkills = memo(({ hoveredSkill, onHover, onLeave }) => (
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center lg:justify-start">
        {currentTechSkills.map((skill, index) => (
            <motion.div
                key={skill.name}
                className="relative group cursor-pointer flex flex-col items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, type: "spring" }}
                whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                onMouseEnter={() => onHover(skill.name)}
                onMouseLeave={onLeave}
            >
                <motion.div
                    className="absolute -inset-2 rounded-full opacity-0 blur-lg"
                    style={{ backgroundColor: skill.color }}
                    animate={{
                        opacity: hoveredSkill === skill.name ? 0.1 : 0,
                        scale: hoveredSkill === skill.name ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                />

                <motion.div
                    className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
                    animate={{
                        rotate: hoveredSkill === skill.name ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 object-contain"
                        style={{
                            filter: hoveredSkill === skill.name
                                ? 'brightness(1.1) saturate(1.1) drop-shadow(0 0 2px currentColor)'
                                : 'brightness(1) saturate(1)'
                        }}
                    />
                </motion.div>

                <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ color: skill.color }}
                >
                    {skill.name}
                </motion.div>
            </motion.div>
        ))}
    </div>
));

const TechStackCategory = memo(({ stack, index, isActive, onClick }) => (
    <motion.button
        className={`group relative flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl italic tracking-tight font-black text-sm sm:text-base md:text-lg transition-all duration-500 overflow-hidden ${isActive
            ? 'bg-gradient-to-r from-white/15 to-white/10 border-2 text-white shadow-2xl scale-105'
            : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
        style={{
            borderColor: isActive ? stack.color : 'rgba(255,255,255,0.1)',
            boxShadow: isActive ? `0 0 30px ${stack.color}40` : 'none'
        }}
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
    >
        <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: `linear-gradient(45deg, ${stack.color}20, transparent, ${stack.color}20)`,
                backgroundSize: '200% 200%'
            }}
            animate={{
                backgroundPosition: isActive ? ['0% 0%', '100% 100%'] : '0% 0%'
            }}
            transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
            className="relative z-10"
            animate={{
                rotate: isActive ? [0, 360] : 0,
                scale: isActive ? [1, 1.2, 1] : 1
            }}
            transition={{
                duration: isActive ? 2 : 0.3,
                repeat: isActive ? Infinity : 0
            }}
        >
            <stack.icon
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                style={{ color: isActive ? stack.color : 'currentColor' }}
            />
        </motion.div>

        <span className="relative z-10">{stack.category}</span>

        {isActive && (
            <motion.div
                className="absolute bottom-0 left-1/2 w-12 h-1 rounded-full"
                style={{ backgroundColor: stack.color }}
                initial={{ width: 0, x: '-50%' }}
                animate={{ width: '3rem', x: '-50%' }}
                transition={{ duration: 0.5 }}
            />
        )}
    </motion.button>
));

const SkillCard = memo(({ skill, index, isHovered, onHover, onLeave }) => (
    <motion.div
        className="group relative cursor-pointer"
        initial={{
            opacity: 0,
            scale: 0,
            rotateY: -90
        }}
        animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0
        }}
        transition={{
            delay: index * 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 100
        }}
        whileHover={{
            scale: 1.1,
            y: -8,
            rotateY: 10,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        onMouseEnter={() => onHover(skill.name)}
        onMouseLeave={onLeave}
    >
        <motion.div
            className="absolute -inset-6 rounded-3xl opacity-0 blur-xl"
            style={{ backgroundColor: skill.color }}
            animate={{
                opacity: isHovered ? 0.05 : 0,
                scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
        />

        <motion.div
            className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4 overflow-hidden"
            style={{
                borderColor: isHovered ? skill.color + '30' : 'rgba(255,255,255,0.2)'
            }}
        >
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at center, ${skill.color}05, transparent 70%)`
                }}
            />

            <motion.div
                className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center"
                animate={{
                    rotate: isHovered ? [0, 5, -5, 0] : 0
                }}
                transition={{ duration: 0.6 }}
            >
                <motion.img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain relative z-10"
                    style={{
                        filter: isHovered
                            ? 'brightness(1.2) saturate(1.3)'
                            : 'brightness(1) saturate(1)'
                    }}
                />

                <motion.div
                    className="absolute inset-0 rounded-full blur-lg"
                    style={{ backgroundColor: skill.color }}
                    animate={{
                        opacity: isHovered ? 0.15 : 0,
                        scale: isHovered ? 1.1 : 0.8
                    }}
                />
            </motion.div>

            <motion.div className="relative z-10 space-y-1 sm:space-y-2">
                <motion.h5
                    className="italic tracking-tight font-black text-sm sm:text-base md:text-lg"
                    style={{
                        color: isHovered ? skill.color : '#ffffff'
                    }}
                    animate={{
                        scale: isHovered ? 1.05 : 1
                    }}
                >
                    {skill.name}
                </motion.h5>
            </motion.div>

            {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                backgroundColor: skill.color,
                                left: `${20 + i * 15}%`,
                                top: `${20 + (i % 2) * 40}%`
                            }}
                            animate={{
                                y: [-10, -30, -10],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity
                            }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    </motion.div>
));

const HobbyCard = memo(({ hobby, index, isHovered, onHover, onLeave }) => (
    <motion.div
        className="group relative cursor-pointer"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15
        }}
        whileHover={{
            y: -5,
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        onMouseEnter={() => onHover(hobby.name)}
        onMouseLeave={onLeave}
    >
        <motion.div
            className={`absolute -inset-3 bg-gradient-to-r ${hobby.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500`}
            animate={{
                scale: isHovered ? [1, 1.05, 1] : 1,
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <div className={`relative flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-gradient-to-r ${hobby.gradient} backdrop-blur-lg border ${hobby.border} rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:shadow-xl`}>
            <motion.span
                className="text-lg sm:text-xl md:text-2xl"
                animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotate: isHovered ? [0, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
                {hobby.emoji}
            </motion.span>

            <motion.span
                className="italic tracking-tight font-black text-sm sm:text-base md:text-lg"
                style={{ color: hobby.color }}
                animate={{
                    x: isHovered ? 3 : 0,
                    color: isHovered ? '#ffffff' : hobby.color
                }}
                transition={{ duration: 0.3 }}
            >
                {hobby.name}
            </motion.span>

            {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: hobby.color }}
                            initial={{
                                x: '50%',
                                y: '50%',
                                opacity: 0
                            }}
                            animate={{
                                x: [20, 80, 20][i % 3] + '%',
                                y: [20, 80, 20][i % 3] + '%',
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                    background: isHovered
                        ? `linear-gradient(45deg, transparent, rgba(255, 117, 223, 0.1), transparent)`
                        : 'transparent'
                }}
                transition={{ duration: 0.3 }}
            />
        </div>
    </motion.div>
));

const AboutGrid = () => {
    const [hoveredHobby, setHoveredHobby] = useState(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const [showRealName, setShowRealName] = useState(false);

    // Memoized event handlers
    const handleNameToggle = useCallback(() => {
        setShowRealName(prev => !prev);
    }, []);

    const handleHobbyHover = useCallback((hobbyName) => {
        setHoveredHobby(hobbyName);
    }, []);

    const handleHobbyLeave = useCallback(() => {
        setHoveredHobby(null);
    }, []);

    const handleSkillHover = useCallback((skillName) => {
        setHoveredSkill(skillName);
    }, []);

    const handleSkillLeave = useCallback(() => {
        setHoveredSkill(null);
    }, []);

    const handleCategoryClick = useCallback((index) => {
        setActiveCategory(index);
    }, []);

    // Memoized current tech stack
    const currentTechStack = useMemo(() => techStacks[activeCategory], [activeCategory]);

    // Auto-cycle through tech categories
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCategory((prev) => (prev + 1) % techStacks.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Memoized social links
    const socialLinksElements = useMemo(() =>
        socialLinks.map((social, index) => (
            <SocialLink key={social.label} social={social} index={index} />
        )), []
    );

    // Memoized hobby cards
    const hobbyCards = useMemo(() =>
        hobbies.map((hobby, index) => (
            <HobbyCard
                key={hobby.name}
                hobby={hobby}
                index={index}
                isHovered={hoveredHobby === hobby.name}
                onHover={handleHobbyHover}
                onLeave={handleHobbyLeave}
            />
        )), [hoveredHobby, handleHobbyHover, handleHobbyLeave]
    );

    // Memoized tech stack categories
    const techStackCategories = useMemo(() =>
        techStacks.map((stack, index) => (
            <TechStackCategory
                key={stack.category}
                stack={stack}
                index={index}
                isActive={activeCategory === index}
                onClick={() => handleCategoryClick(index)}
            />
        )), [activeCategory, handleCategoryClick]
    );

    // Memoized skill cards
    const skillCards = useMemo(() =>
        currentTechStack.skills.map((skill, index) => (
            <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isHovered={hoveredSkill === skill.name}
                onHover={handleSkillHover}
                onLeave={handleSkillLeave}
            />
        )), [currentTechStack.skills, hoveredSkill, handleSkillHover, handleSkillLeave]
    );

    return (
        <div id="about" className="flex flex-col items-center py-8 sm:py-12 md:py-16 lg:py-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 relative">

            {/* Title */}
            <motion.div
                className="w-full flex justify-start mb-12 sm:mb-16 md:mb-20 lg:mb-28 relative z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="relative w-full">
                    <motion.h2
                        className="pl-2 text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-none italic tracking-tight text-left"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            textShadow: '0 0 40px rgba(255, 117, 223, 0.3)'
                        }}
                    >
                        About<span className="text-[#ff75df]">_</span>
                        <br />
                        me<span className="text-[#ff75df]">:</span>
                    </motion.h2>

                    {/* Enhanced underline with gradient */}
                    <motion.div
                        className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "10rem" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </motion.div>

            <motion.div
                className="w-full mb-16 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <FloatingParticles />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-start xl:items-center">

                    {/* Left Side - Enhanced Profile */}
                    <div className="flex flex-col items-center space-y-8">

                        <EnhancedAvatar />

                        {/* Enhanced Name & Title */}
                        <motion.div
                            className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-md mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <NameDisplay showRealName={showRealName} onToggle={handleNameToggle} />
                        
                            <motion.div
                                className="space-y-3 sm:space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {/* Job Title with Responsive Typography */}
                                <motion.div 
                                    className="relative"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-medium tracking-wide">
                                        Full-Stack Web Developer
                                    </p>
                                    
                                    {/* Subtle underline accent */}
                                    <motion.div
                                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: "60%" }}
                                        transition={{ duration: 0.8, delay: 0.9 }}
                                    />
                                </motion.div>
                        
                                {/* Tagline with Enhanced Animation */}
                                <motion.div className="relative">
                                    <motion.p
                                        className="text-sm sm:text-base md:text-lg text-[#ff75df]/80 font-medium italic tracking-wide"
                                        animate={{
                                            opacity: [0.6, 1, 0.6]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        Building the future, one line at a time
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        
                            {/* Interactive Hint - Improved Design */}
                            <motion.div
                                className="flex items-center justify-center gap-2 text-white/40 text-xs sm:text-sm mt-6 sm:mt-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <motion.div
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                                    animate={{ 
                                        scale: [1, 1.02, 1],
                                        borderColor: ["rgba(255,255,255,0.1)", "rgba(255,117,223,0.2)", "rgba(255,255,255,0.1)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <motion.div
                                        animate={{ 
                                            y: [0, -2, 0],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        👆
                                    </motion.div>
                                    <span className="font-medium">Click name to toggle</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Action Buttons */}
                        <motion.div
                            className="flex flex-col gap-6 w-full max-w-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <ResumeButton />

                            <div className="flex gap-4 justify-center">
                                {socialLinksElements}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Enhanced Story */}
                    <div className="space-y-10">

                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <motion.h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic tracking-tight font-black text-white leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Crafting Digital
                                <motion.span
                                    className="block text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    style={{
                                        backgroundSize: '200% 200%'
                                    }}
                                >
                                    Experiences
                                </motion.span>
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.p
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                I'm a passionate web developer from the Philippines who transforms creative ideas into
                                <motion.span
                                    className="text-[#ff75df] italic tracking-tight font-black"
                                    whileHover={{ scale: 1.05 }}
                                    style={{ cursor: 'default' }}
                                >  stunning digital realities</motion.span>.
                                My journey started with curiosity and has evolved into a deep expertise in modern web technologies.
                            </motion.p>

                            <motion.div
                                className="pt-6 space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <motion.h3
                                    className="text-white italic tracking-tight font-black text-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    Currently working with:
                                </motion.h3>
                                <CurrentTechSkills
                                    hoveredSkill={hoveredSkill}
                                    onHover={handleSkillHover}
                                    onLeave={handleSkillLeave}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Enhanced Tech Arsenal Section */}
            <motion.div
                className="w-full mb-16 space-y-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div id="skills" className="text-center space-y-6">
                    <motion.div
                        className="flex items-center justify-center gap-6 mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#ff75df]/50" />
                        <motion.div
                            className="relative p-5 rounded-3xl bg-gradient-to-br from-[#ff75df]/30 to-purple-500/30 border border-[#ff75df]/40 backdrop-blur-sm"
                            animate={{
                                rotateY: [0, 180, 360],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                        >
                            <Code2 className="w-10 h-10 text-[#ff75df]" />
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </motion.div>
                        <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#ff75df]/50" />
                    </motion.div>

                    <motion.h3
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic tracking-tight font-black text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        TECH STACK
                    </motion.h3>

                    <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        Mastering modern technologies to build exceptional digital experiences
                    </motion.p>
                </div>

                <motion.div
                    className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mb-8 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {techStackCategories}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="relative"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 overflow-hidden rounded-3xl max-w-4xl mx-auto">
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${currentTechStack.bgGradient} opacity-20 blur-2xl`}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full"
                                style={{
                                    background: `radial-gradient(circle at 20% 50%, ${currentTechStack.color}15, transparent 50%), radial-gradient(circle at 80% 50%, ${currentTechStack.color}10, transparent 50%)`
                                }}
                                animate={{
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </div>

                        <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12 overflow-hidden max-w-4xl mx-auto">

                            <motion.div
                                className="flex items-center justify-between mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 15,
                                            boxShadow: `0 0 25px ${currentTechStack.color}60`
                                        }}
                                    >
                                        <currentTechStack.icon
                                            className="w-8 h-8"
                                            style={{ color: currentTechStack.color }}
                                        />
                                    </motion.div>
                                    <div>
                                        <h4
                                            className="text-3xl italic tracking-tight font-black"
                                            style={{ color: currentTechStack.color }}
                                        >
                                            {currentTechStack.category}
                                        </h4>
                                        <p className="text-white/60 text-sm">
                                            {currentTechStack.skills.length} technologies mastered
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                {skillCards}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    className="flex justify-center items-center gap-3 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    {techStacks.map((_, index) => (
                        <motion.div
                            key={index}
                            className="relative cursor-pointer"
                            onClick={() => handleCategoryClick(index)}
                            whileHover={{ scale: 1.2 }}
                        >
                            <div
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCategory === index ? 'bg-white scale-125' : 'bg-white/30'
                                    }`}
                                style={{
                                    backgroundColor: activeCategory === index ? currentTechStack.color : 'rgba(255,255,255,0.3)'
                                }}
                            />
                            {activeCategory === index && (
                                <motion.div
                                    className="absolute inset-0 rounded-full blur-md"
                                    style={{ backgroundColor: currentTechStack.color }}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Hobbies Section */}
            <motion.div
                className="w-full space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="flex items-center gap-4 mb-8">
                    <motion.div
                        className="p-4 rounded-full bg-gradient-to-r from-[#ff75df]/20 to-orange-500/20 border border-[#ff75df]/30"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Coffee className="w-7 h-7 text-[#ff75df]" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic tracking-tight font-black text-white">WHEN I'M NOT CODING</h3>
                    <motion.div
                        className="flex-1 h-px bg-gradient-to-r from-[#ff75df]/50 to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    />
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center">
                    {hobbyCards}
                </div>
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
};

export default memo(AboutGrid);