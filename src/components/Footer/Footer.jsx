import React, { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Facebook,
    Linkedin,
    Github,
    Mail,
    Calendar,
    ArrowUp,
    Heart
} from 'lucide-react';
import kyzenLogo from '/src/assets/KYZENLOGO3.png';
import './Footer.css';

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import StaggerContainer from '../../common/StaggerContainer';

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

// ===== DATA CONFIGURATION =====
const socialLinks = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/jikennn/',
        icon: Facebook,
        color: 'hover:text-blue-400'
    },
    {
        name: 'LinkedIn',
        href: "www.linkedin.com/in/kenji-jaculbia-9b048a314",
        icon: Linkedin,
        color: 'hover:text-blue-500'
    },
    {
        name: 'GitHub',
        href: "https://github.com/kjyyx",
        icon: Github,
        color: 'hover:text-purple-400'
    },
    {
        name: 'Email',
        href: 'mailto:kenjijaculbia@gmail.com',
        icon: Mail,
        color: 'hover:text-green-400'
    }
];

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// Animated Marquee Text Component
const AnimatedMarqueeText = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const marqueeVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                x: [0, -500] // Reduced distance
            };
        }
        
        return {
            x: [0, -1000]
        };
    }, [animationConfig.reduce]);

    const marqueeTransition = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10, // Faster on low-end devices
                    ease: "linear",
                }
            };
        }
        
        return {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
            }
        };
    }, [animationConfig.reduce]);

    const textEntryVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.3 }
            };
        }
        
        return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1 }
        };
    }, [animationConfig.reduce]);

    return (
        <ScrollAnimatedSection
            animationType="fadeUp"
            delay={0.2}
            className="overflow-hidden w-full mb-8 sm:mb-10 md:mb-12"
            priority="medium"
        >
            <motion.div 
                className="flex whitespace-nowrap"
                animate={marqueeVariants}
                transition={marqueeTransition}
            >
                {[0.5, 0.7, 0.9].map((delay, index) => (
                    <motion.span 
                        key={index}
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic tracking-tight font-black text-white mr-8 sm:mr-12 md:mr-16 leading-tight"
                        {...textEntryVariants}
                        transition={{ 
                            ...textEntryVariants.transition,
                            delay: animationConfig.reduce ? delay * 0.3 : delay 
                        }}
                    >
                        Let's work together&nbsp;&nbsp;&nbsp;Let's work together&nbsp;&nbsp;&nbsp;Let's work together
                    </motion.span>
                ))}
            </motion.div>
        </ScrollAnimatedSection>
    );
});

// Background Effects Component
const BackgroundEffects = memo(() => {
    const animationConfig = getAnimationConfig();
    
    // Skip background effects on low-end devices
    if (!canAnimate() || animationConfig.reduce) {
        return null;
    }

    const orbVariants1 = useMemo(() => ({
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3], // Reduced max opacity
        x: [0, 15, 0], // Reduced movement
        y: [0, -8, 0]
    }), []);

    const orbVariants2 = useMemo(() => ({
        scale: [1, 1.2, 1], // Reduced from 1.3
        opacity: [0.2, 0.4, 0.2], // Reduced max opacity
        x: [0, -12, 0], // Reduced movement
        y: [0, 12, 0]
    }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
            {/* Gradient Orbs */}
            <motion.div
                className="absolute top-0 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
                animate={orbVariants1}
                transition={{ duration: 6, repeat: Infinity }} // Reduced from 8
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
                animate={orbVariants2}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }} // Reduced from 10 and delay from 2
            />
            
            {/* Floating Particles - Reduced count */}
            {[...Array(4)].map((_, i) => ( // Reduced from 6
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                        left: `${20 + (i * 15)}%`, // Adjusted spacing
                        top: `${30 + (i * 10)}%`
                    }}
                    animate={{
                        y: [0, -15, 0], // Reduced from -20
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.3, 1] // Reduced from 1.5
                    }}
                    transition={{
                        duration: 3 + (i * 0.4), // Reduced duration
                        repeat: Infinity,
                        delay: i * 0.4
                    }}
                />
            ))}
        </div>
    );
});

// Book a Call Button Component
const BookCallButton = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.02, y: -1 };
        }
        
        return { scale: 1.05, y: -2 };
    }, [animationConfig.reduce]);

    const tapVariants = useMemo(() => ({ scale: 0.98 }), []);

    const wordAnimationProps = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { y: 0 },
                whileHover: { y: 0 }, // Disable on low-end devices
                transition: { duration: 0 }
            };
        }
        
        return {
            initial: { y: 0 },
            whileHover: { y: -2 },
            transition: { duration: 0.2 }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.button
            className="group relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-white to-white/95 text-black rounded-full font-black italic tracking-tight transition-all duration-300 flex items-center gap-2 sm:gap-3 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-white/20 z-10 text-sm sm:text-base"
            whileHover={hoverVariants}
            whileTap={tapVariants}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${!animationConfig.reduce ? 'group-hover:rotate-12' : ''} transition-transform duration-300 relative z-10`} />
            <div className="flex gap-1 sm:gap-2 relative z-10">
                {["BOOK", "A", "CALL"].map((word, i) => (
                    <motion.span
                        key={word}
                        className={!animationConfig.reduce ? "group-hover:animate-ascend" : ""}
                        style={{ animationDelay: `${i * 0.1}s` }}
                        {...wordAnimationProps}
                        transition={{ 
                            ...wordAnimationProps.transition, 
                            delay: i * (animationConfig.reduce ? 0 : 0.05) 
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </motion.button>
    );
});

// Call to Action Section Component
const CallToActionSection = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const itemVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { duration: 0.3 }
                }
            };
        }
        
        return {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 }
            }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 relative z-50"
            variants={itemVariants}
        >
            <BookCallButton />
            <EmailCallToAction />
        </motion.div>
    );
});

// Copyright Information Component
const CopyrightInfo = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const copyrightVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { delay: 0.7 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, x: 20 },
            animate: { 
                opacity: 1, 
                x: 0,
                transition: { delay: 1.4 }
            }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 italic tracking-tight font-light text-center sm:text-left"
            {...copyrightVariants}
        >
            <div className="flex items-center gap-1 sm:gap-2">
                <span>Made with</span>
                <Heart className={`w-3 h-3 sm:w-4 sm:h-4 text-red-400 ${!animationConfig.reduce ? 'animate-pulse' : ''}`} />
            </div>
            <span className="hidden sm:inline">© 2025. All rights reserved</span>
            <span className="sm:hidden">© 2025</span>
        </motion.div>
    );
});

// Decorative Line Component
const DecorativeLine = memo(() => (
    <motion.div
        className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
    />
));

// Email Call to Action Component
const EmailCallToAction = memo(() => (
    <motion.div
        className="text-center relative z-30 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
    >
        <p className="text-white/80 text-sm sm:text-base md:text-lg">
            or say 👋🏼 to{' '}
            <motion.a
                href="mailto:kpjaculbia@gmail.com"
                className="text-white hover:text-blue-400 underline decoration-blue-400/50 underline-offset-4 transition-colors duration-300 font-medium relative z-10 break-all sm:break-normal"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                kpjaculbia@gmail.com
            </motion.a>
        </p>
    </motion.div>
));

// Footer Bottom Section Component
const FooterBottomSection = memo(() => (
    <motion.div
        className="space-y-4 sm:space-y-6 relative z-50"
        variants={itemVariants}
    >
        <DecorativeLine />
        <div className="flex flex-col sm:flex-row justify-between items-center text-white/60 text-xs sm:text-sm gap-4 sm:gap-0">
            <LogoBranding />
            <CopyrightInfo />
        </div>
    </motion.div>
));

// Footer Container Component
const FooterContainer = memo(({ children }) => (
    <motion.footer
        className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 backdrop-blur-[15px] bg-black/30 rounded-xl sm:rounded-2xl border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden z-15"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        <BackgroundEffects />
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-8 sm:py-10 md:py-12 relative z-40">
            {children}
        </div>
    </motion.footer>
));

// Footer Content Component
const FooterContent = memo(() => (
    <>
        <AnimatedMarqueeText />
        <CallToActionSection />
        <SocialLinksSection />
        <ScrollToTopSection />
        <FooterBottomSection />
    </>
));

// Logo Branding Component
const LogoBranding = memo(() => {
    const animationConfig = getAnimationConfig();
    
    const logoEntryVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { delay: 0.6 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, x: -20 },
            animate: { 
                opacity: 1, 
                x: 0,
                transition: { delay: 1.2 }
            }
        };
    }, [animationConfig.reduce]);

    const logoHoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {};
        }
        
        return { rotate: 360 };
    }, [animationConfig.reduce]);

    const logoHoverTransition = useMemo(() => {
        if (animationConfig.reduce) {
            return { duration: 0 };
        }
        
        return { duration: 0.6 };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="flex items-center gap-2 sm:gap-3"
            {...logoEntryVariants}
        >
            <motion.img
                alt="KYZEN Logo"
                src={kyzenLogo}
                className="h-5 sm:h-6 md:h-7 w-auto cursor-pointer"
                whileHover={logoHoverVariants}
                transition={logoHoverTransition}
            />
            <span className="text-[#e9dcc8] text-lg sm:text-xl italic tracking-tight font-black">
                Kyzen.
            </span>
        </motion.div>
    );
});

// Scroll to Top Button Component
const ScrollToTopButton = memo(({ onClick }) => {
    const animationConfig = getAnimationConfig();
    
    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.05, y: -1 };
        }
        
        return { scale: 1.1, y: -2 };
    }, [animationConfig.reduce]);

    const tapVariants = useMemo(() => ({ scale: 0.95 }), []);

    return (
        <motion.button
            onClick={onClick}
            className="group p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 z-10"
            whileHover={hoverVariants}
            whileTap={tapVariants}
        >
            <ArrowUp className={`w-4 h-4 sm:w-5 sm:h-5 ${!animationConfig.reduce ? 'group-hover:-translate-y-1' : ''} transition-transform duration-300`} />
            <span className="sr-only">Scroll to top</span>
        </motion.button>
    );
});

// Scroll to Top Section Component
const ScrollToTopSection = memo(() => {
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <motion.div
            className="flex justify-center mb-6 sm:mb-8 relative z-50"
            variants={itemVariants}
        >
            <ScrollToTopButton onClick={scrollToTop} />
        </motion.div>
    );
});

// Social Link Item Component
const SocialLinkItem = memo(({ social, index }) => {
    const animationConfig = getAnimationConfig();
    const IconComponent = social.icon;
    
    const entryVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                animate: { 
                    opacity: 1,
                    transition: { delay: 0.3 + index * 0.05 }
                }
            };
        }
        
        return {
            initial: { opacity: 0, y: 20 },
            animate: { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.6 + index * 0.1 }
            }
        };
    }, [animationConfig.reduce, index]);

    const hoverVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return { scale: 1.05, y: -1 };
        }
        
        return { scale: 1.1, y: -2 };
    }, [animationConfig.reduce]);

    const tapVariants = useMemo(() => ({ scale: 0.95 }), []);
    
    return (
        <motion.div
            {...entryVariants}
            className="relative z-10"
        >
            <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/70 transition-all duration-300 ${social.color} hover:bg-white/20 flex items-center justify-center z-10 min-w-[44px] min-h-[44px]`}
                whileHover={hoverVariants}
                whileTap={tapVariants}
            >
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${!animationConfig.reduce ? 'group-hover:rotate-12' : ''}`} />
                <span className="sr-only">{social.name}</span>

                {canAnimate() && <SocialLinkTooltip name={social.name} />}
            </motion.a>
        </motion.div>
    );
});

// Social Links Section Component
const SocialLinksSection = memo(() => {
    const socialLinksElements = useMemo(() => 
        socialLinks.map((social, index) => (
            <SocialLinkItem 
                key={social.name} 
                social={social} 
                index={index} 
            />
        )), []
    );

    return (
        <motion.div
            className="flex justify-center mb-8 sm:mb-10 md:mb-12 relative z-50"
            variants={itemVariants}
        >
            <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {socialLinksElements}
            </div>
        </motion.div>
    );
});

// Social Link Tooltip Component
const SocialLinkTooltip = memo(({ name }) => {
    const animationConfig = getAnimationConfig();
    
    const tooltipVariants = useMemo(() => {
        if (animationConfig.reduce) {
            return {
                initial: { opacity: 0 },
                whileHover: { opacity: 1 }
            };
        }
        
        return {
            initial: { opacity: 0, y: 5 },
            whileHover: { opacity: 1, y: 0 }
        };
    }, [animationConfig.reduce]);

    return (
        <motion.div
            className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50"
            {...tooltipVariants}
        >
            {name}
        </motion.div>
    );
});

// ===== MAIN COMPONENT =====

/**
 * Footer Component
 * 
 * Component Tree Structure:
 * Footer
 * └── FooterContainer
 *     ├── BackgroundEffects
 *     └── FooterContent
 *         ├── AnimatedMarqueeText
 *         ├── CallToActionSection
 *         │   ├── BookCallButton
 *         │   └── EmailCallToAction
 *         ├── SocialLinksSection
 *         │   └── SocialLinkItem
 *         │       └── SocialLinkTooltip
 *         ├── ScrollToTopSection
 *         │   └── ScrollToTopButton
 *         └── FooterBottomSection
 *             ├── DecorativeLine
 *             ├── LogoBranding
 *             └── CopyrightInfo
 */
function Footer() {
    return (
        <div id="footer-section" className="pb-4 sm:pb-6 px-2 sm:px-4 mt-8 sm:mt-10 relative">
            <ScrollAnimatedSection 
                animationType="fadeUp" 
                threshold={0.2}
                priority="medium"
                className="mx-auto w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 backdrop-blur-[15px] bg-black/30 rounded-xl sm:rounded-2xl border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden z-15"
            >
                <BackgroundEffects />
                <div className="mx-auto max-w-11/12 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-8 sm:py-10 md:py-12 relative z-40">
                    <AnimatedMarqueeText />
                    <CallToActionSection />
                    
                    <StaggerContainer staggerDelay={0.1} priority="medium">
                        <SocialLinksSection />
                        <ScrollToTopSection />
                        <FooterBottomSection />
                    </StaggerContainer>
                </div>
            </ScrollAnimatedSection>
        </div>
    );
}

export default memo(Footer);