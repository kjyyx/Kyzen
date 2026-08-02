import React, { useEffect, memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    Star
} from 'lucide-react';
import NextProjectSection from '../NextProjectSection';
import BackgroundImage from '../../../assets/Projects_Icons/Lavacraze_bg.png';

import ScrollAnimatedSection from '../../../common/ScrollAnimatedSection';
import StaggerContainer from '../../../common/StaggerContainer';
import { useScrollAnimation, useHeroScrollAnimation } from '../../../hooks/useScrollAnimation';

// --- Project Data ---
const projectData = {
    title: "LAVACRAZE",
    meta: {
        year: "2024",
        status: "Completed"
    },
    techStack: [
        { name: "WordPress", color: "#21759b", icon: "https://cdn-icons-png.flaticon.com/512/174/174881.png" },
        { name: "Elementor", color: "#92003B", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968699.png" },
        { name: "Hostinger", color: "#673de6", icon: "https://www.cdnlogo.com/logos/h/24/hostinger.svg" },
        { name: "Google Analytics", color: "#fbbc05", icon: "https://images.seeklogo.com/logo-png/43/2/google-analytics-2022-logo-png_seeklogo-435447.png" },
    ],
    links: {
        website: "https://www.lavacraze.com",
        github: "https://github.com/example",
        live: "https://demo.example.com"
    },
    teamMembers: [
        { name: "Kenji Jaculbia", role: "Full-Stack Developer" },
        { name: "Jane Doe", role: "UI/UX Designer" },
        { name: "John Smith", role: "Content Strategist" },
        { name: "Alex Lee", role: "SEO Specialist" },
    ],
    highlights: [
        "First client website project",
        "SEO optimized structure",
        "Mobile-responsive design",
        "Integrated analytics tracking"
    ]
};

const screenshots = [
    {
        src: "../src/assets/Webpage_Screenshots/LC (1).png",
        alt: "LavaCraze Homepage Fullpage Screenshot"
    },
    {
        src: "../src/assets/Webpage_Screenshots/LC (2).png",
        alt: "LavaCraze Articles Fullpage Screenshot"
    },
];

// --- Back Button ---
const BackButton = memo(() => {
    const navigate = useNavigate();
    const handleBack = useCallback(() => navigate('/'), []);

    return (
        <motion.button
            className="fixed top-1/2 left-6 transform -translate-y-1/2 z-50 w-8 h-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-display hover:bg-white/20 transition-all duration-300 group flex items-center justify-center"
            onClick={handleBack}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, type: "tween" }}
        >
            <ArrowLeft className="w-6 h-6" />
            <motion.div
                className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-display text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
            >
                Back
            </motion.div>
        </motion.button>
    );
});

// --- Section Header Component ---
const SectionHeader = memo(({ icon: Icon, badge, title, subtitle, delay = 0.2 }) => (
    <ScrollAnimatedSection
        animationType="fadeUp"
        delay={delay}
        className="text-center mb-12 sm:mb-16 md:mb-20"
    >
        <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-light/20 to-brand/20 backdrop-blur-sm border border-brand-light/30 rounded-full mb-6"
            whileHover={{ scale: 1.02 }}
        >
            <Icon className="w-4 h-4 text-brand-light" />
            <span className="text-foreground-secondary text-sm font-display-medium tracking-wide">{badge}</span>
        </motion.div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-black-italic text-transparent bg-gradient-to-r from-white via-brand-light to-brand-light bg-clip-text mb-6 leading-[0.9]">
            {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-light to-brand-light rounded-full mx-auto mb-4" />
        {subtitle && (
            <p className="text-foreground-secondary/80 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-4">
                {subtitle}
            </p>
        )}
    </ScrollAnimatedSection>
));

// --- Enhanced Project Overview ---
const ProjectOverview = memo(() => (
    <section className="py-16 sm:py-12 sm:py-16 md:py-32 relative">
        <div className="max-w-[1366px] mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <SectionHeader
                icon={Sparkles}
                badge="PROJECT SHOWCASE"
                title="Project Overview"
                subtitle="A comprehensive look at the development process and key achievements"
            />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-8 items-start">
                {/* Main Content */}
                <ScrollAnimatedSection
                    animationType="fadeLeft"
                    delay={0.3}
                    className="xl:col-span-7 space-y-5 sm:space-y-6 md:space-y-12"
                >
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-10 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 bg-brand-light rounded-full" />
                                <span className="text-brand-light text-sm font-display-heavy uppercase tracking-widest">
                                    WordPress Excellence
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-display-black-italic text-display mb-6 leading-tight">
                                A Seamless WordPress Experience for a Modern Brand
                            </h3>
                            <p className="text-foreground-secondary/90 text-sm sm:text-base leading-relaxed mb-8">
                                Lava Craze marks our debut website project tailored for a client, constructed using WordPress and powered by Hostinger hosting services. By integrating an array of plugins such as Site Kit, All-in-one SEO, Elementor, Google Analytics, and Autoptimize, our website seamlessly merges cutting-edge technology with captivating design.
                            </p>

                            {/* Key Highlights */}
                            <StaggerContainer
                                staggerDelay={0.1}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                            >
                                {projectData.highlights.map((highlight, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                                    >
                                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-foreground-secondary font-display-medium">{highlight}</span>
                                    </div>
                                ))}
                            </StaggerContainer>

                            {/* Action Buttons */}
                            <StaggerContainer
                                staggerDelay={0.2}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.a
                                    href={projectData.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden bg-gradient-to-r from-brand-light to-brand text-display px-6 md:px-8 py-3 md:py-4 rounded-2xl font-display-black-italic transition-all duration-300 flex items-center gap-3"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Play className="w-5 h-5" />
                                    <span>Live Demo</span>
                                </motion.a>
                                <motion.a
                                    href={projectData.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group border-2 border-white/20 text-display px-6 md:px-8 py-3 md:py-4 rounded-2xl font-display-black-italic hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-3"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Github className="w-5 h-5" />
                                    View Code
                                </motion.a>
                            </StaggerContainer>
                        </div>
                    </div>
                </ScrollAnimatedSection>

                {/* Enhanced Sidebar */}
                <ScrollAnimatedSection
                    animationType="fadeRight"
                    delay={0.4}
                    className="xl:col-span-5 space-y-6"
                >
                    {/* Project Status Card */}
                    <div className="bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-5 sm:p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-display font-display-black-italic text-xl flex items-center gap-3">
                                <Award className="w-6 h-6 text-brand-light" />
                                Project Status
                            </h3>
                            <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-400/20 border border-emerald-400/30 rounded-full">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                                    <span className="text-emerald-400 font-display-heavy text-sm">{projectData.meta.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-foreground-secondary/80">
                            <Calendar className="w-5 h-5 text-brand-light" />
                            <span className="font-display-medium">Delivered in {projectData.meta.year}</span>
                        </div>
                    </div>

                    {/* Project Links Card */}
                    <div className="bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-5 sm:p-6 shadow-lg">
                        <h3 className="text-display font-display-black-italic text-xl mb-6 flex items-center gap-3">
                            <Globe className="w-6 h-6 text-brand-light" />
                            Project Links
                        </h3>
                        <StaggerContainer
                            staggerDelay={0.1}
                            className="space-y-4"
                        >
                            <motion.a
                                href={projectData.links.website}
                                className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-brand-light/30 transition-all duration-300"
                                whileHover={{ x: 4 }}
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-brand-light/20 to-brand-light/20 rounded-xl flex items-center justify-center">
                                    <ExternalLink className="w-5 h-5 text-brand-light" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-display font-display-heavy">Live Website</div>
                                    <div className="text-foreground-muted text-sm truncate">www.lavacraze.com</div>
                                </div>
                            </motion.a>
                            <motion.a
                                href={projectData.links.github}
                                className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-brand-light/30 transition-all duration-300"
                                whileHover={{ x: 4 }}
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-brand-light/20 to-brand-light/20 rounded-xl flex items-center justify-center">
                                    <Github className="w-5 h-5 text-brand-light" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-display font-display-heavy">Source Code</div>
                                    <div className="text-foreground-muted text-sm truncate">GitHub Repository</div>
                                </div>
                            </motion.a>
                        </StaggerContainer>
                    </div>
                </ScrollAnimatedSection>
            </div>

            {/* Team Section */}
            <ScrollAnimatedSection
                animationType="fadeUp"
                delay={0.5}
                className="mt-16 md:mt-20"
            >
                <div className="text-center mb-12">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-light/20 to-brand/20 backdrop-blur-sm border border-brand-light/30 rounded-full mb-6"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Users className="w-4 h-4 text-brand-light" />
                        <span className="text-foreground-secondary text-sm font-display-medium tracking-wide">DREAM TEAM</span>
                    </motion.div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display-black-italic text-transparent bg-gradient-to-r from-white via-brand-light to-brand-light bg-clip-text mb-4 leading-tight">
                        Meet the Team
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-brand-light to-brand-light rounded-full mx-auto mb-4" />
                    <p className="text-foreground-secondary/80 text-sm sm:text-base max-w-2xl mx-auto">
                        The talented individuals who brought this project to life
                    </p>
                </div>

                <StaggerContainer
                    staggerDelay={0.15}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
                >
                    {projectData.teamMembers.map((member, idx) => (
                        <motion.div
                            key={member.name}
                            className="group text-center"
                            whileHover={{ y: -2, scale: 1.01 }}
                            transition={{ type: "tween", stiffness: 300, damping: 20 }}
                        >
                            <div className="relative w-16 h-16 mx-auto mb-4">
                                <div className="w-full h-full bg-gradient-to-br from-brand-light to-brand-light rounded-full flex items-center justify-center text-display font-display-heavy text-xl shadow-lg">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {idx === 0 && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <Star className="w-3 h-3 text-yellow-900" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-display font-display-heavy text-lg mb-1 group-hover:text-brand-light transition-colors duration-300">
                                    {member.name}
                                </h4>
                                <p className="text-foreground-muted text-sm font-display-medium uppercase tracking-wide">
                                    {member.role}
                                </p>
                            </div>

                            <div className="w-8 h-0.5 bg-gradient-to-r from-brand-light to-brand-light rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </StaggerContainer>
            </ScrollAnimatedSection>
        </div>
    </section>
));

// --- Enhanced Technology Stack ---
const TechnologyStack = memo(() => (
    <section className="py-16 sm:py-12 sm:py-16 md:py-32 relative">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8">
            <SectionHeader
                icon={Zap}
                badge="TECH STACK"
                title="Built With Excellence"
                subtitle="Cutting-edge technologies and frameworks powering exceptional digital experiences"
            />

            <StaggerContainer
                staggerDelay={0.2}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
                {projectData.techStack.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        className="group relative"
                        whileHover={{
                            y: -2,
                            scale: 1.02,
                            transition: { type: "tween", stiffness: 300, damping: 20 }
                        }}
                    >
                        <motion.div
                            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                            style={{ background: tech.color }}
                        />
                        <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-5 sm:p-6 shadow-lg group-hover:shadow-3xl group-hover:border-white/30 transition-all duration-500 text-center h-full flex flex-col justify-center">
                            <motion.div
                                className="w-8 h-8 mx-auto mb-6 rounded-2xl flex items-center justify-center relative overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`,
                                    border: `1px solid ${tech.color}30`
                                }}
                                whileHover={{ rotate: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img src={tech.icon} alt={tech.name + ' logo'} className="w-8 h-8 object-contain relative z-10" />
                            </motion.div>
                            <h3 className="text-display font-display-black-italic text-xl mb-3 group-hover:text-display transition-colors duration-300">{tech.name}</h3>
                            <motion.div
                                className="w-12 h-1 rounded-full mx-auto"
                                style={{ backgroundColor: tech.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: 48 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </StaggerContainer>
        </div>
    </section>
));

// --- Enhanced Screenshot Gallery ---
const ScreenshotGallery = memo(({ images }) => (
    <section className="py-16 sm:py-12 sm:py-16 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <SectionHeader
                icon={Target}
                badge="LIVE PREVIEW"
                title="Visual Showcase"
                subtitle="Screenshots of the delivered website in all its glory"
            />

            <StaggerContainer
                staggerDelay={0.3}
                className="space-y-12 md:space-y-16"
            >
                {images.map((img, idx) => (
                    <motion.div
                        key={img.src}
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <motion.div
                            className="absolute -inset-4 bg-gradient-to-r from-brand-light/20 to-brand/20 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                        />
                        <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-md border border-white/20 group-hover:border-brand-light/30 rounded-2xl p-3 shadow-lg overflow-hidden transition-all duration-500">
                            <ScrollAnimatedSection
                                animationType="scale"
                                delay={idx * 0.2}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto rounded-2xl shadow-lg border border-white/10"
                                    style={{ background: "#18181b" }}
                                />
                            </ScrollAnimatedSection>
                        </div>
                    </motion.div>
                ))}
            </StaggerContainer>
        </div>
    </section>
));

// --- Main LavaCraze Component ---
function LavaCraze() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen relative overflow-hidden"
        >
            <div className="min-h-screen relative overflow-hidden">
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-96 h-72 sm:h-80 bg-gradient-to-br from-brand-light/10 to-brand/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 12, repeat: 0 }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-brand/10 to-blue-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 15, repeat: 0, delay: 3 }}
                    />
                </div>

                {/* Back Button */}
                <BackButton />

                {/* Hero Section with immediate animation on mount */}
                <motion.div
                    className="relative flex flex-col justify-center pt-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <motion.div
                        className="relative overflow-hidden ml-[calc(-50vw+50%)]"
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: 'calc(85vh - 236px)',
                            margin: 'calc(108px - 1.5vh) 0 calc(40px)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top',
                            backgroundSize: 'cover'
                        }}
                        initial={{ opacity: 0, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                    >
                        <img
                            src={BackgroundImage}
                            alt="Project showcase"
                            className="w-full h-full object-cover object-center"
                        />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        />
                    </motion.div>
                </motion.div>

                {/* Main Content */}
                <div className="relative z-10">
                    <ProjectOverview />
                    <TechnologyStack />
                    <ScreenshotGallery images={screenshots} />
                    <ScrollAnimatedSection
                        animationType="fadeUp"
                        delay={0.3}
                        className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16"
                    >
                        <NextProjectSection />
                    </ScrollAnimatedSection>
                </div>
            </div>
        </motion.div>
    );
}

export default memo(LavaCraze);