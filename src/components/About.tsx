import React from 'react';
import SectionContainer from './SectionContainer';

interface AboutProps {
    title: string;
    content: string | string[];
    image: string;
    lang?: string;
}

export default function About({ title, content, image, lang = 'en' }: AboutProps) {
    return (
        <SectionContainer id="about" className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-56 md:w-72 shrink-0">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-app-accent rounded-lg blur opacity-20"></div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-app-surface">
                        <img
                            src={image}
                            alt={lang === 'es' ? 'Retrato de Manuel Almaguer' : 'Portrait of Manuel Almaguer'}
                            width={288}
                            height={288}
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-[filter] duration-300"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="flex items-center text-3xl font-bold text-app-text mb-8">
                    <span className="text-app-accent mr-2"> {title} </span>
                    <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
                </h2>
                <div className="text-app-text-muted text-lg leading-relaxed space-y-4">
                    {Array.isArray(content) ? (
                        content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))
                    ) : (
                        <p>{content}</p>
                    )}
                </div>
            </div>
        </SectionContainer>
    );
}
