import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Languages } from 'lucide-react';

const navLinks = {
    en: [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ],
    es: [
        { name: 'Sobre Mí', href: '#about' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'Contacto', href: '#contact' },
    ]
};

interface NavbarProps {
    lang: 'en' | 'es';
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Initialize theme state
        if (document.documentElement.classList.contains('dark')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    };

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'es' : 'en';
        const path = newLang === 'en' ? '/' : '/es';
        window.location.href = path;
    };

    const links = navLinks[lang];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-app-bg/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href={lang === 'en' ? '/' : '/es'} className="text-2xl font-heading font-bold text-app-text tracking-tight">
                    Manuel
                    <span className="text-app-accent text-xl pr-2">.team</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-app-text-muted hover:text-app-accent transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/5 text-app-text-muted hover:text-app-accent transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 text-sm font-medium text-app-text-muted hover:text-app-accent transition-colors"
                        >
                            <Languages size={18} />
                            <span>{lang.toUpperCase()}</span>
                        </button>
                    </div>

                    <a
                        href="#contact"
                        className="px-5 py-2 rounded-full bg-app-accent/10 text-app-accent border border-app-accent/20 hover:bg-app-accent/20 transition-all text-sm font-semibold"
                    >
                        {lang === 'en' ? "Let's Talk" : "Hablemos"}
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/5 text-app-text-muted hover:text-app-accent transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 text-sm font-medium text-app-text-muted hover:text-app-accent transition-colors"
                    >
                        <Languages size={18} />
                        <span>{lang.toUpperCase()}</span>
                    </button>

                    <button
                        className="text-app-text p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between relative">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current rounded-full origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current rounded-full origin-center"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-20 left-0 right-0 border-t border-white/10 overflow-hidden"
                    >
                        <div className={`flex flex-col p-6 gap-6 ${theme === 'dark' ? 'bg-black/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'}`}>
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-app-text-muted hover:text-app-text"
                                >
                                    {link.name}
                                </a>
                            ))}

                            <div className="h-px bg-white/10 my-2" />

                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 py-3 text-center rounded-xl bg-app-accent text-white font-bold"
                            >
                                {lang === 'en' ? "Let's Talk" : "Hablemos"}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
}
