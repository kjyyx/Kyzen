import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const HeaderGrid = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Animation variants
    const circleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 0.3,
            transition: {
                duration: 2,
                ease: "easeOut",
            },
        },
        pulse: {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    const avatarVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                delay: 0.5,
            },
        },
    };

    // Floating particles configuration
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        x: Math.random() * 20 - 10
    }));

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Circles */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] border-2 border-pink-500/50 rounded-full"
                    variants={circleVariants}
                    initial="hidden"
                    animate={["visible", "pulse"]}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] border border-orange-500/50 rounded-full"
                    variants={circleVariants}
                    initial="hidden"
                    animate={["visible", "pulse"]}
                    transition={{ delay: 0.5 }}
                />
            </div>

            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-purple-400/60 rounded-full z-5"
                    style={{
                        left: particle.left,
                        top: particle.top,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, particle.x, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main Content */}
            <div
                className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-16"
                ref={containerRef}
            >
                {/* Background Text */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 w-full overflow-hidden">
                    {/* Japanese Characters */}
                    <motion.div
                        className="absolute top-2 left-5 md:top-25 md:left-80 text-xl md:text-3xl lg:text-5xl text-gray-300 font-light z-6"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate={controls}
                        transition={{ delay: 0.8 }}
                    >
                        ケンジ
                    </motion.div>
                    <motion.div
                        className="absolute bottom-2 right-5 md:bottom-20 md:right-80 text-lg md:text-3xl lg:text-5xl text-gray-300 font-light z-6"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate={controls}
                        transition={{ delay: 1.2 }}
                    >
                        カイゼン
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-[25vw] md:text-[18vw] lg:text-[25rem] text-[#ff75df] italic tracking-tight font-black text-center whitespace-nowrap"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate={controls}
                    >
                        KYZEN
                    </motion.h1>
                </div>

                {/* Avatar Image */}
                <motion.div
                    className="absolute top-[55%] md:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-8"
                    variants={avatarVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <div
                        className="w-[300px] h-[350px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] flex items-center justify-center"
                        style={{
                            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                        }}
                    >
                        <img
                            src="/src/assets/Avatar.png"
                            alt="Avatar"
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Supporting Text */}
            <motion.div
                className="absolute bottom-20 left-4 md:bottom-50 md:left-65 max-w-xs md:max-w-md text-gray-300/90 text-xs md:text-sm lg:text-base leading-relaxed z-6 px-4"
                variants={fadeInVariants}
                initial="hidden"
                animate={controls}
                transition={{ delay: 1.0 }}
            >
                <p className="mb-2">
                    In the digital realm of modern web development, there exists a
                    creative force known only as "The Developer." A place where code,
                    design, and innovation converge.
                </p>
                <p className="text-pink-400 font-medium">
                    Enter the portfolio, a digital space where creativity meets
                    technology.
                </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-15"
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    delay: 3,
                    duration: 1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
            >
                <motion.div
                    className="flex flex-col items-center text-gray-400/80 cursor-pointer"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{
                        scale: 1.2,
                        color: "rgba(236, 72, 153, 0.9)"
                    }}
                >
                    <motion.span
                        className="text-xs md:text-sm mb-2 font-light italic"
                        animate={{
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        Scroll to explore
                    </motion.span>
                    <motion.div
                        className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-400/40 rounded-full flex justify-center relative overflow-hidden"
                        whileHover={{
                            borderColor: "rgba(236, 72, 153, 0.8)",
                            boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)"
                        }}
                    >
                        <motion.div
                            className="w-1 h-2 md:h-3 bg-gradient-to-b from-pink-400 to-orange-400 rounded-full mt-1 md:mt-2"
                            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-pink-400/20 to-orange-400/20 rounded-full"
                            animate={{
                                opacity: [0, 0.5, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5
                            }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Gradient Animation Styles */}
            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                .bg-300\% {
                    background-size: 300% 300%;
                }
            `}</style>
        </div>
    );
};

export default HeaderGrid;