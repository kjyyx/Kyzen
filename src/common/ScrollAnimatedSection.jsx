import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Wrapper component for scroll animations
 */
const ScrollAnimatedSection = memo(({ 
    children, 
    animationType = 'fadeUp',
    delay = 0,
    className = '',
    enableStagger = false,
    threshold = 0.1,
    as = 'div',
    ...props 
}) => {
    const { ref, variants, controls } = useScrollAnimation({
        animationType,
        delay,
        enableStagger,
        threshold
    });

    const MotionComponent = motion[as];

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

export default ScrollAnimatedSection;