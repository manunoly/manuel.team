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
        <SectionContainer id="about" className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            <div className="w-40 md:w-56 shrink-0">
                <div className="aspect-square rounded-lg overflow-hidden bg-app-surface">
                    <img
                        src={image}
                        alt={lang === 'es' ? 'Retrato de Manuel Almaguer' : 'Portrait of Manuel Almaguer'}
                        width={288}
                        height={288}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold text-app-text mb-6">{title}</h2>
                <div className="text-app-text-muted text-lg leading-relaxed space-y-4 max-w-3xl">
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
