import React from 'react';
import SectionContainer from './SectionContainer';
import { motion } from 'framer-motion';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    image: string;
}

interface ProjectsProps {
    projects: Project[];
    lang: string;
}

export default function Projects({ projects, lang = 'en' }: ProjectsProps) {
    return (
        <SectionContainer id="projects">
            <h2 className="flex items-center text-3xl font-bold text-app-text mb-12">
                <span className="text-app-accent mr-2">03.</span>
                {
                    lang === 'en' ? (
                        <span>Some Projects I've Built or Collaborated On</span>
                    ) : (
                        <span>Algunos Proyectos que desarrollado o Colaborado</span>
                    )
                }
                <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="group bg-app-surface rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-app-accent/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-app-text group-hover:text-app-accent transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex space-x-4 text-app-text-muted">
                                    <a href={project.github} target='_blank' className="hover:text-app-accent transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    </a>
                                    <a href={project.link} target='_blank' className="hover:text-app-accent transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                </div>
                            </div>

                            <p className="text-app-text-muted mb-6 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <ul className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <li key={tag} className="text-xs font-mono text-app-accent bg-app-accent/10 px-2 py-1 rounded">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
}
