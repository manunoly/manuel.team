import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Publication {
    title: string;
    authors: string;
    publication: string;
    year: string;
    link: string;
    code?: string;
}

interface ResearchProps {
    data: {
        title: string;
        description: string;
        profileLink: string;
        publications: Publication[];
    };
}

export default function Research({ data }: ResearchProps) {
    const [showAll, setShowAll] = useState(false);

    if (!data) return null;

    return (
        <section id="research" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-app-accent/10 text-app-accent mb-6">
                        <GraduationCap size={20} />
                        <span className="text-sm font-medium">Academic Background</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-app-text mb-6">
                        {data.title}
                    </h2>
                    <p className="text-lg text-app-text-muted mb-8">
                        {data.description}
                    </p>
                    <a
                        href={data.profileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-app-surface border border-app-accent/20 text-app-text hover:border-app-accent/50 transition-all group"
                    >
                        <span>Google Scholar Profile</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

                <div className="grid gap-6 mb-10">
                    {data.publications.slice(0, showAll ? undefined : 5).map((pub, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-6 rounded-2xl bg-app-surface border border-white/5 hover:border-app-accent/30 transition-all hover:bg-app-surface-hover flex flex-col md:flex-row gap-4 md:items-center justify-between"
                        >
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-app-text group-hover:text-app-accent transition-colors mb-2">
                                    {pub.title}
                                </h3>
                                <p className="text-sm text-app-text-muted mb-1">
                                    {pub.authors}
                                </p>
                                <div className="flex items-center gap-3 text-xs font-medium text-app-text-muted/80">
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={14} />
                                        {pub.publication}
                                    </span>
                                    {pub.year && (
                                        <>
                                            <span>•</span>
                                            <span>{pub.year}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-app-accent hover:underline"
                                >
                                    <span className="text-sm font-semibold">View Paper</span>
                                    <ExternalLink size={16} />
                                </a>
                                {pub.code && (
                                    <a
                                        href={pub.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-app-accent hover:underline"
                                    >
                                        <span className="text-sm font-semibold">View Code</span>
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {data.publications.length > 5 && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-app-surface border border-white/10 text-app-text hover:bg-app-surface-hover transition-all"
                        >
                            <span className="font-medium">{showAll ? 'Show Less' : 'Show All Publications'}</span>
                            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
