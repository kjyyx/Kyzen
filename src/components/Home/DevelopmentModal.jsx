import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, AlertTriangle } from 'lucide-react';
import { ANIMATION_DURATION, EASING } from '../../utils/constants';

const DevelopmentModal = ({ onClose }) => {
    const [shouldShow, setShouldShow] = useState(false);

    // Show modal after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldShow(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!shouldShow) return null;

    // Optimized animation variants
    const modalVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.9,
            y: 20
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                duration: ANIMATION_DURATION.normal,
                ease: EASING.easeOut
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9,
            y: 20,
            transition: {
                duration: ANIMATION_DURATION.fast,
                ease: EASING.easeIn
            }
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: ANIMATION_DURATION.fast }
        },
        exit: { 
            opacity: 0,
            transition: { duration: ANIMATION_DURATION.fast }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                duration: ANIMATION_DURATION.normal,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: ANIMATION_DURATION.fast,
                ease: EASING.easeOut
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    className="relative w-full max-w-md sm:max-w-lg bg-gradient-to-br from-[#2e175c]/90 via-[#1a1a1a]/95 to-black/90 border border-[#ff75df]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-[#ff75df]/20"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    {/* Simplified Icon */}
                    <motion.div 
                        className="flex justify-center mb-6"
                        variants={itemVariants}
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-[#ff75df] to-purple-400 rounded-full flex items-center justify-center">
                            <Code2 className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>

                    {/* Content with stagger */}
                    <motion.div 
                        className="text-center space-y-4"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Title */}
                        <motion.h2
                            className="text-2xl sm:text-3xl font-black italic tracking-tight bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-transparent"
                            variants={itemVariants}
                        >
                            Under Development
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.div
                            className="flex items-center justify-center gap-2 text-[#ff75df]/80"
                            variants={itemVariants}
                        >
                            <span className="text-sm font-medium tracking-wide">Digital Portfolio v2.0</span>
                        </motion.div>

                        {/* Message */}
                        <motion.p
                            className="text-white/80 text-sm sm:text-base leading-relaxed px-2"
                            variants={itemVariants}
                        >
                            This portfolio is currently being enhanced with new features, 
                            improved animations, and fresh content. Some sections may be 
                            incomplete or under construction.
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            className="text-left bg-white/5 rounded-xl p-4 border border-white/10"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-[#ff75df]" />
                                <span className="text-sm font-medium text-white">Currently Working On:</span>
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#ff75df] rounded-full"></div>
                                    Enhanced animations & interactions
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    Mobile responsiveness optimization
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#ff75df] rounded-full"></div>
                                    New project showcases
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    Performance improvements
                                </li>
                            </ul>
                        </motion.div>

                        {/* Action Button */}
                        <motion.button
                            onClick={onClose}
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#ff75df] to-purple-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#ff75df]/30 transition-all duration-200"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            variants={itemVariants}
                        >
                            Continue Exploring
                        </motion.button>

                        {/* Footer Note */}
                        <motion.p
                            className="text-xs text-white/50 mt-4"
                            variants={itemVariants}
                        >
                            Thank you for your patience! 🚀
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DevelopmentModal;