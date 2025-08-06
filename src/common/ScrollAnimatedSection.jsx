import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Optimized wrapper component for scroll animations
 */
const ScrollAnimatedSection = memo(({ 
    children, 
    animationType = 'fadeUp',
    delay = 0,
    className = '',
    enableStagger = false,
    threshold = 0.1,
    priority = 'medium',
    as = 'div',
    ...props 
}) => {
    const { ref, variants, controls, shouldAnimate } = useScrollAnimation({
        animationType,
        delay,
        enableStagger,
        threshold,
        priority
    });

    const MotionComponent = motion[as];

    // Skip animation wrapper if animations are disabled
    if (!shouldAnimate) {
        const Component = as === 'div' ? 'div' : as;
        return (
            <Component
                ref={ref}
                className={className}
                {...props}
            >
                {children}
            </Component>
        );
    }

    return (
        <MotionComponent
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            className={className}
            {...props}
        >
            {children}
        </MotionComponent>
    );
});

ScrollAnimatedSection.displayName = 'ScrollAnimatedSection';

export default ScrollAnimatedSection;