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
            scale: 1,
            opacity: 0.28
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses} ${borderClass} rounded-full`}
            animate={circleVariants}
            transition={{
                duration: animationConfig.reduce ? 0 : 4,
                repeat: animationConfig.reduce ? 0 : Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: animationConfig.reduce ? 0 : delay
            }}
        />
    );
});

// Floating Particles Component
const FloatingParticles = memo(() => {
    const animationConfig = getAnimationConfig();
    const particleCount = animationConfig.reduce ? 0 : 4;

    const particles = useMemo(() =>
        Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: animationConfig.reduce ? 0 : 2.5 + Math.random(),
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
            y: [0, -10, 0],
            x: [0, particle.x * 0.5, 0],
            opacity: [0.35, 0.55, 0.35],
            scale: [1, 1.01, 1],
        }}
        transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: particle.delay,
            ease: "easeInOut",
        }}
    />
));

// Main Header Content Container
const HeaderContent = memo(() => (
    <div className="relative z-20 w-full max-w-[1366px] mx-auto h-full min-h-[100svh] flex items-end justify-between px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        <LeftSection />
        {/* <HeroLogoMark /> */}
    </div>
));

// Action Buttons (CTAs) above Kyzen Title
const HeroCTAs = memo(() => (
    <div className="flex items-center gap-4 pt-2">
        <a
            href="#projects"
            className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-brand-light/20 border border-brand-light/40 text-brand-light font-display-medium text-xs sm:text-sm hover:bg-brand-light/30 transition-all duration-300 shadow-[0_0_20px_rgba(2,133,130,0.2)]"
        >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
            href="#about"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-border-brand text-foreground-secondary font-display-medium text-xs sm:text-sm hover:border-border-brand-strong transition-colors"
        >
            <span>About Me</span>
            <User className="w-4 h-4 text-foreground-muted" />
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
            className={`absolute ${position} text-[0.16em] text-foreground-secondary/80 font-display-medium tracking-wider`}
            {...textVariants}
        >
            {text}
        </motion.span>
    );
});

// Identity / Role line beneath the KYZEN title
const IdentityLine = memo(() => {
    const animationConfig = getAnimationConfig();
    return (
        <motion.p
            className="text-xs sm:text-sm font-display-medium text-foreground-secondary/70 tracking-widest uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: ANIMATION_DURATION.slower,
                ease: EASING.easeOut,
                delay: animationConfig.reduce ? 0.3 : 0.55
            }}
        >
            Full-Stack Web Developer
            <span className="text-brand-light mx-2">·</span>
            Philippines
        </motion.p>
    );
});

// Left Side Container (Title -> Identity -> Headline -> CTAs)
const LeftSection = memo(() => (
    <div className="relative z-30 flex flex-col items-start space-y-4 sm:space-y-5 max-w-2xl">
        <MainTitle />
        <IdentityLine />
        <MainHeadline />
        <HeroCTAs />
    </div>
));

// Main Headline above CTAs
const MainHeadline = memo(() => {
    return (
        <motion.h2
            className="text-xl sm:text-2xl md:text-3xl text-display leading-[1.15] font-display-medium tracking-tight"
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
            textShadow: "0 0 24px rgba(2, 133, 130, 0.24)"
        };
    }, [animationConfig.reduce]);

    return (
        <motion.h1
            className="relative text-[22vw] xs:text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8rem] xl:text-[10rem] font-display-black-italic text-left whitespace-nowrap leading-none"
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
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            >
                KYZEN

                <JapaneseText
                    position="left-[0.1em] -top-[0.5em]"
                    text={"\u30b1\u30f3\u30b8"}
                    delay={0.8}
                />

                <JapaneseText
                    position="right-0 -bottom-[0.4em]"
                    text={"\u30ab\u30a4\u30bc\u30f3"}
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
            y: [0, 8, 0],
            opacity: [0.75, 0.4, 0.75]
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
                    repeat: animationConfig.reduce ? 0 : Infinity,
                    ease: "easeInOut"
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

        return { y: 0 };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={1.2}
            className="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30"
            priority="low"
        >
            <motion.div
                className="flex flex-col items-center text-foreground-muted/80 cursor-pointer"
                animate={indicatorVariants}
                transition={{
                    duration: animationConfig.reduce ? 0 : 2,
                    repeat: animationConfig.reduce ? 0 : Infinity,
                    repeatType: "mirror"
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

        return {
            opacity: [0.6, 0.85, 0.6]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.span
            className="text-xs sm:text-sm mb-1 font-display-medium tracking-wider"
            animate={labelVariants}
            transition={{
                duration: animationConfig.reduce ? 0 : 2.5,
                repeat: animationConfig.reduce ? 0 : Infinity,
                ease: "easeInOut"
            }}
        >
            Scroll to explore
        </motion.span>
    );
});

// ===== MAIN COMPONENT =====

function HeaderGrid() {
    return (
        <div id="header-section" className="relative min-h-[100svh] overflow-hidden w-full">
            {/* Atmospheric gradient overlays — ProjectPage hero style */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#011417] via-[#011417]/55 to-[#011417]/5 pointer-events-none z-[5]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#011417]/75 via-[#011417]/20 to-transparent pointer-events-none z-[5]" />

            {/* Background Circles — commented out, kept for reference */}
            {/* <BackgroundCircles /> */}

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
