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
    Play,
    Users,
    Sparkles,
    Calendar,
    CheckCircle,
    Zap,
    Target,
    Star,
    X,
    AlertCircle
} from 'lucide-react';

// Import Bonnie image
import BonnieImage from '../../assets/Bonnie_Rabbit.webp';

// Import components for scroll animations
import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';

import { 
    getAnimationConfig, 
    canAnimate
} from '../../utils/helpers';

const ProjectTechIcon = memo(({ tech }) => {
    const [hasError, setHasError] = useState(false);
    const initials = useMemo(() => (
        tech.name
            .split(/\s+/)
            .map((word) => word[0])
            .join('')
            .slice(0, 3)
            .toUpperCase()
    ), [tech.name]);

    if (hasError || !tech.icon) {
        return (
            <span
                className="relative z-10 flex h-full w-full items-center justify-center rounded-xl text-sm font-black text-white"
                style={{
                    backgroundColor: `${tech.color}24`,
                    border: `1px solid ${tech.color}45`
                }}
                aria-label={tech.name}
            >
                {initials}
            </span>
        );
    }

    return (
        <img
            src={tech.icon}
            alt={`${tech.name} logo`}
            className="w-10 h-10 object-contain relative z-10"
            onError={() => setHasError(true)}
        />
    );
});

// Chatbot Notification Component
const ProjectNotification = memo(() => {
    const [isVisible, setIsVisible] = useState(true);
    const [isTyping, setIsTyping] = useState(true);
    const { slug } = useParams();
    
    const animationConfig = getAnimationConfig();

    // Move all useMemo hooks BEFORE any early returns
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

    // NOW it's safe to have early returns AFTER all hooks
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
                    {/* Chatbot character */}
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
                                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center text-white font-black italic text-xl hidden rounded-lg">
                                    B
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chat bubble */}
                    <div className="relative flex-1">
                        <div className="absolute bottom-4 left-[-6px] w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-white/15 border-b-[6px] border-b-transparent"></div>

                        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl rounded-bl-sm p-4 shadow-2xl relative">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10"
                            >
                                <X className="w-3 h-3" />
                            </button>

                            <div className="pr-8">
                                {isTyping ? (
                                    <div className="flex items-center gap-2 text-white/70">
                                        <div className="flex gap-1">
                                            <div className={`w-2 h-2 bg-purple-400 rounded-full ${!animationConfig.reduce ? 'animate-bounce' : ''}`}></div>
                                            <div className={`w-2 h-2 bg-purple-400 rounded-full ${!animationConfig.reduce ? 'animate-bounce' : ''}`} style={{ animationDelay: animationConfig.reduce ? '0s' : '0.1s' }}></div>
                                            <div className={`w-2 h-2 bg-purple-400 rounded-full ${!animationConfig.reduce ? 'animate-bounce' : ''}`} style={{ animationDelay: animationConfig.reduce ? '0s' : '0.2s' }}></div>
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
                                            <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                            <span className="font-black italic text-purple-300 text-sm">Hey there! 👋</span>
                                        </div>
                                        <p className="text-white/90 text-sm leading-relaxed">
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

// ===== EXTRA SECTION COMPONENTS MAPPING =====
// const extraSectionComponents = {
//     ProjectStatistics,
//     KeyFeatures,
//     ProjectShowcase,
//     MobileExperience,
//     ProjectImpact
// };

// ===== SUB-COMPONENTS =====

// Back Button Component
const BackButton = memo(() => {
    const navigate = useNavigate();
    const animationConfig = getAnimationConfig();
    
    const handleBack = useCallback(() => navigate('/'), [navigate]);

    const buttonVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                whileHover: { scale: 1.02 }
            };
        }
        
        return {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0 },
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
        };
    }, [animationConfig.reduce]);

    const tooltipVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { initial: { x: 0 }, animate: { x: 0 } };
        }
        
        return { initial: { x: -10 }, animate: { x: 0 } };
    }, [animationConfig.reduce]);

    return (
        <motion.button
            className="fixed top-6 left-4 sm:left-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white/20 transition-all duration-300 group flex items-center justify-center"
            onClick={handleBack}
            {...buttonVariants}
            transition={{ 
                delay: animationConfig.reduce ? 0.5 : 1.5, 
                type: animationConfig.reduce ? "tween" : "spring",
                duration: animationConfig.reduce ? 0.3 : undefined
            }}
        >
            <ArrowLeft className="w-6 h-6" />
            <motion.div
                className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                {...tooltipVariants}
            >
                Back
            </motion.div>
        </motion.button>
    );
});

// Section Header Component
const SectionHeader = memo(({ icon: Icon, badge, title, subtitle, delay = 0.2 }) => {
    const animationConfig = getAnimationConfig();
    
    const badgeHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.01 };
        }
        
        return { scale: 1.02 };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={animationConfig.reduce ? delay * 0.5 : delay}
            className="text-center mb-12 sm:mb-16 md:mb-20"
            priority="high"
        >
            <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 backdrop-blur-sm border border-[#ff75df]/30 rounded-full mb-6"
                whileHover={badgeHoverVariants}
            >
                <Icon className="w-4 h-4 text-[#ff75df]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">{badge}</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-6 leading-[0.9]">
                {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff75df] to-purple-400 rounded-full mx-auto mb-4" />
            {subtitle && (
                <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
                    {subtitle}
                </p>
            )}
        </ScrollAnimatedSection>
    );
});

// Project Hero Section
const ProjectHero = memo(({ project }) => {
    const animationConfig = getAnimationConfig();
    
    const imageVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 }
            };
        }
        
        return {
            initial: { opacity: 0, scale: 1.1 },
            animate: { opacity: 1, scale: 1 }
        };
    }, [animationConfig.reduce]);

    const overlayVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 1 },
                animate: { opacity: 1 }
            };
        }
        
        return {
            initial: { opacity: 0 },
            animate: { opacity: 1 }
        };
    }, [animationConfig.reduce]);

    return (
        <section className="relative min-h-screen overflow-hidden px-4 pt-28 pb-16 sm:px-8 lg:pt-32">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2e175c]/70 via-[#2e175c]/35 via-[#ff75df]/20 to-black" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black_55%,transparent_100%)]" />

            <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: animationConfig.reduce ? 0 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff75df]/30 bg-[#ff75df]/10 px-4 py-2 text-xs font-black italic uppercase tracking-widest text-[#ff75df]">
                        <Sparkles className="h-4 w-4" />
                        {project.category}
                    </div>

                    <h1 className="text-5xl font-black italic leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                        {project.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-xl font-black italic leading-tight tracking-tight text-white/78 sm:text-2xl">
                        {project.subtitle}
                    </p>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                        {project.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                            <div className="text-xs font-bold uppercase tracking-wide text-white/45">Year</div>
                            <div className="mt-1 font-black italic text-white">{project.meta.year}</div>
                        </div>
                        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                            <div className="text-xs font-bold uppercase tracking-wide text-emerald-200/65">Status</div>
                            <div className="mt-1 font-black italic text-emerald-200">{project.meta.status}</div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        {project.links?.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff75df] to-purple-500 px-6 text-sm font-black italic text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff75df]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                                <Play className="h-4 w-4" />
                                View live
                            </a>
                        )}
                        {project.links?.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.05] px-6 text-sm font-black italic text-white transition hover:border-white/35 hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff75df]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                                <Github className="h-4 w-4" />
                                View code
                            </a>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="relative"
                    {...imageVariants}
                    transition={{
                        delay: animationConfig.reduce ? 0.2 : 0.35,
                        duration: animationConfig.reduce ? 0.45 : 0.9,
                        ease: "easeOut"
                    }}
                >
                    <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 blur-2xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] p-4 shadow-2xl">
                        <img
                            src={project.backgroundImage}
                            alt={`${project.title} project preview`}
                            className="aspect-[16/11] w-full rounded-[1.35rem] object-contain bg-[#111111]/80"
                        />
                        <motion.div
                            className="absolute inset-4 rounded-[1.35rem] bg-gradient-to-t from-black/35 via-transparent to-white/5"
                            {...overlayVariants}
                            transition={{
                                delay: animationConfig.reduce ? 0.25 : 0.65,
                                duration: animationConfig.reduce ? 0.25 : 0.6
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

// Enhanced Project Overview
const ProjectOverview = memo(({ project }) => {
    const animationConfig = getAnimationConfig();
    
    const actionButtonVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                whileHover: { scale: 1.01 },
                whileTap: { scale: 0.99 }
            };
        }
        
        return {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 }
        };
    }, [animationConfig.reduce]);

    const linkHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { x: 2 };
        }
        
        return { x: 4 };
    }, [animationConfig.reduce]);

    const teamMemberHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: -4, scale: 1.02 };
        }
        
        return { y: -8, scale: 1.05 };
    }, [animationConfig.reduce]);

    return (
        <section className="py-16 sm:py-20 md:py-32 relative">
            <div className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 relative z-10 px-4 sm:px-6 md:px-8">
                <SectionHeader
                    icon={Sparkles}
                    badge="PROJECT SHOWCASE"
                    title="Project Overview"
                    subtitle="A comprehensive look at the development process and key achievements"
                />

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Main Content */}
                    <ScrollAnimatedSection
                        animationType="fadeLeft"
                        delay={0.3}
                        className="xl:col-span-7 space-y-8 md:space-y-12"
                        priority="high"
                    >
                        <div className="relative">
                            <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-2 h-2 bg-[#ff75df] rounded-full ${!animationConfig.reduce ? 'animate-pulse' : ''}`} />
                                    <span className="text-[#ff75df] text-sm font-black italic uppercase tracking-widest">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black italic tracking-tight text-white mb-6 leading-tight">
                                    {project.subtitle}
                                </h3>
                                <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                                    {project.description}
                                </p>

                                {/* Key Highlights */}
                                <StaggerContainer
                                    staggerDelay={animationConfig.reduce ? 0.05 : 0.1}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                                    priority="medium"
                                >
                                    {project.highlights.map((highlight, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                                        >
                                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                            <span className="text-white/90 font-medium">{highlight}</span>
                                        </div>
                                    ))}
                                </StaggerContainer>

                                {/* Action Buttons */}
                                <StaggerContainer
                                    staggerDelay={animationConfig.reduce ? 0.1 : 0.2}
                                    className="flex flex-wrap gap-4"
                                    priority="medium"
                                >
                                    {project.links?.live && (
                                        <motion.a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative overflow-hidden bg-gradient-to-r from-[#ff75df] to-purple-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black italic tracking-tight transition-all duration-300 flex items-center gap-3"
                                            {...actionButtonVariants}
                                        >
                                            <Play className="w-5 h-5" />
                                            <span>Live Demo</span>
                                        </motion.a>
                                    )}
                                    {project.links?.github && (
                                        <motion.a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group border-2 border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black italic tracking-tight hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-3"
                                            {...actionButtonVariants}
                                        >
                                            <Github className="w-5 h-5" />
                                            View Code
                                        </motion.a>
                                    )}
                                </StaggerContainer>
                            </div>
                        </div>
                    </ScrollAnimatedSection>

                    {/* Enhanced Sidebar */}
                    <ScrollAnimatedSection
                        animationType="fadeRight"
                        delay={0.4}
                        className="xl:col-span-5 space-y-6"
                        priority="high"
                    >
                        {/* Project Status Card */}
                        <div className="bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-black italic text-xl flex items-center gap-3">
                                    <Award className="w-6 h-6 text-[#ff75df]" />
                                    Project Status
                                </h3>
                                <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-400/20 border border-emerald-400/30 rounded-full">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 bg-emerald-400 rounded-full ${!animationConfig.reduce ? 'animate-pulse' : ''}`} />
                                        <span className="text-emerald-400 font-black italic text-sm">{project.meta.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <Calendar className="w-5 h-5 text-[#ff75df]" />
                                <span className="font-medium">Delivered in {project.meta.year}</span>
                            </div>
                        </div>

                        {/* Project Links Card */}
                        <div className="bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                            <h3 className="text-white font-black italic text-xl mb-6 flex items-center gap-3">
                                <Globe className="w-6 h-6 text-[#ff75df]" />
                                Project Links
                            </h3>
                            <StaggerContainer
                                staggerDelay={animationConfig.reduce ? 0.05 : 0.1}
                                className="space-y-4"
                                priority="medium"
                            >
                                {project.links?.website && (
                                    <motion.a
                                        href={project.links.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-[#ff75df]/30 transition-all duration-300"
                                        whileHover={linkHoverVariants}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#ff75df]/20 to-purple-400/20 rounded-xl flex items-center justify-center">
                                            <ExternalLink className="w-5 h-5 text-[#ff75df]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-black italic">Live Website</div>
                                            <div className="text-white/60 text-sm truncate">{project.links.website.replace(/^https?:\/\//, '')}</div>
                                        </div>
                                    </motion.a>
                                )}
                                {project.links?.additional?.map((link) => (
                                    <motion.a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-[#ff75df]/30 transition-all duration-300"
                                        whileHover={linkHoverVariants}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#ff75df]/20 to-purple-400/20 rounded-xl flex items-center justify-center">
                                            <ExternalLink className="w-5 h-5 text-[#ff75df]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-black italic">{link.label}</div>
                                            <div className="text-white/60 text-sm truncate">{link.url.replace(/^https?:\/\//, '')}</div>
                                        </div>
                                    </motion.a>
                                ))}
                                {project.links?.github && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-[#ff75df]/30 transition-all duration-300"
                                        whileHover={linkHoverVariants}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#ff75df]/20 to-purple-400/20 rounded-xl flex items-center justify-center">
                                            <Github className="w-5 h-5 text-[#ff75df]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-black italic">Source Code</div>
                                            <div className="text-white/60 text-sm truncate">GitHub Repository</div>
                                        </div>
                                    </motion.a>
                                )}
                            </StaggerContainer>
                        </div>
                    </ScrollAnimatedSection>
                </div>

                {/* Team Section */}
                <ScrollAnimatedSection
                    animationType="fadeUp"
                    delay={0.5}
                    className="mt-16 md:mt-20"
                    priority="medium"
                >
                    <div className="text-center mb-12">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 backdrop-blur-sm border border-[#ff75df]/30 rounded-full mb-6"
                            whileHover={{ scale: animationConfig.reduce ? 1.01 : 1.02 }}
                        >
                            <Users className="w-4 h-4 text-[#ff75df]" />
                            <span className="text-white/90 text-sm font-medium tracking-wide">DREAM TEAM</span>
                        </motion.div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-4 leading-tight">
                            Meet the Team
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#ff75df] to-purple-400 rounded-full mx-auto mb-4" />
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            The talented individuals who brought this project to life
                        </p>
                    </div>

                    <StaggerContainer
                        staggerDelay={animationConfig.reduce ? 0.08 : 0.15}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
                        priority="medium"
                    >
                        {project.teamMembers.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                className="group text-center"
                                whileHover={teamMemberHoverVariants}
                                transition={{ 
                                    type: animationConfig.reduce ? "tween" : "spring", 
                                    stiffness: animationConfig.reduce ? undefined : 300, 
                                    damping: animationConfig.reduce ? undefined : 20,
                                    duration: animationConfig.reduce ? 0.2 : undefined
                                }}
                            >
                                <div className="relative w-20 h-20 mx-auto mb-4">
                                    <div className="w-full h-full bg-gradient-to-br from-[#ff75df] to-purple-400 rounded-full flex items-center justify-center text-white font-black italic text-xl shadow-lg">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    {idx === 0 && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <Star className="w-3 h-3 text-yellow-900" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-white font-black italic text-lg mb-1 group-hover:text-[#ff75df] transition-colors duration-300">
                                        {member.name}
                                    </h4>
                                    <p className="text-white/60 text-sm font-medium uppercase tracking-wide">
                                        {member.role}
                                    </p>
                                </div>

                                <div className="w-8 h-0.5 bg-gradient-to-r from-[#ff75df] to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </ScrollAnimatedSection>
            </div>
        </section>
    );
});

// Enhanced Technology Stack
const TechnologyStack = memo(({ techStack }) => {
    const animationConfig = getAnimationConfig();
    
    const techCardHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                y: -1,
                scale: 1.005,
                transition: { duration: 0.2 }
            };
        }
        
        return {
            y: -3,
            scale: 1.01,
            transition: { duration: 0.18, ease: "easeOut" }
        };
    }, [animationConfig.reduce]);

    const iconHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1 };
        }
        
        return { scale: 1.03 };
    }, [animationConfig.reduce]);

    return (
        <section className="py-16 sm:py-20 md:py-32 relative">
            <div className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 px-4 sm:px-6 md:px-8">
                <SectionHeader
                    icon={Zap}
                    badge="TECH STACK"
                    title="Built With Excellence"
                    subtitle="Cutting-edge technologies and frameworks powering exceptional digital experiences"
                />

                <StaggerContainer
                    staggerDelay={animationConfig.reduce ? 0.1 : 0.2}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    priority="medium"
                >
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="group relative"
                            whileHover={techCardHoverVariants}
                        >
                            <motion.div
                                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                                style={{ background: tech.color }}
                            />
                            <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl group-hover:shadow-3xl group-hover:border-white/30 transition-all duration-500 text-center h-full flex flex-col justify-center">
                                <motion.div
                                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`,
                                        border: `1px solid ${tech.color}30`
                                    }}
                                    whileHover={iconHoverVariants}
                                    transition={{ duration: animationConfig.reduce ? 0 : 0.6 }}
                                >
                                    <ProjectTechIcon tech={tech} />
                                </motion.div>
                                <h3 className="text-white font-black italic text-xl mb-3 group-hover:text-white transition-colors duration-300">{tech.name}</h3>
                                <motion.div
                                    className="w-12 h-1 rounded-full mx-auto"
                                    style={{ backgroundColor: tech.color }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 48 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        delay: index * (animationConfig.reduce ? 0.05 : 0.1) + 0.5, 
                                        duration: animationConfig.reduce ? 0.4 : 0.8 
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

// Enhanced Screenshot Gallery
const ScreenshotGallery = memo(({ images }) => {
    const animationConfig = getAnimationConfig();
    
    const galleryItemHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.01 };
        }
        
        return { scale: 1.02 };
    }, [animationConfig.reduce]);

    return (
        <section className="py-16 sm:py-20 md:py-32">
            <div className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 px-4 sm:px-6 md:px-8">
                <SectionHeader
                    icon={Target}
                    badge="LIVE PREVIEW"
                    title="Visual Showcase"
                    subtitle="Screenshots of the delivered website in all its glory"
                />

                <StaggerContainer
                    staggerDelay={animationConfig.reduce ? 0.15 : 0.3}
                    className="space-y-12 md:space-y-16"
                    priority="medium"
                >
                    {images.map((img, idx) => (
                        <motion.div
                            key={img.src}
                            className="relative group"
                            whileHover={galleryItemHoverVariants}
                            transition={{ duration: animationConfig.reduce ? 0.2 : 0.4, ease: "easeOut" }}
                        >
                            <motion.div
                                className="absolute -inset-4 bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                            />
                            <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/20 group-hover:border-[#ff75df]/30 rounded-3xl p-3 shadow-2xl overflow-hidden transition-all duration-500">
                                <ScrollAnimatedSection
                                    animationType="scale"
                                    delay={idx * (animationConfig.reduce ? 0.1 : 0.2)}
                                    priority="low"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                                        style={{ background: "#18181b" }}
                                    />
                                </ScrollAnimatedSection>
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
    
    // Move pageVariants inside the component
    const pageVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
            };
        }
        
        return {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -40 }
        };
    }, [animationConfig.reduce]); // Add dependency array

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    const project = projects.find(p => p.slug === slug);

    const backgroundEffectsVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                orb1: {
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                },
                orb2: {
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.25, 0.1]
                }
            };
        }
        
        return {
            orb1: {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
            },
            orb2: {
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
            }
        };
    }, [animationConfig.reduce]);

    const heroSectionVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 }
            };
        }
        
        return {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 }
        };
    }, [animationConfig.reduce]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-2xl">Project not found.</div>
            </div>
        );
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
                duration: animationConfig.reduce ? 0.3 : 0.5, 
                ease: "easeInOut" 
            }}
            className="min-h-screen relative overflow-hidden"
        >
            {/* Rest of your component remains the same */}
            <div className="min-h-screen relative overflow-hidden">
                {/* Enhanced Background Effects - Conditional */}
                {canAnimate() && (
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#ff75df]/10 to-purple-500/10 rounded-full blur-3xl"
                            animate={backgroundEffectsVariants.orb1}
                            transition={{ 
                                duration: animationConfig.reduce ? 8 : 12, 
                                repeat: Infinity 
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
                            animate={backgroundEffectsVariants.orb2}
                            transition={{ 
                                duration: animationConfig.reduce ? 10 : 15, 
                                repeat: Infinity, 
                                delay: animationConfig.reduce ? 1.5 : 3 
                            }}
                        />
                    </div>
                )}

                {/* Back Button */}
                <BackButton />

                {/* Hero Section */}
                <motion.div
                    {...heroSectionVariants}
                    transition={{
                        duration: animationConfig.reduce ? 0.5 : 1,
                        delay: animationConfig.reduce ? 0.1 : 0.2
                    }}
                >
                    <ProjectHero project={project} />
                </motion.div>

                {/* Main Content */}
                <div className="relative z-10">
                    <ProjectOverview project={project} />
                    <TechnologyStack techStack={project.techStack} />
                    {project.screenshots?.length > 0 && <ScreenshotGallery images={project.screenshots} />}

                    <ScrollAnimatedSection
                        animationType="fadeUp"
                        delay={0.3}
                        className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 px-4 sm:px-6 md:px-8 pb-20"
                        priority="low"
                    >
                        <NextProjectSection />
                    </ScrollAnimatedSection>
                </div>
            </div>
        </motion.div>
    );
}

export default memo(ProjectPage);
