# thewideangle.club

A multi-topic content + photography publication, built as a static Jamstack site
(Astro + Markdown content collections), covering six verticals — Technology,
Travel, Sports, Credit Cards, Geo Politics, and Experiences — as specified in
`../../Documentation/` (with founder-directed changes on top: see below).

The homepage shell is strict black & white (Cred-style bold type, toggleable
light/dark theme). Each vertical hub and post page adopts its own accent
colour, hero style, and signature content block per `src/config/verticals.ts`
— the single source of truth for per-vertical identity referenced throughout
the LLD.

## Running locally

This machine's system Node (v18.13) is too old for Astro's CLI (needs
18.17+/20+/22+) and could not be upgraded via the Windows installer (no admin
rights in this environment), so a **portable Node 22** was placed at
`../node22/` instead of the system PATH. Every command below assumes it's on
your `PATH` for the session:

```sh
# Bash (Git Bash / WSL)
export PATH="$(pwd)/../node22:$PATH"

# PowerShell
$env:PATH = "$(Resolve-Path ..\node22);$env:PATH"
```

If you install a proper Node 22 LTS on this machine later (with admin rights,
or via nvm-windows), you can delete `../node22/` and use that instead —
nothing here is hard-coded to the portable copy.

Then, from this folder:

```sh
npm install       # first time only
npm run dev       # http://localhost:4321
npm run build     # production build to ./dist
npm run preview   # serve the production build locally
```

## Content

Posts live in `src/content/<vertical>/*.md`, validated at build time against
`src/content.config.ts` (an invalid post fails the build rather than shipping
broken frontmatter). Credit Cards posts with `subcategory: Basics` are pinned
ahead of the rest on that hub (see `src/pages/[vertical]/index.astro`) — the
two debit/credit-card primers use this so newcomers land on the fundamentals
before the card-by-card comparisons.

Replace the placeholder Unsplash hero images with original photography
before launch (per BRD — original imagery is a brand requirement, not just a
nice-to-have).

A Decap CMS editor skeleton is at `public/admin/` (`index.html` +
`config.yml`) for later, form-based publishing — it needs a small GitHub
OAuth Cloudflare Worker before it can actually log in (see
`Documentation/06_Beginner_Setup_Guide.docx` Part C6 and
`Documentation/07_Secrets_and_Key_Storage.docx` §9). Until that Worker
exists, publish by editing Markdown files directly and `git push`.

## Get in Touch (replaces the newsletter)

Per founder decision, there's no newsletter capture on this site — instead,
`src/components/GetInTouch.astro` shows direct WhatsApp / Instagram / Email
links (`src/config/contact.ts`) everywhere the newsletter used to be
(homepage, end of every post, hub pages), plus a full categorized message
form on `/contact/`. The form sends via **EmailJS** — see `.env.example` for
the three `PUBLIC_EMAILJS_*` ids it needs, and the email template text below
to paste into your EmailJS template editor.

### EmailJS setup (5 minutes)

1. Create a free account at emailjs.com.
2. Add an **Email Service** (Gmail is simplest — connect `helpdevwork@gmail.com`).
3. Add an **Email Template** using the template below, and set its "To email" to `helpdevwork@gmail.com`.
4. Copy the **Service ID**, **Template ID**, and your account's **Public Key** (Account → General) into Cloudflare Pages env vars (or your local `.env`) as `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY`.
5. Redeploy — the form on `/contact/` will start sending for real. Until these are set, the form renders but shows a "not connected yet" note instead of submitting.

**Email template (paste into EmailJS's template body):**

```
Subject: New message from thewideangle.club — {{category}}

You've got a new message from the Get in Touch form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Category: {{category}}

Message:
{{message}}

---
Sent from the thewideangle.club contact form.
```

The form posts these exact field names (`from_name`, `from_email`, `phone`,
`category`, `message`), so the `{{...}}` variables above will match
automatically — EmailJS reads them straight off the HTML form via
`emailjs.sendForm()`.

## Environment variables

See `.env.example`. Every variable listed there is a **public ID**, safe to
commit as a placeholder and safe to expose in the browser (GA4 ID, Umami ID,
AdSense publisher ID, Cuelinks script, EmailJS ids) — real secrets never live
in this repo at all; they go directly into Cloudflare Pages → Settings →
Environment variables, per `Documentation/07_Secrets_and_Key_Storage.docx`.

Until those PUBLIC_ vars are set, the corresponding scripts (GA4, Umami,
AdSense, Cuelinks, EmailJS) simply don't render/send — the site works fully
without them. Per the BRD/Strategy sequencing, don't set
`PUBLIC_ADSENSE_CLIENT` until the domain has aged (~6 months) and 15–25
quality posts are live.

## Deploying

Push this folder to a GitHub repo, then in Cloudflare Pages: **Create
project → Connect to Git → select the repo → framework preset: Astro →
Deploy.** Add the custom domain under the Pages project's *Custom domains*
tab once `thewideangle.club` is registered. Full walkthrough in
`Documentation/04_Technical_Website_Creation_Guide.docx` §2, Steps 7–8.

## Deviations from the original Documentation set

The founder requested these changes after reviewing the first build; they
intentionally diverge from the original BRD/LLD's eight-vertical, newsletter-led
plan:

- Removed the **Tech Gadgets**, **Photography**, and **AI Around the World**
  verticals entirely (content, schema, layouts, nav).
- Added a **Geo Politics** vertical (region-tagged explainers, same
  editorial-with-sources format as Technology).
- Credit Cards now leads with two educational "Basics" posts (debit card,
  then how credit cards work) before the card-by-card comparisons, per a
  decision to address the low baseline of credit-card literacy in India
  first — card-specific fields (`cardName`, `issuer`, etc.) are now optional
  in the schema so a post can be pure education with no product attached.
- Newsletter capture is gone; replaced everywhere by **Get in Touch**
  (WhatsApp/Instagram/Email + a categorized EmailJS-backed form).

## What's implemented vs. what's next

Done: 6 verticals with distinct hero/signature-block/monetization-module
identity, B&W homepage with a working light/dark switcher and a featured
"spotlight" post, legal/trust pages (About, Contact/Get in Touch, Privacy,
Terms, Disclosure), sitemap + RSS + robots.txt, per-post Article JSON-LD,
security headers (`public/_headers`), a mobile-responsive pass across
header/hero/forms/grids, and inert (pre-approval) ad/analytics/affiliate
placeholders.

Not yet wired (deliberately, per the docs' sequencing): live AdSense, live
Cuelinks/affiliate account IDs, EmailJS (needs the 5-minute setup above), and
the Decap OAuth Worker — all are drop-in once the corresponding account
exists.
