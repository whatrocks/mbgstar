import type { APIRoute } from 'astro';

/*
 * Our own front door to the Substack mailing list. The footer form posts
 * here and we pass the address on to Substack's free-signup endpoint (the
 * same one its embed uses), so visitors never leave the site.
 *
 * With JavaScript the form calls this with fetch and gets JSON back.
 * Without it, the browser posts the form and is sent back to the page.
 */
const SUBSTACK = 'https://moneybackguarantee.substack.com';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, url, redirect }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const back = request.headers.get('referer') ?? `${url.origin}/`;

  const reply = (ok: boolean, message: string, status: number) => {
    if (wantsJson) return Response.json({ ok, message }, { status });
    const to = new URL(back);
    to.searchParams.set('subscribed', ok ? '1' : '0');
    to.hash = 'mailing-list';
    return redirect(to.toString(), 303);
  };

  let email = '';
  try {
    const form = await request.formData();
    email = String(form.get('email') ?? '').trim();
  } catch {
    return reply(false, 'Something went wrong. Try again?', 400);
  }

  if (!EMAIL.test(email) || email.length > 254) {
    return reply(false, 'That doesn’t look like an email address.', 400);
  }

  try {
    const res = await fetch(`${SUBSTACK}/api/v1/free`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        first_url: back,
        first_referrer: '',
        current_url: back,
        current_referrer: '',
        referral_code: '',
        source: 'embed'
      })
    });
    if (!res.ok) {
      console.error('Substack signup failed', res.status, await res.text().catch(() => ''));
      return reply(false, 'Something went wrong. Try again?', 502);
    }
  } catch (err) {
    console.error('Substack signup error', err);
    return reply(false, 'Something went wrong. Try again?', 502);
  }

  return reply(true, 'You’re on the list. Check your inbox to confirm.', 200);
};
