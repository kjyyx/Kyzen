import React, { useEffect, memo, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    Star
} from 'lucide-react';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';
import '../Home/Home.css';

import { getAnimationConfig } from '../../utils/helpers';

// Status color map - consistent, brand-safe
const STATUS_COLORS = {
    Live: '#10b981',
    Completed: '#3b82f6',
    Maintained: '#028582',
    'In Progress': '#f59e0b'
};

// ===== SECTION HEADER - Portfolio Pattern (Left-aligned) =====
const SectionHeader = memo(({ line1, line2, delay = 0.2 }) => {
    const animationConfig = getAnimationConfig();

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={animationConfig.reduce ? delay * 0.5 : delay}
            className="w-full flex justify-start mb-8 sm:mb-10 relative"
            priority="high"
        >
            <div className="relative w-full">
                <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-10 bg-accent" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-muted">Case Study</span>
                </div>
                <motion.h2
                    className="text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-3xl sm:text-4xl md:text-[2.8rem] font-display-black-italic leading-none text-left"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: animationConfig.reduce ? 0.3 : 0.45, ease: "easeOut" }}
                    style={{ textShadow: '0 0 24px rgba(2, 133, 130, 0.18)' }}
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
                    className="absolute -bottom-3 left-0 h-0.5 bg-gradient-to-r from-brand-light via-brand-light to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "7rem" }}
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

// ===== HERO SECTION - Full-bleed with overlaid content =====
const HeroSection = memo(({ project, animationConfig }) => {
    const navigate = useNavigate();
    const handleBack = useCallback(() => navigate('/'), [navigate]);
    const statusColor = STATUS_COLORS[project.meta?.status] || '#028582';

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ height: 'calc(78vh - 4rem)', minHeight: '460px', maxHeight: '780px' }}
        >
            {/* Background image */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: animationConfig.reduce ? 0.4 : 0.7,
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

            {/* Gradient overlays - left-anchored and bottom-anchored */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#011417] via-[#011417]/70 to-[#011417]/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#011417]/88 via-[#011417]/34 to-transparent pointer-events-none" />

            {/* Back breadcrumb - top left */}
            <motion.div
                className="absolute top-20 left-0 right-0 z-[3] max-w-[1366px] mx-auto px-6 md:px-8 lg:px-12"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: animationConfig.reduce ? 0.2 : 0.4, duration: 0.5 }}
            >
                <motion.button
                    onClick={handleBack}
                    className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-border-brand bg-surface/75 text-foreground-secondary font-display-medium text-xs sm:text-sm hover:border-border-brand-strong hover:bg-surface-hover/80 transition-all duration-200"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    <span className="font-display-black-italic">Back to Portfolio</span>
                </motion.button>
            </motion.div>

            {/* Hero content - bottom-left anchored */}
            <div className="absolute inset-0 flex flex-col justify-end z-[3] pointer-events-none">
                <div className="max-w-[1180px] mx-auto w-full px-6 md:px-8 pb-10 sm:pb-14 md:pb-18 pointer-events-auto">

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
                        className="text-[clamp(2.35rem,5vw,4.65rem)] font-display-black-italic text-transparent bg-gradient-to-r from-white via-white/95 to-brand-light bg-clip-text leading-none mb-4 max-w-4xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: animationConfig.reduce ? 0.35 : 0.65,
                            duration: animationConfig.reduce ? 0.5 : 0.9,
                            ease: 'easeOut'
                        }}
                        style={{ textShadow: '0 0 42px rgba(2, 133, 130, 0.24)' }}
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

                    {/* Meta row - status, tech tags, CTAs */}
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
                                &middot; {project.meta?.year}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-4 bg-white/20" />

                        {/* Tech tags - first 4 */}
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
                                className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white to-white/95 text-foreground-dark font-display-medium transition-all duration-200 overflow-hidden relative text-xs sm:text-sm hover:-translate-y-px"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-light/10 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 relative z-10" />
                                <span className="font-display-black-italic relative z-10">Live Site</span>
                            </a>
                        )}
                        {project.links?.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-border-brand bg-surface/75 text-foreground-secondary font-display-medium text-xs sm:text-sm hover:border-border-brand-strong hover:bg-surface-hover/80 hover:-translate-y-px transition-all duration-200"
                            >
                                <Github className="w-3.5 h-3.5 group-hover:text-brand-light transition-colors" />
                                <span className="font-display-black-italic">Source</span>
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
        x: animationConfig.reduce ? 1 : 2
    }), [animationConfig.reduce]);

    const teamMemberHoverVariants = useMemo(() => ({
        y: animationConfig.reduce ? -1 : -2,
        scale: 1.01
    }), [animationConfig.reduce]);

    return (
        <section className="py-14 sm:py-16 md:py-20 relative">
            <div className="mx-auto w-full max-w-[1180px] relative z-10 px-6 md:px-8">

                <SectionHeader line1="Project" line2="Overview" delay={0.2} />

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-start">

                    {/* -- Left: Main content card -- */}
                    <ScrollAnimatedSection
                        animationType="fadeLeft"
                        delay={0.3}
                        className="xl:col-span-7 space-y-6"
                        priority="high"
                    >
                        <div className="relative bg-surface/92 border border-border-brand hover:border-border-brand-strong rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg transition-colors duration-200">
                            {/* Top accent line */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-light/25 to-transparent rounded-full" />

                            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-muted mb-3">Brief</p>
                            <h3 className="text-xl md:text-2xl lg:text-[2rem] font-display-black-italic text-display mb-5 leading-tight">
                                {project.subtitle}
                            </h3>
                            <p className="text-foreground-secondary/90 text-sm sm:text-base leading-[1.8] mb-8 max-w-3xl">
                                {project.description}
                            </p>

                            {/* Key Highlights */}
                            <StaggerContainer
                                staggerDelay={animationConfig.reduce ? 0.05 : 0.1}
                                className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-8"
                                priority="medium"
                            >
                                {project.highlights.map((highlight, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 bg-background-soft/70 rounded-xl border border-border-brand hover:bg-surface-hover/70 hover:border-border-brand-strong transition-colors duration-200"
                                    >
                                        <CheckCircle className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="text-foreground-secondary/90 font-display-medium text-sm">{highlight}</span>
                                    </div>
                                ))}
                            </StaggerContainer>

                        </div>
                    </ScrollAnimatedSection>

                    {/* -- Right: Sidebar cards -- */}
                    <ScrollAnimatedSection
                        animationType="fadeRight"
                        delay={0.4}
                        className="xl:col-span-5 space-y-4 xl:sticky xl:top-24"
                        priority="high"
                    >
                        {/* Status Card */}
                        <div className="relative bg-surface/90 border border-border-brand hover:border-border-brand-strong rounded-2xl p-5 shadow-lg transition-colors duration-200">
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
                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border-brand pt-4">
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">Role</p>
                                    <p className="mt-1 text-sm font-display-black-italic text-display">{project.teamMembers?.[0]?.role || 'Developer'}</p>
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">Stack</p>
                                    <p className="mt-1 text-sm font-display-black-italic text-display">{project.techStack.length} tools</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-surface/90 border border-border-brand hover:border-border-brand-strong rounded-2xl p-5 shadow-lg transition-colors duration-200">
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-light/20 to-transparent rounded-full" />
                            <h3 className="text-display font-display-black-italic text-lg mb-4">Primary Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.slice(0, 6).map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="rounded-full border border-border-brand bg-background-soft/70 px-3 py-1.5 text-xs font-display-medium text-foreground-secondary"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links Card */}
                        <div className="relative bg-surface/90 border border-border-brand hover:border-border-brand-strong rounded-2xl p-5 shadow-lg transition-colors duration-200">
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
                                        className="group flex items-center gap-3 p-3 bg-background-soft/70 hover:bg-surface-hover/80 rounded-xl border border-border-brand hover:border-border-brand-strong transition-all duration-200"
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
                                        className="group flex items-center gap-3 p-3 bg-background-soft/70 hover:bg-surface-hover/80 rounded-xl border border-border-brand hover:border-border-brand-strong transition-all duration-200"
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
                                        className="group flex items-center gap-3 p-3 bg-background-soft/70 hover:bg-surface-hover/80 rounded-xl border border-border-brand hover:border-border-brand-strong transition-all duration-200"
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
                                {!project.links?.github && !project.links?.website && !project.links?.additional?.length && (
                                    <div className="rounded-xl border border-border-brand bg-background-soft/60 p-3 text-xs leading-relaxed text-foreground-muted">
                                        Source code is unavailable for some older or client-owned work.
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollAnimatedSection>
                </div>

                {/* -- Team Section -- */}
                <ScrollAnimatedSection
                    animationType="fadeUp"
                    delay={0.5}
                    className="mt-14 sm:mt-16"
                    priority="medium"
                >
                    <SectionHeader line1="The" line2="Team" delay={0.1} />

                    <StaggerContainer
                        staggerDelay={animationConfig.reduce ? 0.08 : 0.15}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 justify-items-center"
                        priority="medium"
                    >
                        {project.teamMembers.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                className="group text-center"
                                whileHover={teamMemberHoverVariants}
                                transition={{ type: "tween", duration: 0.2 }}
                            >
                                <div className="relative w-12 h-12 mx-auto mb-3">
                                    <div className="w-full h-full bg-gradient-to-br from-brand-light to-brand rounded-full flex items-center justify-center text-display font-display-black-italic text-base shadow-lg shadow-brand-light/20">
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
        <section className="py-14 sm:py-16 md:py-20 relative">
            <div className="mx-auto w-full max-w-[1180px] px-6 md:px-8">
                <SectionHeader line1="Built" line2="With" delay={0.2} />

                <StaggerContainer
                    staggerDelay={animationConfig.reduce ? 0.06 : 0.08}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
                    priority="medium"
                >
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="group relative"
                            whileHover={{ y: -2, scale: 1.01, transition: { type: "tween", duration: 0.2 } }}
                        >
                            <div className="relative bg-surface/90 border border-border-brand group-hover:border-border-brand-strong rounded-2xl p-3.5 shadow-lg transition-all duration-200 flex items-center gap-3 text-left h-full">
                                {/* Top accent */}
                                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand-light/15 to-transparent" />

                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/90 flex-shrink-0"
                                    style={{
                                        border: `1px solid ${tech.color}30`
                                    }}
                                >
                                    <img src={tech.icon} alt={tech.name + ' logo'} className="w-6 h-6 object-contain" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-display font-display-black-italic text-sm leading-tight">{tech.name}</h3>
                                    <motion.div
                                        className="mt-2 h-0.5 rounded-full"
                                        style={{ backgroundColor: tech.color }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 28 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: index * (animationConfig.reduce ? 0.03 : 0.05) + 0.2,
                                            duration: animationConfig.reduce ? 0.3 : 0.45
                                        }}
                                    />
                                </div>
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
    const [featuredImage, ...supportingImages] = images;
    const getCaptureLabel = useCallback((alt, index) => {
        const cleaned = alt
            .replace(/^Razor Payments\s*/i, '')
            .replace(/^Superior Business Networks\s*/i, '')
            .replace(/\spage$/i, '')
            .trim();

        return cleaned || (index === 0 ? 'Homepage' : `Capture ${index + 1}`);
    }, []);

    return (
        <section className="py-14 sm:py-16 md:py-20">
            <div className="mx-auto w-full max-w-[1180px] px-6 md:px-8">
                <SectionHeader line1="Visual" line2="Showcase" delay={0.2} />

                <div className="space-y-6 sm:space-y-8">
                    <ScrollAnimatedSection
                        animationType="scale"
                        delay={0.1}
                        priority="medium"
                    >
                        <motion.div
                            className="relative group"
                            whileHover={{ y: animationConfig.reduce ? 0 : -2 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <a
                                href={featuredImage.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative rounded-2xl overflow-hidden border border-border-brand group-hover:border-border-brand-strong bg-surface/90 p-2 sm:p-3 shadow-[0_0_32px_rgba(2,133,130,0.08)] transition-colors duration-200"
                            >
                                <div className="flex h-8 items-center gap-2 rounded-t-xl border border-b-0 border-border-brand bg-background-soft/90 px-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-brand-light/80" />
                                    <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                                        {getCaptureLabel(featuredImage.alt, 0)} / full-page capture
                                    </span>
                                </div>
                                <div className="relative h-[420px] sm:h-[520px] lg:h-[620px] overflow-hidden rounded-b-xl border border-border-brand bg-background-soft">
                                    <img
                                        src={featuredImage.src}
                                        alt={featuredImage.alt}
                                        className="h-auto min-h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-background via-background/80 to-transparent p-4 sm:p-5">
                                        <div>
                                            <p className="font-display-black-italic text-base text-display">{getCaptureLabel(featuredImage.alt, 0)}</p>
                                            <p className="mt-1 text-xs text-foreground-muted">Cropped preview. Open to view full page.</p>
                                        </div>
                                        <ExternalLink className="h-4 w-4 flex-shrink-0 text-brand-light" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-light/25 to-transparent" />
                            </a>
                        </motion.div>
                    </ScrollAnimatedSection>

                    {supportingImages.length > 0 && (
                        <StaggerContainer
                            staggerDelay={animationConfig.reduce ? 0.08 : 0.12}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
                            priority="medium"
                        >
                            {supportingImages.map((img, index) => (
                                <motion.div
                                    key={img.src}
                                    className="relative group"
                                    whileHover={{ y: animationConfig.reduce ? 0 : -2 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    <a
                                        href={img.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative rounded-2xl overflow-hidden border border-border-brand group-hover:border-border-brand-strong bg-surface/90 p-2 shadow-lg transition-colors duration-200"
                                    >
                                        <div className="flex h-7 items-center gap-1.5 rounded-t-xl border border-b-0 border-border-brand bg-background-soft/90 px-2.5">
                                            <span className="h-2 w-2 rounded-full bg-red-400/60" />
                                            <span className="h-2 w-2 rounded-full bg-accent/70" />
                                            <span className="h-2 w-2 rounded-full bg-brand-light/70" />
                                            <span className="ml-1 truncate font-mono text-[9px] uppercase tracking-[0.12em] text-foreground-muted">
                                                {getCaptureLabel(img.alt, index + 1)}
                                            </span>
                                        </div>
                                        <div className="relative h-[260px] sm:h-[320px] overflow-hidden rounded-b-xl bg-background-soft">
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="h-auto min-h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-3">
                                                <p className="text-xs font-display-black-italic text-foreground-secondary">{getCaptureLabel(img.alt, index + 1)}</p>
                                                <p className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.12em] text-foreground-muted">Open full capture</p>
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </StaggerContainer>
                    )}
                </div>
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
            className="project-page project-detail-page min-h-screen relative overflow-hidden"
        >
            <div id="main-bg" className="z-10"></div>

            {/* Hero Section */}
            <HeroSection project={project} animationConfig={animationConfig} />

            {/* Main Content */}
            <div className="relative z-[1]">
                <ProjectOverview project={project} />
                <TechnologyStack techStack={project.techStack} />
                {project.screenshots && project.screenshots.length > 0 && (
                    <ScreenshotGallery images={project.screenshots} />
                )}

                <ScrollAnimatedSection
                    animationType="fadeUp"
                    delay={0.3}
                    className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 max-w-[1366px] px-6 md:px-8 pb-16 sm:pb-20"
                    priority="low"
                >
                    <NextProjectSection />
                </ScrollAnimatedSection>
            </div>
        </motion.div>
    );
}

export default memo(ProjectPage);
