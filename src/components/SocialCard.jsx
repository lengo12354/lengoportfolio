import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SocialCard = ({ name, icon, href, color, bg, border, index }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;

        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = (mouseX / width - 32.5 / 2);

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
                if (href === "javascript:void(0)") {
                    e.preventDefault();
                }
            }}
            initial={{ opacity: 0, rotateX: -90, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
                delay: 0.2 + (index * 0.1)
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform
            }}
            className={`group relative flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl transition-colors duration-300 ${bg} ${border}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className={`mb-4 text-gray-400 transition-colors duration-300 ${color}`}
            >
                {icon}
            </div>
            <span
                style={{
                    transform: "translateZ(30px)",
                }}
                className={`font-medium text-gray-400 transition-colors duration-300 ${color}`}
            >
                {name}
            </span>

            {/* Shine Effect */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none`}
            />
        </motion.a>
    );
};

export default SocialCard;
