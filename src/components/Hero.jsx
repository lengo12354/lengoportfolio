import React from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';
import LightWave from './LightWave';


const Hero = () => {
    const lenis = useLenis();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0118] px-4">
            
            {/* LightWave Interactive Background */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <LightWave 
                    baseColor="#9333ea" 
                    accentColor="#4c1d95" 
                    opacity={0.8} 
                    backgroundColor="#0a0118" 
                    interactive={true} 
                />
            </div>

            {/* Main Centerpiece Content */}
            <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center mt-8 md:mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col items-center text-center pt-8 md:pt-16"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold font-display text-white leading-[1.05] tracking-tight mb-8">
                        Boosting CTR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-500 to-violet-700 drop-shadow-sm">
                            With Art.
                        </span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
                        I engineer high-converting thumbnails that aggressively stop the scroll and hijack attention.
                        Trusted by top creators to drive millions of views.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                        <MagneticButton
                            className="w-full sm:w-auto px-10 py-4 lg:px-12 lg:py-5 bg-white text-black font-bold rounded-full hover:scale-105 shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] transition-all duration-500 text-lg"
                            onClick={() => {
                                if (lenis) lenis.scrollTo('#work', { duration: 1.5 });
                            }}
                        >
                            Explore Work
                        </MagneticButton>

                        {/* Glowing Line Separator (which User loved!) */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="hidden sm:block w-[2px] h-12 md:h-16 bg-gradient-to-b from-transparent via-violet-500 to-transparent animate-pulse"
                        />

                        <MagneticButton
                            className="w-full sm:w-auto px-10 py-4 lg:px-12 lg:py-5 bg-[#0a0118] text-white font-bold rounded-full hover:bg-violet-900 border border-white/20 transition-all duration-500 flex items-center justify-center group text-lg"
                            onClick={() => {
                                if (lenis) lenis.scrollTo('#contact', { duration: 1.5 });
                            }}
                        >
                            Let's Talk <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default Hero;
