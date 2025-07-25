import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import {
    Menu,
    X,
    Phone,
    User,
    Code2,
    FolderOpen,
    Briefcase,
    Award,
    Home
} from "lucide-react";

import kyzenLogo from "/src/assets/KYZENLOGO1.png";

const navigation = [
    { name: "info", href: "#", current: true, icon: Home },
    { name: "skills", href: "#", current: false, icon: Code2 },
    { name: "projects", href: "#", current: false, icon: FolderOpen },
    { name: "experience", href: "#", current: false, icon: Briefcase },
    { name: "certifications", href: "#", current: false, icon: Award },
];

// Memoized animation variants to prevent recreation
const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        y: -20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            staggerChildren: 0.05
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 }
    }
};

// Memoized components for better performance
const Logo = memo(() => (
    <motion.div
        className="flex shrink-0 items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
    >
        <motion.img
            alt="KYZEN Logo"
            src={kyzenLogo}
            className="h-8 w-auto mr-3 cursor-pointer"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
        />
        <div className="flex items-baseline">
            <span className="text-[#e2dbd2] text-2xl italic tracking-tight font-black">
                Kyzen
            </span>
            <motion.span
                className="text-white/40 italic tracking-tight font-light ml-2"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                |
            </motion.span>
            <span className="text-white/80 italic tracking-tight font-light ml-2 hidden md:inline">
                Web Developer
            </span>
        </div>
    </motion.div>
));

const ContactButton = memo(() => (
    <motion.button
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-white to-white/95 text-black font-medium transition-all duration-300 overflow-hidden relative"
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        <span className="italic tracking-tight font-black relative z-10">
            contact
        </span>
    </motion.button>
));

const MobileContactButton = memo(() => (
    <motion.button
        className="group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-white to-white/95 text-black font-medium transition-all duration-300 overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        <span className="italic tracking-tight font-black relative z-10">
            contact
        </span>
    </motion.button>
));

// Memoized navigation item component
const NavItem = memo(({ item, index, isActive, onClick }) => {
    const IconComponent = item.icon;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
        >
            <motion.a
                href={item.href}
                onClick={onClick}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium group transition-all duration-300 ${
                    isActive
                        ? 'bg-white/10 border border-[#ff75df]/50 text-[#e2dbd2] backdrop-blur-sm shadow-lg shadow-[#ff75df]/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5 backdrop-blur-sm'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <IconComponent className={`w-4 h-4 transition-colors duration-300 ${
                    isActive ? "text-[#e2dbd2]" : "text-white/40 group-hover:text-white/80"
                }`} />
                <span className="italic tracking-tight font-black">
                    {item.name}
                </span>
            </motion.a>
        </motion.div>
    );
});

const MobileNavItem = memo(({ item, isActive, onClick }) => {
    const IconComponent = item.icon;
    
    return (
        <motion.div variants={menuItemVariants}>
            <DisclosureButton
                as="a"
                href={item.href}
                onClick={onClick}
                className={`group flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                    isActive
                        ? "bg-white/15 text-[#e2dbd2] backdrop-blur-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
                <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-[#e2dbd2]" : "text-white/50 group-hover:text-white/80"
                }`} />
                <span className="italic tracking-tight font-black">
                    {item.name}
                </span>
                {isActive && (
                    <motion.div
                        className="ml-auto w-2 h-2 bg-[#e2dbd2] rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </DisclosureButton>
        </motion.div>
    );
});

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState("info");

    // Optimized scroll handler with throttling
    const handleScroll = useCallback(() => {
        const isScrolled = window.scrollY > 0;
        if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
        }
    }, [scrolled]);

    useEffect(() => {
        let ticking = false;
        
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        return () => window.removeEventListener("scroll", throttledScroll);
    }, [handleScroll]);

    // Memoized click handler
    const handleNavClick = useCallback((itemName) => {
        setActiveItem(itemName);
    }, []);

    // Memoized navigation items
    const navigationItems = useMemo(() => 
        navigation.map((item, index) => (
            <NavItem
                key={item.name}
                item={item}
                index={index}
                isActive={activeItem === item.name}
                onClick={() => handleNavClick(item.name)}
            />
        )), [activeItem, handleNavClick]
    );

    const mobileNavigationItems = useMemo(() => 
        navigation.map((item) => (
            <MobileNavItem
                key={item.name}
                item={item}
                isActive={activeItem === item.name}
                onClick={() => handleNavClick(item.name)}
            />
        )), [activeItem, handleNavClick]
    );

    return (
        <>
            {/* Background blur overlay when scrolled */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-20 bg-black/20 backdrop-blur-[15px] border-b border-white/5 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            <Disclosure as="nav" className="h-20 fixed w-full z-[100]">
                {({ open }) => (
                    <>
                        <motion.div
                            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-[100]"
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="relative flex h-20 items-center justify-between">
                                {/* Mobile menu button */}
                                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden z-[100]">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 transition-colors duration-200">
                                        <span className="sr-only">Open main menu</span>
                                        <AnimatePresence mode="wait">
                                            {!open ? (
                                                <motion.div
                                                    key="menu"
                                                    initial={{ rotate: 0, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: 90, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Menu className="h-6 w-6" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="close"
                                                    initial={{ rotate: -90, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: 90, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <X className="h-6 w-6" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </DisclosureButton>
                                </div>

                                {/* Logo and brand */}
                                <motion.div
                                    className="flex flex-1 items-center justify-between relative z-[90]"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <Logo />

                                    {/* Desktop navigation */}
                                    <div className="hidden sm:ml-10 sm:block relative z-[90]">
                                        <div className="flex space-x-2">
                                            {navigationItems}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Contact button */}
                                <motion.div
                                    className="hidden sm:ml-6 sm:block relative z-[90]"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    <ContactButton />
                                </motion.div>
                            </div>

                            {/* Subtle bottom border */}
                            <motion.div
                                className="mx-auto h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            />
                        </motion.div>

                        {/* Mobile menu */}
                        <AnimatePresence>
                            {open && (
                                <DisclosurePanel static className="sm:hidden relative z-[80]">
                                    <motion.div
                                        className="mt-5 w-11/12 max-w-sm mx-auto bg-black/80 backdrop-blur-[20px] rounded-2xl border border-white/20 shadow-[inset_0_0_30px_rgba(255,255,255,0.08)] overflow-hidden"
                                        variants={mobileMenuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {/* Mobile menu background overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

                                        <div className="space-y-1 px-4 pt-4 pb-4 relative z-10">
                                            {mobileNavigationItems}

                                            {/* Mobile contact button */}
                                            <motion.div
                                                className="pt-3 border-t border-white/10"
                                                variants={menuItemVariants}
                                            >
                                                <MobileContactButton />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </DisclosurePanel>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Disclosure>
        </>
    );
}

export default memo(Navbar);