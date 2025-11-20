import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function SectionContainer({ children, className = "", id = "", delay = 0 }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id={id} className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </section>
    );
}
