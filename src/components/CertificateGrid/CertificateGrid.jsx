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

import AWSCertImage from '../../assets/Certificates/AWS_Academy_Cloud_Foundations-1.png';
import AWSCertPDF from '../../assets/Certificates/AWS_Academy_Cloud_Foundations.pdf';
import CyberSecurityCertImage from '../../assets/Certificates/Introduction_to_Cybersecurity-1.png';
import CyberSecurityCertPDF from '../../assets/Certificates/Introduction_to_Cybersecurity.pdf';
import IoTCertImage from '../../assets/Certificates/Introduction_to_IoT-1.png';
import IoTCertPDF from '../../assets/Certificates/Introduction_to_IoT.pdf';
import JSCertImage from '../../assets/Certificates/JavaScriptEssentials-1.png';
import JSCertPDF from '../../assets/Certificates/JavaScriptEssentials.pdf';
import CyberOpsCertImage from '../../assets/Certificates/CyberOps_Associate-1.png';
import CyberOpsCertPDF from '../../assets/Certificates/CyberOps_Associate.pdf';

import RedHatSeminar from '../../assets/Seminars/RedHat_Certificate.png';
import CybersecurityAISeminar from '../../assets/Seminars/Cybersecurity_AI_Certificate.jpg';
import GitSeminar from '../../assets/Seminars/Git_Certificate.png';
import BlockchainSeminar from '../../assets/Seminars/Blockchain_Certificate.jpg';
import CyberResilienceSeminar from '../../assets/Seminars/Cyber_Resilience_Certificate.jpg';

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

// Static animation variants (moved outside component)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { 
        opacity: 0, 
        y: 50,
        scale: 0.9
    },
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

const flipVariants = {
    front: {
        rotateY: 0,
        transition: { duration: 0.6, ease: "easeInOut" }
    },
    back: {
        rotateY: 180,
        transition: { duration: 0.6, ease: "easeInOut" }
    }
};

// Utility functions (moved outside component)
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
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

const CertificateCard = memo(({ certificate, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get category styling
    const categoryStyle = useMemo(() => getCategoryStyle(certificate.category), [certificate.category]);
    const CategoryIcon = useMemo(() => getCategoryIcon(certificate.category), [certificate.category]);

    const handleVerificationClick = useCallback((e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    }, []);

    const handleFlip = useCallback(() => {
        setIsFlipped(!isFlipped);
    }, [isFlipped]);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

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
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                layout
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Enhanced background glow with category color */}
                {isHovered && (
                    <motion.div 
                        className={`absolute -inset-4 bg-gradient-to-r ${categoryStyle.gradient} rounded-2xl blur-xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                <motion.div
                    className="relative w-full h-[400px] transition-all duration-700 preserve-3d cursor-pointer"
                    onClick={handleFlip}
                    animate={isFlipped ? "back" : "front"}
                    variants={flipVariants}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front of card */}
                    <motion.div className="absolute inset-0 backface-hidden">
                        <div className={`relative w-full h-full bg-white/15 rounded-xl border ${categoryStyle.border} backdrop-blur-[20px] overflow-hidden`}>
                            
                            {/* Certificate image background */}
                            <div className="absolute inset-0">
                                <img 
                                    src={certificate.image} 
                                    alt={certificate.title}
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
                                    onLoad={handleImageLoad}
                                />
                                <div className="absolute inset-0 bg-black/60" />
                            </div>

                            {/* Corner decorations with category color */}
                            <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 ${categoryStyle.border} rounded-tr-lg opacity-50`} />
                            <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 ${categoryStyle.border} rounded-bl-lg opacity-50`} />

                            {/* Content overlay */}
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 text-xs italic tracking-tight font-black text-white ${categoryStyle.bg} backdrop-blur-sm rounded-full border ${categoryStyle.border} flex items-center gap-2`}>
                                            <CategoryIcon className="w-3 h-3" />
                                            {certificate.category}
                                        </span>
                                        <span className="text-white/70 text-sm font-medium flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(certificate.date).getFullYear()}
                                        </span>
                                    </div>

                                    <h3 className="text-white text-xl mb-3 italic tracking-tight font-black">
                                        {certificate.title}
                                    </h3>

                                    <p className="text-white/90 text-sm font-medium mb-4 flex items-center gap-2">
                                        <Award className={`w-4 h-4 ${categoryStyle.accent}`} />
                                        {certificate.issuer}
                                    </p>
                                </div>

                                {/* Skills preview */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {certificate.skills.slice(0, 3).map((skill) => (
                                            <span 
                                                key={skill} 
                                                className="px-3 py-1 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {certificate.skills.length > 3 && (
                                            <span className="px-3 py-1 text-xs font-medium text-white/70 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                                +{certificate.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom section */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2" onClick={handleVerificationClick}>
                                        <span className="text-white/70 text-xs italic">
                                            Click to view
                                        </span>
                                        <ExternalLink className={`w-3 h-3 ${categoryStyle.accent}`} />
                                    </div>

                                    <div className={`w-8 h-8 border-2 ${categoryStyle.border} rounded-full flex items-center justify-center`}>
                                        <div className={`w-2 h-2 ${categoryStyle.bg} rounded-full`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back of card */}
                    <motion.div className="absolute inset-0 backface-hidden rotate-y-180">
                        <div className={`relative w-full h-full bg-black/20 rounded-xl border ${categoryStyle.border} backdrop-blur-[15px] overflow-hidden`}>
                            <div className="relative z-10 h-full flex flex-col">
                                {/* Header with category color */}
                                <div className={`flex-shrink-0 bg-gradient-to-r ${categoryStyle.gradient} backdrop-blur-md px-6 py-3 border-b ${categoryStyle.border}`}>
                                    <h4 className="text-white text-lg italic tracking-tight font-black flex items-center gap-2">
                                        <CategoryIcon className={`w-5 h-5 ${categoryStyle.accent}`} />
                                        Certificate Details
                                    </h4>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                                    <p className="text-white/90 text-sm leading-relaxed">
                                        {certificate.description}
                                    </p>
                                    
                                    <div>
                                        <h5 className="text-white text-sm mb-3 italic tracking-tight font-black">
                                            Skills & Competencies
                                        </h5>
                                        
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {certificate.skills.map((skill) => (
                                                <span 
                                                    key={skill} 
                                                    className={`px-3 py-1 text-xs font-medium text-white/90 ${categoryStyle.bg} backdrop-blur-sm rounded-full border ${categoryStyle.border}`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-white text-sm mb-3 italic tracking-tight font-black">
                                            Verification Details
                                        </h5>
                                        <div className={`space-y-3 p-4 ${categoryStyle.bg} rounded-lg border ${categoryStyle.border}`}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/70 text-xs">Issued Date:</span>
                                                <span className="text-white/90 text-xs font-medium">{formatDate(certificate.date)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/70 text-xs">Credential ID:</span>
                                                <span className="text-white/90 text-xs font-mono break-all">{certificate.credentialId}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/70 text-xs">Status:</span>
                                                <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Verified
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button 
                                        onClick={handleVerificationClick}
                                        className={`w-full py-3 px-4 bg-gradient-to-r ${categoryStyle.gradient} hover:opacity-80 border ${categoryStyle.border} rounded-lg text-white italic tracking-tight font-black transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2`}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Certificate
                                    </motion.button>

                                    <div className="text-center py-4">
                                        <span className="text-white/50 text-sm font-light italic">
                                            Click to flip back
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
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

const SeminarCard = memo(({ seminar, index }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const typeStyle = useMemo(() => getTypeColor(seminar.type), [seminar.type]);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

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
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                whileHover={{ 
                    y: -10,
                    scale: 1.02
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/* Simplified background glow */}
                {isHovered && (
                    <motion.div 
                        className={`absolute -inset-2 bg-gradient-to-r ${typeStyle.gradient} rounded-2xl blur-md`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                <div className={`relative bg-gradient-to-br ${typeStyle.gradient} backdrop-blur-lg border ${typeStyle.border} rounded-xl p-6 h-full transition-all duration-300`}>
                    
                    {/* Corner decorations */}
                    <div className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 ${typeStyle.border} rounded-tr-lg opacity-30`} />
                    <div className={`absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 ${typeStyle.border} rounded-bl-lg opacity-30`} />

                    {/* Type badge */}
                    <span className={`absolute -top-3 -right-3 px-4 py-2 text-xs italic tracking-tight font-black text-white bg-gradient-to-r ${typeStyle.gradient} backdrop-blur-sm rounded-full border ${typeStyle.border} shadow-lg`}>
                        {seminar.type}
                    </span>

                    <div className="flex gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-xl border border-white/30">
                            <img 
                                src={seminar.image} 
                                alt={seminar.title}
                                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={handleImageLoad}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
                            
                            {/* View indicator */}
                            {isHovered && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                        <ExternalLink className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white italic tracking-tight font-black text-base leading-tight mb-3 line-clamp-2">
                                {seminar.title}
                            </h4>
                            
                            <p className="text-white/80 text-sm mb-3 flex items-center gap-2">
                                <Award className="w-4 h-4 text-[#ff75df]" />
                                {seminar.organizer}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-white/70">
                                    <Calendar className="w-4 h-4 text-[#ff75df]" />
                                    {new Date(seminar.date).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric',
                                        year: 'numeric' 
                                    })}
                                </span>
                                <span className={`text-xs ${typeStyle.accent} font-medium truncate ml-2`}>
                                    {seminar.location}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Click indicator */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-50">
                        <span className="text-white/60 text-xs italic">
                            Click to view
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#ff75df]" />
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

const CertificateModal = memo(({ certificate, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className="relative max-w-4xl w-full max-h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-[71]"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 p-6 border-b border-white/20">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-white text-xl italic tracking-tight font-black">
                                    {certificate.title}
                                </h3>
                                <p className="text-white/70 text-sm mt-1 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-[#ff75df]" />
                                    {certificate.issuer} • {formatDate(certificate.date)}
                                </p>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ✕
                            </motion.button>
                        </div>
                    </div>

                    {/* Certificate Image */}
                    <div className="p-6 flex justify-center bg-black/20">
                        <div className="relative max-w-full">
                            <img 
                                src={certificate.image} 
                                alt={certificate.title}
                                className="max-w-full max-h-[50vh] object-contain rounded-lg border border-white/20 shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-lg pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

const SeminarModal = memo(({ seminar, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className="relative max-w-4xl w-full max-h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-[71]"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#ff75df]/20 to-purple-500/20 p-6 border-b border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-xl italic tracking-tight font-black">
                                    {seminar.title}
                                </h3>
                                <p className="text-white/70 text-sm mt-1">
                                    {seminar.organizer} • {formatDate(seminar.date)}
                                </p>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ✕
                            </motion.button>
                        </div>
                    </div>

                    {/* Certificate Image */}
                    <div className="p-6 flex justify-center">
                        <div className="relative max-w-full">
                            <img 
                                src={seminar.image} 
                                alt={seminar.title}
                                className="max-w-full max-h-[50vh] object-contain rounded-lg border border-white/20 shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

function CertificateGrid() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Move categories inside the component to use React hooks properly
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
        <div className="flex flex-col items-center py-12 sm:py-20 max-w-7xl mx-auto w-11/12 sm:w-2/3 relative px-4 sm:px-6">
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
                        Certifications<span className="text-[#ff75df]">_</span>
                        <br />
                        earned<span className="text-[#ff75df]">:</span>
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

            {/* Category filters */}
            <motion.div 
                className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 relative z-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {categories.map((category) => {
                    const categoryStyle = category.name !== "All" ? getCategoryStyle(category.name) : null;
                    
                    return (
                        <motion.button
                            key={category.name}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-full italic tracking-tight font-black transition-all duration-300 backdrop-blur-sm ${
                                selectedCategory === category.name
                                    ? 'bg-white/10 border border-[#ff75df]/50 text-[#e2dbd2] shadow-lg shadow-[#ff75df]/20'
                                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-white/20'
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <category.icon 
                                className={`w-4 h-4 ${
                                    category.name !== "All" && categoryStyle 
                                        ? categoryStyle.accent 
                                        : selectedCategory === category.name 
                                            ? 'text-[#ff75df]' 
                                            : 'text-white/70'
                                }`} 
                            />
                            <span>{category.name}</span>
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                {category.count}
                            </span>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Certificates grid */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={selectedCategory}
                    className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {filteredCertificates.map((certificate, index) => (
                        <CertificateCard
                            key={certificate.credentialId}
                            certificate={certificate}
                            index={index}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Seminars section */}
            <motion.div 
                className="w-full mt-20 sm:mt-24 relative z-20"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <div className="mb-12 sm:mb-16 text-center">
                    <h3 className="text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-3xl sm:text-4xl md:text-5xl italic tracking-tight font-black mb-4">
                        Seminars & Workshops<span className="text-[#ff75df]">_</span>
                    </h3>
                    <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
                        Additional learning experiences and professional development initiatives
                    </p>
                    
                    <motion.div 
                        className="w-32 h-1 bg-gradient-to-r from-transparent via-[#ff75df] to-transparent mx-auto mt-6 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                </div>

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {seminars.map((seminar, index) => (
                        <SeminarCard
                            key={`${seminar.title}-${seminar.date}`}
                            seminar={seminar}
                            index={index}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Statistics */}
            <motion.div 
                className="w-full mt-16 sm:mt-20 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                    {statistics.map((stat) => (
                        <motion.div 
                            key={stat.label}
                            className="text-center p-4 bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                            <div className="flex justify-center mb-2">
                                <stat.icon className="w-6 h-6 text-[#ff75df]" />
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl italic tracking-tight font-black text-white">
                                {stat.value}
                            </div>
                            <div className="text-white/60 text-sm sm:text-base font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
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
}

export default memo(CertificateGrid);