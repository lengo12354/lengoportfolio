import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[128px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                            <img
                                src="/about-me.jpg"
                                alt="About Lengo DZN"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full blur-2xl opacity-50" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-30" />
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-8">
                            More Than Just <br />
                            <span className="text-blue-500">
                                A Designer
                            </span>
                        </h2>

                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                I'm a creative strategist obsessed with the psychology of the click.
                                In a world where attention is the new currency, I help creators and brands
                                stop the scroll and dominate their niche.
                            </p>
                            <p>
                                My approach isn't just about making things look "pretty." It's about
                                visual storytelling, color theory, and data-driven design that converts
                                impressions into loyal viewers.
                            </p>
                            <p>
                                Whether you're a YouTuber looking to skyrocket your CTR or a brand
                                needing a complete visual overhaul, I bring the heat, the hype, and
                                the results.
                            </p>
                        </div>

                        <div className="mt-10">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group"
                            >
                                Let's create something epic
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
