export default {
  async fetch(request, env) {
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set('x-swc-guides', 'worker');
    return out;
  },
};
