import { OpenChatButton } from "@/components/open-chat-button";

const CONTACT_EMAIL = "heisenweb33@protonmail.com";

const NAV = [
  { href: "#travail", label: "Réalisations" },
  { href: "#competences", label: "Compétences" },
  { href: "#methode", label: "Méthode" },
  { href: "#contact", label: "Contact" },
];

const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Drizzle ORM",
  "Tailwind CSS",
  "Vercel",
  "PWA",
  "WebAuthn",
  "Stripe / Crypto",
  "Leaflet",
  "Push notifications",
  "API REST",
];

const PROJECTS = [
  {
    tag: "E-commerce & ops",
    title: "Plateforme boutique + panel admin",
    desc: "Catalogue temps réel, panier, commandes, messagerie client, fidélité, notifications push, carte de tournée et flux de vérification d'identité.",
    stack: ["Next.js", "PostgreSQL", "WebAuthn", "PWA"],
    accent: "#8ec5ff",
  },
  {
    tag: "Marketplace locale",
    title: "ApéroMaison — livraison & admin",
    desc: "Vitrine produit, commande en ligne, suivi, messagerie, et tournée de livraison avec carte interactive et optimisation d'itinéraire.",
    stack: ["Next.js", "Leaflet", "OSRM"],
    accent: "#d4a574",
  },
  {
    tag: "Full-stack produit",
    title: "Applications métier sur mesure",
    desc: "Du brief à la mise en production : auth, back-office, intégrations paiement, stock, rôles staff, et interfaces pensées pour le terrain.",
    stack: ["TypeScript", "API", "Vercel"],
    accent: "#a5b4fc",
  },
];

const SKILLS = [
  {
    title: "Front-end",
    items: ["Interfaces React / Next.js", "Design system & responsive", "Animations & micro-interactions", "Accessibilité & perf"],
  },
  {
    title: "Back-end",
    items: ["API & logique métier", "PostgreSQL / ORM", "Auth & sessions sécurisées", "Fichiers, push, cron"],
  },
  {
    title: "Produit",
    items: ["Architecture simple & scalable", "Admin opérationnel", "Paiements & messagerie", "Mise en prod Vercel"],
  },
  {
    title: "Livraison",
    items: ["Délais tenus", "Code maintenable", "Docs & handoff", "Support post-lancement"],
  },
];

const STEPS = [
  { n: "01", title: "Brief", text: "Objectifs, utilisateurs, contraintes. On clarifie avant d'écrire une ligne de code." },
  { n: "02", title: "Conception", text: "Parcours, écrans clés, stack adaptée. Une base saine pour aller vite ensuite." },
  { n: "03", title: "Build", text: "Itérations courtes, features visibles, tests sur le vrai usage — pas seulement sur la maquette." },
  { n: "04", title: "Mise en ligne", text: "Déploiement, monitoring basique, corrections rapides. Vous repartez avec un outil qui tourne." },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="mesh" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="relative z-10 min-h-screen text-[#eef2ff]">
        {/* Nav — CTA Discutons + Install gérés par SiteInteractive (overlay droite) */}
        <header className="site-nav fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#05070d]/85 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8ec5ff] to-[#5ba8f5] text-[11px] font-black tracking-tighter text-[#0a0f18] shadow-[0_0_24px_rgba(142,197,255,0.35)]">
                HW
              </span>
              <span className="font-display text-[15px] font-semibold tracking-tight">HeisenWeb</span>
            </a>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-medium text-slate-400 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Espace réservé aux boutons flottants (Installer + Discutons) */}
            <div className="w-[9.5rem] sm:w-[13.5rem]" aria-hidden="true" />
          </div>
        </header>

        <main id="top">
          {/* Hero */}
          <section className="relative px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8ec5ff]" />
                Développeur full-stack · France
              </div>

              <h1 className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
                Des produits web
                <br />
                <span className="bg-gradient-to-r from-[#8ec5ff] via-[#b8dcff] to-[#d4a574] bg-clip-text text-transparent">
                  solides & élégants.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                Je conçois et développe des applications sur mesure — boutiques, back-offices,
                messagerie, paiements, PWA — pour des équipes qui veulent un outil pro, pas un
                bricolage.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#travail"
                  className="btn-glow rounded-full bg-[#8ec5ff] px-6 py-3.5 text-sm font-bold text-[#0a0f18] transition-transform hover:scale-[1.02]"
                >
                  Voir les réalisations
                </a>
                <OpenChatButton className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]">
                  Me contacter
                </OpenChatButton>
              </div>

              <div className="mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/[0.06] pt-8 sm:gap-8">
                {[
                  { k: "Full-stack", v: "Front → prod" },
                  { k: "Sur mesure", v: "Pas de template" },
                  { k: "Propre", v: "Code maintenable" },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="font-display text-sm font-semibold text-white sm:text-base">{s.k}</p>
                    <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Marquee tech */}
          <section className="border-y border-white/[0.06] bg-white/[0.015] py-4" aria-label="Stack">
            <div className="overflow-hidden">
              <div className="marquee-track flex gap-10 px-4">
                {[...TECH, ...TECH].map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-slate-500"
                  >
                    <span className="mr-10 text-[#8ec5ff]/45">✦</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section className="px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ec5ff]">
                  À propos
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Un interlocuteur unique.
                  <br />
                  <span className="text-slate-500">Du pixel à la base de données.</span>
                </h2>
              </div>
              <div className="space-y-5 text-[15px] leading-relaxed text-slate-400 sm:text-base">
                <p>
                  Je suis développeur full-stack. J&apos;interviens quand un projet a besoin
                  d&apos;être conçu, construit et mis en ligne sans multiplier les prestataires —
                  design d&apos;interface, logique métier, admin, déploiement.
                </p>
                <p>
                  Mon terrain : des produits qui doivent vraiment tourner au quotidien (commandes,
                  clients, staff, paiements). Pas de slides creux : du code, des écrans, et un outil
                  que vous pouvez montrer à vos utilisateurs.
                </p>
                <p className="text-slate-300">
                  Vous démarchez un client, un associé, un investisseur&nbsp;? Cette page est faite
                  pour ça — claire, sérieuse, à la hauteur de ce que je livre.
                </p>
              </div>
            </div>
          </section>

          {/* Work */}
          <section id="travail" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ec5ff]">
                    Réalisations
                  </p>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ce que je construis
                  </h2>
                </div>
                <p className="max-w-sm text-sm text-slate-500">
                  Sélection de typologies de projets livrés — e-commerce opérationnel, admin, et
                  expériences sur mesure.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-5">
                {PROJECTS.map((p, i) => (
                  <article
                    key={p.title}
                    className="card-shine group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0f18] p-6 transition-colors hover:border-white/15 sm:p-8 md:p-10"
                  >
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                      style={{ background: p.accent }}
                      aria-hidden="true"
                    />
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="font-mono text-[11px] text-slate-600">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              background: `${p.accent}18`,
                              color: p.accent,
                              border: `1px solid ${p.accent}33`,
                            }}
                          >
                            {p.tag}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                          {p.desc}
                        </p>
                      </div>
                      <ul className="flex flex-wrap gap-2 md:max-w-[200px] md:justify-end">
                        {p.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-slate-400"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            id="competences"
            className="scroll-mt-24 border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28"
          >
            <div className="mx-auto max-w-6xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ec5ff]">
                Compétences
              </p>
              <h2 className="font-display mb-12 max-w-lg text-3xl font-bold tracking-tight text-white sm:mb-16 sm:text-4xl">
                Une stack moderne.
                <span className="text-slate-500"> Des livrables concrets.</span>
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SKILLS.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-6"
                  >
                    <h3 className="font-display mb-4 text-lg font-bold text-white">{block.title}</h3>
                    <ul className="space-y-2.5">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8ec5ff]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Method */}
          <section id="methode" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ec5ff]">
                Méthode
              </p>
              <h2 className="font-display mb-12 text-3xl font-bold tracking-tight text-white sm:mb-16 sm:text-4xl">
                Simple. Cadré. Efficace.
              </h2>

              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((step) => (
                  <div
                    key={step.n}
                    className="bg-[#05070d] p-6 transition-colors hover:bg-[#0b0f18] sm:p-8"
                  >
                    <span className="font-mono text-xs text-[#8ec5ff]">{step.n}</span>
                    <h3 className="font-display mt-3 text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section id="contact" className="scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32">
            <div className="mx-auto max-w-6xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0f18] px-6 py-14 sm:px-12 sm:py-20">
                <div
                  className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#8ec5ff]/15 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#d4a574]/12 blur-3xl"
                  aria-hidden="true"
                />

                <div className="relative mx-auto max-w-2xl text-center">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8ec5ff]">
                    Contact
                  </p>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Un projet en tête&nbsp;?
                  </h2>
                  <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
                    Ouvrez le chat pour décrire votre besoin, activez les notifications, ou
                    écrivez-moi directement.
                  </p>

                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <OpenChatButton className="btn-glow inline-flex w-full items-center justify-center rounded-full bg-[#8ec5ff] px-8 py-4 text-sm font-bold text-[#0a0f18] sm:w-auto">
                      Ouvrir le chat
                    </OpenChatButton>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/30 sm:w-auto"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8ec5ff] to-[#5ba8f5] text-[10px] font-black text-[#0a0f18]">
                HW
              </span>
              <span className="font-display text-sm font-semibold">HeisenWeb</span>
              <span className="text-xs text-slate-600">© {year}</span>
            </div>
            <p className="text-center text-xs text-slate-600 sm:text-right">
              Conception & développement web full-stack
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
