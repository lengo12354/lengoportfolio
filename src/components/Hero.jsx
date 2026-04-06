import React from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

const img1 = '/thumbnails/squidgame.png';
const img2 = '/thumbnails/SOLOLEVELING.jpg';
const img3 = '/thumbnails/podcastjinata7mad.jpg';
const img4 = '/thumbnails/remake1.jpg';
const img5 = '/thumbnails/pyramids2.jpg';
const img6 = '/thumbnails/subnauticabelowzero.jpg';
const img7 = '/thumbnails/zmoovy31.jpg';
const img8 = '/thumbnails/thumb1.jpg';
const img9 = '/thumbnails/thumb2.jpg';
const img10 = '/thumbnails/thumb3.jpg';
const img11 = '/thumbnails/thumb5.jpg';
const img12 = '/thumbnails/thumb6.jpg';
const img13 = '/thumbnails/new_thumb_1.jpg';
const img14 = '/thumbnails/new_thumb_2.jpg';
const img15 = '/thumbnails/new_thumb_3.jpg';
const img16 = '/thumbnails/zmoovey44.jpg';
const img17 = '/thumbnails/zmoovey45.jpg';
const img18 = '/thumbnails/zmoovey53.jpg';

const row1 = [img1, img2, img3, img4, img5, img16];
const row2 = [img6, img7, img8, img9, img10, img17];
const row3 = [img11, img12, img13, img14, img15, img18];
const row4 = [img10, img5, img7, img1, img14, img16]; // Mixed unique selection

const MarqueeRow = ({ images, direction = -1, speed = 40 }) => {
    return (
        <div className="flex w-max gap-4 mb-4 md:mb-6">
            <motion.div
                className="flex w-max gap-4 md:gap-6"
                animate={{ x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
            >
                {/* We concat the images array to itself so when it scrolls exactly 50%, it loops seamlessly */}
                {images.concat(images).map((src, idx) => (
                    <div
                        key={idx}
                        className="w-[280px] h-[160px] md:w-[450px] md:h-[250px] rounded-3xl overflow-hidden flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-500 border border-white/5 saturate-[0.8] hover:saturate-125"
                    >
                        <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const Hero = () => {
    const lenis = useLenis();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0118] px-4">

            {/* Infinite Marquee Background Matrix */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto opacity-70">
                {/* Tilted container taking up much more space to cover corners when rotated */}
                <div className="w-[200vw] h-[200vh] flex flex-col justify-center items-center -rotate-12 scale-110">
                    <MarqueeRow images={row1} direction={-1} speed={60} />
                    <MarqueeRow images={row2} direction={1} speed={45} />
                    <MarqueeRow images={row3} direction={-1} speed={55} />
                    <MarqueeRow images={row4} direction={1} speed={70} />
                </div>

                {/* Radial Gradient to fade out the edges completely into the background color */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0118_80%)] pointer-events-none" />

                {/* Additional Vignette for depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_200px_100px_#0a0118] pointer-events-none" />
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-600 drop-shadow-sm">
                            With Art.
                        </span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
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
