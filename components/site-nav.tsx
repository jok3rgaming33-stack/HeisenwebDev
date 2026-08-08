"use client";

import type { ReactNode, MouseEvent } from "react";

const NAV = [
  { href: "#travail", label: "Réalisations" },
  { href: "#competences", label: "Compétences" },
  { href: "#methode", label: "Méthode" },
  { href: "#contact", label: "Contact" },
] as const;

function scrollToId(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export function HashLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToId(href);
      }}
    >
      {children}
    </a>
  );
}

export function SiteNav() {
  return (
    <>
      <nav
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        aria-label="Navigation principale"
      >
        {NAV.map((item) => (
          <HashLink
            key={item.href}
            href={item.href}
            className="text-[13px] font-medium text-slate-400 transition-colors hover:text-white"
          >
            {item.label}
          </HashLink>
        ))}
      </nav>

      <nav
        className="flex max-w-[min(48vw,12rem)] flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 md:hidden"
        aria-label="Navigation principale"
      >
        {NAV.map((item) => (
          <HashLink
            key={item.href}
            href={item.href}
            className="text-[10px] font-medium text-slate-400 transition-colors hover:text-white"
          >
            {item.label}
          </HashLink>
        ))}
      </nav>
    </>
  );
}

export function LogoLink({ children }: { children: ReactNode }) {
  return (
    <HashLink href="#top" className="flex shrink-0 items-center gap-2.5">
      {children}
    </HashLink>
  );
}
