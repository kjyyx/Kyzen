import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { SCROLL_THRESHOLDS, ANIMATION_DURATION, EASING } from '../utils/constants';
import { throttle } from '../utils/helpers';

/**
 * Custom hook for smooth scroll animations with performance optimization
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @param {number} options.delay - Animation delay in seconds
 * @param {string} options.animationType - Type of animation preset
 * @param {Object} options.customVariants - Custom animation variants
 * @param {boolean} options.enableStagger - Enable stagger animation for children
 * @param {number} options.staggerDelay - Delay between staggered animations
 */
export const useScrollAnimation = (options = {}) => {
    const {
        threshold = SCROLL_THRESHOLDS.partial,
        triggerOnce = true,
        delay = 0,
        animationType = 'fadeUp',
        customVariants = null,
        enableStagger = false,
        staggerDelay = 0.1,
        rootMargin = '-50px'
    } = options;

    const ref = useRef(null);
    const controls = useAnimation();
    
    // Use Framer Motion's useInView with performance optimizations
    const isInView = useInView(ref, {
        threshold,
        triggerOnce,
        rootMargin
    });

    // Predefined animation variants
    const animationVariants = {
        fadeUp: {
            hidden: { 
                opacity: 0, 
                y: 60,
                scale: 0.95
            },
            visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                    duration: ANIMATION_DURATION.slow,
                    delay,
                    ease: EASING.easeOut,
                    ...(enableStagger && {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    })
                }
            }
        },
        fadeDown: {
            hidden: { 
                opacity: 0, 
                y: -60,
                scale: 0.95
            },
            visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                    duration: ANIMATION_DURATION.slow,
                    delay,
                    ease: EASING.easeOut,
                    ...(enableStagger && {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    })
                }
            }
        },
        fadeLeft: {
            hidden: { 
                opacity: 0, 
                x: -60,
                scale: 0.95
            },
            visible: { 
                opacity: 1, 
                x: 0,
                scale: 1,
                transition: {
                    duration: ANIMATION_DURATION.slow,
                    delay,
                    ease: EASING.easeOut,
                    ...(enableStagger && {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    })
                }
            }
        },
        fadeRight: {
            hidden: { 
                opacity: 0, 
                x: 60,
                scale: 0.95
            },
            visible: { 
                opacity: 1, 
                x: 0,
                scale: 1,
                transition: {
                    duration: ANIMATION_DURATION.slow,
                    delay,
                    ease: EASING.easeOut,
                    ...(enableStagger && {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    })
                }
            }
        },
        scale: {
            hidden: { 
                opacity: 0, 
                scale: 0.8
            },
            visible: { 
                opacity: 1, 
                scale: 1,
                transition: {
                    duration: ANIMATION_DURATION.slow,
                    delay,
                    ease: EASING.bounce,
                    ...(enableStagger && {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    })
                }
            }
        },
        slide: {
            hidden: { 
                opacity: 0, 
                y: 100,
                rotateX: -15
            },
            visible: { 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                transition: {
                    duration: ANIMATION_DURATION.slower,
                    delay,
                    ease: EASING.easeOut,
                    ...(enableStagger && {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    })
                }
            }
        }
    };

    // Get the variants to use
    const variants = customVariants || animationVariants[animationType] || animationVariants.fadeUp;

    // Throttled animation trigger for performance
    const throttledAnimate = throttle(() => {
        if (isInView) {
            controls.start('visible');
        } else if (!triggerOnce) {
            controls.start('hidden');
        }
    }, 16); // ~60fps

    useEffect(() => {
        throttledAnimate();
    }, [isInView, throttledAnimate]);

    // Child animation variants for stagger effects
    const childVariants = {
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
    };

    return {
        ref,
        controls,
        variants,
        childVariants,
        isInView,
        animate: controls.start
    };
};

/**
 * Simplified version for basic fade-in animations
 */
export const useSimpleScrollAnimation = (delay = 0) => {
    return useScrollAnimation({
        animationType: 'fadeUp',
        delay,
        threshold: SCROLL_THRESHOLDS.minimal
    });
};

/**
 * Hook for stagger animations on lists/grids
 */
export const useStaggerScrollAnimation = (staggerDelay = 0.1) => {
    return useScrollAnimation({
        animationType: 'fadeUp',
        enableStagger: true,
        staggerDelay,
        threshold: SCROLL_THRESHOLDS.partial
    });
};

/**
 * Hook for hero/header sections with dramatic entrance
 */
export const useHeroScrollAnimation = () => {
    return useScrollAnimation({
        animationType: 'slide',
        threshold: SCROLL_THRESHOLDS.minimal,
        delay: 0.2
    });
};
