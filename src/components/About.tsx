import React from 'react';
import SectionContainer from './SectionContainer';

interface AboutProps {
    title: string;
    content: string | string[];
    image: string;
}

export default function About({ title, content, image }: AboutProps) {
    return (
        <SectionContainer id="about" className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-app-accent to-app-accent-glow rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-app-surface">
                        <img
                            src={image}
                            alt="Profile"
                            className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
            </div>
            <div className="2xl:w-2/3 w-full">
                <h2 className="flex items-center text-3xl font-bold text-app-text mb-8">
                    <span className="text-app-accent mr-2">01.</span> {title}
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
