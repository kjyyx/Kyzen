import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            // Wait for fade animation to complete before calling onLoadingComplete
            setTimeout(() => {
                onLoadingComplete && onLoadingComplete();
            }, 500); // Match the fade duration
        }, 2500);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#131313]"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
        >
            {/* Loading dots */}
            <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 bg-[#ff75df] rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default LoadingScreen;