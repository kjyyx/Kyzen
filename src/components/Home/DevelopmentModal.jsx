import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Zap, AlertTriangle } from 'lucide-react';

const DevelopmentModal = ({ onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    className="relative w-full max-w-md sm:max-w-lg bg-gradient-to-br from-[#2e175c]/90 via-[#1a1a1a]/95 to-black/90 border border-[#ff75df]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-[#ff75df]/20"
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    {/* Icon and Animation */}
                    <div className="flex justify-center mb-6">
                        <motion.div
                            className="relative"
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-[#ff75df] to-purple-400 rounded-full flex items-center justify-center">
                                <Code2 className="w-8 h-8 text-white" />
                            </div>
                            
                            {/* Floating particles around icon */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff75df] rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                        {/* Title */}
                        <motion.h2
                            className="text-2xl sm:text-3xl font-black italic tracking-tight bg-gradient-to-r from-white via-[#ff75df] to-purple-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Under Development
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.div
                            className="flex items-center justify-center gap-2 text-[#ff75df]/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-medium tracking-wide">Digital Portfolio v2.0</span>
                            <Zap className="w-4 h-4" />
                        </motion.div>

                        {/* Message */}
                        <motion.p
                            className="text-white/80 text-sm sm:text-base leading-relaxed px-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            This portfolio is currently being enhanced with new features, 
                            improved animations, and fresh content. Some sections may be 
                            incomplete or under construction.
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            className="text-left bg-white/5 rounded-xl p-4 border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-[#ff75df]" />
                                <span className="text-sm font-medium text-white">Currently Working On:</span>
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#ff75df] rounded-full"></div>
                                    Enhanced animations & interactions
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    Mobile responsiveness optimization
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#ff75df] rounded-full"></div>
                                    New project showcases
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    Performance improvements
                                </li>
                            </ul>
                        </motion.div>

                        {/* Action Button */}
                        <motion.button
                            onClick={onClose}
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#ff75df] to-purple-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#ff75df]/30 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            Continue Exploring
                        </motion.button>

                        {/* Footer Note */}
                        <motion.p
                            className="text-xs text-white/50 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Thank you for your patience! 🚀
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DevelopmentModal;