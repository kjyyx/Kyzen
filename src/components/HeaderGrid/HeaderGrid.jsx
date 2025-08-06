import React, { useEffect, useRef, memo, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Avatar from '../../assets/Avatar-2.png';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';
import { 
    useHeroScrollAnimation, 
    useSimpleScrollAnimation 
} from '../../hooks/useScrollAnimation';
import { 
    getAnimationConfig, 
    canAnimate, 
    createStaggerDelay 
} from '../../utils/helpers';
import { 
    ANIMATION_DURATION, 
    EASING, 
    PERFORMANCE 
} from '../../utils/constants';

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// Avatar Image Component - Optimized with conditional animations
const AvatarImage = memo(() => {
    const animationConfig = getAnimationConfig();
    const shouldAnimate = canAnimate();
    
    const avatarVariants = useMemo(() => {
        if (animationConfig.reduce || !shouldAnimate) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.3 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, scale: 0.9, y: 20 },
            animate: { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: {
                    duration: ANIMATION_DURATION.slower,
                    ease: EASING.easeOut,
                    delay: 0.8
                }
            }
        };
    }, [animationConfig.reduce, shouldAnimate]);

    const floatingVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: 0 };
        }
        
        return {
            y: [0, -8, 0]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="absolute top-[45%] xs:top-[46%] sm:top-[47%] md:top-[55%] lg:top-[60%] xl:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            {...avatarVariants}
        >
            <motion.div
                className="w-[280px] h-[330px] xs:w-[320px] xs:h-[380px] sm:w-[360px] sm:h-[420px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] flex items-center justify-center relative"
                style={{
                    maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                }}
                animate={floatingVariants}
                transition={{
                    duration: animationConfig.reduce ? 0 : 4,
                    repeat: animationConfig.reduce ? 0 : Infinity,
                    ease: "easeInOut"
                }}
            >
                {shouldAnimate && <AvatarBackdrop />}
                <img
                    src={Avatar}
                    alt="Avatar"
                    className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                />
            </motion.div>
        </motion.div>
    );
});

// Avatar Backdrop Component - Simplified for performance
const AvatarBackdrop = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const backdropVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                scale: 1,
                opacity: 0.2
            };
        }
        
        return {
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="absolute inset-0 bg-purple-500/5 rounded-full blur-3xl"
            animate={backdropVariants}
            transition={{
                duration: animationConfig.reduce ? 0 : 3,
                repeat: animationConfig.reduce ? 0 : Infinity,
                ease: "easeInOut"
            }}
        />
    );
});

// Background Circles Component - Optimized
const BackgroundCircles = memo(() => {
    const animationConfig = getAnimationConfig();
    
    return (
        <ScrollAnimatedSection
            animationType="scale"
            delay={0.1}
            className="absolute inset-0 z-0"
            priority="critical"
        >
            <div className="relative w-full h-full">
                <BackgroundCircle 
                    size="large" 
                    color="pink-500/50" 
                    delay={0}
                    animationConfig={animationConfig}
                />
                <BackgroundCircle 
                    size="medium" 
                    color="orange-500/50" 
                    delay={0.3}
                    animationConfig={animationConfig}
                />
            </div>
        </ScrollAnimatedSection>
    );
});

// Individual Background Circle - New optimized component
const BackgroundCircle = memo(({ size, color, delay, animationConfig }) => {
    const sizeClasses = useMemo(() => {
        const sizes = {
            large: "w-[350px] h-[350px] xs:w-[400px] xs:h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] xl:w-[1000px] xl:h-[1000px] border-2",
            medium: "w-[250px] h-[250px] xs:w-[300px] xs:h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] border"
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
            opacity: [0.3, 0.4, 0.3]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses} border-${color} rounded-full`}
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

// Floating Particles Component - Reduced particle count and simplified
const FloatingParticles = memo(() => {
    const animationConfig = getAnimationConfig();
    
    // Reduce particle count for performance
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
        return null; // Skip particles entirely on low-end devices
    }

    return (
        <ScrollAnimatedSection
            animationType="fadeIn"
            delay={0.3}
            className="absolute inset-0 pointer-events-none"
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

// Individual Floating Particle Component - Simplified
const FloatingParticle = memo(({ particle }) => (
    <motion.div
        className="absolute w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-purple-400/60 rounded-full z-10"
        style={{
            left: particle.left,
            top: particle.top,
        }}
        animate={{
            y: [0, -20, 0], // Reduced from -30
            x: [0, particle.x, 0],
            opacity: [0.6, 0.8, 0.6], // Reduced max opacity
            scale: [1, 1.2, 1], // Reduced from 1.5
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

// Japanese Text Component - Optimized
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
            initial: { opacity: 0, x: -15, rotate: -3 }, // Reduced values
            animate: { 
                opacity: 1, 
                x: 0, 
                rotate: 0,
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
            className={`absolute ${position} text-[0.13em] xs:text-[0.14em] sm:text-[0.15em] md:text-[0.16em] text-gray-300/80 font-light tracking-wider drop-shadow-lg`}
            {...textVariants}
        >
            {text}
        </motion.span>
    );
});

// Main Title Component - Optimized
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
            initial: { opacity: 0, y: 50, scale: 0.9 }, // Reduced values
            animate: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
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
                "0 0 30px rgba(255, 117, 223, 0.3)",
                "0 0 35px rgba(255, 117, 223, 0.4)",
                "0 0 30px rgba(255, 117, 223, 0.3)"
            ]
        };
    }, [animationConfig.reduce]);

    return (
        <motion.h1
            className="relative text-[22vw] xs:text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] 2xl:text-[25rem] italic tracking-tight font-black text-center whitespace-nowrap"
            {...titleVariants}
            style={{
                textShadow: "0 0 30px rgba(255, 117, 223, 0.3), 0 0 60px rgba(255, 117, 223, 0.1)"
            }}
        >
            <motion.span
                className="relative bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-transparent inline-block px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8"
                animate={glowVariants}
                transition={{
                    duration: animationConfig.reduce ? 0 : 3,
                    repeat: animationConfig.reduce ? 0 : Infinity,
                    ease: "easeInOut"
                }}
            >
                KYZEN
                
                <JapaneseText
                    position="left-[0.9em] xs:left-[0.95em] sm:left-[1em] top-[1.3em] xs:top-[1.35em] sm:top-[1.4em]"
                    text="ケンジ"
                    delay={1.0} // Reduced delay
                />
                
                <JapaneseText
                    position="right-[0.9em] xs:right-[0.95em] sm:right-[1em] bottom-[1.3em] xs:bottom-[1.35em] sm:bottom-[1.4em]"
                    text="カイゼン"
                    delay={1.2} // Reduced delay
                />
            </motion.span>
        </motion.h1>
    );
});

// Scroll Indicator Dot Component - Simplified
const ScrollIndicatorDot = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const dotVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { y: 0, opacity: 1 };
        }
        
        return { 
            y: [0, 6, 0], // Reduced from 8
            opacity: [1, 0.5, 1] 
        };
    }, [animationConfig.reduce]);

    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }
        
        return {
            borderColor: "rgba(236, 72, 153, 0.8)",
            boxShadow: "0 0 15px rgba(236, 72, 153, 0.3)" // Reduced glow
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="w-4 h-6 xs:w-5 xs:h-7 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-gray-400/40 rounded-full flex justify-center relative overflow-hidden"
            whileHover={hoverVariants}
        >
            <motion.div
                className="w-0.5 h-1 xs:w-1 xs:h-1.5 sm:w-1 sm:h-2 md:h-3 bg-pink-400 rounded-full mt-0.5 xs:mt-1 md:mt-2"
                animate={dotVariants}
                transition={{ 
                    duration: animationConfig.reduce ? 0 : 1.5, 
                    repeat: animationConfig.reduce ? 0 : Infinity 
                }}
            />
            {!animationConfig.reduce && (
                <motion.div
                    className="absolute inset-0 bg-pink-400/10 rounded-full"
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.1, 1] // Reduced from 1.2
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5
                    }}
                />
            )}
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
        
        return { y: [0, 10, 0] }; // Reduced from 15
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={1.8} // Reduced delay
            className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-70"
            priority="low"
        >
            <motion.div
                className="flex flex-col items-center text-gray-400/80 cursor-pointer"
                animate={indicatorVariants}
                transition={{ 
                    duration: animationConfig.reduce ? 0 : 2, 
                    repeat: animationConfig.reduce ? 0 : Infinity 
                }}
                whileHover={animationConfig.reduce ? {} : {
                    scale: 1.1, // Reduced from 1.2
                    color: "rgba(236, 72, 153, 0.9)"
                }}
            >
                <ScrollIndicatorLabel />
                <ScrollIndicatorDot />
            </motion.div>
        </ScrollAnimatedSection>
    );
});

// Scroll Indicator Label Component - Simplified
const ScrollIndicatorLabel = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const labelVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { opacity: 0.8 };
        }
        
        return { opacity: [0.6, 0.9, 0.6] }; // Reduced max opacity
    }, [animationConfig.reduce]);

    return (
        <motion.span
            className="text-xs sm:text-sm md:text-base mb-1 xs:mb-2 font-light italic tracking-wider"
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

// Supporting Text Component
const SupportingText = memo(() => (
    <ScrollAnimatedSection
        animationType="fadeLeft"
        delay={1.0} // Reduced delay
        className="absolute bottom-20 xs:bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 xl:bottom-50 left-3 right-3 xs:left-4 xs:right-auto xs:max-w-xs sm:left-6 sm:max-w-sm md:left-8 md:max-w-md lg:left-16 lg:max-w-lg xl:left-65 xl:max-w-xl text-gray-300/90 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed z-60 px-2 xs:px-3 sm:px-4"
        priority="medium"
    >
        <SupportingTextParagraphs />
    </ScrollAnimatedSection>
));

// Supporting Text Paragraphs Component - Simplified hover effect
const SupportingTextParagraphs = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }
        
        return {
            x: 8, // Reduced from 10
            color: "rgba(236, 72, 153, 1)",
            transition: { duration: 0.2 }
        };
    }, [animationConfig.reduce]);

    return (
        <>
            <motion.p className="mb-2 font-light tracking-wide">
                In the digital realm of modern web development, there exists a
                creative force known only as <span className="text-pink-400/90 font-medium">"The Developer."</span> A place where code,
                design, and innovation converge.
            </motion.p>
            <motion.p
                className="text-pink-400/90 font-medium tracking-wide"
                whileHover={hoverVariants}
            >
                Enter the portfolio, a digital space where creativity meets
                technology.
            </motion.p>
        </>
    );
});

// Title Section Component
const TitleSection = memo(() => (
    <div className="absolute top-1/4 xs:top-[28%] sm:top-[30%] md:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full overflow-hidden">
        <MainTitle />
    </div>
));

// ===== MAIN COMPONENT =====

/**
 * HeaderGrid Component - Optimized for performance
 * 
 * Key optimizations:
 * - Conditional animation rendering based on device capabilities
 * - Reduced animation values and durations
 * - Memoized variants to prevent re-renders
 * - Simplified or removed animations on low-end devices
 * - Priority-based animation loading
 */
function HeaderGrid() {
    return (
        <div id="header-section" className="relative min-h-screen overflow-hidden">
            {/* Background Effects */}
            <BackgroundCircles />
            
            {/* Floating Particles - Only on capable devices */}
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

/*
COMPONENT TREE STRUCTURE:

HeaderGrid (Main Container)
├── BackgroundCircles (Background Effects)
│   └── ScrollAnimatedSection
│       └── div (relative container)
│           ├── BackgroundCircle (large, pink-500/50, delay: 0)
│           └── BackgroundCircle (medium, orange-500/50, delay: 0.3)
│
├── FloatingParticles (Decorative Elements - Conditional)
│   └── ScrollAnimatedSection
│       └── div (relative container)
│           └── FloatingParticle[] (6-8 particles based on device capability)
│
├── HeaderContent (Main Content Container)
│   ├── TitleSection
│   │   └── div (positioning wrapper)
│   │       └── MainTitle
│   │           └── motion.h1
│   │               └── motion.span (KYZEN text with gradient)
│   │                   ├── JapaneseText (ケンジ - top left)
│   │                   └── JapaneseText (カイゼン - bottom right)
│   │
│   └── AvatarImage
│       └── motion.div (positioning wrapper)
│           └── motion.div (floating container with mask)
│               ├── AvatarBackdrop (conditional)
│               └── img (Avatar-2.png)
│
├── SupportingText
│   └── ScrollAnimatedSection
│       └── SupportingTextParagraphs
│           ├── motion.p (first paragraph)
│           └── motion.p (second paragraph with hover effect)
│
└── ScrollIndicator
    └── ScrollAnimatedSection
        └── motion.div (indicator container)
            ├── ScrollIndicatorLabel
            │   └── motion.span ("Scroll to explore" text)
            └── ScrollIndicatorDot
                └── motion.div (dot container)
                    ├── motion.div (moving dot)
                    └── motion.div (pulse effect - conditional)

COMPONENT HIERARCHY BY ALPHABETICAL ORDER:
- AvatarBackdrop
- AvatarImage
- BackgroundCircle
- BackgroundCircles
- FloatingParticle
- FloatingParticles
- HeaderContent
- HeaderGrid (Main)
- JapaneseText
- MainTitle
- ScrollIndicator
- ScrollIndicatorDot
- ScrollIndicatorLabel
- SupportingText
- SupportingTextParagraphs
- TitleSection

EXTERNAL DEPENDENCIES:
- ScrollAnimatedSection (from '../../common/ScrollAnimatedSection')
- StaggerContainer (from '../../common/StaggerContainer') [imported but not used]
- useHeroScrollAnimation, useSimpleScrollAnimation (from '../../hooks/useScrollAnimation') [imported but not used]
- getAnimationConfig, canAnimate, createStaggerDelay (from '../../utils/helpers')
- ANIMATION_DURATION, EASING, PERFORMANCE (from '../../utils/constants')

PERFORMANCE OPTIMIZATIONS:
- All components are memoized with React.memo()
- Animation variants are memoized with useMemo()
- Conditional rendering based on device capabilities
- FloatingParticles returns null on low-end devices
- AvatarBackdrop only renders when shouldAnimate is true
- Reduced animation complexity on mobile/low-end devices
*/