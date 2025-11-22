import React from 'react';
import SectionContainer from './SectionContainer';

interface Testimonial {
    name: string;
    role: string;
    text: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
    lang?: string;
}

export default function Testimonials({ testimonials, lang = 'en' }: TestimonialsProps) {
    return (
        <SectionContainer id="testimonials">
            <h2 className="flex items-center text-3xl font-bold text-app-text mb-12">
                <span className="text-app-accent mr-2">07.</span>
                {lang === 'en' ? 'What People Say' : 'Qué Dice la gente'}
                <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((item, index) => (
                    <div key={index} className="relative p-8 bg-app-surface/30 rounded-xl border border-app-surface">
                        <svg className="absolute top-6 left-6 w-8 h-8 text-app-accent/20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.2936 14.928 13.62C15.535 11.9464 16.203 10.5926 16.932 9.558C17.661 8.5234 18.412 7.97 19.185 7.897C19.958 7.824 20.344 8.179 20.344 8.962C20.344 9.669 20.124 10.162 19.684 10.441C19.244 10.72 18.841 11.049 18.475 11.428C18.109 11.807 17.816 12.37 17.596 13.117C17.376 13.864 17.266 14.832 17.266 16.021L17.266 21L14.017 21ZM5.238 21L5.238 18C5.238 16.896 5.542 15.2936 6.149 13.62C6.756 11.9464 7.424 10.5926 8.153 9.558C8.882 8.5234 9.633 7.97 10.406 7.897C11.179 7.824 11.565 8.179 11.565 8.962C11.565 9.669 11.345 10.162 10.905 10.441C10.465 10.72 10.062 11.049 9.696 11.428C9.33 11.807 9.037 12.37 8.817 13.117C8.597 13.864 8.487 14.832 8.487 16.021L8.487 21L5.238 21Z" />
                        </svg>
                        <p className="text-app-text-muted italic mb-6 relative z-10 pl-4">"{item.text}"</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-app-accent/20 flex items-center justify-center text-app-accent font-bold mr-4">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-app-text font-bold text-sm">{item.name}</h4>
                                <p className="text-app-text-muted text-xs">{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
