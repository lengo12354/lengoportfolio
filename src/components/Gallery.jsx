import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const thumbnails = [
    { id: 1, title: "Thumbnail 1", image: "/thumbnails/thumb1.jpg" },
    { id: 2, title: "Thumbnail 2", image: "/thumbnails/thumb2.jpg" },
    { id: 3, title: "Thumbnail 3", image: "/thumbnails/thumb3.jpg" },
    { id: 4, title: "Thumbnail 4", image: "/thumbnails/thumb4.jpg" },
    { id: 5, title: "Thumbnail 5", image: "/thumbnails/thumb5.jpg" },
    { id: 6, title: "Thumbnail 6", image: "/thumbnails/thumb6.jpg" },
    { id: 7, title: "Solo Leveling", image: "/thumbnails/SOLOLEVELING.jpg" },
    { id: 8, title: "Podcast Design", image: "/thumbnails/podcastjinata7mad.jpg" },
    { id: 9, title: "Pyramids Concept", image: "/thumbnails/pyramids2.jpg" },
    { id: 10, title: "Remake Project", image: "/thumbnails/remake1.jpg" },
    { id: 11, title: "Squid Game", image: "/thumbnails/squidgame.png" },
    { id: 12, title: "Zmoovey Project", image: "/thumbnails/zmoovey38.jpg" },
    { id: 13, title: "Salah To The World", image: "/thumbnails/salahtotheworld2.jpg" },
    { id: 14, title: "Subnautica Below Zero", image: "/thumbnails/subnauticabelowzero.jpg" },
    { id: 15, title: "Zmoovy Design", image: "/thumbnails/zmoovy31.jpg" },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="work" className="py-32 bg-black relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Selected Work</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A curated selection of high-performing thumbnails designed to maximize click-through rates.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {thumbnails.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: Math.floor(index / 3) * 0.2,
                                ease: "easeOut"
                            }}
                            className="relative group rounded-xl overflow-hidden cursor-pointer border border-white/5"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => setSelectedImage(item)}
                                    className="px-6 py-3 bg-black/80 backdrop-blur-md rounded-full text-white font-medium border border-white/10 hover:border-white/30 transition-all duration-300"
                                >
                                    View Project
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal/Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors z-10"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-6xl w-full"
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
