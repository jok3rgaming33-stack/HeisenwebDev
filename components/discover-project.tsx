"use client";

import { useEffect, useState } from "react";

export type ProjectDemo = {
  siteUrl: string;
  adminUrl: string;
  adminUser: string;
  adminPassword: string;
};

type Props = {
  projectTitle: string;
  accent: string;
  demo: ProjectDemo;
};

export function DiscoverProject({ projectTitle, accent, demo }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"user" | "pass" | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const copy = async (value: string, kind: "user" | "pass") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div className="relative mt-3 flex justify-center border-t border-white/[0.06] pt-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a0f18] transition-transform hover:scale-[1.02]"
          style={{
            background: accent,
            boxShadow: `0 0 24px ${accent}40`,
          }}
        >
          Découvrir le projet
        </button>
      </div>

      {open && (
        <div
          className="chat-backdrop fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Découvrir ${projectTitle}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="chat-panel w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f18] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/[0.07] px-5 py-4">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  Démo live
                </p>
                <h3 className="font-display mt-1 text-lg font-bold text-white">
                  {projectTitle}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Accès public + panneau d&apos;administration de démonstration.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 px-5 py-4">
              <a
                href={demo.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.07]"
              >
                Accéder au site
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={demo.adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#0a0f18] transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                Accès panel admin
                <span aria-hidden="true">↗</span>
              </a>

              <div
                className="rounded-xl border px-3.5 py-3"
                style={{
                  borderColor: `${accent}33`,
                  background: `${accent}0d`,
                }}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Identifiants admin (démo)
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500">Utilisateur</span>
                    <button
                      type="button"
                      onClick={() => void copy(demo.adminUser, "user")}
                      className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-semibold text-white hover:border-white/20"
                      title="Copier"
                    >
                      {demo.adminUser}
                      {copied === "user" ? " ✓" : ""}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500">Mot de passe</span>
                    <button
                      type="button"
                      onClick={() => void copy(demo.adminPassword, "pass")}
                      className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-semibold text-white hover:border-white/20"
                      title="Copier"
                    >
                      {demo.adminPassword}
                      {copied === "pass" ? " ✓" : ""}
                    </button>
                  </div>
                </div>
                <p className="mt-2.5 text-[10px] leading-relaxed text-slate-500">
                  Clique sur un identifiant pour le copier, puis colle-le sur la page admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
