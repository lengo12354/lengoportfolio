import React from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import MagneticButton from './MagneticButton';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';

const Hero = () => {
    const lenis = useLenis();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse delay-1000" />

            <div className="container mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-blue-500 font-medium tracking-widest mb-4 uppercase text-sm">
                        Professional Thumbnail Designer
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold font-display text-white leading-tight mb-6"
                >
                    Boosting CTR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                        With Art.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                >
                    I create high-converting thumbnails that stop the scroll and get you clicks.
                    Trusted by top creators to drive millions of views.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <MagneticButton
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                            if (lenis) {
                                lenis.scrollTo('#work', { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                            }
                        }}
                    >
                        View My Work
                    </MagneticButton>
                    <MagneticButton
                        className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                        onClick={() => {
                            if (lenis) {
                                lenis.scrollTo('#contact', { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                            }
                        }}
                    >
                        Book a Call <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Floating 3D-ish Elements (Abstract Glass Cards) */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-1/3 left-10 hidden xl:flex -rotate-12"
            >
                <div className="w-64 h-40 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 flex items-center justify-center group hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
                        <Play className="w-8 h-8 text-blue-400 fill-blue-400/50" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-1/3 right-10 hidden xl:flex rotate-12"
            >
                <div className="w-64 h-40 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 flex items-center justify-center group hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
                        <TrendingUp className="w-8 h-8 text-purple-400" />
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
