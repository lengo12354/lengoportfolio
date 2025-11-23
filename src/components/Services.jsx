import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MagneticButton from './MagneticButton';

const packages = [
    {
        name: "Basic",
        price: "$25",
        description: "Perfect for new creators starting out.",
        features: ["1 Custom Thumbnail", "2 Revisions", "24h Delivery", "High Resolution"],
        highlight: false
    },
    {
        name: "Pro",
        price: "$45",
        description: "For serious YouTubers who want growth.",
        features: ["1 Custom Thumbnail", "Unlimited Revisions", "Source File (PSD)", "A/B Testing Variations", "Priority Support"],
        highlight: true
    },
    {
        name: "Channel Branding",
        price: "$150",
        description: "Complete visual overhaul for your channel.",
        features: ["Logo Design", "Banner Art", "5 Custom Thumbnails", "Social Media Assets", "Unlimited Revisions"],
        highlight: false
    }
];

const Services = () => {
    return (
        <section id="services" className="py-32 bg-black relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Services & Pricing</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Simple, transparent pricing. No hidden fees.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-2xl border ${pkg.highlight ? 'border-blue-500 bg-blue-900/10' : 'border-white/10 bg-zinc-900/50'} backdrop-blur-sm flex flex-col`}
                        >
                            {pkg.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold text-white">{pkg.price}</span>
                                <span className="text-gray-400">/project</span>
                            </div>
                            <p className="text-gray-400 mb-8 text-sm">{pkg.description}</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {pkg.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <MagneticButton className={`w-full ${pkg.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                Choose {pkg.name}
                            </MagneticButton>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
