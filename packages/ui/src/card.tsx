import Link from "next/link";

export function Card({
  className,
  title,
  children,
  href,
  external,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  external?: boolean;
}): JSX.Element {
  return (
    <Link
      className={className}
      href={`${href}`}
      target={external ? "_blank" : undefined}
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </Link>
  );
}
