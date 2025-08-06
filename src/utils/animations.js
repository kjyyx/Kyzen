import { ANIMATION_DURATION, EASING, PERFORMANCE } from './constants';
import { getAnimationConfig } from './helpers';

// Simplified animation presets for better performance
export const scrollAnimationPresets = {
    // Minimal fade animations
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: ANIMATION_DURATION.normal, 
                ease: EASING.easeOut
            }
        }
    },
    
    fadeInUp: {
        hidden: { opacity: 0, y: 20 }, // Reduced from 40
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: ANIMATION_DURATION.slow, 
                ease: EASING.easeOut
            }
        }
    },
    
    fadeInDown: {
        hidden: { opacity: 0, y: -20 }, // Reduced from -40
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: ANIMATION_DURATION.slow, 
                ease: EASING.easeOut
            }
        }
    },
    
    fadeInLeft: {
        hidden: { opacity: 0, x: -20 }, // Reduced from -40
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: ANIMATION_DURATION.slow, 
                ease: EASING.easeOut
            }
        }
    },
    
    fadeInRight: {
        hidden: { opacity: 0, x: 20 }, // Reduced from 40
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: ANIMATION_DURATION.slow, 
                ease: EASING.easeOut
            }
        }
    },
    
    // Simplified scale animations
    scaleIn: {
        hidden: { opacity: 0, scale: 0.95 }, // Less dramatic scaling
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: ANIMATION_DURATION.slow, 
                ease: EASING.easeOut // Removed bounce for performance
            }
        }
    },
    
    // Simplified slide animations
    slideInUp: {
        hidden: { opacity: 0, y: 30 }, // Reduced from 100
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: ANIMATION_DURATION.slower, 
                ease: EASING.easeOut
            }
        }
    },
    
    // Optimized stagger container
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05, // Reduced from 0.1
                delayChildren: 0.1
            }
        }
    },
    
    // Optimized stagger child
    staggerChild: {
        hidden: { opacity: 0, y: 10 }, // Reduced from 20
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: ANIMATION_DURATION.normal, 
                ease: EASING.easeOut
            }
        }
    }
};

// Performance-aware scroll variants creator
export const createScrollVariants = (type = 'fadeInUp', options = {}) => {
    const config = getAnimationConfig();
    const {
        delay = 0,
        duration = config.duration,
        ease = EASING.easeOut,
        stagger = false,
        staggerDelay = config.staggerDelay
    } = options;

    const baseVariant = scrollAnimationPresets[type] || scrollAnimationPresets.fadeInUp;
    
    // Return simplified variant for low-end devices
    if (config.reduce) {
        return {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    duration: duration * 0.5,
                    delay: delay * 0.5,
                    ease: EASING.easeOut
                }
            }
        };
    }
    
    return {
        hidden: baseVariant.hidden,
        visible: {
            ...baseVariant.visible,
            transition: {
                ...baseVariant.visible.transition,
                delay,
                duration,
                ease,
                ...(stagger && {
                    staggerChildren: staggerDelay,
                    delayChildren: delay
                })
            }
        }
    };
};

// Lightweight section reveal for performance
export const createSectionReveal = (direction = 'up', options = {}) => {
    const config = getAnimationConfig();
    
    if (config.reduce) {
        return {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    duration: config.duration,
                    ease: EASING.easeOut
                }
            }
        };
    }
    
    const directions = {
        up: { y: 20 },    // Reduced from 60
        down: { y: -20 },  // Reduced from -60
        left: { x: -20 },  // Reduced from -60
        right: { x: 20 }   // Reduced from 60
    };

    return {
        hidden: {
            opacity: 0,
            ...directions[direction]
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: ANIMATION_DURATION.slow,
                ease: EASING.easeOut,
                ...options
            }
        }
    };
};

// Optimized stagger animation with performance considerations
export const createStaggerAnimation = (childDelay = 0.05) => {
    const config = getAnimationConfig();
    const actualDelay = config.reduce ? childDelay * 0.5 : childDelay;
    
    return {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: actualDelay,
                    delayChildren: 0.05
                }
            }
        },
        item: {
            hidden: { 
                opacity: 0, 
                y: config.reduce ? 5 : 10
            },
            visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                    duration: config.duration,
                    ease: EASING.easeOut
                }
            }
        }
    };
};

// Hero animation with performance optimization
export const createHeroAnimation = () => {
    const config = getAnimationConfig();
    
    if (config.reduce) {
        return {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { duration: 0.3 }
            }
        };
    }
    
    return {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: ANIMATION_DURATION.slower,
                ease: EASING.easeOut,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
};

// Hover animation presets (simplified for performance)
export const hoverAnimations = {
    lift: {
        y: -2,
        transition: { duration: 0.2, ease: EASING.easeOut }
    },
    scale: {
        scale: 1.02,
        transition: { duration: 0.2, ease: EASING.easeOut }
    },
    glow: {
        boxShadow: '0 10px 25px rgba(255, 117, 223, 0.3)',
        transition: { duration: 0.3, ease: EASING.easeOut }
    }
};