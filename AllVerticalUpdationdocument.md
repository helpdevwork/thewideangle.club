# Daily Blog Update Guide

A cheat sheet for adding a new post to any vertical without having to re-figure-out the
mechanics each time. Read this top to bottom once, then use it as a lookup.

---

## 1. The six verticals and where their posts live

| Vertical | Folder | Extra fields beyond the shared base |
|---|---|---|
| Technology | `src/content/technology/` | `topicCluster`, `sourceLinks`, `relatedTools` |
| Travel | `src/content/travel/` | `destination`, `bestSeason`, `budgetBand`, `gallery`, `mapEmbed` |
| Sports | `src/content/sports/` | `sport`, `event`, `matchDate`, `teams`, `liveUpdate` |
| Credit Cards | `src/content/credit-cards/` | `cardName`, `issuer`, `annualFee`, `rewardRate`, `bestFor`, `applyLink`, `disclosureLevel` |
| Geo Politics | `src/content/geo-politics/` | `region`, `topicCluster`, `sourceLinks`, `relatedTopics` |
| Experiences | `src/content/experiences/` | `experienceType`, `location`, `sponsored`, `partner` |

Every vertical also shares these base fields (defined once in `src/content.config.ts`):
`title`, `description`, `subcategory` (optional), `tags`, `heroImage`, `heroAlt`, `publishDate`,
`author` (defaults to "Suraj Ghorpade"), `published` (defaults to `false`), and optional
`updatedDate` / `monetization`.

`src/content.config.ts` is the source of truth for what fields are required per vertical — if a
post doesn't build, check that file first.

---

## 2. The filename IS the URL

Each post is one Markdown file, and the **filename becomes the URL slug**:

```
src/content/technology/ai-driven-market-wobble.md
→ /technology/ai-driven-market-wobble
```

- Use lowercase, hyphen-separated filenames — this is what readers and search engines see in
  the URL, so make it match the title.
- Renaming the file changes the live URL immediately (old URL just stops resolving — there's no
  redirect unless you add one). Only rename before a post is public, or be deliberate about it.
- Don't create two files that end up describing the same post — duplicate content under two
  slugs is the single most common source of "why isn't my edit showing up" confusion.

---

## 3. Minimum steps to publish a new post

1. Copy an existing post in the same vertical folder as a starting template (fastest way to get
   the frontmatter shape right).
2. Save it as a new file with your chosen slug filename.
3. Fill in the frontmatter (see table above for vertical-specific fields).
4. Write the body in Markdown below the closing `---`.
5. Set `heroImage` (see §4 — this is the step that trips people up most).
6. Leave `published: false` while drafting. Flip to `true` only when it's ready to go live.
7. Save. The dev server picks it up automatically (see §5).

---

## 4. Hero images — the part that keeps going wrong

`heroImage` is stored as a **plain string path**, used directly as `<img src={heroImage}>` and
also fed into `new URL(heroImage, Astro.site)` for SEO/social meta tags
(`src/layouts/PostLayout.astro`). That means it must resolve as a real, publicly-servable URL.

**Two folders that look similar but behave completely differently:**

| Folder | Served over HTTP as-is? | Use it for hero images? |
|---|---|---|
| `public/images/` | ✅ Yes — `public/images/foo.avif` → `/images/foo.avif` | ✅ Yes, this is the correct place |
| `src/assets/images/` | ❌ No — Astro's asset pipeline only serves these if they're `import`-ed into a component | ❌ Not for `heroImage` frontmatter |

**The workflow that actually works:**

1. Drop your image file into `public/images/`.
2. Set `heroImage: "/images/your-file-name.avif"` (leading slash, matches the filename exactly —
   case-sensitive).
3. Set `heroAlt` to an actual description of what's in the image (used for accessibility and
   shown if the image fails to load — don't leave it as a placeholder like `"AI Image"`).

**If you drop a new image into `src/assets/images/` first** (e.g. because that's where it landed
after exporting/downloading), remember it will **not** show up on the site until you also copy it
into `public/images/`. This exact mix-up is what caused the "image is still outdated" issue —
the new file existed on disk but not in the folder the site actually serves.

**Sanity check before moving on:** open `http://localhost:4321/images/your-file-name.avif`
directly in a browser tab. If it loads the image, the path is correct. If it 404s, it's not in
`public/images/` yet, or the filename/case doesn't match.

---

## 5. Hot reload vs. hard reload vs. restart

The dev server should already be running in the background (per this project's convention):

```
astro dev --background
astro dev status     # confirm it's running + see the port/PID
astro dev logs        # tail its output if something looks wrong
astro dev stop         # stop it
```

What triggers what:

| You changed... | What happens automatically |
|---|---|
| Post body text / frontmatter values in an existing file | Hot reload — browser updates on its own, usually within a second |
| A file in `public/images/` (adding or replacing an image) | Served fresh on next request — just refresh the browser tab (Ctrl+R / Cmd+R) |
| Renaming or deleting a content file | Astro *usually* picks this up, but the content-collection route cache can lag. If the old URL still loads or the new one 404s, restart: `astro dev stop` then `astro dev --background` |
| `src/content.config.ts` (schema changes) | Restart the dev server |
| `astro.config.mjs`, adding an npm package | Restart the dev server |

**If a browser refresh doesn't show your change:** that's almost always a caching issue, not a
build issue. Try, in order:
1. Normal refresh (Ctrl+R).
2. Hard refresh, bypassing the browser cache (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac).
3. Confirm you're editing the file that's actually live — check the URL in the address bar
   matches the filename you edited (see §2). It's easy to edit one file while the browser is
   still looking at a differently-named duplicate.
4. Restart the dev server (see table above).

---

## 6. Going live vs. staying draft

`published: false` is the default for a reason — it's the "write it tonight, flip it in the
morning" switch. A post with `published: false` exists in the repo and is fully previewable in
your local dev server, but won't render on the public site's listing/hub pages.

Checklist before flipping to `published: true`:
- [ ] `heroImage` resolves (checked per §4)
- [ ] `heroAlt` describes the actual image
- [ ] `publishDate` is correct (this drives sort order and the date shown on the post)
- [ ] Vertical-specific required fields are filled in (§1 table — missing ones will fail the
      Astro build, not just look wrong)
- [ ] Read it once on `/{vertical}/{slug}` in the dev server

---

## 7. Commit and push once the preview looks right

Only do this after you've checked the post in the dev server (§6) — don't push straight from
writing to git. The site is on GitHub (`origin` → `helpdevwork/thewideangle.club`, branch `main`),
and pushing to `main` is what a deploy is triggered from, so this step is the "make it real" step.

```
# 1. See what changed
git status
git diff
```

Example (real run, for the "AI Driven Market Wobble" post):

```
git status --short
git diff --staged --stat
```

```
# 2. Stage exactly what you touched — the new/edited post, any new images.
#    Avoid `git add -A` / `git add .`; add files by name so you don't
#    accidentally sweep up something unrelated.
git add src/content/<vertical>/<your-slug>.md
git add public/images/<your-image-file>
```

Example (real run):

```
git add src/content/technology/ai-driven-market-wobble.md public/images/AI.avif
```

```
# 3. Commit with a message describing the post, not the mechanics
git commit -m "Add <vertical> post: <short title>"
```

Example (real run — used a heredoc so the co-author trailer lands on its own line):

```
git commit -m "$(cat <<'EOF'
Add technology post: AI Driven Market Wobble

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

```
# 4. Push to main
git push origin main
```

Example (real run — output confirms the commit landed on origin/main):

```
git push origin main
# To https://github.com/helpdevwork/thewideangle.club.git
#    60fdb71..16e5b7c  main -> main
```

A few things worth knowing:
- Committing with `published: false` is completely fine — it just means the post ships hidden
  and you flip it live in a later, separate commit/push whenever it's ready.
- If `git push` fails because `main` moved (someone/something else pushed), run `git pull
  --rebase origin main` first, then push again.
- Never use `git push --force` on `main` without deliberately deciding to — it can overwrite
  history other changes depend on.
- Keep commits scoped to one post (or one clear change) at a time — it makes it easy to tell
  which commit to look at if a post ever needs fixing later.

---

## 8. Optional: the CMS admin panel

There's a Decap CMS config at `public/admin/config.yml` intended to give a form-based editor at
`/admin` (mirrors the fields in §1 automatically). **It is not fully wired up yet** — the
`base_url` in that file is still a placeholder OAuth worker URL. Until that's configured, editing
Markdown files directly (this guide's workflow) is the only path — don't rely on `/admin` working.

---

## 9. Quick reference

```
# Start the day
astro dev --background
astro dev status

# New post
1. cp src/content/<vertical>/<existing>.md src/content/<vertical>/<new-slug>.md
2. Edit frontmatter + body
3. Put hero image in public/images/, reference as /images/<file>
4. published: false while drafting

# Something's not showing up
1. Hard refresh (Ctrl+Shift+R)
2. Check you're editing the file matching the current URL
3. astro dev stop && astro dev --background

# Ready to publish
1. Flip published: true, save, hard refresh to confirm in preview
2. git add src/content/<vertical>/<slug>.md public/images/<file>
3. git commit -m "Add <vertical> post: <short title>"
4. git push origin main
```
