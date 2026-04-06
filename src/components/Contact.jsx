import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';
import EmailCard from './EmailCard';

const Contact = () => {
    const socialLinks = [
        {
            name: "Twitter",
            icon: <Twitter className="w-6 h-6" />,
            href: "https://x.com/lengodzn",
            color: "hover:text-violet-400",
            bg: "hover:bg-violet-500/10",
            border: "hover:border-violet-500/50"
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
        <footer id="contact" className=" relative pt-32 pb-10 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-bold font-display text-white mb-12 tracking-tight"
                    >
                        Let's Work <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                            Together
                        </span>
                    </motion.h2>

                    {/* Interactive Email */}
                    <EmailCard />
                </div>

                {/* Social Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl transition-all duration-300 ${social.bg} ${social.border}`}
                        >
                            <div className={`mb-4 text-gray-400 transition-colors ${social.color}`}>
                                {social.icon}
                            </div>
                            <span className={`font-medium text-gray-400 transition-colors ${social.color}`}>
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <img src="/lengodznlogo.png" alt="Lengo DZN" className="h-12 md:h-16 w-auto object-contain scale-[1.75] translate-x-4 md:translate-x-6 origin-center" />
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
