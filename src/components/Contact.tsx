import { Mail } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SocialLinks, { type SocialProfiles } from './SocialLinks';

interface ContactProps {
    email: string;
    profiles: SocialProfiles;
    lang?: string;
}

export default function Contact({ email, profiles, lang = 'en' }: ContactProps) {
    return (
        <SectionContainer id="contact" className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">{lang === 'es' ? 'Hablemos' : 'Let’s talk'}</h2>
            <p className="text-app-text-muted text-lg mb-8">
                {lang === 'es'
                    ? 'Estoy abierto a nuevos desafíos y oportunidades: consultorías, ideas, emprendimientos o simplemente saludar. Escríbeme y te responderé con gusto.'
                    : 'I’m open to new challenges and opportunities: consulting, ideas, new ventures or simply saying hello. Email me and I’ll be happy to reply.'}
            </p>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-app-accent text-app-bg font-semibold rounded hover:opacity-90 transition-opacity">
                <Mail size={20} aria-hidden="true" />{lang === 'es' ? 'Escríbeme' : 'Email me'}
            </a>
            <p className="mt-4 text-sm text-app-text-muted break-all">{email}</p>
            <SocialLinks profiles={profiles} lang={lang} className="mt-8 justify-center" />
        </SectionContainer>
    );
}
