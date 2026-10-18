import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionContainer({ children, className = '', id }: Props) {
    return (
        <section id={id} className={`py-16 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    );
}
