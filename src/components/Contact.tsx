import { Github, Linkedin, Mail } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface ContactProps {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
    lang?: string;
}

export default function Contact({ email, linkedin, github, twitter, lang = 'en' }: ContactProps) {
    return (
        <SectionContainer id="contact" className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">{lang === 'es' ? 'Hablemos' : 'Let’s talk'}</h2>
            <p className="text-app-text-muted text-lg mb-8">
                {lang === 'es' ? '¿Tienes un proyecto o una consulta? Escríbeme.' : 'Have a project or a question? Email me.'}
            </p>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-app-accent text-app-bg font-semibold rounded hover:opacity-90 transition-opacity">
                <Mail size={20} aria-hidden="true" />{lang === 'es' ? 'Escríbeme' : 'Email me'}
            </a>
            <p className="mt-4 text-sm text-app-text-muted break-all">{email}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-app-text-muted">
                <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-app-accent">
                    <Github size={20} aria-hidden="true" />GitHub
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-app-accent">
                    <Linkedin size={20} aria-hidden="true" />LinkedIn
                </a>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-app-accent">X / Twitter</a>
            </div>
        </SectionContainer>
    );
}
