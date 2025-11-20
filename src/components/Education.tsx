import React from 'react';
import SectionContainer from './SectionContainer';

interface Degree {
    degree: string;
    school: string;
    year: string;
}

interface EducationProps {
    education: Degree[];
}

export default function Education({ education }: EducationProps) {
    return (
        <SectionContainer id="education">
            <h2 className="flex items-center text-3xl font-bold text-app-text mb-12">
                <span className="text-app-accent mr-2">05.</span> Education
                <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
            </h2>

            <div className="grid gap-6">
                {education.map((edu, index) => (
                    <div key={index} className="bg-app-surface/30 p-6 rounded-lg border border-app-surface hover:border-app-accent/30 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                            <h3 className="text-xl font-bold text-app-text">{edu.school}</h3>
                            <span className="font-mono text-sm text-app-accent">{edu.year}</span>
                        </div>
                        <p className="text-app-text-muted">{edu.degree}</p>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
