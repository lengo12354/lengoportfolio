import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Parse value like "3.5M+", "300+", "98%" into a numeric target + suffix
function parseValue(raw) {
    const suffix = raw.replace(/[\d.]/g, ''); // e.g. "M+", "+", "%"
    const num = parseFloat(raw.replace(/[^\d.]/g, '')); // e.g. 3.5, 300, 98
    return { num, suffix };
}

function useCountUp(target, duration = 2000, started = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!started) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            // snap exactly to target at end
            setCount(progress === 1 ? target : eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return count;
}

const StatItem = ({ value, label, delay }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (inView) setStarted(true);
    }, [inView]);

    const { num, suffix } = parseValue(value);
    const isDecimal = num % 1 !== 0;
    const animated = useCountUp(num, 1800, started);
    const display = isDecimal ? animated.toFixed(1) : Math.floor(animated);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <h3 className="text-4xl md:text-6xl font-bold font-display text-white mb-2">
                {display}{suffix}
            </h3>
            <p className="text-gray-400 uppercase tracking-widest text-sm">{label}</p>
        </motion.div>
    );
};

const Stats = () => {
    return (
        <section className="py-20 border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <StatItem value="3.5M+" label="Views Generated" />
                    <StatItem value="300+" label="Thumbnails Created" />
                    <StatItem value="98%" label="Client Satisfaction" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
