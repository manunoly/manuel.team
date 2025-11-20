import React from 'react';
import SectionContainer from './SectionContainer';

interface Post {
    title: string;
    excerpt: string;
    date: string;
    link: string;
}

interface BlogPreviewProps {
    posts: Post[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
    return (
        <SectionContainer id="blog">
            <h2 className="flex items-center text-3xl font-bold text-app-text mb-12">
                <span className="text-app-accent mr-2">06.</span> Latest Articles
                <span className="ml-4 h-px bg-app-surface flex-grow max-w-xs"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, index) => (
                    <a
                        key={index}
                        href={post.link}
                        className="group block p-8 bg-app-surface rounded-xl hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-app-accent">{post.date}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-text-muted group-hover:text-app-accent transition-colors"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </div>
                        <h3 className="text-xl font-bold text-app-text mb-3 group-hover:text-app-accent transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-app-text-muted text-sm leading-relaxed">
                            {post.excerpt}
                        </p>
                    </a>
                ))}
            </div>
        </SectionContainer>
    );
}
