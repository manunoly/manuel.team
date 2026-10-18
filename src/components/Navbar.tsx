import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Languages, Menu, X } from 'lucide-react';

const navLinks = {
    en: [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Research', href: '#research' },
        { name: 'Contact', href: '#contact' },
    ],
    es: [
        { name: 'Sobre mí', href: '#about' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'Investigación', href: '#research' },
        { name: 'Contacto', href: '#contact' },
    ],
};

interface NavbarProps {
    lang: 'en' | 'es';
}

export default function Navbar({ lang }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    const links = navLinks[lang];
    const languageURL = lang === 'en' ? '/es/' : '/';

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                menuButton.current?.focus();
            }
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [isOpen]);

    const toggleTheme = () => {
        const dark = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', dark);
        setIsDark(dark);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#090a0f' : '#ffffff');
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch {
            // Theme switching also works when storage is unavailable.
        }
    };

    return (
        <nav aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'} className="fixed top-0 left-0 right-0 z-50 bg-app-bg/95 backdrop-blur-md border-b border-app-surface">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
                <a href={lang === 'en' ? '/' : '/es/'} className="text-xl md:text-2xl font-bold tracking-tight shrink-0" translate="no">
                    Manuel<span className="text-app-accent">.team</span>
                </a>
                <div className="hidden xl:flex items-center gap-6">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="text-sm font-medium text-app-text-muted hover:text-app-accent transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                    <button type="button" onClick={toggleTheme} aria-label={lang === 'es' ? 'Modo oscuro' : 'Dark mode'} aria-pressed={isDark} className="p-3 rounded-full text-app-text-muted hover:bg-app-surface hover:text-app-accent transition-colors">
                        {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
                    </button>
                    <a href={languageURL} hrefLang={lang === 'en' ? 'es' : 'en'} lang={lang === 'en' ? 'es' : 'en'} aria-label={lang === 'en' ? 'Ver en español' : 'View in English'} className="flex items-center gap-2 p-3 rounded-full text-sm font-medium text-app-text-muted hover:bg-app-surface hover:text-app-accent transition-colors">
                        <Languages size={18} aria-hidden="true" />
                        <span>{lang === 'en' ? 'ES' : 'EN'}</span>
                    </a>
                    <button ref={menuButton} type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'} className="xl:hidden p-3 rounded text-app-text hover:bg-app-surface">
                        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>
            </div>
            <div id="mobile-menu" hidden={!isOpen} className="xl:hidden absolute top-20 left-0 right-0 bg-app-bg border-b border-app-surface shadow-lg">
                <div className="max-w-7xl mx-auto flex flex-col px-6 py-4">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="py-3 text-app-text-muted hover:text-app-accent">
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
