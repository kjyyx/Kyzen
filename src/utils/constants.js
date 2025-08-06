// Breakpoints for responsive design
export const BREAKPOINTS = {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    xl: 1536
};

// Optimized animation durations - reduced for better performance
export const ANIMATION_DURATION = {
    fast: 0.15,
    normal: 0.25,
    slow: 0.4,
    slower: 0.6
};

// Optimized easing curves - using simpler curves for better performance
export const EASING = {
    easeOut: [0.25, 0.46, 0.45, 0.94],
    easeIn: [0.42, 0, 1, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.25, 0.46, 0.45, 0.94] // Simplified from complex elastic
};

// Performance settings
export const PERFORMANCE = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isLowEndDevice: navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4,
    maxConcurrentAnimations: 10,
    throttleDelay: 16, // 60fps
    intersectionRootMargin: '50px'
};

// Optimized scroll thresholds
export const SCROLL_THRESHOLDS = {
    minimal: 0.1,
    partial: 0.2,
    half: 0.5,
    full: 1.0
};

// Animation priority levels
export const ANIMATION_PRIORITY = {
    critical: 1,    // Hero sections, main navigation
    high: 2,        // Above fold content
    medium: 3,      // Below fold but visible
    low: 4          // Far below fold
};

// Color palette (unchanged)
export const COLORS = {
    primary: '#ff75df',
    secondary: '#e2dbd2',
    background: {
        dark: '#000000',
        light: '#ffffff'
    },
    text: {
        primary: '#ffffff',
        secondary: '#ffffff/80',
        muted: '#ffffff/60'
    },
    accent: {
        blue: '#3b82f6',
        purple: '#8b5cf6',
        pink: '#ec4899',
        green: '#10b981'
    }
};

// Z-index layers (unchanged)
export const Z_INDEX = {
    background: -1,
    base: 0,
    content: 10,
    overlay: 50,
    modal: 100,
    dropdown: 200,
    tooltip: 300,
    navbar: 1000
};

// Common spacing values (unchanged)
export const SPACING = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
};

// Typography scales (unchanged)
export const TYPOGRAPHY = {
    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem'
    },
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
    }
};

// Common border radius values (unchanged)
export const BORDER_RADIUS = {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
};

// Shadow presets (unchanged)
export const SHADOWS = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: '0 0 40px rgba(255, 117, 223, 0.3)'
};