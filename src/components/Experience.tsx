import React from 'react';
import SectionContainer from './SectionContainer';

interface Job {
    role: string;
    company: string;
    period: string;
    description: string;
}

interface ExperienceProps {
    experience: Job[];
}

export default function Experience({ experience }: ExperienceProps) {
    return (
        <SectionContainer id="experience">
            <h2 className="flex items-center text-3xl font-bold text-app-text mb-12">
                <span className="text-app-accent mr-2">04.</span> Where I've Worked
                <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
            </h2>

            <div className="space-y-12 border-l-2 border-app-surface ml-3 pl-8 md:ml-6 md:pl-12">
                {experience.map((job, index) => (
                    <div key={index} className="relative">
                        <span className="absolute -left-[41px] md:-left-[59px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-app-bg border-2 border-app-accent">
                            <span className="w-2 h-2 rounded-full bg-app-accent"></span>
                        </span>

                        <h3 className="text-xl font-bold text-app-text mb-1">
                            {job.role} <span className="text-app-accent">@ {job.company}</span>
                        </h3>
                        <p className="font-mono text-sm text-app-text-muted mb-4">{job.period}</p>
                        <p className="text-app-text-muted max-w-2xl leading-relaxed">
                            {job.description}
                        </p>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
