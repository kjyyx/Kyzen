import React, { useState, memo, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Grid3X3,
    Code2,
    Cloud,
    Shield,
    Wifi,
    ExternalLink,
    Award,
    Calendar,
    CheckCircle
} from 'lucide-react';
import './CertificateGrid.css'

import AWSCertImage from '../../assets/Certificates/AWS_Academy_Cloud_Foundations-1.webp';
import AWSCertPDF from '../../assets/Certificates/AWS_Academy_Cloud_Foundations.pdf';
import CyberSecurityCertImage from '../../assets/Certificates/Introduction_to_Cybersecurity-1.webp';
import CyberSecurityCertPDF from '../../assets/Certificates/Introduction_to_Cybersecurity.pdf';
import IoTCertImage from '../../assets/Certificates/Introduction_to_IoT-1.webp';
import IoTCertPDF from '../../assets/Certificates/Introduction_to_IoT.pdf';
import JSCertImage from '../../assets/Certificates/JavaScriptEssentials-1.webp';
import JSCertPDF from '../../assets/Certificates/JavaScriptEssentials.pdf';
import CyberOpsCertImage from '../../assets/Certificates/CyberOps_Associate-1.webp';
import CyberOpsCertPDF from '../../assets/Certificates/CyberOps_Associate.pdf';

import RedHatSeminar from '../../assets/Seminars/RedHat_Certificate.webp';
import CybersecurityAISeminar from '../../assets/Seminars/Cybersecurity_AI_Certificate.webp';
import GitSeminar from '../../assets/Seminars/Git_Certificate.webp';
import BlockchainSeminar from '../../assets/Seminars/Blockchain_Certificate.webp';
import CyberResilienceSeminar from '../../assets/Seminars/Cyber_Resilience_Certificate.webp';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';
import { useScrollAnimation, useStaggerScrollAnimation } from '../../hooks/useScrollAnimation';

import { 
    getAnimationConfig, 
    canAnimate, 
    createStaggerDelay 
} from '../../utils/helpers';
import { 
    ANIMATION_DURATION, 
    EASING, 
    PERFORMANCE 
} from '../../utils/constants';

// ===== DATA CONFIGURATION =====
const certificates = [
    {
        title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
        issuer: "Amazon Web Services Training and Certification",
        date: "April 23, 2024",
        image: AWSCertImage,
        skills: ["AWS Architecture", "AWS Cloud", "AWS Core Services", "AWS Pricing", "AWS Support"],
        verification: AWSCertPDF,
        credentialId: "a99d8a81-6fc2-4b92-96f8-6c01d7dbaa6a",
        category: "Cloud",
        description: "Earners of this badge have taken the AWS Academy Cloud Foundations course and demonstrated knowledge of AWS Cloud concepts, core services, security, architecture, pricing, and support."
    },
    {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "November 8, 2021",
        image: CyberSecurityCertImage,
        skills: ["Cybersecurity", "Threat Detection", "Cyber Best Practices", "Network Vulnerabilities", "Privacy And Data Confidentiality"],
        verification: CyberSecurityCertPDF,
        credentialId: "5c161100-bac4-4067-8114-f920e55d8fdd",
        category: "Security",
        description: "Cisco verifies the earner of this badge successfully completed the Introduction to Cybersecurity course and understands fundamental cybersecurity concepts and best practices."
    },
    {
        title: "Introduction to IoT",
        issuer: "Cisco",
        date: "February 17, 2022",
        image: IoTCertImage,
        skills: ["Digital Transformation", "Internet Of Things", "IoT", "Connected Devices", "IoT Security"],
        verification: IoTCertPDF,
        credentialId: "acc959ac-025e-4efd-b696-a23524788986",
        category: "IoT",
        description: "Cisco verifies the earner of this badge successfully completed the Introduction to IoT course and understands IoT fundamentals, applications, and digital transformation concepts."
    },
    {
        title: "JavaScript Essentials 1",
        issuer: "Cisco (in collaboration with OpenEDG JS Institute)",
        date: "October 10, 2024",
        image: JSCertImage,
        skills: ["JavaScript", "Data Types", "Functions", "Control Flow", "Debugging", "DOM Manipulation", "Event Handling", "Variables", "Operators"],
        verification: JSCertPDF,
        credentialId: "0e37fd57-d72f-43b2-a87d-9eabbd4c1b3e",
        category: "Development",
        description: "Cisco, in collaboration with OpenEDG JS Institute, verifies the earner successfully completed JavaScript Essentials 1 and demonstrates proficiency in fundamental JavaScript programming concepts."
    },
    {
        title: "CyberOps Associate",
        issuer: "Cisco",
        date: "November 26, 2023",
        image: CyberOpsCertImage,
        skills: ["Security Operations", "Incident Response", "Threat Analysis", "Network Security", "Security Monitoring", "Digital Forensics", "SIEM Operations"],
        verification: CyberOpsCertPDF,
        credentialId: "CYOPS-001-2023",
        category: "Security",
        description: "Cisco verifies the earner successfully completed the CyberOps Associate certification, validating skills in security operations, threat detection, incident response, and network security monitoring."
    }
];

const seminars = [
    {
        title: "Red Hat System Administration I (RH124)",
        organizer: "Red Hat Academy",
        date: "November 12, 2022",
        location: "Online Event",
        image: RedHatSeminar,
        type: "Training Course"
    },
    {
        title: "Cybersecurity in the Age of A.I. Navigating the Double-Edged Sword",
        organizer: "Holy Angel University School of Computing",
        date: "February 7, 2025",
        location: "Holy Angel University",
        image: CybersecurityAISeminar,
        type: "Conference"
    },
    {
        title: "Git It Done: Build a Foundation with Version Control",
        organizer: "Code Geeks",
        date: "October 5, 2024",
        location: "Online Event",
        image: GitSeminar,
        type: "Workshop"
    },
    {
        title: "1st Regional Blockchain Conference 2024",
        organizer: "Holy Angel University",
        date: "July 19, 2024",
        location: "Holy Angel University",
        image: BlockchainSeminar,
        type: "Conference"
    },
    {
        title: "Cyber Resilience in the AI Era",
        organizer: "PSM in Cybersecurity",
        date: "January 31, 2025",
        location: "Holy Angel University",
        image: CyberResilienceSeminar,
        type: "Seminar"
    }
];

// ===== UTILITY FUNCTIONS =====
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const getCategoryStyle = (category) => {
    const styles = {
        "Development": {
            gradient: "from-[#ff75df]/30 to-purple-500/30",
            border: "border-[#ff75df]/40",
            accent: "text-[#ff75df]",
            bg: "bg-[#ff75df]/20",
            glow: "shadow-[#ff75df]/20"
        },
        "Cloud": {
            gradient: "from-blue-500/30 to-cyan-500/30",
            border: "border-blue-400/40",
            accent: "text-blue-300",
            bg: "bg-blue-500/20",
            glow: "shadow-blue-500/20"
        },
        "Security": {
            gradient: "from-red-500/30 to-orange-500/30",
            border: "border-red-400/40",
            accent: "text-red-300",
            bg: "bg-red-500/20",
            glow: "shadow-red-500/20"
        },
        "IoT": {
            gradient: "from-green-500/30 to-emerald-500/30",
            border: "border-green-400/40",
            accent: "text-green-300",
            bg: "bg-green-500/20",
            glow: "shadow-green-500/20"
        }
    };
    return styles[category] || styles["Development"];
};

const getCategoryIcon = (category) => {
    const icons = {
        "Development": Code2,
        "Cloud": Cloud,
        "Security": Shield,
        "IoT": Wifi
    };
    return icons[category] || Code2;
};

const getTypeColor = (type) => {
    const colors = {
        "Training Course": {
            gradient: "from-blue-500/30 to-cyan-500/30",
            border: "border-blue-400/40",
            accent: "text-blue-300",
            glow: "shadow-blue-500/20"
        },
        "Conference": {
            gradient: "from-purple-500/30 to-pink-500/30",
            border: "border-purple-400/40",
            accent: "text-purple-300",
            glow: "shadow-purple-500/20"
        },
        "Workshop": {
            gradient: "from-green-500/30 to-emerald-500/30",
            border: "border-green-400/40",
            accent: "text-green-300",
            glow: "shadow-green-500/20"
        },
        "Seminar": {
            gradient: "from-orange-500/30 to-yellow-500/30",
            border: "border-orange-400/40",
            accent: "text-orange-300",
            glow: "shadow-orange-500/20"
        }
    };
    return colors[type] || {
        gradient: "from-gray-500/30 to-gray-600/30",
        border: "border-gray-400/40",
        accent: "text-gray-300",
        glow: "shadow-gray-500/20"
    };
};

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

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

// Category Filter Buttons Component
const CategoryFilters = memo(({ categories, selectedCategory, onCategorySelect }) => {
    const animationConfig = getAnimationConfig();
    
    const buttonHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.02 };
        }
        
        return { scale: 1.05, y: -2 };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={0.3}
            className="w-full relative z-20 px-2"
            priority="high"
        >
            <StaggerContainer
                staggerDelay={animationConfig.reduce ? 0.05 : 0.1}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-16"
            >
                {categories.map((category) => {
                    const categoryStyle = category.name !== "All" ? getCategoryStyle(category.name) : null;

                    return (
                        <motion.button
                            key={category.name}
                            onClick={() => onCategorySelect(category.name)}
                            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-full italic tracking-tight font-black text-xs sm:text-sm md:text-base transition-all duration-300 backdrop-blur-sm ${selectedCategory === category.name
                                ? 'bg-white/10 border border-[#ff75df]/50 text-[#e2dbd2] shadow-lg shadow-[#ff75df]/20'
                                : 'text-white/70 hover:text-white hover:bg-white/5 border border-white/20'
                                }`}
                            whileHover={buttonHoverVariants}
                            whileTap={{ scale: 0.95 }}
                        >
                            <category.icon
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${category.name !== "All" && categoryStyle
                                    ? categoryStyle.accent
                                    : selectedCategory === category.name
                                        ? 'text-[#ff75df]'
                                        : 'text-white/70'
                                    }`}
                            />
                            <span className="relative z-10">{category.name}</span>
                            <span className="text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                {category.count}
                            </span>
                        </motion.button>
                    );
                })}
            </StaggerContainer>
        </ScrollAnimatedSection>
    );
});

// Certificate Card Component
const CertificateCard = memo(({ certificate, index, flipVariants }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const animationConfig = getAnimationConfig();
    const shouldAnimate = canAnimate();
    
    const categoryStyle = useMemo(() => getCategoryStyle(certificate.category), [certificate.category]);
    const CategoryIcon = useMemo(() => getCategoryIcon(certificate.category), [certificate.category]);

    const cardHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: -2, scale: 1.01 };
        }
        
        return { y: -5, scale: 1.01 };
    }, [animationConfig.reduce]);

    const handleVerificationClick = useCallback((e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    }, []);

    const handleFlip = useCallback(() => {
        if (!shouldAnimate) return; // Prevent flip on low-end devices
        setIsFlipped(!isFlipped);
    }, [isFlipped, shouldAnimate]);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (shouldAnimate) setIsHovered(true);
    }, [shouldAnimate]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <motion.div
                className="relative group perspective-1000"
                whileHover={cardHoverVariants}
                layout
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Enhanced background glow - Only on capable devices */}
                {isHovered && shouldAnimate && (
                    <motion.div
                        className={`absolute -inset-2 sm:-inset-4 bg-gradient-to-r ${categoryStyle.gradient} rounded-2xl blur-xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animationConfig.reduce ? 0.2 : 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: animationConfig.reduce ? 0.2 : 0.3 }}
                    />
                )}

                <motion.div
                    className="relative w-full h-[350px] sm:h-[400px] md:h-[420px] transition-all duration-700 preserve-3d cursor-pointer"
                    onClick={handleFlip}
                    animate={isFlipped && shouldAnimate ? "back" : "front"}
                    variants={flipVariants} // Use the passed variants
                    style={{ transformStyle: shouldAnimate ? "preserve-3d" : "flat" }}
                >
                    {/* Front of card */}
                    <CertificateCardFront
                        certificate={certificate}
                        categoryStyle={categoryStyle}
                        CategoryIcon={CategoryIcon}
                        imageLoaded={imageLoaded}
                        onImageLoad={handleImageLoad}
                        onVerificationClick={handleVerificationClick}
                        shouldAnimate={shouldAnimate}
                    />

                    {/* Back of card - Only render if animations are enabled */}
                    {shouldAnimate && (
                        <CertificateCardBack
                            certificate={certificate}
                            categoryStyle={categoryStyle}
                            CategoryIcon={CategoryIcon}
                            onVerificationClick={handleVerificationClick}
                        />
                    )}
                </motion.div>
            </motion.div>

            <CertificateModal
                certificate={certificate}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </>
    );
});

// Certificate Card Back Component
const CertificateCardBack = memo(({ certificate, categoryStyle, CategoryIcon, onVerificationClick }) => {
    const animationConfig = getAnimationConfig();
    
    const buttonHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.01 };
        }
        
        return { scale: 1.02, y: -2 };
    }, [animationConfig.reduce]);

    return (
        <motion.div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className={`relative w-full h-full bg-black/20 rounded-xl border ${categoryStyle.border} backdrop-blur-[15px] overflow-hidden`}>
                <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className={`flex-shrink-0 bg-gradient-to-r ${categoryStyle.gradient} backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 border-b ${categoryStyle.border}`}>
                        <h4 className="text-white text-base sm:text-lg italic tracking-tight font-black flex items-center gap-2">
                            <CategoryIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${categoryStyle.accent}`} />
                            <span className="hidden sm:inline">Certificate Details</span>
                            <span className="sm:hidden">Details</span>
                        </h4>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                            {certificate.description}
                        </p>

                        <div>
                            <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 italic tracking-tight font-black">
                                Skills & Competencies
                            </h5>
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 max-h-20 sm:max-h-none overflow-y-auto">
                                {certificate.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-white/90 ${categoryStyle.bg} backdrop-blur-sm rounded-full border ${categoryStyle.border} flex-shrink-0`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Verification details */}
                        <div>
                            <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 italic tracking-tight font-black">
                                Verification Details
                            </h5>
                            <div className={`space-y-2 sm:space-y-3 p-3 sm:p-4 ${categoryStyle.bg} rounded-lg border ${categoryStyle.border}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-xs">Issued:</span>
                                    <span className="text-white/90 text-xs font-medium">{formatDate(certificate.date)}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                                    <span className="text-white/70 text-xs">Credential ID:</span>
                                    <span className="text-white/90 text-xs font-mono break-all sm:max-w-[150px] truncate">{certificate.credentialId}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-xs">Status:</span>
                                    <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* View button */}
                        <motion.button
                            onClick={onVerificationClick}
                            className={`w-full py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r ${categoryStyle.gradient} hover:opacity-80 border ${categoryStyle.border} rounded-lg text-white italic tracking-tight font-black text-xs sm:text-sm transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2`}
                            whileHover={buttonHoverVariants}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">View Certificate</span>
                            <span className="sm:hidden">View</span>
                        </motion.button>

                        <div className="text-center py-2 sm:py-4">
                            <span className="text-white/50 text-xs font-light italic">
                                Tap to flip back
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
// Certificate Card Front Component
const CertificateCardFront = memo(({ 
    certificate, 
    categoryStyle, 
    CategoryIcon, 
    imageLoaded, 
    onImageLoad, 
    onVerificationClick,
    shouldAnimate 
}) => (
    <motion.div className="absolute inset-0 backface-hidden">
        <div className={`relative w-full h-full bg-white/15 rounded-xl border ${categoryStyle.border} backdrop-blur-[20px] overflow-hidden`}>
            {/* Certificate image background */}
            <div className="absolute inset-0">
                <img
                    src={certificate.image}
                    alt={certificate.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
                    onLoad={onImageLoad}
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Corner decorations - Only on capable devices */}
            {shouldAnimate && (
                <>
                    <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 ${categoryStyle.border} rounded-tr-lg opacity-50`} />
                    <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 ${categoryStyle.border} rounded-bl-lg opacity-50`} />
                </>
            )}

            {/* Content overlay */}
            <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                {/* Header */}
                <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className={`px-2 sm:px-3 py-1 text-xs italic tracking-tight font-black text-white ${categoryStyle.bg} backdrop-blur-sm rounded-full border ${categoryStyle.border} flex items-center gap-1 sm:gap-2`}>
                            <CategoryIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="relative z-10">{certificate.category}</span>
                        </span>
                        <span className="text-white/70 text-xs sm:text-sm font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(certificate.date).getFullYear()}
                        </span>
                    </div>

                    <h3 className="text-white text-base sm:text-xl mb-2 sm:mb-3 italic tracking-tight font-black line-clamp-2">
                        {certificate.title}
                    </h3>

                    <p className="text-white/90 text-xs sm:text-sm font-medium mb-3 sm:mb-4 flex items-center gap-2 line-clamp-1">
                        <Award className={`w-3 h-3 sm:w-4 sm:h-4 ${categoryStyle.accent} flex-shrink-0`} />
                        <span className="truncate">{certificate.issuer}</span>
                    </p>
                </div>

                {/* Skills preview */}
                <div className="mb-3 sm:mb-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                        {certificate.skills.slice(0, window.innerWidth < 640 ? 2 : 3).map((skill) => (
                            <span
                                key={skill}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 truncate max-w-[120px] sm:max-w-none"
                            >
                                {skill}
                            </span>
                        ))}
                        {certificate.skills.length > (window.innerWidth < 640 ? 2 : 3) && (
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-white/70 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                +{certificate.skills.length - (window.innerWidth < 640 ? 2 : 3)} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Bottom section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2" onClick={onVerificationClick}>
                        <span className="text-white/70 text-xs italic">
                            {shouldAnimate ? "Click to view" : "Tap to view"}
                        </span>
                        <ExternalLink className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${categoryStyle.accent}`} />
                    </div>

                    <div className={`w-6 h-6 sm:w-8 sm:h-8 border-2 ${categoryStyle.border} rounded-full flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${categoryStyle.bg} rounded-full`}></div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
));

// Certificate Grid Display Component
const CertificatesGrid = memo(({ certificates, selectedCategory, containerVariants, cardVariants, flipVariants }) => {
    const animationConfig = getAnimationConfig();
    
    const gridTransition = useMemo(() => {
        if (animationConfig.reduce) {
            return { duration: 0.2 };
        }
        
        return { duration: 0.4 };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={0.1}
            className="w-full relative px-2 sm:px-0"
            priority="high"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: animationConfig.reduce ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: animationConfig.reduce ? -10 : -20 }}
                    transition={gridTransition}
                >
                    <StaggerContainer
                        staggerDelay={animationConfig.reduce ? 0.08 : 0.15}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                    >
                        {certificates.map((certificate, index) => (
                            <CertificateCard
                                key={certificate.credentialId}
                                certificate={certificate}
                                index={index}
                                flipVariants={flipVariants}
                            />
                        ))}
                    </StaggerContainer>
                </motion.div>
            </AnimatePresence>
        </ScrollAnimatedSection>
    );
});
// Certificate Modal Component
const CertificateModal = memo(({ certificate, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-[71]"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 p-4 sm:p-6 border-b border-white/20">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white text-lg sm:text-xl italic tracking-tight font-black line-clamp-2">
                                    {certificate.title}
                                </h3>
                                <p className="text-white/70 text-sm mt-1 flex items-center gap-2 line-clamp-1">
                                    <Award className="w-4 h-4 text-[#ff75df] flex-shrink-0" />
                                    <span className="truncate">{certificate.issuer}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="hidden sm:inline">{formatDate(certificate.date)}</span>
                                </p>
                                <p className="text-white/70 text-sm mt-1 sm:hidden">
                                    {formatDate(certificate.date)}
                                </p>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 flex-shrink-0"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ✕
                            </motion.button>
                        </div>
                    </div>

                    {/* Certificate Image */}
                    <div className="p-3 sm:p-6 flex justify-center bg-black/20">
                        <div className="relative max-w-full">
                            <img
                                src={certificate.image}
                                alt={certificate.title}
                                className="max-w-full max-h-[40vh] sm:max-h-[50vh] object-contain rounded-lg border border-white/20 shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-lg pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

// Page Header Component
const PageHeader = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const titleVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { duration: 0.4 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, x: -100 },
            animate: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 1 }
            }
        };
    }, [animationConfig.reduce]);

    const underlineVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { width: 0 },
                animate: { 
                    width: "8rem",
                    transition: { duration: 0.4, delay: 0.2 }
                }
            };
        }
        
        return {
            initial: { width: 0 },
            animate: { 
                width: "10rem",
                transition: { duration: 1, delay: 0.5 }
            }
        };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeDown"
            delay={0.2}
            className="w-full flex justify-start mb-12 sm:mb-16 md:mb-20 lg:mb-28 relative z-10"
            priority="critical"
        >
            <div className="relative">
                <motion.h2
                    className="pl-2 text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none italic tracking-tight text-left"
                    {...titleVariants}
                    style={{
                        textShadow: animationConfig.reduce ? 'none' : '0 0 40px rgba(255, 117, 223, 0.3)'
                    }}
                >
                    Certifications<span className="text-[#ff75df]">_</span>
                    <br />
                    earned<span className="text-[#ff75df]">:</span>
                </motion.h2>

                <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#ff75df] via-purple-400 to-transparent rounded-full"
                    {...underlineVariants}
                />
            </div>
        </ScrollAnimatedSection>
    );
});

// Seminar Card Component
const SeminarCard = memo(({ seminar, index }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const animationConfig = getAnimationConfig();
    const shouldAnimate = canAnimate();
    
    const typeStyle = useMemo(() => getTypeColor(seminar.type), [seminar.type]);

    const cardHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: -2, scale: 1.01 };
        }
        
        return { y: -5, scale: 1.01 };
    }, [animationConfig.reduce]);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (shouldAnimate) setIsHovered(true);
    }, [shouldAnimate]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <motion.div
                className="group relative cursor-pointer"
                whileHover={cardHoverVariants}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/* Background glow - Only on capable devices */}
                {isHovered && shouldAnimate && (
                    <motion.div
                        className={`absolute -inset-1 sm:-inset-2 bg-gradient-to-r ${typeStyle.gradient} rounded-2xl blur-md`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animationConfig.reduce ? 0.4 : 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: animationConfig.reduce ? 0.2 : 0.3 }}
                    />
                )}

                <div className={`relative bg-gradient-to-br ${typeStyle.gradient} backdrop-blur-lg border ${typeStyle.border} rounded-xl p-4 sm:p-6 h-full transition-all duration-300`}>
                    {/* Corner decorations - Only on capable devices */}
                    {shouldAnimate && (
                        <>
                            <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 ${typeStyle.border} rounded-tr-lg opacity-30`} />
                            <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 ${typeStyle.border} rounded-bl-lg opacity-30`} />
                        </>
                    )}

                    {/* Type badge */}
                    <span className={`absolute -top-2 sm:-top-3 -right-2 sm:-right-3 px-2 sm:px-4 py-1 sm:py-2 text-xs italic tracking-tight font-black text-white bg-gradient-to-r ${typeStyle.gradient} backdrop-blur-sm rounded-full border ${typeStyle.border} shadow-lg`}>
                        {seminar.type}
                    </span>

                    <div className="flex gap-3 sm:gap-6">
                        {/* Responsive image */}
                        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative overflow-hidden rounded-xl border border-white/30">
                            <img
                                src={seminar.image}
                                alt={seminar.title}
                                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={handleImageLoad}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

                            {/* View indicator - Only on hover and capable devices */}
                            {isHovered && shouldAnimate && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white italic tracking-tight font-black text-sm sm:text-base leading-tight mb-2 sm:mb-3 line-clamp-2">
                                {seminar.title}
                            </h4>

                            <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2 line-clamp-1">
                                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff75df] flex-shrink-0" />
                                <span className="truncate">{seminar.organizer}</span>
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
                                <span className="flex items-center gap-2 text-white/70">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff75df] flex-shrink-0" />
                                    <span className="truncate">
                                        {new Date(seminar.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </span>
                                <span className={`text-xs ${typeStyle.accent} font-medium truncate`}>
                                    {seminar.location}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Click indicator */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-2 opacity-50">
                        <span className="text-white/60 text-xs italic hidden sm:inline">
                            Click to view
                        </span>
                        <span className="text-white/60 text-xs italic sm:hidden">
                            Tap
                        </span>
                        <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff75df]" />
                    </div>
                </div>
            </motion.div>

            <SeminarModal
                seminar={seminar}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </>
    );
});

// Seminar Modal Component
const SeminarModal = memo(({ seminar, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-[71]"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 p-4 sm:p-6 border-b border-white/20">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white text-lg sm:text-xl italic tracking-tight font-black line-clamp-2">
                                    {seminar.title}
                                </h3>
                                <p className="text-white/70 text-sm mt-1">
                                    {seminar.organizer} • {formatDate(seminar.date)}
                                </p>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 flex-shrink-0"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ✕
                            </motion.button>
                        </div>
                    </div>

                    {/* Certificate Image */}
                    <div className="p-3 sm:p-6 flex justify-center bg-black/20">
                        <div className="relative max-w-full">
                            <img
                                src={seminar.image}
                                alt={seminar.title}
                                className="max-w-full max-h-[40vh] sm:max-h-[50vh] object-contain rounded-lg border border-white/20 shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-lg pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

// Seminars Section Component
const SeminarsSection = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeUp"
        delay={0.2}
        className="w-full mt-16 sm:mt-20 md:mt-24 relative z-20"
    >
        <div className="mb-8 sm:mb-12 md:mb-16 text-center px-4">
            <ScrollAnimatedSection
                animationType="fadeUp"
                delay={0.3}
            >
                <h3 className="text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-2xl xs:text-3xl sm:text-4xl md:text-5xl italic tracking-tight font-black mb-3 sm:mb-4">
                    Seminars & Workshops<span className="text-[#ff75df]">_</span>
                </h3>
                <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                    Additional learning experiences and professional development initiatives
                </p>

                <motion.div
                    className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#ff75df] to-transparent mx-auto mt-4 sm:mt-6 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
            </ScrollAnimatedSection>
        </div>

        <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
        >
            {seminars.map((seminar, index) => (
                <SeminarCard
                    key={`${seminar.title}-${seminar.date}`}
                    seminar={seminar}
                    index={index}
                />
            ))}
        </StaggerContainer>
    </ScrollAnimatedSection>
));

// Statistics Display Component
const StatisticsDisplay = memo(({ statistics }) => {
    const animationConfig = getAnimationConfig();
    
    const statHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.08)" 
            };
        }
        
        return { 
            scale: 1.05, 
            backgroundColor: "rgba(255, 255, 255, 0.1)" 
        };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={0.2}
            className="w-full mt-12 sm:mt-16 md:mt-20 relative z-10"
            priority="medium"
        >
            <StaggerContainer
                staggerDelay={animationConfig.reduce ? 0.05 : 0.1}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-8 px-2 sm:px-0"
            >
                {statistics.map((stat) => (
                    <motion.div
                        key={stat.label}
                        className="text-center p-3 sm:p-4 bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm"
                        whileHover={statHoverVariants}
                    >
                        <div className="flex justify-center mb-1 sm:mb-2">
                            <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff75df]" />
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic tracking-tight font-black text-white">
                            {stat.value}
                        </div>
                        <div className="text-white/60 text-xs sm:text-sm md:text-base font-medium">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </StaggerContainer>
        </ScrollAnimatedSection>
    );
});

// ===== MAIN COMPONENT =====

/**
 * CertificateGrid Component
 * 
 * Component Tree Structure:
 * CertificateGrid
 * ├── PageHeader
 * ├── CategoryFilters
 * ├── CertificatesGrid
 * │   └── CertificateCard
 * │       ├── CertificateCardFront
 * │       ├── CertificateCardBack
 * │       └── CertificateModal
 * ├── SeminarsSection
 * │   └── SeminarCard
 * │       └── SeminarModal
 * ├── StatisticsDisplay
 * └── BottomDecoration
 */
function CertificateGrid() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Move animation variants inside the component
    const containerVariants = useMemo(() => {
        const animationConfig = getAnimationConfig();
        
        if (animationConfig.reduce) {
            return {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 }
                }
            };
        }
        
        return {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            }
        };
    }, []);

    const cardVariants = useMemo(() => {
        const animationConfig = getAnimationConfig();
        
        if (animationConfig.reduce) {
            return {
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 }
                }
            };
        }
        
        return {
            hidden: { opacity: 0, y: 50, scale: 0.9 },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }
            }
        };
    }, []);

    const flipVariants = useMemo(() => {
        const animationConfig = getAnimationConfig();
        
        if (animationConfig.reduce) {
            return {
                front: { rotateY: 0, transition: { duration: 0.3 } },
                back: { rotateY: 180, transition: { duration: 0.3 } }
            };
        }
        
        return {
            front: { rotateY: 0, transition: { duration: 0.6, ease: "easeInOut" } },
            back: { rotateY: 180, transition: { duration: 0.6, ease: "easeInOut" } }
        };
    }, []);

    // Memoized categories computation
    const categories = useMemo(() => [
        { name: "All", icon: Grid3X3, count: certificates.length },
        { name: "Development", icon: Code2, count: certificates.filter(c => c.category === "Development").length },
        { name: "Cloud", icon: Cloud, count: certificates.filter(c => c.category === "Cloud").length },
        { name: "Security", icon: Shield, count: certificates.filter(c => c.category === "Security").length },
        { name: "IoT", icon: Wifi, count: certificates.filter(c => c.category === "IoT").length }
    ], []);

    // Memoized filtered certificates
    const filteredCertificates = useMemo(() =>
        selectedCategory === "All"
            ? certificates
            : certificates.filter(cert => cert.category === selectedCategory)
        , [selectedCategory]);

    // Memoized total hours calculation
    const totalHours = useMemo(() =>
        certificates.reduce((total, cert) => total + (cert.skills.length * 12), 0)
        , []);

    // Memoized statistics
    const statistics = useMemo(() => [
        { value: certificates.length, label: "Certificates", icon: Award },
        { value: categories.length - 1, label: "Categories", icon: Grid3X3 },
        { value: "100%", label: "Verified", icon: CheckCircle },
        { value: `${totalHours}+`, label: "Hours", icon: Calendar }
    ], [totalHours, categories.length]);

    // Optimized category selection handler
    const handleCategorySelect = useCallback((categoryName) => {
        setSelectedCategory(categoryName);
    }, []);

    return (
        <div id="certifications" className="flex flex-col items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 relative">
            {/* Page Header */}
            <PageHeader />

            {/* Category Filters */}
            <CategoryFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
            />

            {/* Certificates Grid */}
            <CertificatesGrid
                certificates={filteredCertificates}
                selectedCategory={selectedCategory}
                containerVariants={containerVariants}
                cardVariants={cardVariants}
                flipVariants={flipVariants}
            />

            {/* Seminars Section */}
            <SeminarsSection />

            {/* Statistics Display */}
            <StatisticsDisplay statistics={statistics} />

            {/* Bottom Decoration */}
            <BottomDecoration />
        </div>
    );
}

export default memo(CertificateGrid);