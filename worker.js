// Front door for spinningwheelchoice.com
// /guides/* -> static Astro guides (this Worker's assets)
// everything else -> the Base44 app, fetched from its base44.app address
const APEX = 'spinningwheelchoice.com';
const ORIGIN = 'spinify-decision-dash.base44.app';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www -> apex, so Google only sees one version of the site
    if (url.hostname === 'www.' + APEX) {
      return Response.redirect(`https://${APEX}${url.pathname}${url.search}`, 301);
    }
    // Google Search Console verification
    if (url.pathname === '/google83303e63b8dc7ca9.html') {
      return new Response('google-site-verification: google83303e63b8dc7ca9.html', {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }
    // Guides: serve from the Worker's static files
    if (url.pathname === '/guides' || url.pathname.startsWith('/guides/')) {
      return env.ASSETS.fetch(request);
    }

    // Everything else: pass through to Base44
    const upstream = new URL(url.pathname + url.search, `https://${ORIGIN}`);
    const res = await fetch(new Request(upstream, request), { redirect: 'manual' });

    const headers = new Headers(res.headers);
    // base44.app sends noindex; drop it so the real domain can be indexed
    headers.delete('x-robots-tag');
    const loc = headers.get('location');
    if (loc) headers.set('location', loc.split(ORIGIN).join(APEX));

    // Rewrite any base44.app URLs in pages, robots.txt, sitemaps, ads.txt, llms.txt
    const type = headers.get('content-type') || '';
    if (/text\/(html|plain|xml)|application\/xml/.test(type)) {
      const body = (await res.text()).split(ORIGIN).join(APEX);
      headers.delete('content-length');
      return new Response(body, { status: res.status, statusText: res.statusText, headers });
    }

    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
