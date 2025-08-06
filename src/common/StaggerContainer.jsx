import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useStaggerScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Optimized container for staggered animations
 */
const StaggerContainer = memo(({ 
    children, 
    staggerDelay = 0.05,
    className = '',
    as = 'div',
    priority = 'medium',
    ...props 
}) => {
    const { ref, variants, controls, childVariants, shouldAnimate } = useStaggerScrollAnimation(staggerDelay);

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
            {React.Children.map(children, (child, index) => (
                <motion.div
                    key={child?.key || index}
                    variants={childVariants}
                >
                    {child}
                </motion.div>
            ))}
        </MotionComponent>
    );
});

StaggerContainer.displayName = 'StaggerContainer';

export default StaggerContainer;