import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const lenis = useLenis();

    const [isTransitioning, setIsTransitioning] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const handleScroll = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        setIsTransitioning(true);

        // Wait for the transition animation to cover the screen
        setTimeout(() => {
            if (lenis) {
                lenis.scrollTo(href, { duration: 0, immediate: true }); // Instant jump while covered
            } else {
                const element = document.querySelector(href);
                if (element) element.scrollIntoView({ behavior: 'auto' });
            }

            // Small delay before revealing
            setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
        }, 600); // Match this with the exit animation duration
    };

    const navLinks = [
        { name: 'Work', href: '#work' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Page Transition Overlay */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isTransitioning ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: isTransitioning ? 'top' : 'bottom' }}
                className="fixed inset-0 bg-blue-600 z-[100] pointer-events-none"
            />
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isTransitioning ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: isTransitioning ? 'top' : 'bottom' }}
                className="fixed inset-0 bg-black z-[99] pointer-events-none"
            />

            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 px-4"
            >
                <div className="glass-panel flex items-center justify-between px-8 py-4 rounded-full w-full max-w-5xl bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
                    <a href="#" className="text-2xl font-bold font-display tracking-tighter text-white" onClick={(e) => handleScroll(e, '#')}>
                        LENGO<span className="text-blue-500">.</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group cursor-pointer"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, '#contact')}
                            className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:hidden flex flex-col gap-6 items-center"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xl font-medium text-white"
                                onClick={(e) => handleScroll(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </motion.nav>
        </>
    );
};

export default Navbar;
