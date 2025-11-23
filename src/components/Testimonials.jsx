import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

const reviews = [
    {
        name: "zmoovey",
        role: "360K Subs",
        content: " The energy in Lengo DZN is insane they capture the exact moment of shock or hype which is crucial for reaction content my click-through rate on new release reactions has doubled it's guaranteed high-octane traffic.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
        name: "Mr beast",
        role: "451M Subs",
        content: "Lengo is pure fire! The designs are aggressive, bold, and literally stop the scroll. My latest video hit 188k views in 48 hours, thanks solely to the thumbnail design",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech"
    },
    {
        name: "Genetics",
        role: "23.7K ubs",
        content: "We saw an immediate and measurable impact. Our channel's CTR across the board increased by 4 points after Lengo DZN took over. It's an investment that pays for itself ten times over.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gaming"
    }
];

const Testimonials = () => {
    return (
        <section className="py-32 bg-black border-t border-white/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Client Love</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-zinc-900/30 border border-white/5 h-full flex flex-col"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-8 leading-relaxed flex-grow">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{review.name}</h4>
                                    <p className="text-gray-500 text-sm">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
