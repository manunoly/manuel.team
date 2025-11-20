import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
    name: string;
    tagline: string;
    subtext: string[];
    resumeLink: string;
}

export default function Hero({ name, tagline, subtext, resumeLink }: HeroProps) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-start px-4 md:px-20 max-w-7xl mx-auto pt-20">
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-app-accent font-semibold tracking-wider mb-4"
            >
                Hi, my name is
            </motion.span>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-app-text mb-4 leading-tight"
            >
                {name}.
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-bold text-app-text-muted mb-8 leading-tight"
            >
                {tagline}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-app-text-muted text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
            >
                {
                    Array.isArray(subtext) ? (
                        subtext.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))
                    ) : (
                        subtext
                    )
                }
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-transparent border border-app-accent text-app-accent font-medium rounded hover:bg-app-accent/10 transition-colors duration-300"
                >
                    Download Resume
                    <span className="absolute inset-0 rounded ring-1 ring-app-accent/50 group-hover:ring-app-accent transition-all duration-300 blur-sm opacity-0 group-hover:opacity-50"></span>
                </a>
            </motion.div>
        </div>
    );
}
