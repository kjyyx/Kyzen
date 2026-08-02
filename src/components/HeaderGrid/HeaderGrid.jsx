import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";

import BigLogo from '../../assets/KYZENLOGO6.webp';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import {
    getAnimationConfig,
    canAnimate
} from '../../utils/helpers';
import {
    ANIMATION_DURATION,
    EASING
} from '../../utils/constants';

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// Background Circles Component - Shifted behind the right-side logo
const BackgroundCircles = memo(() => {
    const animationConfig = getAnimationConfig();

    return (
        <ScrollAnimatedSection
            animationType="scale"
            delay={0.1}
            className="absolute right-[-5vw] md:right-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
            priority="critical"
        >
            <div className="relative w-[58vw] sm:w-[50vw] max-w-[560px] aspect-square flex items-center justify-center">
                <BackgroundCircle
                    size="large"
                    borderClass="border-brand-light/25"
                    delay={0}
                    animationConfig={animationConfig}
                />
                <BackgroundCircle
                    size="medium"
                    borderClass="border-secondary/25"
                    delay={0.3}
                    animationConfig={animationConfig}
                />
            </div>
        </ScrollAnimatedSection>
    );
});

// Individual Background Circle
const BackgroundCircle = memo(({ size, borderClass, delay, animationConfig }) => {
    const sizeClasses = useMemo(() => {
        const sizes = {
            large: "w-[120%] h-[120%] border-2",
            medium: "w-[85%] h-[85%] border"
        };
        return sizes[size] || sizes.medium;
    }, [size]);

    const circleVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                scale: 1,
                opacity: 0.3
            };
        }

        return {
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.35, 0.2]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses} ${borderClass} rounded-full`}
            animate={circleVariants}
            transition={{
                duration: animationConfig.reduce ? 0 : 4,
                repeat: animationConfig.reduce ? 0 : Infinity,
                ease: "easeInOut",
                delay: animationConfig.reduce ? 0 : delay
            }}
        />
    );
});

// Floating Particles Component
const FloatingParticles = memo(() => {
    const animationConfig = getAnimationConfig();
    const particleCount = animationConfig.reduce ? 6 : 8;

    const particles = useMemo(() =>
        Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: animationConfig.reduce ? 2 : 3 + Math.random() * 2,
            delay: animationConfig.reduce ? 0 : Math.random() * 2,
            x: animationConfig.reduce ? 0 : Math.random() * 20 - 10
        })), [particleCount, animationConfig.reduce]
    );

    if (!canAnimate() || animationConfig.reduce) {
        return null;
    }

    return (
        <ScrollAnimatedSection
            animationType="fadeIn"
            delay={0.3}
            className="absolute inset-0 pointer-events-none z-10"
            priority="low"
        >
            <div className="relative w-full h-full">
                {particles.map((particle) => (
                    <FloatingParticle key={particle.id} particle={particle} />
                ))}
            </div>
        </ScrollAnimatedSection>
    );
});

// Individual Floating Particle
const FloatingParticle = memo(({ particle }) => (
    <motion.div
        className="absolute w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-brand-light/60 rounded-full z-10"
        style={{
            left: particle.left,
            top: particle.top,
        }}
        animate={{
            y: [0, -20, 0],
            x: [0, particle.x, 0],
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
        }}
    />
));

// Main Header Content Container
const HeaderContent = memo(() => (
    <div className="relative z-20 w-full max-w-7xl mx-auto h-full min-h-[82svh] lg:min-h-[calc(100svh-5rem)] lg:max-h-[920px] flex items-end justify-between px-4 sm:px-6 lg:px-8 pb-10 md:pb-14 lg:pb-16">
        <LeftSection />
        <HeroLogoMark />
    </div>
));

// Action Buttons (CTAs) above Kyzen Title
const HeroCTAs = memo(() => (
    <div className="flex items-center gap-4 pt-2">
        <a
            href="#projects"
            className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-brand-light/20 border border-brand-light/40 text-brand-light font-medium text-xs sm:text-sm hover:bg-brand-light/30 transition-all duration-300 shadow-[0_0_20px_rgba(2,133,130,0.2)]"
        >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
            href="#about"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-gray-600/50 text-gray-200 font-medium text-xs sm:text-sm hover:border-gray-400 transition-colors"
        >
            <span>About Me</span>
            <User className="w-4 h-4 text-gray-400" />
        </a>
    </div>
));

// Big Watermark Logo on Right Side
const HeroLogoMark = memo(() => (
    <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/6 w-[68vw] sm:w-[56vw] md:w-[46vw] max-w-[560px] h-auto pointer-events-none z-10 opacity-25 select-none overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{
            duration: ANIMATION_DURATION.slower,
            ease: EASING.easeOut,
            delay: 0.4
        }}
    >
        <img src={BigLogo} alt="Logo" className="w-full h-full object-contain" />
    </motion.div>
));

// Japanese Text Component
const JapaneseText = memo(({ position, text, delay }) => {
    const animationConfig = getAnimationConfig();

    const textVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,
                    transition: { duration: 0.3, delay: delay * 0.5 }
                }
            };
        }

        return {
            initial: { opacity: 0, x: -15 },
            animate: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: ANIMATION_DURATION.slow,
                    ease: EASING.easeOut,
                    delay
                }
            }
        };
    }, [animationConfig.reduce, delay]);

    return (
        <motion.span
            className={`absolute ${position} text-[0.16em] text-gray-300/80 font-light tracking-wider`}
            {...textVariants}
        >
            {text}
        </motion.span>
    );
});

// Left Side Container (Headline -> CTAs -> Title)
const LeftSection = memo(() => (
    <div className="relative z-30 flex flex-col items-start space-y-4 sm:space-y-5 max-w-2xl">
        <MainHeadline />
        <HeroCTAs />
        <MainTitle />
    </div>
));

// Main Headline above CTAs
const MainHeadline = memo(() => {
    return (
        <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-100 leading-[1.15] font-normal tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: ANIMATION_DURATION.slower,
                ease: EASING.easeOut,
                delay: 0.2
            }}
        >
            Building digital experiences with{" "}
            <span className="italic text-brand-light">clarity</span> and{" "}
            <span className="italic text-brand-light">character.</span>
        </motion.h2>
    );
});

// Main Title Component
const MainTitle = memo(() => {
    const animationConfig = getAnimationConfig();

    const titleVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,
                    transition: { duration: 0.6, delay: 0.2 }
                }
            };
        }

        return {
            initial: { opacity: 0, y: 20 },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: ANIMATION_DURATION.slower,
                    ease: EASING.easeOut,
                    delay: 0.4
                }
            }
        };
    }, [animationConfig.reduce]);

    const glowVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }

        return {
            textShadow: [
                "0 0 30px rgba(2, 133, 130, 0.26)",
                "0 0 35px rgba(2, 133, 130, 0.34)",
                "0 0 30px rgba(2, 133, 130, 0.26)"
            ]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.h1
            className="relative text-[14vw] xs:text-[11vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.75rem] italic tracking-tight font-black text-left whitespace-nowrap leading-none pt-3"
            {...titleVariants}
            style={{
                textShadow: "0 0 30px rgba(2, 133, 130, 0.26), 0 0 60px rgba(2, 133, 130, 0.10)"
            }}
        >
            <motion.span
                className="relative bg-gradient-to-r from-white via-brand-light to-brand-light bg-clip-text text-transparent inline-block py-2"
                animate={glowVariants}
                transition={{
                    duration: animationConfig.reduce ? 0 : 3,
                    repeat: animationConfig.reduce ? 0 : Infinity,
                    ease: "easeInOut"
                }}
            >
                KYZEN

                <JapaneseText
                    position="left-[0.1em] -top-[0.5em]"
                    text="ケンジ"
                    delay={0.8}
                />

                <JapaneseText
                    position="right-0 -bottom-[0.4em]"
                    text="カイゼン"
                    delay={1.0}
                />
            </motion.span>
        </motion.h1>
    );
});

// Scroll Indicator Dot
const ScrollIndicatorDot = memo(() => {
    const animationConfig = getAnimationConfig();

    const dotVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: 0, opacity: 1 };
        }

        return {
            y: [0, 6, 0],
            opacity: [1, 0.5, 1]
        };
    }, [animationConfig.reduce]);

    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }

        return {
            borderColor: "rgba(2, 133, 130, 0.7)",
            boxShadow: "0 0 15px rgba(2, 133, 130, 0.22)"
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="w-4 h-6 xs:w-5 xs:h-7 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-gray-400/40 rounded-full flex justify-center relative overflow-hidden"
            whileHover={hoverVariants}
        >
            <motion.div
                className="w-0.5 h-1 xs:w-1 xs:h-1.5 sm:w-1 sm:h-2 md:h-3 bg-brand-light rounded-full mt-0.5 xs:mt-1 md:mt-2"
                animate={dotVariants}
                transition={{
                    duration: animationConfig.reduce ? 0 : 1.5,
                    repeat: animationConfig.reduce ? 0 : Infinity
                }}
            />
        </motion.div>
    );
});

// Scroll Indicator Component
const ScrollIndicator = memo(() => {
    const animationConfig = getAnimationConfig();

    const indicatorVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: 0 };
        }

        return { y: [0, 10, 0] };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={1.2}
            className="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30"
            priority="low"
        >
            <motion.div
                className="flex flex-col items-center text-gray-400/80 cursor-pointer"
                animate={indicatorVariants}
                transition={{
                    duration: animationConfig.reduce ? 0 : 2,
                    repeat: animationConfig.reduce ? 0 : Infinity
                }}
            >
                <ScrollIndicatorLabel />
                <ScrollIndicatorDot />
            </motion.div>
        </ScrollAnimatedSection>
    );
});

// Scroll Indicator Label
const ScrollIndicatorLabel = memo(() => {
    const animationConfig = getAnimationConfig();

    const labelVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { opacity: 0.8 };
        }

        return { opacity: [0.6, 0.9, 0.6] };
    }, [animationConfig.reduce]);

    return (
        <motion.span
            className="text-xs sm:text-sm mb-1 font-light italic tracking-wider"
            animate={labelVariants}
            transition={{
                duration: animationConfig.reduce ? 0 : 2,
                repeat: animationConfig.reduce ? 0 : Infinity
            }}
        >
            Scroll to explore
        </motion.span>
    );
});

// ===== MAIN COMPONENT =====

function HeaderGrid() {
    return (
        <div id="header-section" className="relative min-h-[82svh] lg:min-h-[calc(100svh-5rem)] lg:max-h-[920px] overflow-hidden w-full">
            {/* Background Circles positioned right behind the watermark logo */}
            <BackgroundCircles />

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Main Content Layout */}
            <HeaderContent />

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </div>
    );
}

export default memo(HeaderGrid);
