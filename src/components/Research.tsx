import { ExternalLink } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface Publication {
    title: string;
    authors: string;
    publication: string;
    year: string;
    link: string;
    code?: string;
}

interface ResearchProps {
    data: {
        title: string;
        description: string;
        profileLink: string;
        publications: Publication[];
    };
    lang?: string;
}

function PublicationCard({ pub, lang }: { pub: Publication; lang: string }) {
    return (
        <article className="p-6 rounded-xl bg-app-surface">
            <h3 className="text-lg font-semibold mb-2">{pub.title}</h3>
            <p className="text-sm text-app-text-muted mb-2">{pub.authors}</p>
            {(pub.publication || pub.year) && (
                <p className="text-sm text-app-text-muted mb-4">{[pub.publication, pub.year].filter(Boolean).join(' · ')}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm font-medium text-app-accent">
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline" aria-label={`${lang === 'es' ? 'Ver en Google Scholar' : 'View on Google Scholar'}: ${pub.title}`}>
                    {lang === 'es' ? 'Ver en Google Scholar' : 'View on Google Scholar'}<ExternalLink size={16} aria-hidden="true" />
                </a>
                {pub.code && pub.code !== pub.link && (
                    <a href={pub.code} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {lang === 'es' ? 'Ver código' : 'View code'}
                    </a>
                )}
            </div>
        </article>
    );
}

export default function Research({ data, lang = 'en' }: ResearchProps) {
    const more = data.publications.slice(5);

    return (
        <SectionContainer id="research">
            <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
            <p className="text-app-text-muted text-lg max-w-3xl mb-6">{data.description}</p>
            <a href={data.profileLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-app-accent hover:underline mb-8">
                {lang === 'es' ? 'Mi perfil en Google Scholar' : 'My Google Scholar profile'}<ExternalLink size={16} aria-hidden="true" />
            </a>
            <div className="grid gap-6">
                {data.publications.slice(0, 5).map((pub) => <PublicationCard key={pub.title} pub={pub} lang={lang} />)}
            </div>
            {more.length > 0 && (
                <details className="group mt-8">
                    <summary className="w-fit rounded border border-app-accent/30 px-5 py-3 text-app-accent hover:bg-app-accent/10">
                        <span className="group-open:hidden">{lang === 'es' ? 'Ver más publicaciones' : 'More publications'} ({more.length})</span>
                        <span className="hidden group-open:inline">{lang === 'es' ? 'Ver menos publicaciones' : 'Fewer publications'}</span>
                    </summary>
                    <div className="grid gap-6 mt-6">
                        {more.map((pub) => <PublicationCard key={pub.title} pub={pub} lang={lang} />)}
                    </div>
                </details>
            )}
        </SectionContainer>
    );
}
