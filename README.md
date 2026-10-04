# spinningwheelchoice-guides

Static Astro guides served at https://spinningwheelchoice.com/guides/ by a Cloudflare Worker route.
Everything else on the domain is the Base44 app ("Spinify").

## Deploy
1. Cloudflare DNS: set the root `spinningwheelchoice.com` A record (216.24.57.1) to **Proxied**, and SSL/TLS mode to **Full (strict)**. Worker routes only run on proxied hostnames.
2. Push this repo to GitHub, then in Cloudflare: Workers & Pages → Create → Import a repository.
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. The route `spinningwheelchoice.com/guides*` is set in `wrangler.jsonc`.
4. Search Console: submit `https://spinningwheelchoice.com/guides/sitemap-index.xml`.

## Add a guide
Create `src/content/guides/<slug>.md` with the same frontmatter as the existing files (title, description, answer, kind, order, updated, faqs).
