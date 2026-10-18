import { ExternalLink, Github } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    image: string;
    featured?: boolean;
}

interface ProjectsProps {
    projects: Project[];
    lang: string;
}

function ProjectCard({ project, lang }: { project: Project; lang: string }) {
    const linkLabel = project.link === project.github
        ? (lang === 'es' ? 'Ver repositorio' : 'View repository')
        : (lang === 'es' ? 'Visitar proyecto' : 'Visit project');

    return (
        <article className="group bg-app-surface rounded-xl overflow-hidden border border-app-surface-hover flex flex-col">
            <div className="h-40 bg-white p-6">
                <img src={project.image || '/NoPreview.png'} alt="" width={400} height={160} loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-app-text-muted mb-5 text-sm leading-relaxed">{project.description}</p>
                <ul className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <li key={tag} className="text-xs text-app-accent bg-app-accent/10 px-2 py-1 rounded">{tag}</li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-auto text-sm font-medium text-app-accent">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline" aria-label={`${linkLabel}: ${project.title}`}>
                        {linkLabel}<ExternalLink size={16} aria-hidden="true" />
                    </a>
                    {project.github && project.github !== project.link && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline" aria-label={`${lang === 'es' ? 'Repositorio de' : 'Repository for'} ${project.title}`}>
                            <Github size={16} aria-hidden="true" />{lang === 'es' ? 'Repositorio' : 'Repository'}
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function Projects({ projects, lang }: ProjectsProps) {
    const featured = projects.filter((project) => project.featured);
    const more = projects.filter((project) => !project.featured);

    return (
        <SectionContainer id="projects">
            <h2 className="text-3xl font-bold mb-4">{lang === 'es' ? 'Proyectos destacados' : 'Selected projects'}</h2>
            <p className="text-app-text-muted mb-8 max-w-2xl">
                {lang === 'es' ? 'Una selección de productos que he desarrollado o en los que he colaborado.' : 'A selection of products I’ve built or contributed to.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featured.map((project) => <ProjectCard key={project.title} project={project} lang={lang} />)}
            </div>
            {more.length > 0 && (
                <details className="group mt-8">
                    <summary className="w-fit rounded border border-app-accent/30 px-5 py-3 text-app-accent hover:bg-app-accent/10">
                        <span className="group-open:hidden">{lang === 'es' ? 'Ver más proyectos' : 'More projects'} ({more.length})</span>
                        <span className="hidden group-open:inline">{lang === 'es' ? 'Ver menos proyectos' : 'Fewer projects'}</span>
                    </summary>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {more.map((project) => <ProjectCard key={project.title} project={project} lang={lang} />)}
                    </div>
                </details>
            )}
        </SectionContainer>
    );
}
