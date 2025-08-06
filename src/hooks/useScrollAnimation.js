import { useRef, useEffect, useCallback, useMemo } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { 
    SCROLL_THRESHOLDS, 
    ANIMATION_DURATION, 
    EASING, 
    PERFORMANCE 
} from '../utils/constants';
import { 
    throttle, 
    getAnimationConfig, 
    canAnimate, 
    registerAnimation, 
    unregisterAnimation 
} from '../utils/helpers';

/**
 * Optimized scroll animation hook with performance monitoring
 */
export const useScrollAnimation = (options = {}) => {
    const {
        threshold = SCROLL_THRESHOLDS.partial,
        triggerOnce = true,
        delay = 0,
        animationType = 'fadeUp',
        customVariants = null,
        enableStagger = false,
        staggerDelay = 0.05,
        rootMargin = PERFORMANCE.intersectionRootMargin,
        priority = 'medium'
    } = options;

    const ref = useRef(null);
    const controls = useAnimation();
    const animationConfig = useMemo(() => getAnimationConfig(), []);
    
    // Check if we should run animations
    const shouldAnimate = useMemo(() => {
        if (!canAnimate()) return false;
        if (animationConfig.reduce && priority === 'low') return false;
        return true;
    }, [animationConfig.reduce, priority]);
    
    // Optimized intersection observer
    const isInView = useInView(ref, {
        threshold: animationConfig.reduce ? SCROLL_THRESHOLDS.minimal : threshold,
        triggerOnce,
        rootMargin
    });

    // Simplified animation variants for performance
    const animationVariants = useMemo(() => {
        const baseDelay = animationConfig.reduce ? delay * 0.5 : delay;
        const baseDuration = animationConfig.reduce ? ANIMATION_DURATION.fast : ANIMATION_DURATION.slow;
        const baseStagger = animationConfig.reduce ? staggerDelay * 0.5 : staggerDelay;
        
        if (animationConfig.reduce) {
            return {
                fadeUp: {
                    hidden: { opacity: 0 },
                    visible: { 
                        opacity: 1,
                        transition: {
                            duration: baseDuration,
                            delay: baseDelay,
                            ease: EASING.easeOut
                        }
                    }
                }
            };
        }
        
        return {
            fadeUp: {
                hidden: { 
                    opacity: 0, 
                    y: 20
                },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: baseDuration,
                        delay: baseDelay,
                        ease: EASING.easeOut,
                        ...(enableStagger && {
                            staggerChildren: baseStagger,
                            delayChildren: baseDelay
                        })
                    }
                }
            },
            fadeDown: {
                hidden: { 
                    opacity: 0, 
                    y: -20
                },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: baseDuration,
                        delay: baseDelay,
                        ease: EASING.easeOut,
                        ...(enableStagger && {
                            staggerChildren: baseStagger,
                            delayChildren: baseDelay
                        })
                    }
                }
            },
            fadeLeft: {
                hidden: { 
                    opacity: 0, 
                    x: -20
                },
                visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                        duration: baseDuration,
                        delay: baseDelay,
                        ease: EASING.easeOut,
                        ...(enableStagger && {
                            staggerChildren: baseStagger,
                            delayChildren: baseDelay
                        })
                    }
                }
            },
            fadeRight: {
                hidden: { 
                    opacity: 0, 
                    x: 20
                },
                visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                        duration: baseDuration,
                        delay: baseDelay,
                        ease: EASING.easeOut,
                        ...(enableStagger && {
                            staggerChildren: baseStagger,
                            delayChildren: baseDelay
                        })
                    }
                }
            },
            scale: {
                hidden: { 
                    opacity: 0, 
                    scale: 0.95
                },
                visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                        duration: baseDuration,
                        delay: baseDelay,
                        ease: EASING.easeOut,
                        ...(enableStagger && {
                            staggerChildren: baseStagger,
                            delayChildren: baseDelay
                        })
                    }
                }
            },
            slide: {
                hidden: { 
                    opacity: 0, 
                    y: 30
                },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: baseDuration,
                        delay: baseDelay,
                        ease: EASING.easeOut,
                        ...(enableStagger && {
                            staggerChildren: baseStagger,
                            delayChildren: baseDelay
                        })
                    }
                }
            }
        };
    }, [animationConfig, delay, staggerDelay, enableStagger]);

    // Get the variants to use
    const variants = customVariants || animationVariants[animationType] || animationVariants.fadeUp;

    // Optimized animation trigger with registration
    const throttledAnimate = useCallback(
        throttle(() => {
            if (!shouldAnimate) return;
            
            if (isInView) {
                registerAnimation();
                controls.start('visible').finally(() => {
                    unregisterAnimation();
                });
            } else if (!triggerOnce) {
                controls.start('hidden');
            }
        }, PERFORMANCE.throttleDelay),
        [isInView, shouldAnimate, triggerOnce, controls]
    );

    useEffect(() => {
        throttledAnimate();
    }, [throttledAnimate]);

    // Simplified child variants for stagger effects
    const childVariants = useMemo(() => ({
        hidden: { 
            opacity: 0, 
            y: animationConfig.reduce ? 5 : 10
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: animationConfig.reduce ? ANIMATION_DURATION.fast : ANIMATION_DURATION.normal,
                ease: EASING.easeOut
            }
        }
    }), [animationConfig.reduce]);

    return {
        ref,
        controls,
        variants,
        childVariants,
        isInView,
        animate: controls.start,
        shouldAnimate
    };
};

/**
 * Simplified version for basic fade-in animations
 */
export const useSimpleScrollAnimation = (delay = 0) => {
    return useScrollAnimation({
        animationType: 'fadeUp',
        delay,
        threshold: SCROLL_THRESHOLDS.minimal,
        priority: 'low'
    });
};

/**
 * Optimized hook for stagger animations
 */
export const useStaggerScrollAnimation = (staggerDelay = 0.05) => {
    return useScrollAnimation({
        animationType: 'fadeUp',
        enableStagger: true,
        staggerDelay,
        threshold: SCROLL_THRESHOLDS.partial,
        priority: 'medium'
    });
};

/**
 * High-priority hook for hero/header sections
 */
export const useHeroScrollAnimation = () => {
    return useScrollAnimation({
        animationType: 'slide',
        threshold: SCROLL_THRESHOLDS.minimal,
        delay: 0.1,
        priority: 'critical'
    });
};