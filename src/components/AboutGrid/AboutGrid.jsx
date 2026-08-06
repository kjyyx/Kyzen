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
    Bus,
    Plane,
    Mail,
    Github,
    Linkedin
} from 'lucide-react';

import ProfileImage from '../../assets/PROFILE-3.webp';
import ResumePDF from '../../assets/Kenji_Jaculbia_CV_v6.pdf';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';

import { 
    getAnimationConfig, 
    canAnimate
} from '../../utils/helpers';
import { 
    EASING, 
    PERFORMANCE 
} from '../../utils/constants';

// Static data moved outside component
const techStacks = [
    {
        category: "Languages",
        icon: Code2,
        color: "#028582",
        bgGradient: "from-brand/10 to-brand-light/10",
        skills: [
            { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
            { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
            { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
            { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "#777BB4" },
            { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" }
        ]
    },
    {
        category: "Front-End",
        icon: Code2,
        color: "#06B6D4",
        bgGradient: "from-cyan-500/10 to-brand-light/10",
        skills: [
            { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "#DD0031" },
            { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
            { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
            { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#FFFFFF" },
            { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
            { name: "Nativewind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#38BDF8" },
            { name: "Elementor", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/elementor.svg", color: "#92003B" }
        ]
    },
    {
        category: "Back-End & APIs",
        icon: Database,
        color: "#45B7D1",
        bgGradient: "from-blue-500/10 to-brand/10",
        skills: [
            { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", color: "#FF2D20" },
            { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
            { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#FFFFFF" },
            { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", color: "#512BD4" },
            { name: "REST APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg", color: "#85EA2D" },
            { name: "JWT Auth", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/jsonwebtokens.svg", color: "#D63AFF" },
            { name: "WebSocket", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/socketdotio.svg", color: "#FFFFFF" }
        ]
    },
    {
        category: "Databases",
        icon: Database,
        color: "#4ECDC4",
        bgGradient: "from-teal-500/10 to-cyan-500/10",
        skills: [
            { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" },
            { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
            { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", color: "#3ECF8E" }
        ]
    },
    {
        category: "Cloud & DevOps",
        icon: Smartphone,
        color: "#FBFF00",
        bgGradient: "from-accent/10 to-brand-light/10",
        skills: [
            { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" },
            { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
            { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#181717" },
            { name: "SiteGround", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/siteground.svg", color: "#8CC63F" },
            { name: "Hostinger", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/hostinger.svg", color: "#673DE6" },
            { name: "cPanel", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cpanel.svg", color: "#FF6C2C" },
            { name: "Crazy Domains", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", color: "#F59E0B" }
        ]
    },
    {
        category: "CMS & E-Commerce",
        icon: Code2,
        color: "#21759B",
        bgGradient: "from-brand/10 to-cyan-500/10",
        skills: [
            { name: "WordPress FSE", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", color: "#21759B" },
            { name: "Block Themes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", color: "#028582" },
            { name: "ACF", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/advancedcustomfields.svg", color: "#00D084" }
        ]
    },
    {
        category: "Automation",
        icon: Palette,
        color: "#10B981",
        bgGradient: "from-green-500/10 to-brand-light/10",
        skills: [
            { name: "GoHighLevel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", color: "#38BDF8" },
            { name: "Webhooks", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg", color: "#85EA2D" },
            { name: "DNS Config", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cloudflare.svg", color: "#F38020" },
            { name: "SPF / DKIM / MX", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", color: "#4285F4" }
        ]
    },
    {
        category: "Performance & SEO",
        icon: Palette,
        color: "#22C55E",
        bgGradient: "from-green-500/10 to-cyan-500/10",
        skills: [
            { name: "PageSpeed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", color: "#4285F4" },
            { name: "Core Web Vitals", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg", color: "#4285F4" },
            { name: "LCP Optimization", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg", color: "#22C55E" },
            { name: "Image Optimization", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", color: "#34A853" }
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
        color: "#028582",
        gradient: "from-brand/30 to-brand-light/30",
        border: "border-brand-light/40"
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
        icon: Bus,
        emoji: "🚌",
        color: "#f97316",
        gradient: "from-orange-500/30 to-red-500/30",
        border: "border-orange-400/40"
    },
    {
        name: "Reading",
        icon: BookOpen,
        emoji: "📚",
        color: "#ef4444",
        gradient: "from-red-500/30 to-brand-light/30",
        border: "border-red-400/40"
    }
];

// const profileMeta = [
//     { label: 'Role', value: 'Junior Web Developer' },
//     { label: 'Base', value: 'Philippines' },
//     { label: 'Focus', value: 'WordPress / React / Web Systems' }
// ];

// REDESIGN: Shorter, punchier one-liners for each principle
const workingPrinciples = [
    {
        number: '01',
        title: 'Clarity first',
        body: 'Every section earns its place.'
    },
    {
        number: '02',
        title: 'Character with control',
        body: 'Expressive, never heavy.'
    },
    {
        number: '03',
        title: 'Built past the mockup',
        body: 'Survives real content.'
    }
];

const socialLinks = [
    {
        icon: Mail,
        href: "mailto:kpjaculbia@gmail.com",
        color: "#ea4335",
        label: "Email",
        hoverColor: "#ff8de6"
    },
    {
        icon: Github,
        href: "https://github.com/kjyyx",
        color: "#333",
        label: "GitHub",
        hoverColor: "#7db6fb"
    },
    {
        icon: Linkedin,
        href: "https://www.linkedin.com/in/kenji-jaculbia-9b048a314",
        color: "#0a66c2",
        label: "LinkedIn",
        hoverColor: "#34d399"
    }
];

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// REDESIGN: Principle card — compact pill layout, number + title + one-liner
const PrincipleRow = memo(({ number, title, body }) => (
    <motion.div
        className="rounded-2xl border border-border-brand bg-surface/55 p-4 sm:p-5 transition-colors duration-200 hover:border-border-brand-strong hover:bg-surface-hover/35"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: EASING.smooth }}
    >
        <span className="mb-3 block font-mono text-[11px] tracking-[0.16em] text-accent">
            {number}
        </span>
        <h3 className="mb-1.5 font-display-black-italic text-base sm:text-lg text-display leading-tight">
            {title}
        </h3>
        <p className="font-display-medium text-xs sm:text-sm leading-relaxed text-foreground-secondary">
            {body}
        </p>
    </motion.div>
));

// Enhanced Avatar Component
const EnhancedAvatar = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const avatarVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { duration: 0.4, delay: 0.3 }
                }
            };
        }
        
        return {
            initial: { y: 18, opacity: 0 },
            animate: { 
                y: 0,
                opacity: 1,
                transition: { 
                    duration: 0.55,
                    ease: EASING.smooth,
                    delay: 0.3 
                }
            }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="relative w-full max-w-[250px] sm:max-w-[280px] mx-auto"
            {...avatarVariants}
        >
            <div className="absolute -inset-3 rounded-[1.75rem] border border-brand-light/10" />
            <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border-brand bg-surface shadow-[0_22px_70px_rgba(1,20,23,0.36)]"
                whileHover={animationConfig.reduce ? {} : { y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-light/12 via-transparent to-brand/10" />
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-border-brand bg-canvas/70 px-3 py-1 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                        Available
                    </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-canvas/80 via-canvas/20 to-transparent" />
                <div className="relative h-full w-full p-3">
                    <img
                        src={ProfileImage}
                        alt="Kyzen portrait"
                        className="h-full w-full rounded-[1.25rem] object-cover object-top"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
});

// Floating Particles Background Component
const FloatingParticles = memo(() => {
    const animationConfig = getAnimationConfig();
    const particles = useMemo(() => [
        { id: 1, size: 'w-2 h-2', color: 'bg-brand-light', top: 'top-20', left: 'left-1/4', duration: 3 },
        { id: 2, size: 'w-1 h-1', color: 'bg-blue-400', top: 'top-40', left: 'right-1/3', duration: 4, delay: 1 },
        { id: 3, size: 'w-3 h-3', color: 'bg-brand-light', top: 'bottom-32', left: 'left-1/3', duration: 5, delay: 2 },
        { id: 4, size: 'w-1.5 h-1.5', color: 'bg-green-400', top: 'top-1/2', left: 'left-1/6', duration: 6, delay: 3 }
    ], []);
    
    if (!canAnimate() || animationConfig.reduce) {
        return null;
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute ${particle.size} ${particle.color} rounded-full ${particle.top} ${particle.left}`}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        duration: particle.duration, 
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: particle.delay || 0
                    }}
                />
            ))}
        </div>
    );
});

// Hero Section Title Component
const HeroTitle = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeDown"
        delay={0.2}
        className="w-full flex justify-start mb-8 sm:mb-10 md:mb-12 lg:mb-16 relative z-10"
    >
        <div className="relative w-full">
            <h2 className="pl-2 text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-3xl sm:text-4xl md:text-5xl font-display-black-italic leading-tight sm:leading-none text-left">
                About<span className="text-brand-light">_</span>
                <br />
                me<span className="text-brand-light">:</span>
            </h2>
            <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-brand-light via-brand-light to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "10rem" }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </div>
    </ScrollAnimatedSection>
));

// Hobby Card Component
const HobbyCard = memo(({ hobby, index, isHovered, onHover, onLeave }) => {
    const animationConfig = getAnimationConfig();
    
    const cardVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { delay: index * 0.05 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, y: 20, scale: 0.9 },
            animate: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                    delay: index * 0.1,
                    type: "tween",
                    stiffness: 100,
                    damping: 15
                }
            }
        };
    }, [animationConfig.reduce, index]);

    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.02 };
        }
        
        return {
            y: -5,
            scale: 1.01,
            transition: { type: "tween", stiffness: 300, damping: 20 }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="group relative cursor-pointer"
            {...cardVariants}
            whileHover={hoverVariants}
            onMouseEnter={() => onHover(hobby.name)}
            onMouseLeave={onLeave}
        >
            {!animationConfig.reduce && (
                <motion.div
                    className={`absolute -inset-3 bg-gradient-to-r ${hobby.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    animate={{
                        scale: isHovered ? [1, 1.05, 1] : 1,
                        opacity: isHovered ? [0.5, 0.8, 0.5] : 0
                    }}
                    transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />
            )}

            <div className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r ${hobby.gradient} backdrop-blur-lg border ${hobby.border} rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:shadow-xl`}>
                <motion.span
                    className="text-base sm:text-lg md:text-2xl"
                    animate={!animationConfig.reduce && isHovered ? {
                        scale: [1, 1.2, 1],
                        rotate: 0
                    } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, repeat: isHovered && !animationConfig.reduce ? Infinity : 0 }}
                >
                    {hobby.emoji}
                </motion.span>

                <motion.span
                    className="font-display-black-italic text-sm sm:text-base md:text-lg"
                    style={{ color: hobby.color }}
                    animate={{
                        x: isHovered ? 3 : 0,
                        color: isHovered && !animationConfig.reduce ? '#ffffff' : hobby.color
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {hobby.name}
                </motion.span>

                {isHovered && !animationConfig.reduce && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: hobby.color }}
                                initial={{ x: '50%', y: '50%', opacity: 0 }}
                                animate={{
                                    x: [20, 80, 20][i % 3] + '%',
                                    y: [20, 80, 20][i % 3] + '%',
                                    opacity: [0, 0.8, 0]
                                }}
                                transition={{ duration: 1.5, delay: i * 0.2, repeat: 0 }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
});

// Hobbies Section Component
const HobbiesSection = memo(({ hoveredHobby, onHobbyHover, onHobbyLeave }) => {
    const hobbyCards = useMemo(() =>
        hobbies.map((hobby, index) => (
            <HobbyCard
                key={hobby.name}
                hobby={hobby}
                index={index}
                isHovered={hoveredHobby === hobby.name}
                onHover={onHobbyHover}
                onLeave={onHobbyLeave}
            />
        )), [hoveredHobby, onHobbyHover, onHobbyLeave]
    );

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={0.3}
            className="w-full space-y-5 sm:space-y-6"
        >
            <div className="flex items-center gap-4 mb-8">
                <motion.div
                    className="p-4 rounded-full bg-gradient-to-r from-brand-light/20 to-orange-500/20 border border-brand-light/30"
                    animate={{ rotate: 0 }}
                    transition={{ duration: 4, repeat: 0 }}
                >
                    <Coffee className="w-6 h-6 text-brand-light" />
                </motion.div>
                <h3 className="text-base sm:text-lg font-display-black-italic text-display">WHEN I'M NOT CODING</h3>
                <motion.div
                    className="flex-1 h-px bg-gradient-to-r from-brand-light/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                />
            </div>

            <StaggerContainer
                staggerDelay={0.12}
                className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center"
            >
                {hobbyCards}
            </StaggerContainer>
        </ScrollAnimatedSection>
    );
});

// Name Display Component
const NameDisplay = memo(() => (
    <div className="space-y-2 text-left">
        <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                Personal profile
            </span>
        </div>
        <h3 className="font-display-black-italic text-3xl sm:text-4xl text-display leading-none">
            Kenji Jaculbia
        </h3>
        <p className="font-display-black-italic text-sm sm:text-base text-foreground-secondary">
            Junior Web Developer
        </p>
    </div>
));

// Profile Content Component
const ProfileContent = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeRight"
        delay={0.3}
        className="h-full"
    >
        <motion.div
            className="relative h-full overflow-hidden rounded-3xl border border-border-brand bg-surface/85 p-5 sm:p-6 md:p-7 shadow-[0_24px_80px_rgba(1,20,23,0.28)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="absolute left-0 top-0 h-1 w-24 bg-gradient-to-r from-brand-light to-transparent" />
            <div className="mb-6">
                <EnhancedAvatar />
            </div>
            <NameDisplay />

            {/* <motion.div
                className="mt-6 grid gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                {profileMeta.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border-brand/70 bg-canvas/35 px-4 py-3"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                            {item.label}
                        </span>
                        <span className="text-right font-display-medium text-sm text-foreground-secondary">
                            {item.value}
                        </span>
                    </div>
                ))}
            </motion.div> */}

            <motion.div
                className="mt-6 flex flex-col gap-4 sm:gap-5 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <ResumeButton />
                <SocialLinksGroup />
            </motion.div>
        </motion.div>
    </ScrollAnimatedSection>
));

// REDESIGN: Profile Story — headline + 3 compact pillar cards + status bar anchored at bottom
const ProfileStory = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeLeft"
        delay={0.4}
        className="h-full flex items-center"
    >
        <div className="relative w-full max-w-[760px] mx-auto rounded-3xl p-1 sm:p-2 flex flex-col justify-center gap-6">

            {/* Top: tag + headline */}
            <div>
                <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                        Working philosophy
                    </span>
                </div>
                <h2 className="max-w-2xl font-display-black-italic text-3xl sm:text-4xl lg:text-5xl text-display leading-[1.02]">
                    I build sites that balance
                    <span className="block font-display-black-italic text-transparent bg-gradient-to-r from-brand-light via-brand-light to-brand bg-clip-text">
                        clarity, character, and execution.
                    </span>
                </h2>
            </div>

            {/* Middle: 3 compact principle cards, side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {workingPrinciples.map((principle) => (
                    <PrincipleRow
                        key={principle.title}
                        number={principle.number}
                        title={principle.title}
                        body={principle.body}
                    />
                ))}
            </div>

            {/* Bottom: status bar anchored */}
            <motion.div
                className="grid gap-3 rounded-2xl border border-border-brand bg-surface/60 px-4 py-4 sm:grid-cols-[auto_1fr] sm:items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-brand bg-canvas/55 text-accent">
                        <Code2 className="h-4 w-4" />
                    </span>
                    <span className="font-display-medium text-sm text-brand-light leading-tight">
                        Currently<br />building:
                    </span>
                </div>
                <p className="font-display-medium text-sm sm:text-base text-foreground-secondary">
                    WordPress systems / React experiences / CRM-integrated websites
                </p>
            </motion.div>

        </div>
    </ScrollAnimatedSection>
));

// Resume Button Component
const ResumeButton = memo(() => {
    const handleDownload = useCallback(() => {
        window.open(ResumePDF, '_blank');
    }, []);

    return (
        <motion.button
            className="group relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white to-white/95 text-foreground-dark font-display-medium transition-all duration-300 overflow-hidden text-xs sm:text-sm"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
                <motion.div animate={{ rotate: 0 }} transition={{ duration: 2, repeat: 0 }}>
                    <Download className="w-4 h-4 text-foreground-dark group-hover:-translate-y-px transition-transform duration-200" />
                </motion.div>
                <span className="font-display-black-italic">Download Resume</span>
            </div>
        </motion.button>
    );
});

// Section Divider Component
const SectionDivider = memo(() => (
    <ScrollAnimatedSection
        animationType="scale"
        delay={0.2}
        className="w-full mt-12 sm:mt-20 flex justify-center"
    >
        <div className="w-64 h-px bg-gradient-to-r from-transparent via-brand-light/50 to-transparent" />
    </ScrollAnimatedSection>
));

// Skill Card Component
const SkillCard = memo(({ skill, index, isHovered, onHover, onLeave }) => {
    const animationConfig = getAnimationConfig();
    
    const cardVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { delay: index * 0.05 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, scale: 0, rotateY: -90 },
            animate: {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                transition: {
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "tween",
                    stiffness: 100
                }
            }
        };
    }, [animationConfig.reduce, index]);

    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) return { scale: 1.01 };
        return {
            scale: 1.01,
            y: -2,
            rotateY: 10,
            transition: { type: "tween", stiffness: 300, damping: 20 }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="group relative cursor-pointer"
            {...cardVariants}
            whileHover={hoverVariants}
            onMouseEnter={() => onHover(skill.name)}
            onMouseLeave={onLeave}
        >
            {!animationConfig.reduce && (
                <motion.div
                    className="absolute -inset-4 rounded-2xl opacity-0 blur-xl"
                    style={{ backgroundColor: skill.color }}
                    animate={{
                        opacity: isHovered ? 0.05 : 0,
                        scale: isHovered ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                />
            )}

            <motion.div
                className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center text-center space-y-2 sm:space-y-3 overflow-hidden"
                style={{
                    borderColor: isHovered ? skill.color + '30' : 'rgba(255,255,255,0.2)'
                }}
            >
                <motion.div
                    className="relative w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center"
                    animate={!animationConfig.reduce && isHovered ? { rotate: 0 } : { rotate: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain relative z-10"
                        style={{
                            filter: isHovered && !animationConfig.reduce
                                ? 'brightness(1.2) saturate(1.3)'
                                : 'brightness(1) saturate(1)'
                        }}
                    />
                    {!animationConfig.reduce && (
                        <motion.div
                            className="absolute inset-0 rounded-full blur-lg"
                            style={{ backgroundColor: skill.color }}
                            animate={{
                                opacity: isHovered ? 0.15 : 0,
                                scale: isHovered ? 1.1 : 0.8
                            }}
                        />
                    )}
                </motion.div>

                <motion.div className="relative z-10 space-y-1 sm:space-y-2">
                    <motion.h5
                        className="font-display-black-italic text-sm sm:text-base md:text-lg"
                        style={{ color: isHovered ? skill.color : '#ffffff' }}
                        animate={{ scale: isHovered && !animationConfig.reduce ? 1.05 : 1 }}
                    >
                        {skill.name}
                    </motion.h5>
                </motion.div>

                {isHovered && !animationConfig.reduce && (
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
                                animate={{ y: [-10, -30, -10], opacity: [0, 1, 0], scale: [0, 1, 0] }}
                                transition={{ duration: 2, delay: i * 0.2, repeat: 0 }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
});

// Social Link Component
const SocialLink = memo(({ social, index }) => (
    <motion.a
        href={social.href}
        className="relative group w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm transition-all duration-300"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.1 }}
    >
        <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md"
            style={{ backgroundColor: social.color }}
            animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: 0 }}
        />
        <motion.div whileHover={{ y: -1, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <social.icon
                className="w-5 h-5 relative z-10 transition-colors duration-300"
                style={{ color: social.color }}
            />
        </motion.div>
        <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-display text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ color: social.color }}
        >
            {social.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
        </motion.div>
    </motion.a>
));

// Social Links Group Component
const SocialLinksGroup = memo(() => {
    const socialLinksElements = useMemo(() =>
        socialLinks.map((social, index) => (
            <SocialLink key={social.label} social={social} index={index} />
        )), []
    );

    return (
        <div className="flex gap-4 justify-center">
            {socialLinksElements}
        </div>
    );
});

// Tech Stack Category Component
const TechStackCategory = memo(({ stack, isActive, onClick }) => (
    <motion.button
        className={`group relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl font-display-black-italic text-xs sm:text-sm md:text-base transition-all duration-500 overflow-hidden ${isActive
            ? 'bg-gradient-to-r from-white/15 to-white/10 border-2 text-display shadow-lg scale-105'
            : 'bg-white/5 border border-white/10 text-foreground-muted hover:bg-white/10 hover:text-foreground-secondary/90'
        }`}
        style={{
            borderColor: isActive ? stack.color : 'rgba(255,255,255,0.1)',
            boxShadow: isActive ? `0 0 30px ${stack.color}40` : 'none'
        }}
        onClick={onClick}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
    >
        <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: `linear-gradient(45deg, ${stack.color}20, transparent, ${stack.color}20)`,
                backgroundSize: '200% 200%'
            }}
            animate={{ backgroundPosition: isActive ? ['0% 0%', '100% 100%'] : '0% 0%' }}
            transition={{ duration: 3, repeat: 0 }}
        />
        <motion.div
            className="relative z-10"
            animate={{ rotate: isActive ? [0, 360] : 0, scale: isActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: isActive ? 2 : 0.3, repeat: isActive ? Infinity : 0 }}
        >
            <stack.icon
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5"
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

// Tech Stack Section Component
const TechStackSection = memo(({
    activeCategory,
    onCategoryClick,
    currentTechStack,
    hoveredSkill,
    onSkillHover,
    onSkillLeave
}) => {
    const techStackCategories = useMemo(() =>
        techStacks.map((stack, index) => (
            <TechStackCategory
                key={stack.category}
                stack={stack}
                index={index}
                isActive={activeCategory === index}
                onClick={() => onCategoryClick(index)}
            />
        )), [activeCategory, onCategoryClick]
    );

    const skillCards = useMemo(() =>
        currentTechStack.skills.map((skill, index) => (
            <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isHovered={hoveredSkill === skill.name}
                onHover={onSkillHover}
                onLeave={onSkillLeave}
            />
        )), [currentTechStack.skills, hoveredSkill, onSkillHover, onSkillLeave]
    );

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={0.2}
            className="w-full mb-10 sm:mb-12 space-y-10 sm:space-y-12"
            id="skills"
        >
            <div className="text-center space-y-6">
                <motion.div
                    className="flex items-center justify-center gap-4 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent to-brand-light/50" />
                    <motion.div
                        className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-brand-light/30 to-brand/30 border border-brand-light/40 backdrop-blur-sm"
                        animate={{ rotateY: [0, 180, 360], scale: [1, 1.05, 1] }}
                        transition={{ duration: 6, repeat: 0 }}
                    >
                        <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-brand-light" />
                        <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-light/20 to-brand/20 blur-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: 0 }}
                        />
                    </motion.div>
                    <div className="w-16 sm:w-20 h-px bg-gradient-to-l from-transparent to-brand-light/50" />
                </motion.div>

                <motion.h3
                    className="text-xl sm:text-2xl md:text-3xl font-display-black-italic text-transparent bg-gradient-to-r from-white via-brand-light to-brand-light bg-clip-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    TECH STACK
                </motion.h3>

                <motion.p
                    className="text-sm sm:text-base text-foreground-secondary/80 max-w-2xl mx-auto px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    Mastering modern technologies to build exceptional digital experiences
                </motion.p>
            </div>

            <StaggerContainer
                staggerDelay={0.1}
                className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 md:mb-10"
            >
                {techStackCategories}
            </StaggerContainer>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    className="relative"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 overflow-hidden rounded-2xl max-w-4xl mx-auto">
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${currentTechStack.bgGradient} opacity-20 blur-2xl`}
                            animate={{ scale: [1, 1.1, 1], rotate: 0 }}
                            transition={{ duration: 8, repeat: 0 }}
                        />
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background: `radial-gradient(circle at 20% 50%, ${currentTechStack.color}15, transparent 50%), radial-gradient(circle at 80% 50%, ${currentTechStack.color}10, transparent 50%)`
                            }}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: 0 }}
                        />
                    </div>

                    <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-5 sm:p-6 md:p-5 sm:p-6 overflow-hidden max-w-4xl mx-auto">
                        <motion.div
                            className="flex items-center justify-between mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="p-3 rounded-xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -2,
                                        boxShadow: `0 0 25px ${currentTechStack.color}60`
                                    }}
                                >
                                    <currentTechStack.icon
                                        className="w-6 h-6"
                                        style={{ color: currentTechStack.color }}
                                    />
                                </motion.div>
                                <div>
                                    <h4
                                        className="text-xl sm:text-2xl font-display-black-italic"
                                        style={{ color: currentTechStack.color }}
                                    >
                                        {currentTechStack.category}
                                    </h4>
                                    <p className="text-foreground-muted text-sm">
                                        {currentTechStack.skills.length} technologies mastered
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <StaggerContainer
                            staggerDelay={0.08}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
                        >
                            {skillCards}
                        </StaggerContainer>
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
                        onClick={() => onCategoryClick(index)}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCategory === index ? 'bg-white scale-125' : 'bg-white/30'}`}
                            style={{
                                backgroundColor: activeCategory === index ? currentTechStack.color : 'rgba(255,255,255,0.3)'
                            }}
                        />
                        {activeCategory === index && (
                            <motion.div
                                className="absolute inset-0 rounded-full blur-md"
                                style={{ backgroundColor: currentTechStack.color }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: 0 }}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </ScrollAnimatedSection>
    );
});

// ===== MAIN COMPONENT =====

const AboutGrid = () => {
    const [hoveredHobby, setHoveredHobby] = useState(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [activeCategory, setActiveCategory] = useState(0);

    const handleHobbyHover = useCallback((hobbyName) => setHoveredHobby(hobbyName), []);
    const handleHobbyLeave = useCallback(() => setHoveredHobby(null), []);
    const handleSkillHover = useCallback((skillName) => setHoveredSkill(skillName), []);
    const handleSkillLeave = useCallback(() => setHoveredSkill(null), []);
    const handleCategoryClick = useCallback((index) => setActiveCategory(index), []);

    const currentTechStack = useMemo(() => techStacks[activeCategory], [activeCategory]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCategory((prev) => (prev + 1) % techStacks.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="about" className="flex flex-col items-center py-8 sm:py-10 md:py-12 lg:py-16 max-w-[1366px] mx-auto w-full px-6 md:px-8 lg:px-12 relative">
            <HeroTitle />

            <ScrollAnimatedSection
                animationType="fadeUp"
                delay={0.1}
                className="w-full mb-10 sm:mb-12 relative"
            >
                <FloatingParticles />

                <div className="grid grid-cols-1 xl:grid-cols-[0.78fr_1.22fr] gap-7 sm:gap-8 md:gap-10 lg:gap-12 items-start xl:items-center">
                    <ProfileContent />
                    <ProfileStory />
                </div>
            </ScrollAnimatedSection>

            <TechStackSection
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
                currentTechStack={currentTechStack}
                hoveredSkill={hoveredSkill}
                onSkillHover={handleSkillHover}
                onSkillLeave={handleSkillLeave}
            />

            <HobbiesSection
                hoveredHobby={hoveredHobby}
                onHobbyHover={handleHobbyHover}
                onHobbyLeave={handleHobbyLeave}
            />

            <SectionDivider />
        </div>
    );
};

export default memo(AboutGrid);
