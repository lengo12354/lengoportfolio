import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';

const EmailCard = () => {
    const ref = useRef(null);
    const [copied, setCopied] = useState(false);
    const email = "contact@lengo.dzn";

    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);

    const tiltXSpring = useSpring(tiltX, { stiffness: 300, damping: 30 });
    const tiltYSpring = useSpring(tiltY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;

        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = (mouseX / width - 32.5 / 2);

        tiltX.set(rX);
        tiltY.set(rY);
    };

    const handleMouseLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative inline-block group perspective-1000"
        >
            <motion.button
                ref={ref}
                onClick={handleCopy}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                whileTap={{ cursor: "grabbing" }}
                style={{
                    transformStyle: "preserve-3d",
                    rotateX: tiltXSpring,
                    rotateY: tiltYSpring
                }}
                className="relative z-10 flex items-center gap-6 px-10 py-6 bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-colors duration-300 cursor-grab active:cursor-grabbing"
            >
                {/* Icon Container */}
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 transition-colors"
                >
                    <Mail className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start text-left">
                    <span
                        style={{ transform: "translateZ(30px)" }}
                        className="text-sm text-gray-500 uppercase tracking-wider mb-1"
                    >
                        Get in touch
                    </span>
                    <span
                        style={{ transform: "translateZ(60px)" }}
                        className="text-2xl md:text-4xl font-bold font-display text-white group-hover:text-blue-100 transition-colors"
                    >
                        {email}
                    </span>
                </div>

                {/* Copy Status */}
                <div
                    style={{ transform: "translateZ(40px)" }}
                    className="ml-4 pl-6 border-l border-white/10"
                >
                    <AnimatePresence mode='wait'>
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="flex items-center gap-2 text-green-400"
                            >
                                <Check className="w-5 h-5" />
                                <span className="text-sm font-medium hidden md:block">Copied!</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="flex items-center gap-2 text-gray-500 group-hover:text-blue-400 transition-colors"
                            >
                                <Copy className="w-5 h-5" />
                                <span className="text-sm font-medium hidden md:block">Copy</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>
        </motion.div>
    );
};

export default EmailCard;
