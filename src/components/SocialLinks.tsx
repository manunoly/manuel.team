export interface SocialProfiles {
    github: string;
    linkedin: string;
    twitter: string;
    scholar: string;
}

interface SocialLinksProps {
    profiles: SocialProfiles;
    lang?: string;
    className?: string;
}

export default function SocialLinks({ profiles, lang = 'en', className = '' }: SocialLinksProps) {
    const links = [
        { label: 'GitHub', href: profiles.github },
        { label: 'LinkedIn', href: profiles.linkedin },
        { label: 'X / Twitter', href: profiles.twitter },
        { label: 'Google Scholar', href: profiles.scholar },
    ];

    return (
        <nav aria-label={lang === 'es' ? 'Perfiles profesionales' : 'Professional profiles'} className={`flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-app-text-muted ${className}`}>
            {links.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="me noopener noreferrer" className="inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:text-app-accent hover:underline">
                    {label}
                </a>
            ))}
        </nav>
    );
}
