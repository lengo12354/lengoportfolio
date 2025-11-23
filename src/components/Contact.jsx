import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Twitter, Instagram, Youtube, MessageCircle, Copy, Check } from 'lucide-react';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "contact@lengo.dzn";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        {
            name: "Twitter",
            icon: <Twitter className="w-6 h-6" />,
            href: "https://x.com/lengodzn",
            color: "hover:text-blue-400",
            bg: "hover:bg-blue-500/10",
            border: "hover:border-blue-500/50"
        },
        {
            name: "Instagram",
            icon: <Instagram className="w-6 h-6" />,
            href: "https://www.instagram.com/lengodzn1",
            color: "hover:text-pink-500",
            bg: "hover:bg-pink-500/10",
            border: "hover:border-pink-500/50"
        },
        {
            name: "YouTube",
            icon: <Youtube className="w-6 h-6" />,
            href: "javascript:void(0)",
            color: "hover:text-red-500",
            bg: "hover:bg-red-500/10",
            border: "hover:border-red-500/50"
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle className="w-6 h-6" />,
            href: "https://api.whatsapp.com/send/?phone=212679635087",
            color: "hover:text-green-500",
            bg: "hover:bg-green-500/10",
            border: "hover:border-green-500/50"
        },
    ];

    return (
        <footer id="contact" className="bg-black relative pt-32 pb-10 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-purple-900/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-bold font-display text-white mb-12 tracking-tight"
                    >
                        Let's Work <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Together
                        </span>
                    </motion.h2>

                    {/* Interactive Email */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative inline-block group"
                    >
                        <button
                            onClick={handleCopy}
                            className="relative z-10 flex items-center gap-6 px-10 py-6 bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all duration-300 group-hover:-translate-y-1"
                        >
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 transition-colors">
                                <Mail className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            </div>

                            <div className="flex flex-col items-start">
                                <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">Get in touch</span>
                                <span className="text-2xl md:text-4xl font-bold font-display text-white group-hover:text-blue-100 transition-colors">
                                    {email}
                                </span>
                            </div>

                            <div className="ml-4 pl-6 border-l border-white/10">
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
                        </button>

                        {/* Glow Effect */}
                        <div className="absolute -inset-2 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    </motion.div>
                </div>

                {/* Social Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                if (social.href === "javascript:void(0)") {
                                    e.preventDefault();
                                }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className={`group flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl transition-all duration-300 ${social.bg} ${social.border}`}
                        >
                            <div className={`mb-4 text-gray-400 transition-colors ${social.color}`}>
                                {social.icon}
                            </div>
                            <span className={`font-medium text-gray-400 transition-colors ${social.color}`}>
                                {social.name}
                            </span>
                        </motion.a>
                    ))}
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10">
                    <div className="text-2xl font-bold font-display tracking-tighter text-white mb-4 md:mb-0">
                        LENGO<span className="text-blue-500">.</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2025 Lengo DZN. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
