import { Download, Mail } from 'lucide-react';
import SocialLinks, { type SocialProfiles } from './SocialLinks';

interface HeroProps {
    name: string;
    tagline: string;
    subtext: string[];
    resumeLink: string;
    email: string;
    profiles: SocialProfiles;
    lang?: string;
}

export default function Hero({ name, tagline, subtext, resumeLink, email, profiles, lang = 'en' }: HeroProps) {
    return (
        <header className="px-4 md:px-8 max-w-7xl mx-auto pt-32 pb-12 md:pt-36 md:pb-16">
            <p className="text-app-text-muted font-medium mb-3">
                {lang === 'es' ? 'Hola, soy' : 'Hi, I’m'}
            </p>
            <h1 className="text-[clamp(2.75rem,6vw,5.5rem)] font-bold tracking-tight mb-4 leading-[1.05]">{name}</h1>
            <p className="text-xl md:text-3xl font-medium text-app-text-muted max-w-4xl leading-snug">
                {tagline}
            </p>
            <SocialLinks profiles={profiles} lang={lang} className="mt-4 mb-8" />
            <div className="text-app-text-muted text-lg max-w-3xl mb-8 leading-relaxed space-y-2">
                {subtext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={`mailto:${email}`} className="inline-flex min-h-12 items-center gap-2 px-5 py-3 bg-app-accent text-app-bg font-semibold rounded hover:opacity-90 transition-opacity">
                    <Mail size={18} aria-hidden="true" />
                    {lang === 'es' ? 'Escríbeme' : 'Email me'}
                </a>
                <a href={resumeLink} download className="inline-flex min-h-12 items-center gap-2 px-5 py-3 border border-app-accent text-app-accent font-medium rounded hover:bg-app-accent/10 transition-colors">
                    <Download size={18} aria-hidden="true" />
                    {lang === 'es' ? 'Descargar CV' : 'Download résumé'}
                    <span className="sr-only"> (PDF)</span>
                </a>
                <a href="#projects" className="inline-flex min-h-12 items-center text-app-accent font-medium underline underline-offset-4 hover:no-underline">
                    {lang === 'es' ? 'Ver proyectos' : 'View projects'}
                </a>
            </div>
        </header>
    );
}
