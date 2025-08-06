import { PERFORMANCE } from './constants';

// Performance optimization utilities
let animationCount = 0;
const maxAnimations = PERFORMANCE.maxConcurrentAnimations;

export const canAnimate = () => {
    if (PERFORMANCE.reducedMotion) return false;
    if (animationCount >= maxAnimations) return false;
    return true;
};

export const registerAnimation = () => {
    animationCount++;
};

export const unregisterAnimation = () => {
    animationCount = Math.max(0, animationCount - 1);
};

// Device detection helpers with performance considerations
export const getDeviceType = () => {
    const width = window.innerWidth;
    
    if (width < 640) return 'mobile';
    if (width < 768) return 'tablet';
    if (width < 1024) return 'laptop';
    return 'desktop';
};

export const isMobile = () => window.innerWidth < 640;
export const isTablet = () => window.innerWidth >= 640 && window.innerWidth < 1024;
export const isDesktop = () => window.innerWidth >= 1024;

// Performance-aware animation config
export const getAnimationConfig = () => {
    const isLowEnd = PERFORMANCE.isLowEndDevice;
    const isMobileDevice = isMobile();
    const reducedMotion = PERFORMANCE.reducedMotion;
    
    return {
        reduce: reducedMotion || isLowEnd || isMobileDevice,
        enableComplex: !isLowEnd && !isMobileDevice && !reducedMotion,
        staggerDelay: isLowEnd ? 0.05 : isMobileDevice ? 0.08 : 0.1,
        duration: isLowEnd ? 0.2 : isMobileDevice ? 0.3 : 0.4
    };
};

// Optimized throttle with RAF
export const throttle = (func, limit = PERFORMANCE.throttleDelay) => {
    let inThrottle;
    let lastFunc;
    let lastRan;
    
    return function() {
        const context = this;
        const args = arguments;
        
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

// RAF-based debounce for smooth animations
export const debounce = (func, wait) => {
    let timeout;
    let rafId;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => func(...args));
        };
        
        clearTimeout(timeout);
        cancelAnimationFrame(rafId);
        timeout = setTimeout(later, wait);
    };
};

// Intersection Observer with performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
    const defaultOptions = {
        rootMargin: PERFORMANCE.intersectionRootMargin,
        threshold: [0, 0.1, 0.25, 0.5],
        ...options
    };
    
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        return {
            observe: () => {},
            unobserve: () => {},
            disconnect: () => {}
        };
    }
    
    return new IntersectionObserver(throttle(callback, 100), defaultOptions);
};

// Memory-efficient animation variants creator
export const createMobileOptimizedVariants = (baseVariants) => {
    const config = getAnimationConfig();
    
    if (config.reduce) {
        return {
            hidden: { opacity: 0 },
            visible: { 
                opacity: 1,
                transition: { duration: config.duration }
            }
        };
    }
    
    return baseVariants;
};

// Scroll utilities (optimized)
export const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

export const getScrollPercentage = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
};

// Format date helpers (unchanged)
export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', {
        ...defaultOptions,
        ...options
    });
};

export const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'just now';
};

// String utilities (unchanged)
export const truncateText = (text, maxLength, suffix = '...') => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
};

export const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Array utilities (unchanged)
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

// Local storage utilities (unchanged)
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error setting localStorage:', error);
        return false;
    }
};

export const getLocalStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error getting localStorage:', error);
        return defaultValue;
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing localStorage:', error);
        return false;
    }
};

// Performance utilities (enhanced)
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

export const preloadImages = async (srcArray) => {
    try {
        const promises = srcArray.map(preloadImage);
        return await Promise.all(promises);
    } catch (error) {
        console.error('Error preloading images:', error);
        return [];
    }
};

// URL utilities (unchanged)
export const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export const getQueryParams = () => {
    return new URLSearchParams(window.location.search);
};

export const setQueryParam = (key, value) => {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
};

// Optimized animation utilities
export const createStaggerDelay = (index, baseDelay = 0.1) => {
    const config = getAnimationConfig();
    return index * (config.reduce ? baseDelay * 0.5 : baseDelay);
};

export const getRandomDelay = (min = 0, max = 0.5) => {
    const config = getAnimationConfig();
    if (config.reduce) return 0;
    return Math.random() * (max - min) + min;
};

// Color utilities (unchanged)
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};