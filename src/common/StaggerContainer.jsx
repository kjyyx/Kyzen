import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useStaggerScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Container for staggered animations
 */
const StaggerContainer = memo(({ 
    children, 
    staggerDelay = 0.1,
    className = '',
    as = 'div',
    ...props 
}) => {
    const { ref, variants, controls, childVariants } = useStaggerScrollAnimation(staggerDelay);

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
            {React.Children.map(children, (child, index) => (
                <motion.div
                    key={index}
                    variants={childVariants}
                >
                    {child}
                </motion.div>
            ))}
        </MotionComponent>
    );
});

export default StaggerContainer;