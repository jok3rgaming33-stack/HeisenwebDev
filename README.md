# HeisenWeb — Page vitrine

Page vitrine professionnelle pour présentation client : compétences, réalisations, méthode, contact.

## Lancer en local

```bash
cd heisenweb-portfolio
pnpm install
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Personnaliser

Dans `app/page.tsx` :

- **Email** : `mailto:contact@heisenweb.fr`
- **Lien références** : `https://tatokdym.org/heisenwebdigit`
- **Projets** : tableau `PROJECTS`
- **Compétences** : tableau `SKILLS`
- **Stack défilante** : tableau `TECH`

Couleurs & ambiance : `app/globals.css` (`--accent`, mesh, etc.).

## Déployer

```bash
vercel
```

ou brancher le dossier sur un nouveau projet Vercel.
