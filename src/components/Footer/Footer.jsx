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
import kyzenLogo from '/src/assets/KYZENLOGO1.png';
import './Footer.css';

// Memoized static data
const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: Facebook,
        color: 'hover:text-blue-400'
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: Linkedin,
        color: 'hover:text-blue-500'
    },
    {
        name: 'GitHub',
        href: '#',
        icon: Github,
        color: 'hover:text-purple-400'
    },
    {
        name: 'Email',
        href: 'mailto:kpjaculbia@gmail.com',
        icon: Mail,
        color: 'hover:text-green-400'
    }
];

// Memoized animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const marqueeVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1 }
    }
};

// Memoized components
const MarqueeText = memo(() => (
    <motion.div
        className="overflow-hidden w-full mb-12"
        variants={marqueeVariants}
    >
        <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                },
            }}
        >
            {[0.5, 0.7, 0.9].map((delay, index) => (
                <motion.span 
                    key={index}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic tracking-tight font-black text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text mr-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay }}
                >
                    Let's work together&nbsp;&nbsp;&nbsp;Let's work together&nbsp;&nbsp;&nbsp;Let's work together
                </motion.span>
            ))}
        </motion.div>
    </motion.div>
));

const CTAButton = memo(() => (
    <motion.button
        className="group relative px-8 py-4 bg-gradient-to-r from-white to-white/95 text-black rounded-full font-black italic tracking-tight transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-white/20 z-10"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        <div className="flex gap-2 relative z-10">
            {["BOOK", "A", "CALL"].map((word, i) => (
                <motion.span
                    key={word}
                    className="group-hover:animate-ascend"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ delay: i * 0.05 }}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    </motion.button>
));

const EmailCTA = memo(() => (
    <motion.div
        className="text-center relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
    >
        <p className="text-white/80 text-lg">
            or say 👋🏼 to{' '}
            <motion.a
                href="mailto:kpjaculbia@gmail.com"
                className="text-white hover:text-blue-400 underline decoration-blue-400/50 underline-offset-4 transition-colors duration-300 font-medium relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                kpjaculbia@gmail.com
            </motion.a>
        </p>
    </motion.div>
));

const SocialLink = memo(({ social, index }) => {
    const IconComponent = social.icon;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="relative z-10"
        >
            <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/70 transition-all duration-300 ${social.color} hover:bg-white/20 flex items-center justify-center z-10`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="sr-only">{social.name}</span>

                {/* Tooltip */}
                <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50"
                    initial={{ opacity: 0, y: 5 }}
                    whileHover={{ opacity: 1, y: 0 }}
                >
                    {social.name}
                </motion.div>
            </motion.a>
        </motion.div>
    );
});

const ScrollToTopButton = memo(({ onClick }) => (
    <motion.div
        className="flex justify-center mb-8 relative z-50"
        variants={itemVariants}
    >
        <motion.button
            onClick={onClick}
            className="group p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
    </motion.div>
));

const FooterBottom = memo(() => (
    <motion.div
        className="space-y-6 relative z-50"
        variants={itemVariants}
    >
        {/* Decorative line */}
        <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
        />

        {/* Footer content */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-white/60 text-sm gap-4 sm:gap-0">
            <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
            >
                <motion.img
                    alt="KYZEN Logo"
                    src={kyzenLogo}
                    className="h-7 w-auto cursor-pointer"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                />
                <span className="text-[#e9dcc8] text-xl italic tracking-tight font-black">
                    Kyzen.
                </span>
            </motion.div>

            <motion.div
                className="flex items-center gap-2 italic tracking-tight font-light"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
            >
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>© 2025. All rights reserved</span>
            </motion.div>
        </div>
    </motion.div>
));

function Footer() {
    // Optimized scroll handler
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Memoized social links
    const socialLinksElements = useMemo(() => 
        socialLinks.map((social, index) => (
            <SocialLink 
                key={social.name} 
                social={social} 
                index={index} 
            />
        )), []
    );

    return (
        <div className="pb-6 px-4 mt-10 relative">
            <motion.footer
                className="mx-auto w-11/12 sm:w-2/3 backdrop-blur-[15px] bg-black/30 rounded-2xl border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden z-15"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 lg:px-10 relative z-40">
                    {/* Animated marquee */}
                    <MarqueeText />
                    
                    {/* CTA Section */}
                    <motion.div
                        className="flex flex-col items-center gap-6 mb-12 relative z-50"
                        variants={itemVariants}
                    >
                        <CTAButton />
                        <EmailCTA />
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex justify-center mb-12 relative z-50"
                        variants={itemVariants}
                    >
                        <div className="flex gap-6 md:gap-8">
                            {socialLinksElements}
                        </div>
                    </motion.div>

                    {/* Scroll to top button */}
                    <ScrollToTopButton onClick={scrollToTop} />

                    {/* Footer bottom section */}
                    <FooterBottom />
                </div>
            </motion.footer>
        </div>
    );
}

export default memo(Footer);