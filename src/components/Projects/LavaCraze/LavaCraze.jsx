import React, { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Calendar,
    Users,
    Award,
    Code2,
    Palette,
    Database,
    Cloud,
    Smartphone,
    Monitor,
    Globe,
    Zap,
    CheckCircle,
    Star,
    Play,
    ArrowRight,
    Eye
} from 'lucide-react';

import CNImage from '../../../assets/LC-2.png'

// Project data configuration
const projectData = {
    title: "LAVACRAZE",
    subtitle: "Navigation Enhancement Project",
    category: "Web Development",
    categoryIcon: Code2,
    description: "A comprehensive navigation system redesign that transforms user experience through intuitive design and cutting-edge technology implementation.",

    // Project metadata
    meta: {
        year: "2024",
        duration: "6 months",
        team: "Creative Team of 5",
        status: "Completed"
    },

    // Key features with icons
    features: [
        {
            icon: Monitor,
            title: "UI/UX Design",
            description: "Modern, intuitive interface design focused on user experience"
        },
        {
            icon: Code2,
            title: "Frontend Development",
            description: "Responsive web application built with modern technologies"
        },
        {
            icon: Smartphone,
            title: "Mobile App",
            description: "Cross-platform mobile application for seamless navigation"
        },
        {
            icon: Palette,
            title: "Branding",
            description: "Complete brand identity and visual design system"
        }
    ],

    // Technology stack
    techStack: [
        { name: "WordPress", color: "#21759b", icon: "https://cdn-icons-png.flaticon.com/512/174/174881.png" },
        { name: "Elementor", color: "#92003B", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968699.png" },
        { name: "Hostinger", color: "#673de6", icon: "https://www.cdnlogo.com/logos/h/24/hostinger.svg" },
        { name: "Google Analytics", color: "#fbbc05", icon: "https://images.seeklogo.com/logo-png/43/2/google-analytics-2022-logo-png_seeklogo-435447.png" },
    ],

    // Color theme
    colors: {
        primary: "#ff75df",
        secondary: "#8b5cf6",
        accent: "#06b6d4",
        gradient: "from-[#ff75df] to-purple-500"
    },

    // Project links
    links: {
        website: "https://www.lavacraze.com",
        github: "https://github.com/example",
        live: "https://demo.example.com"
    },

    // Project highlights
    highlights: [
        "Lead the way with innovative design approaches",
        "Innovation to follow modern development standards",
        "Seamless integration across all platforms",
        "Enhanced user engagement and retention"
    ],

    // Mobile app features
    mobileFeatures: [
        {
            title: "Real-time Navigation",
            description: "Advanced GPS integration with live traffic updates",
            color: "#ff75df"
        },
        {
            title: "Smart Recommendations",
            description: "AI-powered suggestions based on user preferences",
            color: "#8b5cf6"
        },
        {
            title: "Offline Support",
            description: "Full functionality even without internet connection",
            color: "#06b6d4"
        },
        {
            title: "Performance Analytics",
            description: "Detailed insights and usage statistics",
            color: "#10b981"
        }
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

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const slideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

// Enhanced back button component
const BackButton = memo(() => {
    const navigate = useNavigate();

    const handleBack = useCallback(() => {
        navigate('/');
    }, []);

    return (
        <motion.button
            className="fixed top-1/2 left-6 transform -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white/20 transition-all duration-300 group flex items-center justify-center"
            onClick={handleBack}
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, type: "spring" }}
        >
            <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />

            {/* Minimal tooltip */}
            <motion.div
                className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
            >
                Back
            </motion.div>
        </motion.button>
    );
});

// Project Statistics Component
const ProjectStatistics = memo(() => {
    const stats = [
        { value: "100%", label: "Completion", icon: CheckCircle, color: "text-emerald-400" },
        { value: "5", label: "Team Members", icon: Users, color: "text-blue-400" },
        { value: "6", label: "Months", icon: Calendar, color: "text-amber-400" },
        { value: "4.9", label: "Rating", icon: Star, color: "text-yellow-400" }
    ];

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-left mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                        Project Metrics
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-4 pl-2 leading-[1.15]">
                        Achievement Overview
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full mb-4" />
                    <p className="text-white/70 text-lg max-w-2xl">
                        Key performance indicators showcasing project success and impact
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center group"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group-hover:shadow-2xl shadow-[#ff75df]/10">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff75df]/20 to-purple-500/20 border border-white/20 mb-6 ${stat.color}`}>
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-white/60 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

// Project Overview Component
const ProjectOverview = memo(() => {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Main Content */}
                    <motion.div
                        className="lg:col-span-3 space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div>
                            <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                                About This Project
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-6 leading-tight">
                                A Seamless WordPress Experience for a Modern Brand
                            </h2>
                        </div>

                        <div className="prose prose-lg prose-invert">
                            <p className="text-white/80 text-xl leading-relaxed mb-6">
                                Lava Craze marks our debut website project tailored for a client, constructed using WordPress and powered by Hostinger hosting services. By integrating an array of plugins such as Site Kit, All-in-one SEO, Elementor, Google Analytics, and Autoptimize, our website seamlessly merges cutting-edge technology with captivating design, promising a delightful and user-friendly experience.
                            </p>
                            {/* <p className="text-white/70 text-lg leading-relaxed">
                                The project methodology involved extensive user research, iterative design processes,
                                and advanced development techniques. Every aspect was carefully crafted to ensure
                                optimal performance, accessibility, and user satisfaction across all platforms and devices.
                            </p> */}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <motion.a
                                href={projectData.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-[#ff75df] to-purple-500 text-white px-8 py-4 rounded-xl font-black italic tracking-tight hover:shadow-2xl hover:shadow-[#ff75df]/25 transition-all duration-300 flex items-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play className="w-5 h-5" />
                                Live Demo
                            </motion.a>
                            <motion.a
                                href={projectData.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/20 text-white px-8 py-4 rounded-xl font-black italic tracking-tight hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github className="w-5 h-5" />
                                View Code
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Project Details Sidebar */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-8 shadow-lg shadow-[#ff75df]/10">
                            <div>
                                <h3 className="text-white font-black italic mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-[#ff75df]" />
                                    Project Links
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href={projectData.links.website}
                                        className="text-white/70 hover:text-[#ff75df] transition-colors flex items-center gap-2 group"
                                    >
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        www.lavacraze.com
                                    </a>
                                    <a
                                        href={projectData.links.github}
                                        className="text-white/70 hover:text-[#ff75df] transition-colors flex items-center gap-2 group"
                                    >
                                        <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        GitHub Repository
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-black italic mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#ff75df]" />
                                    Timeline
                                </h3>
                                <div className="text-white/70">
                                    <p className="mb-2">{projectData.meta.duration}</p>
                                    <p className="text-sm text-white/50">Completed in {projectData.meta.year}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-black italic mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#ff75df]" />
                                    Team
                                </h3>
                                <p className="text-white/70">{projectData.meta.team}</p>
                            </div>

                            <div>
                                <h3 className="text-white font-black italic mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-[#ff75df]" />
                                    Status
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-white/70">{projectData.meta.status}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

// Technology Stack Component
const TechnologyStack = memo(() => {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                        Built With
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-4 leading-[1.15]">
                        Technology Stack
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full mb-4 mx-auto" />
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Modern technologies and frameworks powering exceptional digital experiences
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {projectData.techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="group relative flex flex-col items-center justify-center w-40 h-48 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg shadow-[#ff75df]/10 hover:shadow-2xl hover:shadow-[#ff75df]/20 transition-all duration-300"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            whileHover={{ y: -10, scale: 1.07 }}
                        >
                            {/* Floating glow effect */}
                            <motion.div
                                className="absolute -inset-2 rounded-2xl pointer-events-none z-0"
                                style={{
                                    background: `radial-gradient(circle at 60% 40%, ${tech.color}33 0%, transparent 80%)`
                                }}
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-white/10 border border-white/20 shadow-inner"
                                style={{
                                    backgroundColor: `${tech.color}22`,
                                    borderColor: `${tech.color}44`
                                }}
                            >
                                <img src={tech.icon} alt={tech.name + ' logo'} className="w-10 h-10 object-contain" />
                            </div>
                            <h3 className="text-white font-black italic mb-1 text-lg z-10">{tech.name}</h3>
                            <div
                                className="w-10 h-1 rounded-full mt-3 opacity-60 group-hover:opacity-100 transition-opacity mx-auto z-10"
                                style={{ backgroundColor: tech.color }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

// Add this new component above the main LavaCraze function/component
const ScreenshotGallery = memo(({ images }) => (
    <section className="py-20">
        <div className="max-w-5xl mx-auto">
            <motion.div
                className="mb-10 text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                    Website Preview
                </span>
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-4 leading-tight">
                    Screenshots
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full mb-4" />
                <p className="text-white/70 text-lg max-w-2xl">
                    Visual overviews of the live site as delivered.
                </p>
            </motion.div>
            <div className="flex flex-col gap-12">
                {images.map((img, idx) => (
                    <motion.div
                        key={img.src}
                        className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg shadow-[#ff75df]/10 overflow-auto flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                        style={{ width: 900, maxWidth: "100%" }} // width fixed, height auto
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 object-top object-contain"
                            style={{ background: "#18181b" }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
));

// Key Features Component
const KeyFeatures = memo(() => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-left mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                        Core Capabilities
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-4 leading-[1.15]">
                        Key Features
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full mb-4" />
                    <p className="text-white/70 text-lg max-w-2xl">
                        Comprehensive solutions designed to transform user experience and drive engagement
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectData.features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="group relative"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={{ y: -8 }}
                        >
                            {/* Glow effect */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="absolute -inset-4 bg-gradient-to-r from-[#ff75df]/30 to-purple-500/30 rounded-3xl blur-2xl"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 h-full hover:bg-white/15 hover:border-white/30 transition-all duration-300">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-gradient-to-br from-[#ff75df]/20 to-purple-500/20 border border-[#ff75df]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-8 h-8 text-[#ff75df]" />
                                </div>

                                {/* Content */}
                                <h3 className="text-white text-2xl font-black italic mb-4">{feature.title}</h3>
                                <p className="text-white/70 text-lg leading-relaxed mb-6">{feature.description}</p>

                                {/* Learn More Link */}
                                <div className="flex items-center text-[#ff75df] font-black italic group-hover:translate-x-2 transition-transform duration-300">
                                    <span className="mr-2">Learn more</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

// Project Showcase Component
const ProjectShowcase = memo(() => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-lg shadow-[#ff75df]/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left Side - Content */}
                        <div className="p-12 lg:p-16 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                                    Project Highlight
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-6 leading-tight">
                                    Lead the way.<br />
                                    <span className="text-white/60">Innovation to follow.</span>
                                </h2>
                                <p className="text-white/80 text-xl leading-relaxed mb-8">
                                    Our innovative approach combines cutting-edge design principles with advanced
                                    technology implementation. This results in a navigation experience that not only
                                    meets current user expectations but anticipates future needs.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {projectData.highlights.map((highlight, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                        >
                                            <div className="w-2 h-2 bg-[#ff75df] rounded-full flex-shrink-0" />
                                            <span className="text-white/70">{highlight}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <motion.button
                                        className="bg-gradient-to-r from-[#ff75df] to-purple-500 text-white px-8 py-4 rounded-xl font-black italic tracking-tight hover:shadow-2xl hover:shadow-[#ff75df]/25 transition-all duration-300 flex items-center gap-2"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Eye className="w-5 h-5" />
                                        View Case Study
                                    </motion.button>
                                    <motion.button
                                        className="border border-white/20 text-white px-8 py-4 rounded-xl font-black italic tracking-tight hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Documentation
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side - Visual */}
                        <div className="relative bg-gradient-to-br from-gray-900 to-black p-12 lg:p-16 flex items-center justify-center">
                            <motion.div
                                className="relative w-full max-w-md"
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {/* Main showcase mockup */}
                                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-lg shadow-[#ff75df]/10">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#ff75df]/30 to-purple-500/30 rounded-2xl flex items-center justify-center border border-[#ff75df]/40">
                                        <Monitor className="w-12 h-12 text-[#ff75df]" />
                                    </div>
                                    <h3 className="text-white text-2xl font-black italic mb-4">Interactive Demo</h3>
                                    <p className="text-white/70 mb-6">Experience the full navigation system with live interactions and real-time feedback</p>
                                    <div className="bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 rounded-xl p-4 border border-[#ff75df]/30">
                                        <div className="text-white font-black italic mb-2">User Engagement</div>
                                        <div className="text-3xl font-black text-[#ff75df]">+150%</div>
                                        <div className="text-white/60 text-sm">improvement</div>
                                    </div>
                                </div>

                                {/* Floating elements */}
                                <motion.div
                                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl border border-purple-500/40 flex items-center justify-center"
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Zap className="w-8 h-8 text-purple-400" />
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#ff75df]/30 to-red-500/30 rounded-xl border border-[#ff75df]/40 flex items-center justify-center"
                                    animate={{
                                        y: [0, 10, 0],
                                        rotate: [0, -5, 5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                >
                                    <Star className="w-6 h-6 text-[#ff75df]" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

// Mobile Experience Component
const MobileExperience = memo(() => {
    const mobileMockups = useMemo(() =>
        projectData.mobileFeatures.map((feature, index) => (
            <motion.div
                key={feature.title}
                className="w-64 flex-shrink-0"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
            >
                <div className="bg-black rounded-3xl p-3 shadow-2xl">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden h-96 border border-white/20">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 h-full flex flex-col">
                            <div className="flex-1 flex flex-col justify-center">
                                <motion.h4
                                    className="text-2xl font-black italic mb-4"
                                    style={{ color: feature.color }}
                                >
                                    {feature.title}
                                </motion.h4>
                                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                                <motion.button
                                    className="self-start px-6 py-3 rounded-lg font-black italic text-white"
                                    style={{ backgroundColor: feature.color }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )), []
    );

    return (
        <section className="py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-left mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                        Cross-Platform
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-4">
                        Mobile Experience
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full mb-4" />
                    <p className="text-white/70 text-lg max-w-2xl">
                        Seamless navigation across all devices with native app functionality and performance
                    </p>
                </motion.div>

                {/* Mobile mockups carousel */}
                <div className="flex justify-center items-center gap-8 px-8">
                    {mobileMockups}
                </div>

                {/* Mobile features grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {projectData.mobileFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                            whileHover={{ y: -4, scale: 1.02 }}
                        >
                            <div
                                className="w-3 h-3 rounded-full mx-auto mb-4"
                                style={{ backgroundColor: feature.color }}
                            />
                            <h4 className="text-white font-black italic mb-2">{feature.title}</h4>
                            <p className="text-white/60 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    );
});

// Project Impact Component
const ProjectImpact = memo(() => {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-12 lg:p-16 shadow-lg shadow-[#ff75df]/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4 block">
                                Project Impact
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text mb-6 leading-tight">
                                Where Innovation Meets Excellence
                            </h2>
                            <div className="h-1 w-32 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full mb-4" />
                            <p className="text-white/80 text-lg leading-relaxed mb-6">
                                This project picks up where competitors left off. These innovative design approaches
                                were combined with comprehensive app redesign and new website development, all working
                                in parallel to modernize the complete user experience ecosystem.
                            </p>
                            <p className="text-white/70 leading-relaxed mb-8">
                                The versatility of this navigation system extends far beyond initial expectations.
                                It provides exceptional value across multiple industries, from public services to
                                professional applications, demonstrating scalability and adaptability.
                            </p>

                            <div className="flex items-center gap-2 text-white/70">
                                <span>Interested in similar solutions?</span>
                                <motion.a
                                    href="#"
                                    className="text-[#ff75df] hover:text-purple-400 font-black italic flex items-center gap-2 group"
                                    whileHover={{ x: 4 }}
                                >
                                    Let's collaborate!
                                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </motion.a>
                            </div>
                        </motion.div>

                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Impact metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { metric: "150%", label: "User Engagement", icon: Users },
                                    { metric: "98%", label: "Performance Score", icon: Zap },
                                    { metric: "45%", label: "Load Time Reduction", icon: Globe },
                                    { metric: "5★", label: "Client Rating", icon: Star }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-4 text-center"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                    >
                                        <item.icon className="w-6 h-6 text-[#ff75df] mx-auto mb-2" />
                                        <div className="text-2xl font-black text-white mb-1">{item.metric}</div>
                                        <div className="text-white/60 text-sm">{item.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional info */}
                            <div className="bg-gradient-to-r from-[#ff75df]/10 to-purple-500/10 border border-[#ff75df]/20 rounded-xl p-6">
                                <h4 className="text-white font-black italic mb-3 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-[#ff75df]" />
                                    Recognition
                                </h4>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    This project has been recognized for its innovative approach to digital navigation
                                    and has set new benchmarks in the industry for user experience design.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
});

// Next Project Section (keeping original)
const NextProjectSection = memo(() => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleProjectClick = useCallback(() => {
        // Navigate to next project or projects page
        navigate('/projects/next-project');
    }, [navigate]);

    return (
        <motion.div
            className="relative h-full flex items-center justify-end overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >

            {/* Next Project Label */}
            <motion.div
                className="absolute top-0 right-0 z-20"
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
                className="relative z-10 mr-8 cursor-pointer"
                style={{
                    transformOrigin: "100% 50%", // Right center - this is the hinge point
                    perspective: "1000px"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleProjectClick}
            >
                {/* Solid filled text (appears on hover) */}
                <motion.h2
                    // tracking-tight italic font-black text-transparent bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] italic font-black uppercase tracking-tight text-white select-none"
                    initial={{
                        opacity: 0,
                        rotateY: -20 // Start swung out
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        rotateY: isHovered ? 0 : -20 // Swing in on hover
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1] // Custom easing for smooth door swing
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 2,
                        transformOrigin: "100% 50%" // Right center hinge
                    }}
                >
                    LAVACRAZE
                </motion.h2>

                {/* Outlined text (default swung out state) */}
                <motion.h2
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] italic font-black uppercase tracking-tight text-transparent select-none"
                    style={{
                        WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                        position: 'relative',
                        zIndex: 1,
                        transformOrigin: "100% 50%" // Right center hinge
                    }}
                    initial={{
                        rotateY: -20, // Start swung out
                        opacity: 1
                    }}
                    animate={{
                        rotateY: isHovered ? 0 : -20, // Swing in on hover
                        opacity: isHovered ? 0 : 1 // Fade out on hover
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1] // Custom easing for smooth door swing
                    }}
                >
                    LAVACRAZE
                </motion.h2>
            </motion.div>
        </motion.div>
    );
});

// Main LavaCraze Component
function LavaCraze() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#ff75df]/10 to-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />
            </div>

            {/* Back Button */}
            <BackButton />

            {/* Hero Section (keeping original) */}
            <motion.div
                className="relative flex flex-col justify-center pt-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* <motion.div
                    className="absolute z-20"
                    style={{
                        top: '14%',
                        right: '20%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h1
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl italic tracking-tight font-black text-transparent select-none pointer-events-none"
                        style={{
                            WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                        }}
                    >
                        {projectData.title}
                    </h1>
                </motion.div> */}

                {/* Hero Image */}
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
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <img
                        src={CNImage}
                        alt="Project showcase"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20">

                {/* Project Statistics */}
                {/* <ProjectStatistics /> */}

                {/* Project Overview */}
                <ProjectOverview />

                {/* Technology Stack */}
                <TechnologyStack />

                {/* Screenshot Gallery */}
                <ScreenshotGallery images={screenshots} />

                {/* Key Features */}
                {/* <KeyFeatures /> */}

                {/* Project Showcase */}
                {/* <ProjectShowcase /> */}

                {/* Mobile Experience */}
                {/* <MobileExperience /> */}

                {/* Project Impact */}
                {/* <ProjectImpact /> */}

                <NextProjectSection />

            </div>
        </div>
    );
}

export default memo(LavaCraze);