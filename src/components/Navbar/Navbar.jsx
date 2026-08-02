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
import { useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

import kyzenLogo from "/src/assets/KYZENLOGO5.webp";

import ScrollAnimatedSection from '../../common/ScrollAnimatedSection';
import { throttle } from '../../utils/helpers';

// ===== DATA CONFIGURATION =====
const navigation = [
    { name: "info", href: "about", current: true, icon: Home },
    { name: "skills", href: "skills", current: false, icon: Code2 },
    { name: "projects", href: "projects", current: false, icon: FolderOpen },
    // { name: "experience", href: "experience", current: false, icon: Briefcase },
    { name: "certifications", href: "certifications", current: false, icon: Award },
];

// ===== SUB-COMPONENTS (Alphabetically Ordered) =====

// Brand Logo Component
const BrandLogo = memo(({ onClick }) => (
    <motion.img
        alt="KYZEN Logo"
        src={kyzenLogo}
        className="h-5 w-auto sm:h-6 md:h-6 mr-2 cursor-pointer"
        whileHover={{ y: -1, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
    />
));

// Brand Text Component
const BrandText = memo(({ onClick }) => (
    <div className="flex items-baseline cursor-pointer" onClick={onClick}>
        <span className="text-display text-base sm:text-lg font-display-black-italic">
            Kyzen
        </span>
        <BrandTextSeparator />
        <BrandTextTitle />
    </div>
));

// Brand Text Separator Component
const BrandTextSeparator = memo(() => (
    <motion.span
        className="text-foreground-muted/70 tracking-tight font-display-medium ml-1 sm:ml-2"
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 0.6 }}
    >
        |
    </motion.span>
));

// Brand Text Title Component
const BrandTextTitle = memo(() => (
    <span className="text-foreground-secondary/90 tracking-tight font-display-medium ml-1 sm:ml-2 lg:inline">
        Web Developer
    </span>
));

// Contact Button Component
const ContactButton = memo(() => {
    const handleContactClick = useCallback(() => {
        scroller.scrollTo("footer-section", {
            duration: 600,
            delay: 0,
            smooth: "easeInOutQuart"
        });
    }, []);

    return (
        <motion.button
            className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white to-white/95 text-foreground-dark font-display-medium transition-all duration-300 overflow-hidden relative text-xs sm:text-sm"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContactClick}
        >
            <ContactButtonOverlay />
            <ContactButtonIcon />
            <ContactButtonText />
        </motion.button>
    );
});

// Contact Button Icon Component
const ContactButtonIcon = memo(() => (
    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:-translate-y-px transition-transform duration-200 relative z-10" />
));

// Contact Button Overlay Component
const ContactButtonOverlay = memo(() => (
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
));

// Contact Button Text Component
const ContactButtonText = memo(() => (
    <span className="font-display-black-italic relative z-10">
        contact
    </span>
));

// Contact Button Section Component
const ContactButtonSection = memo(() => (
    <motion.div
        className="hidden md:ml-4 lg:ml-6 md:block relative z-[90]"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
        <ContactButton />
    </motion.div>
));

// Desktop Navigation Component
const DesktopNavigation = memo(({ navigationItems }) => (
    <div className="hidden md:ml-6 lg:ml-10 md:block relative z-[90]">
        <motion.div
            className="flex space-x-1 lg:space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.08,
                delayChildren: 0.2
            }}
        >
            {navigationItems}
        </motion.div>
    </div>
));

// Logo Component
const Logo = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBrandClick = useCallback(() => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                scroller.scrollTo("header-section", {
                    duration: 600,
                    delay: 0,
                    smooth: "easeInOutQuart"
                });
            }, 400);
        } else {
            scroller.scrollTo("header-section", {
                duration: 600,
                delay: 0,
                smooth: "easeInOutQuart"
            });
        }
    }, [navigate, location.pathname]);

    return (
        <motion.div
            className="flex shrink-0 items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
        >
            <BrandLogo onClick={handleBrandClick} />
            <BrandText onClick={handleBrandClick} />
        </motion.div>
    );
});

// Mobile Contact Button Component
const MobileContactButton = memo(() => (
    <motion.button
        className="group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-white to-white/95 text-foreground-dark font-display-medium transition-all duration-300 overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <MobileContactButtonOverlay />
        <MobileContactButtonIcon />
        <MobileContactButtonText />
    </motion.button>
));

// Mobile Contact Button Icon Component
const MobileContactButtonIcon = memo(() => (
    <Phone className="w-4 h-4 group-hover:-translate-y-px transition-transform duration-200 relative z-10" />
));

// Mobile Contact Button Overlay Component
const MobileContactButtonOverlay = memo(() => (
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
));

// Mobile Contact Button Section Component
const MobileContactButtonSection = memo(() => (
    <motion.div
        className="pt-3 border-t border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
    >
        <MobileContactButton />
    </motion.div>
));

// Mobile Contact Button Text Component
const MobileContactButtonText = memo(() => (
    <span className="font-display-black-italic relative z-10">
        contact
    </span>
));

// Mobile Menu Background Component
const MobileMenuBackground = memo(() => (
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
));

// Mobile Menu Button Component
const MobileMenuButton = memo(({ open }) => (
    <div className="absolute inset-y-0 right-0 flex items-center md:hidden z-[100]">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-lg p-2 text-display hover:bg-white/10 transition-colors duration-200">
            <span className="sr-only">Open main menu</span>
            <MobileMenuIcon open={open} />
        </DisclosureButton>
    </div>
));

// Mobile Menu Content Component
const MobileMenuContent = memo(({ mobileNavigationItems }) => (
    <div className="space-y-1 px-4 pt-4 pb-4 relative z-10">
        {mobileNavigationItems}
        <MobileContactButtonSection />
    </div>
));

// Mobile Menu Container Component
const MobileMenuContainer = memo(({ open, mobileNavigationItems }) => (
    <AnimatePresence>
        {open && (
            <DisclosurePanel static className="md:hidden relative z-[80]">
                <motion.div
                    className="mt-4 sm:mt-5 w-11/12 max-w-sm mx-auto bg-black/80 backdrop-blur-[20px] rounded-2xl border border-white/20 shadow-[inset_0_0_30px_rgba(255,255,255,0.08)] overflow-hidden"
                    initial={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                            staggerChildren: 0.05,
                            delayChildren: 0.1
                        }
                    }}
                    exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn"
                        }
                    }}
                >
                    <MobileMenuBackground />
                    <MobileMenuContent mobileNavigationItems={mobileNavigationItems} />
                </motion.div>
            </DisclosurePanel>
        )}
    </AnimatePresence>
));


// Mobile Menu Icon Component
const MobileMenuIcon = memo(({ open }) => (
    <AnimatePresence mode="wait">
        {!open ? (
            <motion.div
                key="menu"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Menu className="h-5 w-5" />
            </motion.div>
        ) : (
            <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <X className="h-5 w-5" />
            </motion.div>
        )}
    </AnimatePresence>
));

// Mobile Nav Item Component
const MobileNavItem = memo(({ item, isActive, onClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const IconComponent = item.icon;

    const handleScrollNav = useCallback((e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                scroller.scrollTo(item.href, {
                    duration: 600,
                    delay: 0,
                    smooth: "easeInOutQuart"
                });
            }, 400);
        } else {
            scroller.scrollTo(item.href, {
                duration: 600,
                delay: 0,
                smooth: "easeInOutQuart"
            });
        }
        onClick(item.name);
    }, [item.href, item.name, onClick, navigate, location.pathname]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <DisclosureButton
                as="a"
                href={`#${item.href}`}
                onClick={handleScrollNav}
                className={`group flex items-center gap-3 w-full rounded-xl px-4 py-2.5 text-sm font-display-medium transition-all duration-300 ${isActive
                    ? "bg-white/15 text-display backdrop-blur-sm"
                    : "text-foreground-secondary/80 hover:bg-white/10 hover:text-display"
                    }`}
            >
                <MobileNavItemContent item={item} isActive={isActive} IconComponent={IconComponent} />
            </DisclosureButton>
        </motion.div>
    );
});

// Mobile Nav Item Content Component
const MobileNavItemContent = memo(({ item, isActive, IconComponent }) => (
    <motion.div
        className="flex items-center gap-3 w-full"
        animate={isActive ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        <IconComponent
            className={`w-4 h-4 transition-all duration-300 ${isActive ? "text-display" : "text-foreground-muted/80 group-hover:text-foreground-secondary/90"
                }`}
        />
        <span className="font-display-black-italic">
            {item.name}
        </span>
        <MobileNavItemIndicator isActive={isActive} />
    </motion.div>
));

// Mobile Nav Item Indicator Component
const MobileNavItemIndicator = memo(({ isActive }) => (
    <AnimatePresence>
        {isActive && (
            <motion.div
                className="ml-auto w-2 h-2 bg-foreground rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                layoutId="mobile-nav-active-dot"
            />
        )}
    </AnimatePresence>
));

// Nav Item Component
const NavItem = memo(({ item, index, isActive, onClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const IconComponent = item.icon; // <-- Add this line

    const handleScrollNav = useCallback((e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
            // Go to homepage first, then scroll after navigation
            navigate("/");
            setTimeout(() => {
                scroller.scrollTo(item.href, {
                    duration: 600,
                    delay: 0,
                    smooth: "easeInOutQuart"
                });
            }, 400); // delay to ensure homepage is rendered
        } else {
            scroller.scrollTo(item.href, {
                duration: 600,
                delay: 0,
                smooth: "easeInOutQuart"
            });
        }
        onClick(item.name);
    }, [item.href, item.name, onClick, navigate, location.pathname]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: index * 0.08
            }}
            layout
        >
            <motion.a
                href={`#${item.href}`}
                onClick={handleScrollNav}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-display-medium group transition-all duration-300 ${isActive
                    ? 'bg-white/10 border border-brand-light/50 text-display backdrop-blur-sm shadow-lg shadow-brand-light/20'
                    : 'text-foreground-secondary/80 hover:text-display hover:bg-white/5 backdrop-blur-sm'
                    }`}
                whileHover={{
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 }
                }}
                layout
                layoutId={`nav-item-${item.name}`}
            >
                <NavItemBackground isActive={isActive} />
                <NavItemContent item={item} isActive={isActive} IconComponent={IconComponent} />
            </motion.a>
        </motion.div>
    );
});

// Nav Item Background Component
const NavItemBackground = memo(({ isActive }) => (
    <AnimatePresence>
        {isActive && (
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-light/10 via-white/10 to-brand-light/10 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                layoutId="nav-active-bg"
            />
        )}
    </AnimatePresence>
));

// Nav Item Content Component
const NavItemContent = memo(({ item, isActive, IconComponent }) => (
    <motion.div
        className="relative z-10 flex items-center gap-1.5 sm:gap-2"
        animate={isActive ? { y: 0 } : { y: 0 }}
        transition={{ duration: 0.2 }}
    >
        <IconComponent
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-300 ${isActive ? "text-display" : "text-foreground-muted/70 group-hover:text-foreground-secondary/90"
                }`}
        />
        <span className="font-display-black-italic">
            {item.name}
        </span>
    </motion.div>
));

// Navbar Content Component
const NavbarContent = memo(({ navigationItems, mobileNavigationItems, open }) => (
    <motion.div
        className="mx-auto max-w-[1366px] px-3 sm:px-4 md:px-6 lg:px-8 relative z-[100]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1
        }}
    >
        <NavbarInner navigationItems={navigationItems} open={open} />
        <NavbarBottomBorder />
        <MobileMenuContainer open={open} mobileNavigationItems={mobileNavigationItems} />
    </motion.div>
));

// Navbar Bottom Border Component
const NavbarBottomBorder = memo(() => (
    <motion.div
        className="mx-auto h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
    />
));

// Navbar Inner Component
const NavbarInner = memo(({ navigationItems, open }) => (
    <div className="relative flex h-16 items-center justify-between">
        <MobileMenuButton open={open} />
        <NavbarMainContent navigationItems={navigationItems} />
        <ContactButtonSection />
    </div>
));

// Navbar Main Content Component
const NavbarMainContent = memo(({ navigationItems }) => (
    <motion.div
        className="flex flex-1 items-center justify-between relative z-[90]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
    >
        <Logo />
        <DesktopNavigation navigationItems={navigationItems} />
    </motion.div>
));

// Scroll Background Overlay Component
const ScrollBackgroundOverlay = memo(({ scrolled }) => (
    <AnimatePresence>
        {scrolled && (
            <motion.div
                className="fixed top-0 left-0 w-full h-16 bg-black/20 backdrop-blur-[15px] border-b border-white/5 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            />
        )}
    </AnimatePresence>
));

// ===== MAIN COMPONENT =====

/**
 * Navbar Component
 * 
 * Component Tree Structure:
 * Navbar
 * ├── ScrollBackgroundOverlay
 * └── Disclosure
 *     └── NavbarContent
 *         ├── NavbarInner
 *         │   ├── MobileMenuButton
 *         │   │   └── MobileMenuIcon
 *         │   ├── NavbarMainContent
 *         │   │   ├── Logo
 *         │   │   │   ├── BrandLogo
 *         │   │   │   └── BrandText
 *         │   │   │       ├── BrandTextSeparator
 *         │   │   │       └── BrandTextTitle
 *         │   │   └── DesktopNavigation
 *         │   │       └── NavItem (multiple instances)
 *         │   │           ├── NavItemBackground
 *         │   │           └── NavItemContent
 *         │   └── ContactButtonSection
 *         │       └── ContactButton
 *         │           ├── ContactButtonOverlay
 *         │           ├── ContactButtonIcon
 *         │           └── ContactButtonText
 *         ├── NavbarBottomBorder
 *         └── MobileMenuContainer
 *             └── MobileMenuContent
 *                 ├── MobileNavItem (multiple instances)
 *                 │   └── MobileNavItemContent
 *                 │       └── MobileNavItemIndicator
 *                 └── MobileContactButtonSection
 *                     └── MobileContactButton
 *                         ├── MobileContactButtonOverlay
 *                         ├── MobileContactButtonIcon
 *                         └── MobileContactButtonText
 */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState("info");

    // Use the optimized throttle function from utils
    const handleScroll = useMemo(
        () => throttle(() => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        }, 16), // ~60fps
        []
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
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
            <ScrollBackgroundOverlay scrolled={scrolled} />
            <Disclosure as="nav" className="h-16 fixed w-full z-[100]">
                {({ open }) => (
                    <NavbarContent
                        navigationItems={navigationItems}
                        mobileNavigationItems={mobileNavigationItems}
                        open={open}
                    />
                )}
            </Disclosure>
        </>
    );
}

export default memo(Navbar);
