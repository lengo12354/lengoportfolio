import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ value, label, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="text-center"
        >
            <h3 className="text-4xl md:text-6xl font-bold font-display text-white mb-2">
                {value}
            </h3>
            <p className="text-gray-400 uppercase tracking-widest text-sm">{label}</p>
        </motion.div>
    );
};

const Stats = () => {
    return (
        <section className="py-20 bg-black border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <StatItem value="3.5M+" label="Views Generated" delay={0} />
                    <StatItem value="300+" label="Thumbnails Created" delay={0.2} />
                    <StatItem value="98%" label="Client Satisfaction" delay={0.4} />
                </div>
            </div>
        </section>
    );
};

export default Stats;
