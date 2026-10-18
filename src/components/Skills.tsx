import React from 'react';
import SectionContainer from './SectionContainer';

interface SkillsProps {
    skills: {
        [category: string]: string[];
    };
    lang?: string;
}

export default function Skills({ skills, lang = 'en' }: SkillsProps) {
    return (
        <SectionContainer id="skills">
            <h2 className="text-3xl font-bold text-app-text mb-8">
                {lang === 'en' ? 'Skills & technologies' : 'Habilidades y tecnologías'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="border-t border-app-surface-hover pt-5">
                        <h3 className="text-xl font-semibold text-app-text mb-4">{category}</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm leading-6 text-app-text-muted marker:text-app-accent">
                            {items.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
