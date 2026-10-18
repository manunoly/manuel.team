interface HeroProps {
    name: string;
    tagline: string;
    subtext: string[];
    resumeLink: string;
    lang?: string;
}

export default function Hero({ name, tagline, subtext, resumeLink, lang = 'en' }: HeroProps) {
    return (
        <header className="min-h-[85svh] flex flex-col justify-center items-start px-4 md:px-20 max-w-7xl mx-auto pt-28 pb-16">
            <p className="text-app-accent font-semibold mb-4">
                {lang === 'es' ? 'Hola, soy' : 'Hi, I’m'}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{name}</h1>
            <p className="text-2xl md:text-4xl font-semibold text-app-text-muted mb-6 max-w-4xl leading-tight">
                {tagline}
            </p>
            <div className="text-app-text-muted text-lg md:text-xl max-w-2xl mb-8 leading-relaxed space-y-2">
                {subtext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 bg-app-accent text-app-bg font-semibold rounded hover:opacity-90 transition-opacity">
                    {lang === 'es' ? 'Escríbeme' : 'Email me'}
                </a>
                <a href={resumeLink} download className="px-6 py-3 border border-app-accent text-app-accent font-medium rounded hover:bg-app-accent/10 transition-colors">
                    {lang === 'es' ? 'Descargar CV' : 'Download résumé'}
                    <span className="sr-only"> (PDF)</span>
                </a>
            </div>
        </header>
    );
}
