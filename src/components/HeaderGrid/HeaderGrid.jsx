import React, { useEffect, useRef, memo, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Avatar from '../../assets/Avatar.png';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';
import { useHeroScrollAnimation } from '../../hooks/useScrollAnimation';

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// Avatar Image Component
const AvatarImage = memo(() => (
    <motion.div
        className="absolute top-[45%] xs:top-[46%] sm:top-[47%] md:top-[55%] lg:top-[60%] xl:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 1.0
        }}
    >
        <motion.div
            className="w-[280px] h-[330px] xs:w-[320px] xs:h-[380px] sm:w-[360px] sm:h-[420px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] flex items-center justify-center relative"
            style={{
                maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
            animate={{
                y: [0, -8, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <AvatarBackdrop />
            <img
                src={Avatar}
                alt="Avatar"
                className="w-full h-full object-contain drop-shadow-2xl relative z-10"
            />
        </motion.div>
    </motion.div>
));

// Avatar Backdrop Component
const AvatarBackdrop = memo(() => (
    <motion.div
        className="absolute inset-0 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
));

// Background Circles Component
const BackgroundCircles = memo(() => (
    <ScrollAnimatedSection
        animationType="scale"
        delay={0.1}
        className="absolute inset-0 z-0"
    >
        <StaggerContainer
            staggerDelay={0.5}
            className="relative w-full h-full"
        >
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] xs:w-[400px] xs:h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] xl:w-[1000px] xl:h-[1000px] border-2 border-pink-500/50 rounded-full"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] xs:w-[300px] xs:h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] border border-orange-500/50 rounded-full"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
        </StaggerContainer>
    </ScrollAnimatedSection>
));

// Floating Particles Component
const FloatingParticles = memo(() => {
    const particles = useMemo(() => 
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            x: Math.random() * 20 - 10
        })), []
    );

    return (
        <ScrollAnimatedSection
            animationType="fadeIn"
            delay={0.3}
            className="absolute inset-0 pointer-events-none"
        >
            <StaggerContainer
                staggerDelay={0.05}
                className="relative w-full h-full"
            >
                {particles.map((particle) => (
                    <FloatingParticle key={particle.id} particle={particle} />
                ))}
            </StaggerContainer>
        </ScrollAnimatedSection>
    );
});

// Individual Floating Particle Component
const FloatingParticle = memo(({ particle }) => (
    <motion.div
        className="absolute w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-purple-400/60 rounded-full z-10"
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
));

// Header Content Component
const HeaderContent = memo(() => (
    <div className="relative z-20 min-h-screen flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <TitleSection />
        <AvatarImage />
    </div>
));

// Japanese Text Component
const JapaneseText = memo(({ position, text, delay }) => (
    <motion.span
        className={`absolute ${position} text-[0.13em] xs:text-[0.14em] sm:text-[0.15em] md:text-[0.16em] text-gray-300/80 font-light tracking-wider drop-shadow-lg`}
        initial={{ opacity: 0, x: -30, rotate: -5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{
            duration: 1.2,
            ease: "easeOut",
            delay
        }}
    >
        {text}
    </motion.span>
));

// Main Title Component
const MainTitle = memo(() => (
    <motion.h1
        className="relative text-[22vw] xs:text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] 2xl:text-[25rem] italic tracking-tight font-black text-center whitespace-nowrap"
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
            duration: 1.8,
            ease: "easeOut",
            delay: 0.5
        }}
        style={{
            textShadow: "0 0 30px rgba(255, 117, 223, 0.3), 0 0 60px rgba(255, 117, 223, 0.1)"
        }}
    >
        <motion.span
            className="relative bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-transparent inline-block px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8"
            animate={{
                textShadow: [
                    "0 0 30px rgba(255, 117, 223, 0.3)",
                    "0 0 40px rgba(255, 117, 223, 0.4)",
                    "0 0 30px rgba(255, 117, 223, 0.3)"
                ]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            KYZEN
            
            <JapaneseText
                position="left-[0.9em] xs:left-[0.95em] sm:left-[1em] top-[1.3em] xs:top-[1.35em] sm:top-[1.4em]"
                text="ケンジ"
                delay={1.4}
            />
            
            <JapaneseText
                position="right-[0.9em] xs:right-[0.95em] sm:right-[1em] bottom-[1.3em] xs:bottom-[1.35em] sm:bottom-[1.4em]"
                text="カイゼン"
                delay={1.8}
            />
        </motion.span>
    </motion.h1>
));

// Scroll Indicator Dot Component
const ScrollIndicatorDot = memo(() => (
    <motion.div
        className="w-4 h-6 xs:w-5 xs:h-7 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-gray-400/40 rounded-full flex justify-center relative overflow-hidden"
        whileHover={{
            borderColor: "rgba(236, 72, 153, 0.8)",
            boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)"
        }}
    >
        <motion.div
            className="w-0.5 h-1 xs:w-1 xs:h-1.5 sm:w-1 sm:h-2 md:h-3 bg-pink-400 rounded-full mt-0.5 xs:mt-1 md:mt-2"
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
            className="absolute inset-0 bg-pink-400/10 rounded-full"
            animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
            }}
        />
    </motion.div>
));

// Scroll Indicator Component
const ScrollIndicator = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeUp"
        delay={2.5}
        className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-70"
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
            <ScrollIndicatorLabel />
            <ScrollIndicatorDot />
        </motion.div>
    </ScrollAnimatedSection>
));

// Scroll Indicator Label Component
const ScrollIndicatorLabel = memo(() => (
    <motion.span
        className="text-xs sm:text-sm md:text-base mb-1 xs:mb-2 font-light italic tracking-wider"
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
));

// Supporting Text Component
const SupportingText = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeLeft"
        delay={1.4}
        className="absolute bottom-20 xs:bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 xl:bottom-50 left-3 right-3 xs:left-4 xs:right-auto xs:max-w-xs sm:left-6 sm:max-w-sm md:left-8 md:max-w-md lg:left-16 lg:max-w-lg xl:left-65 xl:max-w-xl text-gray-300/90 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed z-60 px-2 xs:px-3 sm:px-4"
    >
        <SupportingTextParagraphs />
    </ScrollAnimatedSection>
));

// Supporting Text Paragraphs Component
const SupportingTextParagraphs = memo(() => (
    <>
        <motion.p className="mb-2 font-light tracking-wide">
            In the digital realm of modern web development, there exists a
            creative force known only as <span className="text-pink-400/90 font-medium">"The Developer."</span> A place where code,
            design, and innovation converge.
        </motion.p>
        <motion.p
            className="text-pink-400/90 font-medium tracking-wide"
            whileHover={{
                x: 10,
                color: "rgba(236, 72, 153, 1)",
                transition: { duration: 0.3 }
            }}
        >
            Enter the portfolio, a digital space where creativity meets
            technology.
        </motion.p>
    </>
));

// Title Section Component
const TitleSection = memo(() => (
    <div className="absolute top-1/4 xs:top-[28%] sm:top-[30%] md:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full overflow-hidden">
        <MainTitle />
    </div>
));

// ===== MAIN COMPONENT =====

/**
 * HeaderGrid Component
 * 
 * Component Tree Structure:
 * HeaderGrid
 * ├── BackgroundCircles
 * ├── FloatingParticles
 * │   └── FloatingParticle
 * ├── HeaderContent
 * │   ├── TitleSection
 * │   │   ├── MainTitle
 * │   │   │   └── JapaneseText (multiple instances)
 * │   │   └── AvatarImage
 * │   │       └── AvatarBackdrop
 * ├── SupportingText
 * │   └── SupportingTextParagraphs
 * └── ScrollIndicator
 *     ├── ScrollIndicatorLabel
 *     └── ScrollIndicatorDot
 */
function HeaderGrid() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Effects */}
            <BackgroundCircles />
            
            {/* Floating Particles */}
            <FloatingParticles />

            {/* Main Content */}
            <HeaderContent />

            {/* Supporting Text */}
            <SupportingText/>

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </div>
    );
}

export default memo(HeaderGrid);