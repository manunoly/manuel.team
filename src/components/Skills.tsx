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
            <h2 className="flex items-center text-3xl font-bold text-app-text mb-12">
                <span className="text-app-accent mr-2">02.</span>
                {lang === 'en' ? 'Skills & Technologies' : 'Habilidades & Tecnologías'}
                <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="bg-app-surface/50 p-6 rounded-lg hover:bg-app-surface transition-colors duration-300">
                        <h3 className="text-xl font-bold text-app-text mb-4 text-app-accent">{category}</h3>
                        <ul className="space-y-2">
                            {items.map((skill) => (
                                <li key={skill} className="flex items-center text-app-text-muted">
                                    <span className="text-app-accent mr-2">▹</span>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
