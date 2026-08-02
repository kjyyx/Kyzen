import React, { useEffect, memo, useCallback, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from './ProjectData';
import NextProjectSection from './NextProjectSection';
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Award,
    Globe,
    Calendar,
    CheckCircle,
    Star,
    X,
    AlertCircle
} from 'lucide-react';

import BonnieImage from '../../assets/Bonnie_Rabbit.webp';
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

// Status color map — consistent, brand-safe
const STATUS_COLORS = {
    Live: '#10b981',
    Completed: '#3b82f6',
    Maintained: '#028582',
    'In Progress': '#f59e0b'
};

// ===== CHATBOT NOTIFICATION =====
const ProjectNotification = memo(() => {
    const [isVisible, setIsVisible] = useState(true);
    const [isTyping, setIsTyping] = useState(true);
    const { slug } = useParams();

    const animationConfig = getAnimationConfig();

    const notificationVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.95 }
            };
        }
        return {
            initial: { opacity: 0, y: 100, scale: 0.8 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 100, scale: 0.8 }
        };
    }, [animationConfig.reduce]);

    const characterVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 }
            };
        }
        return {
            initial: { opacity: 0, x: -20, rotate: -10 },
            animate: { opacity: 1, x: 0, rotate: 0 }
        };
    }, [animationConfig.reduce]);

    useEffect(() => {
        setIsVisible(true);
        setIsTyping(true);

        const typingTimer = setTimeout(() => {
            setIsTyping(false);
        }, animationConfig.reduce ? 2000 : 3000);

        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, animationConfig.reduce ? 8000 : 12000);

        return () => {
            clearTimeout(typingTimer);
            clearTimeout(hideTimer);
        };
    }, [slug, animationConfig.reduce]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed bottom-6 right-6 z-50 max-w-sm"
                {...notificationVariants}
                transition={{
                    type: animationConfig.reduce ? "tween" : "spring",
                    stiffness: animationConfig.reduce ? undefined : 300,
                    damping: animationConfig.reduce ? undefined : 20,
                    duration: animationConfig.reduce ? 0.3 : undefined
                }}
            >
                <div className="relative flex items-end gap-3">
                    <motion.div
                        className="flex-shrink-0"
                        {...characterVariants}
                        transition={{
                            delay: animationConfig.reduce ? 0.1 : 0.3,
                            duration: animationConfig.reduce ? 0.3 : 0.5
                        }}
                    >
                        <div className="relative">
                            <div className="w-20 h-32 overflow-hidden">
                                <img
                                    src={BonnieImage}
                                    alt="Bonnie Assistant"
                                    className="w-full h-full object-cover object-center"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand items-center justify-center text-display font-display-black-italic text-xl hidden rounded-lg">
                                    B
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="relative flex-1">
                        <div className="absolute bottom-4 left-[-6px] w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-white/15 border-b-[6px] border-b-transparent"></div>
                        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl rounded-bl-sm p-4 shadow-lg relative">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-foreground-muted hover:text-display transition-colors duration-200 rounded-full hover:bg-white/10"
                            >
                                <X className="w-3 h-3" />
                            </button>

                            <div className="pr-8">
                                {isTyping ? (
                                    <div className="flex items-center gap-2 text-foreground-secondary/80">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-brand-light rounded-full"></div>
                                            <div className="w-2 h-2 bg-brand-light rounded-full" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-brand-light rounded-full" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                        <span className="text-sm italic">Bonnie is typing...</span>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: animationConfig.reduce ? 0.3 : 0.5 }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertCircle className="w-4 h-4 text-brand-light flex-shrink-0" />
                                            <span className="font-display-black-italic text-brand-light text-sm">Hey there! 👋</span>
                                        </div>
                                        <p className="text-foreground-secondary text-sm leading-relaxed">
                                            Just a heads up – some projects are not live or available on GitHub because my school account got deleted and I lost access to the original files. Sorry about that!
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
});

// ===== SECTION HEADER — Portfolio Pattern (Left-aligned) =====
const SectionHeader = memo(({ line1, line2, delay = 0.2 }) => {
    const animationConfig = getAnimationConfig();

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={animationConfig.reduce ? delay * 0.5 : delay}
            className="w-full flex justify-start mb-10 sm:mb-12 relative"
            priority="high"
        >
            <div className="relative w-full">
                <motion.h2
                    className="pl-2 text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-3xl sm:text-4xl md:text-5xl font-display-black-italic leading-none text-left"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: animationConfig.reduce ? 0.4 : 0.6, ease: "easeOut" }}
                    style={{ textShadow: '0 0 40px rgba(2, 133, 130, 0.26)' }}
                >
                    {line1}<span className="text-brand-light">_</span>
                    {line2 && (
                        <>
                            <br />
                            {line2}<span className="text-brand-light">:</span>
                        </>
                    )}
                </motion.h2>
                <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-brand-light via-brand-light to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "10rem" }}
                    viewport={{ once: true }}
                    transition={{
                        duration: animationConfig.reduce ? 0.5 : 0.8,
                        delay: animationConfig.reduce ? 0.1 : 0.3
                    }}
                />
            </div>
        </ScrollAnimatedSection>
    );
});

// ===== HERO SECTION — Full-bleed with overlaid content =====
const HeroSection = memo(({ project, animationConfig }) => {
    const navigate = useNavigate();
    const handleBack = useCallback(() => navigate('/'), [navigate]);
    const statusColor = STATUS_COLORS[project.meta?.status] || '#028582';

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ height: 'calc(88vh - 4rem)', minHeight: '520px', maxHeight: '900px' }}
        >
            {/* Background image */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: animationConfig.reduce ? 0.6 : 1.2,
                    ease: 'easeOut',
                    delay: animationConfig.reduce ? 0.1 : 0.15
                }}
            >
                <img
                    src={project.backgroundImage}
                    alt={`${project.title} showcase`}
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            {/* Gradient overlays — left-anchored and bottom-anchored */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#011417] via-[#011417]/60 to-[#011417]/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#011417]/80 via-[#011417]/20 to-transparent pointer-events-none" />

            {/* Back breadcrumb — top left */}
            <motion.div
                className="absolute top-20 left-0 right-0 z-20 max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: animationConfig.reduce ? 0.2 : 0.4, duration: 0.5 }}
            >
                <motion.button
                    onClick={handleBack}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-foreground-secondary/80 font-display-medium text-sm hover:text-display hover:border-brand-light/40 transition-all duration-300"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    <span>Back to Portfolio</span>
                </motion.button>
            </motion.div>

            {/* Hero content — bottom-left anchored */}
            <div className="absolute inset-0 flex flex-col justify-end z-10 pointer-events-none">
                <div className="max-w-[1366px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 pb-10 sm:pb-14 md:pb-18 pointer-events-auto">

                    {/* Category pill */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationConfig.reduce ? 0.25 : 0.55, duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light/15 border border-brand-light/40 text-brand-light font-display-medium text-xs sm:text-sm tracking-wide">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                            {project.category}
                        </span>
                    </motion.div>

                    {/* Project title */}
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] font-display-black-italic text-transparent bg-gradient-to-r from-white via-white/95 to-brand-light bg-clip-text leading-none mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: animationConfig.reduce ? 0.35 : 0.65,
                            duration: animationConfig.reduce ? 0.5 : 0.9,
                            ease: 'easeOut'
                        }}
                        style={{ textShadow: '0 0 80px rgba(2, 133, 130, 0.30)' }}
                    >
                        {project.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-foreground-secondary/80 text-base sm:text-lg font-display-medium mb-6 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationConfig.reduce ? 0.45 : 0.80, duration: 0.6 }}
                    >
                        {project.subtitle}
                    </motion.p>

                    {/* Meta row — status, tech tags, CTAs */}
                    <motion.div
                        className="flex flex-wrap items-center gap-2 sm:gap-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationConfig.reduce ? 0.55 : 0.95, duration: 0.6 }}
                    >
                        {/* Status + Year badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 border border-white/15 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                            <span className="text-xs font-display-black-italic" style={{ color: statusColor }}>
                                {project.meta?.status}
                            </span>
                            <span className="text-foreground-muted/80 text-xs font-display-medium">
                                · {project.meta?.year}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-4 bg-white/20" />

                        {/* Tech tags — first 4 */}
                        {project.techStack.slice(0, 4).map(tech => (
                            <span
                                key={tech.name}
                                className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-display-medium bg-white/8 border border-white/12 text-foreground-secondary/70 backdrop-blur-sm"
                            >
                                {tech.name}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="hidden sm:inline text-foreground-muted/60 text-xs font-display-medium">
                                +{project.techStack.length - 4} more
                            </span>
                        )}

                        {/* CTAs */}
                        {project.links?.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light/20 border border-brand-light/40 text-brand-light font-display-medium text-xs sm:text-sm hover:bg-brand-light/30 transition-all duration-300 shadow-[0_0_20px_rgba(2,133,130,0.18)]"
                            >
                                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                <span>Live Site</span>
                            </a>
                        )}
                        {project.links?.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-foreground-secondary font-display-medium text-xs sm:text-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                            >
                                <Github className="w-3.5 h-3.5" />
                                <span>Source</span>
                            </a>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Bottom edge fade into content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#011417] to-transparent pointer-events-none" />
        </div>
    );
});

// ===== PROJECT OVERVIEW =====
const ProjectOverview = memo(({ project }) => {
    const animationConfig = getAnimationConfig();
    const statusColor = STATUS_COLORS[project.meta?.status] || '#028582';

    const linkHoverVariants = useMemo(() => ({
        x: animationConfig.reduce ? 2 : 4
    }), [animationConfig.reduce]);

    const teamMemberHoverVariants = useMemo(() => ({
        y: animationConfig.reduce ? -4 : -3,
        scale: animationConfig.reduce ? 1.02 : 1.01
    }), [animationConfig.reduce]);

    return (
        <section className="py-16 sm:py-20 md:py-24 relative">
            <div className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 max-w-[1366px] relative z-10 px-4 sm:px-6 md:px-8">

                <SectionHeader line1="Project" line2="Overview" delay={0.2} />

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                    {/* ── Left: Main content card ── */}
                    <ScrollAnimatedSection
                        animationType="fadeLeft"
                        delay={0.3}
                        className="xl:col-span-7 space-y-6"
                        priority="high"
                    >
                        <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md border border-white/[0.14] hover:border-white/[0.22] rounded-2xl p-6 md:p-10 shadow-lg transition-colors duration-300">
                            {/* Top accent line */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-light/25 to-transparent rounded-full" />

                            <h3 className="text-xl md:text-2xl lg:text-3xl font-display-black-italic text-display mb-5 leading-tight">
                                {project.subtitle}
                            </h3>
                            <p className="text-foreground-secondary/90 text-sm sm:text-base leading-relaxed mb-8">
                                {project.description}
                            </p>

                            {/* Key Highlights */}
                            <StaggerContainer
                                staggerDelay={animationConfig.reduce ? 0.05 : 0.1}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8"
                                priority="medium"
                            >
                                {project.highlights.map((highlight, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 bg-brand-light/5 rounded-xl border border-brand-light/15 hover:bg-brand-light/10 hover:border-brand-light/25 transition-colors duration-300"
                                    >
                                        <CheckCircle className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground-secondary/90 font-display-medium text-sm">{highlight}</span>
                                    </div>
                                ))}
                            </StaggerContainer>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {project.links?.live && (
                                    <motion.a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative overflow-hidden bg-gradient-to-r from-brand-light to-brand text-display px-6 py-3 rounded-full font-display-black-italic transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(2,133,130,0.28)]"
                                        whileHover={{ scale: animationConfig.reduce ? 1.01 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                            initial={{ x: "-150%" }}
                                            whileHover={{ x: "150%" }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <ExternalLink className="w-4 h-4 relative z-10" />
                                        <span className="relative z-10">Live Site</span>
                                    </motion.a>
                                )}
                                {project.links?.github && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group border border-white/20 text-display px-6 py-3 rounded-full font-display-black-italic hover:bg-white/5 hover:border-white/35 transition-all duration-300 flex items-center gap-2"
                                        whileHover={{ scale: animationConfig.reduce ? 1.01 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Github className="w-4 h-4" />
                                        View Code
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </ScrollAnimatedSection>

                    {/* ── Right: Sidebar cards ── */}
                    <ScrollAnimatedSection
                        animationType="fadeRight"
                        delay={0.4}
                        className="xl:col-span-5 space-y-4"
                        priority="high"
                    >
                        {/* Status Card */}
                        <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md border border-white/[0.14] hover:border-white/[0.22] rounded-2xl p-5 shadow-lg transition-colors duration-300">
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-light/20 to-transparent rounded-full" />
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-display font-display-black-italic text-lg flex items-center gap-2">
                                    <Award className="w-5 h-5 text-brand-light" />
                                    Project Status
                                </h3>
                                <div
                                    className="px-3 py-1 rounded-full border text-xs font-display-black-italic"
                                    style={{
                                        backgroundColor: `${statusColor}18`,
                                        borderColor: `${statusColor}40`,
                                        color: statusColor
                                    }}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                                        {project.meta?.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-foreground-secondary/80 text-sm">
                                <Calendar className="w-4 h-4 text-brand-light" />
                                <span className="font-display-medium">Delivered in {project.meta?.year}</span>
                            </div>
                        </div>

                        {/* Links Card */}
                        <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md border border-white/[0.14] hover:border-white/[0.22] rounded-2xl p-5 shadow-lg transition-colors duration-300">
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-light/20 to-transparent rounded-full" />
                            <h3 className="text-display font-display-black-italic text-lg mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-brand-light" />
                                Project Links
                            </h3>
                            <div className="space-y-2.5">
                                {project.links?.website && (
                                    <motion.a
                                        href={project.links.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 p-3 bg-brand-light/5 hover:bg-brand-light/10 rounded-xl border border-brand-light/15 hover:border-brand-light/30 transition-all duration-300"
                                        whileHover={linkHoverVariants}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-brand-light/20 to-brand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <ExternalLink className="w-4 h-4 text-brand-light" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-display font-display-black-italic text-sm">Live Website</div>
                                            <div className="text-foreground-muted text-xs truncate">{project.links.website.replace(/^https?:\/\//, '')}</div>
                                        </div>
                                    </motion.a>
                                )}
                                {project.links?.github && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 p-3 bg-brand-light/5 hover:bg-brand-light/10 rounded-xl border border-brand-light/15 hover:border-brand-light/30 transition-all duration-300"
                                        whileHover={linkHoverVariants}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-brand-light/20 to-brand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Github className="w-4 h-4 text-brand-light" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-display font-display-black-italic text-sm">Source Code</div>
                                            <div className="text-foreground-muted text-xs">GitHub Repository</div>
                                        </div>
                                    </motion.a>
                                )}
                                {/* Additional links (e.g. Brainbox multi-site) */}
                                {project.links?.additional?.map(link => (
                                    <motion.a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 p-3 bg-brand-light/5 hover:bg-brand-light/10 rounded-xl border border-brand-light/15 hover:border-brand-light/30 transition-all duration-300"
                                        whileHover={linkHoverVariants}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-brand-light/20 to-brand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-brand-light" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-display font-display-black-italic text-sm">{link.label}</div>
                                            <div className="text-foreground-muted text-xs truncate">{link.url.replace(/^https?:\/\//, '')}</div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimatedSection>
                </div>

                {/* ── Team Section ── */}
                <ScrollAnimatedSection
                    animationType="fadeUp"
                    delay={0.5}
                    className="mt-20 sm:mt-24"
                    priority="medium"
                >
                    <SectionHeader line1="The" line2="Team" delay={0.1} />

                    <StaggerContainer
                        staggerDelay={animationConfig.reduce ? 0.08 : 0.15}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center"
                        priority="medium"
                    >
                        {project.teamMembers.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                className="group text-center"
                                whileHover={teamMemberHoverVariants}
                                transition={{ type: "tween", duration: 0.2 }}
                            >
                                <div className="relative w-14 h-14 mx-auto mb-3">
                                    <div className="w-full h-full bg-gradient-to-br from-brand-light to-brand rounded-full flex items-center justify-center text-display font-display-black-italic text-lg shadow-lg shadow-brand-light/20">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    {idx === 0 && (
                                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <Star className="w-2.5 h-2.5 text-yellow-900" />
                                        </div>
                                    )}
                                </div>
                                <h4 className="text-display font-display-black-italic text-sm mb-0.5 group-hover:text-brand-light transition-colors duration-300">
                                    {member.name}
                                </h4>
                                <p className="text-foreground-muted text-xs font-display-medium uppercase tracking-wide leading-tight">
                                    {member.role}
                                </p>
                                <div className="w-6 h-0.5 bg-gradient-to-r from-brand-light to-brand rounded-full mx-auto mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </ScrollAnimatedSection>
            </div>
        </section>
    );
});

// ===== TECHNOLOGY STACK =====
const TechnologyStack = memo(({ techStack }) => {
    const animationConfig = getAnimationConfig();

    return (
        <section className="py-16 sm:py-20 md:py-24 relative">
            <div className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 max-w-[1366px] px-4 sm:px-6 md:px-8">
                <SectionHeader line1="Built" line2="With" delay={0.2} />

                <StaggerContainer
                    staggerDelay={animationConfig.reduce ? 0.1 : 0.15}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
                    priority="medium"
                >
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="group relative"
                            whileHover={{ y: -4, scale: 1.02, transition: { type: "tween", duration: 0.2 } }}
                        >
                            {/* Glow on hover */}
                            <motion.div
                                className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                                style={{ background: tech.color }}
                            />
                            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md border border-white/[0.14] group-hover:border-white/[0.24] rounded-2xl p-5 shadow-lg transition-all duration-300 flex flex-col items-center gap-3 text-center h-full justify-center">
                                {/* Top accent */}
                                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand-light/15 to-transparent" />

                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${tech.color}22, ${tech.color}08)`,
                                        border: `1px solid ${tech.color}30`
                                    }}
                                >
                                    <img src={tech.icon} alt={tech.name + ' logo'} className="w-8 h-8 object-contain" />
                                </div>

                                <h3 className="text-display font-display-black-italic text-base leading-tight">{tech.name}</h3>

                                <motion.div
                                    className="h-0.5 rounded-full"
                                    style={{ backgroundColor: tech.color }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 32 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * (animationConfig.reduce ? 0.05 : 0.1) + 0.4,
                                        duration: animationConfig.reduce ? 0.4 : 0.7
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
});

// ===== SCREENSHOT GALLERY =====
const ScreenshotGallery = memo(({ images }) => {
    const animationConfig = getAnimationConfig();

    return (
        <section className="py-16 sm:py-20 md:py-24">
            <div className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 max-w-[1366px] px-4 sm:px-6 md:px-8">
                <SectionHeader line1="Visual" line2="Showcase" delay={0.2} />

                <StaggerContainer
                    staggerDelay={animationConfig.reduce ? 0.15 : 0.25}
                    className="space-y-8 sm:space-y-12"
                    priority="medium"
                >
                    {images.map((img, idx) => (
                        <motion.div
                            key={img.src}
                            className="relative group"
                            whileHover={{ scale: animationConfig.reduce ? 1.005 : 1.01 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {/* Glow on hover */}
                            <motion.div
                                className="absolute -inset-4 bg-gradient-to-r from-brand-light/10 to-brand/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                            />

                            {/* Brand-framed container */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/[0.14] group-hover:border-brand-light/30 shadow-[0_0_40px_rgba(2,133,130,0.08)] group-hover:shadow-[0_0_60px_rgba(2,133,130,0.16)] transition-all duration-500">
                                {/* Glass frame padding */}
                                <div className="p-2 sm:p-3 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm">
                                    <ScrollAnimatedSection
                                        animationType="scale"
                                        delay={idx * (animationConfig.reduce ? 0.1 : 0.18)}
                                        priority="low"
                                    >
                                        <div className="relative rounded-xl overflow-hidden">
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="w-full h-auto rounded-xl"
                                            />
                                            {/* Subtle bottom gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#011417]/20 to-transparent pointer-events-none rounded-xl" />
                                        </div>
                                    </ScrollAnimatedSection>
                                </div>

                                {/* Bottom brand accent line */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-light/25 to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
});

// ===== MAIN COMPONENT =====
function ProjectPage() {
    const { slug } = useParams();
    const animationConfig = getAnimationConfig();

    const pageVariants = useMemo(() => ({
        initial: { opacity: 0, y: animationConfig.reduce ? 0 : 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: animationConfig.reduce ? 0 : -20 }
    }), [animationConfig.reduce]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display-black-italic text-transparent bg-gradient-to-r from-white via-brand-light to-brand-light bg-clip-text mb-4">
                        404<span className="text-brand-light">_</span>
                    </h1>
                    <p className="text-foreground-secondary font-display-medium">Project not found.</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: animationConfig.reduce ? 0.3 : 0.5, ease: "easeInOut" }}
            className="min-h-screen relative overflow-hidden"
        >
            {/* Ambient background orbs — fixed, looping */}
            {canAnimate() && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <motion.div
                        className="absolute top-20 left-10 w-96 h-72 sm:h-80 bg-gradient-to-br from-brand-light/8 to-brand/8 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                            duration: animationConfig.reduce ? 8 : 12,
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-brand/8 to-blue-500/8 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{
                            duration: animationConfig.reduce ? 10 : 15,
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: animationConfig.reduce ? 1.5 : 3
                        }}
                    />
                </div>
            )}

            {/* Chatbot Notification */}
            <ProjectNotification />

            {/* Hero Section */}
            <HeroSection project={project} animationConfig={animationConfig} />

            {/* Main Content */}
            <div className="relative z-10">
                <ProjectOverview project={project} />
                <TechnologyStack techStack={project.techStack} />
                {project.screenshots && project.screenshots.length > 0 && (
                    <ScreenshotGallery images={project.screenshots} />
                )}

                <ScrollAnimatedSection
                    animationType="fadeUp"
                    delay={0.3}
                    className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 max-w-[1366px] px-4 sm:px-6 md:px-8 pb-16 sm:pb-20"
                    priority="low"
                >
                    <NextProjectSection />
                </ScrollAnimatedSection>
            </div>
        </motion.div>
    );
}

export default memo(ProjectPage);
