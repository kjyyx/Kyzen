import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, AlertTriangle } from 'lucide-react';
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

const DevelopmentModal = ({ onClose }) => {
    const [shouldShow, setShouldShow] = useState(false);
    
    const animationConfig = getAnimationConfig();
    const shouldAnimate = canAnimate();

    // Show modal after shorter delay on low-end devices
    useEffect(() => {
        const delay = animationConfig.reduce ? 2000 : 3000;
        const timer = setTimeout(() => {
            setShouldShow(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [animationConfig.reduce]);

    // Memoized animation variants for performance
    const modalVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                hidden: { opacity: 0 },
                visible: { 
                    opacity: 1,
                    transition: { duration: 0.3 }
                },
                exit: { 
                    opacity: 0,
                    transition: { duration: 0.2 }
                }
            };
        }
        
        return {
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
    }, [animationConfig.reduce]);

    const backdropVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: animationConfig.reduce ? 0.2 : ANIMATION_DURATION.fast }
        },
        exit: { 
            opacity: 0,
            transition: { duration: animationConfig.reduce ? 0.15 : ANIMATION_DURATION.fast }
        }
    }), [animationConfig.reduce]);

    const contentVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                hidden: { opacity: 0 },
                visible: { 
                    opacity: 1,
                    transition: { duration: 0.3 }
                }
            };
        }
        
        return {
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
    }, [animationConfig.reduce]);

    const itemVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                hidden: { opacity: 0 },
                visible: { 
                    opacity: 1,
                    transition: { duration: 0.2 }
                }
            };
        }
        
        return {
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
    }, [animationConfig.reduce]);

    const buttonHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.01 };
        }
        
        return { scale: 1.02 };
    }, [animationConfig.reduce]);

    const closeButtonHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }
        
        return { scale: 1.05 };
    }, [animationConfig.reduce]);

    if (!shouldShow) return null;

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
                    className="relative w-full max-w-11/12 sm:max-w-lg bg-gradient-to-br from-[#2e175c]/90 via-[#1a1a1a]/95 to-black/90 border border-[#ff75df]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-[#ff75df]/20"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                        whileHover={closeButtonHoverVariants}
                        whileTap={{ scale: animationConfig.reduce ? 1 : 0.95 }}
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    {/* Icon with conditional animation */}
                    <motion.div 
                        className="flex justify-center mb-6"
                        variants={shouldAnimate ? itemVariants : {}}
                    >
                        <motion.div 
                            className="w-16 h-16 bg-gradient-to-r from-[#ff75df] to-purple-400 rounded-full flex items-center justify-center"
                            animate={animationConfig.reduce ? {} : {
                                boxShadow: [
                                    "0 0 20px rgba(255, 117, 223, 0.3)",
                                    "0 0 30px rgba(255, 117, 223, 0.5)",
                                    "0 0 20px rgba(255, 117, 223, 0.3)"
                                ]
                            }}
                            transition={{
                                duration: animationConfig.reduce ? 0 : 2,
                                repeat: animationConfig.reduce ? 0 : Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Code2 className="w-8 h-8 text-white" />
                        </motion.div>
                    </motion.div>

                    {/* Content with conditional stagger */}
                    <motion.div 
                        className="text-center space-y-4"
                        variants={shouldAnimate ? contentVariants : {}}
                        initial={shouldAnimate ? "hidden" : false}
                        animate={shouldAnimate ? "visible" : false}
                    >
                        {/* Title */}
                        <motion.h2
                            className="text-2xl sm:text-3xl font-black italic tracking-tight bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-transparent"
                            variants={shouldAnimate ? itemVariants : {}}
                        >
                            Under Development
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.div
                            className="flex items-center justify-center gap-2 text-[#ff75df]/80"
                            variants={shouldAnimate ? itemVariants : {}}
                        >
                            <span className="text-sm font-medium tracking-wide">Digital Portfolio v2.0</span>
                        </motion.div>

                        {/* Message */}
                        <motion.p
                            className="text-white/80 text-sm sm:text-base leading-relaxed px-2"
                            variants={shouldAnimate ? itemVariants : {}}
                        >
                            This portfolio is currently being enhanced with new features, 
                            improved animations, and fresh content. Some sections may be 
                            incomplete or under construction.
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            className="text-left bg-white/5 rounded-xl p-4 border border-white/10"
                            variants={shouldAnimate ? itemVariants : {}}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-[#ff75df]" />
                                <span className="text-sm font-medium text-white">Currently Working On:</span>
                            </div>
                            <FeaturesList animationConfig={animationConfig} />
                        </motion.div>

                        {/* Action Button */}
                        <motion.button
                            onClick={onClose}
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#ff75df] to-purple-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#ff75df]/30 transition-all duration-200"
                            whileHover={buttonHoverVariants}
                            whileTap={{ scale: animationConfig.reduce ? 1 : 0.99 }}
                            variants={shouldAnimate ? itemVariants : {}}
                        >
                            Continue Exploring
                        </motion.button>

                        {/* Footer Note */}
                        <motion.p
                            className="text-xs text-white/50 mt-4"
                            variants={shouldAnimate ? itemVariants : {}}
                        >
                            Thank you for your patience! 🚀
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const FeaturesList = ({ animationConfig }) => {
    const features = [
        { text: "Enhanced animations & interactions", color: "bg-[#ff75df]" },
        { text: "Mobile responsiveness optimization", color: "bg-purple-400" },
        { text: "New project showcases", color: "bg-[#ff75df]" },
        { text: "Performance improvements", color: "bg-purple-400" }
    ];

    const itemHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }
        
        return {
            x: 4,
            transition: { duration: 0.2 }
        };
    }, [animationConfig.reduce]);

    return (
        <ul className="space-y-2 text-xs sm:text-sm text-white/70">
            {features.map((feature, index) => (
                <motion.li 
                    key={index}
                    className="flex items-center gap-2 cursor-default"
                    whileHover={itemHoverVariants}
                    initial={animationConfig.reduce ? {} : { opacity: 0, x: -10 }}
                    animate={animationConfig.reduce ? {} : { 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                            delay: createStaggerDelay(index, 0.1),
                            duration: 0.3
                        }
                    }}
                >
                    <motion.div 
                        className={`w-1.5 h-1.5 ${feature.color} rounded-full`}
                        animate={animationConfig.reduce ? {} : {
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                            duration: animationConfig.reduce ? 0 : 2,
                            repeat: animationConfig.reduce ? 0 : Infinity,
                            delay: index * 0.3
                        }}
                    />
                    {feature.text}
                </motion.li>
            ))}
        </ul>
    );
};

export default DevelopmentModal;