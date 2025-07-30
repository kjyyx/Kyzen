import { ANIMATION_DURATION, EASING } from './constants';

// Scroll animation presets
export const scrollAnimationPresets = {
    // Standard fade animations
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
        }
    },
    
    fadeInUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: ANIMATION_DURATION.slow, ease: EASING.easeOut }
        }
    },
    
    fadeInDown: {
        hidden: { opacity: 0, y: -40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: ANIMATION_DURATION.slow, ease: EASING.easeOut }
        }
    },
    
    fadeInLeft: {
        hidden: { opacity: 0, x: -40 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: ANIMATION_DURATION.slow, ease: EASING.easeOut }
        }
    },
    
    fadeInRight: {
        hidden: { opacity: 0, x: 40 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: ANIMATION_DURATION.slow, ease: EASING.easeOut }
        }
    },
    
    // Scale animations
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: ANIMATION_DURATION.slow, ease: EASING.bounce }
        }
    },
    
    // Slide animations
    slideInUp: {
        hidden: { opacity: 0, y: 100, rotateX: -15 },
        visible: { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: { duration: ANIMATION_DURATION.slower, ease: EASING.easeOut }
        }
    },
    
    // Stagger container
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    },
    
    // Stagger child
    staggerChild: {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
        }
    }
};

// Performance optimized scroll variants
export const createScrollVariants = (type = 'fadeInUp', options = {}) => {
    const {
        delay = 0,
        duration = ANIMATION_DURATION.slow,
        ease = EASING.easeOut,
        stagger = false,
        staggerDelay = 0.1
    } = options;

    const baseVariant = scrollAnimationPresets[type] || scrollAnimationPresets.fadeInUp;
    
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

// Smooth reveal animation for sections
export const createSectionReveal = (direction = 'up', options = {}) => {
    const directions = {
        up: { y: 60 },
        down: { y: -60 },
        left: { x: -60 },
        right: { x: 60 }
    };

    return {
        hidden: {
            opacity: 0,
            ...directions[direction],
            scale: 0.95
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                duration: ANIMATION_DURATION.slow,
                ease: EASING.easeOut,
                ...options
            }
        }
    };
};

// Create stagger animation for lists
export const createStaggerAnimation = (childDelay = 0.1) => ({
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: childDelay,
                delayChildren: 0.1
            }
        }
    },
    item: {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: ANIMATION_DURATION.normal,
                ease: EASING.easeOut
            }
        }
    }
});