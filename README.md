# TheKollab

Next.js 16 (App Router) + Payload CMS 3, SQLite, CSS Modules, GSAP.

## Run it

```bash
pnpm install
pnpm dev
```

Frontend is on http://localhost:3000. It looks up the `pages` doc with slug `home` and hands its layout to `RenderBlocks`.

Admin is on http://localhost:3000/admin, login `admin@admin.com` / `Admin`.

`.env` and `thekollab.db` are committed on purpose, so the home page and the admin user are already there on a fresh clone. No migration or seed step. This is a preview build only. The secret in it is throwaway and both files come out of the repo before anything goes to production.

## Adding the next block

A block lives in two places, the CMS config and the React component, joined by its `blockType`.

1. Add a config file to [src/collections/blocks/](src/collections/blocks/). Keep the defaults in a separate exported object so the Figma copy is pre-filled for editors, and build heading and button fields with [headingField](src/collections/components/Heading.ts) and [buttonField](src/collections/components/Button.ts) instead of redeclaring them.
2. Register it: add the block to `blocks` in [src/payload.config.ts](src/payload.config.ts), and its slug to `blockReferences` in [src/collections/Pages.ts](src/collections/Pages.ts#L33).
3. Add a component folder under [src/components/blocks/](src/components/blocks/), laid out like [home-services/](src/components/blocks/home-services/).
4. Add a `case` for the slug to the switch in [src/components/blocks/index.tsx](src/components/blocks/index.tsx).
5. Style it from the tokens in [src/styles/](src/styles/) (`palette.css`, `typography.css`, `container.css`, `motion.css`). No hardcoded colors, type sizes, or gutters in block CSS.

## Not reproduced from Figma

Card images. The upload field is on the services array, but nothing renders it yet. In the Figma the artwork sits at a different offset and scale on every card, so one fixed CSS rule would break most of them. The plan is to expose percentage-based offset and size fields in the CMS so each card gets positioned by the editor.
