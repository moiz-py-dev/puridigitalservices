# Puri Digital Services: Website + Portfolio (combined)

One project, one hosting. The main website and the portfolio live in the same folder. The portfolio stays a separate page and only opens when a visitor clicks a portfolio button or link.

## 1. Folder map

```
/                       <- upload everything in this folder to your hosting root
|-- index.html          Home
|-- about.html          About
|-- services.html       Services
|-- team.html           Team
|-- why-us.html         Why Us
|-- contact.html        Contact + "Book a meeting" form
|-- favicon.ico          Browser tab icon (other sizes are in assets/)
|-- style.css           All website styling
|-- main.js             All website behaviour (animations, form, reviews, WhatsApp magnet)
|-- _headers            Security headers (Netlify / Cloudflare Pages)
|-- robots.txt, sitemap.xml
|-- assets/
|   |-- logo-full.png, logo-icon.png, og-image.jpg
|   `-- work/           Preview images used by the "Our Work" cards on Home
`-- portfolio/
    |-- index.html      The portfolio (single file, images are embedded inside it)
    `-- videos/         The 8 portfolio videos (mp4)
```

## 2. How the two sites are connected

- "Portfolio" in the top menu, the footer and the Home page "Our Work" cards all point to `portfolio/index.html`.
- The three Home cards open the portfolio already filtered: `portfolio/index.html#f-web`, `#f-video`, `#f-creative`.
- The portfolio has a "Back to website" button in its header and footer.
- The old website `portfolio.html`, `gallery.js` and the `assets/projects`, `assets/videos`, `assets/creatives` folders were removed. The portfolio keeps its own data now.

## 3. What was changed or added (summary)

Website
- "Our Work" section: website screenshots removed, replaced by three cards (Websites, Videos, Creatives & Branding) that cycle real portfolio images and open the portfolio.
- Footer now uses the same solid, blurred dark surface as the header (it was transparent).
- Look matched to the portfolio: animated gold connected-nodes background, gold cursor, gold hover borders, animated shimmer on the hero headline, button shine, page fade-in, 3D tilt on cards, scroll progress bar.
- New "How We Work" timeline on Home (Meeting, Plan, Design & Build, Launch & Support).
- New "Client Feedback" carousel on Home.
- WhatsApp floating button now behaves like the portfolio's: same size and position, pulse ring, and it is pulled toward the cursor (spring motion) when the mouse comes close. Desktop only.
- No quotes. The six "Get a quote on WhatsApp" buttons on the Services page were removed.
- Meeting booking box (one box for the whole site): the top "Book a Meeting" button and every "Schedule a meeting" button open the same centered box on every page (also from `contact.html#book`). It is built by `main.js`, so there is nothing to copy between pages. Step 1: the client picks a day on a calendar (earliest tomorrow, Sundays closed, through the end of the month 12 months from now; it rolls forward by itself, no yearly edit needed) and a time slot (Pakistan time). Step 2: name, phone, optional email, service, budget (Rs. 50,000 to 10 lakh) and how to meet (call, video, office visit). Then two clear options: "Send by email" and "Send on WhatsApp". WhatsApp opens with the full message already written. Email opens a professionally formatted email in Gmail (desktop) or the mail app (phone), or is sent straight to your inbox if a Web3Forms key is set in `main.js`.
- The floating WhatsApp button and other WhatsApp links open a ready message where the client fills in name, service and preferred day and time (the client suggests the time, we confirm).
- Favicon: same logo on a transparent background, with deeper colours and a larger size so it stays clear on light and dark browser tabs (`favicon.ico`, `assets/favicon-*.png`). Only `assets/apple-touch-icon.png` (iPhone home screen) has a dark background, because iOS does not allow transparency there.
- Team: Hamza Shahid (Business Development & Accounts Adviser) and Tanveer Ahmed (Editing & 3D Rendering Manager) were added, on the website and in the portfolio.

Portfolio
- Websites counter is 10+.
- HRM Dairies creative replaced with the new design; the Al-Shaafi "Beat the Heat, Boost the Herd" creative removed; Starlet logo added with the other logos.
- Hamza Shahid and Tanveer Ahmed added to the team (7 members). Two featured 3D video cards were added at the top of the grid.
- WhatsApp message changed to a meeting request.
- Link fixes: logo and "Home" go to the website; new "Back to website" buttons; category links via `#f-...`.

## Adding the two featured videos (portfolio)

The portfolio has two "Featured" 3D video cards at the very top. They are ready and waiting for the video files:

1. Put the two video files in `portfolio/videos/` (next to the other videos).
2. Name them exactly: `featured-1.mp4` and `featured-2.mp4` (lowercase, no spaces).
3. That is all. The card thumbnail is taken from the first second of the video automatically, and clicking the card plays it. Until a file is added, the card shows a play button and the player says "This video has not been uploaded yet."

To change the title or text of a card, search `portfolio/index.html` for `3D Rendered Showcase Film` and `3D Rendered Promo Film`.

Video tips: use MP4 (H.264), 1080p or 720p. 3 to 4 minute videos are best kept under about 25 MB each (HandBrake, "Fast 1080p30" or "Fast 720p30", quality RF 26 to 28). GitHub's browser upload accepts files up to 25 MB; larger files (up to 100 MB) need Git or GitHub Desktop.

## 4. SEO (what is in place)

- Every page has a unique title, meta description, canonical URL, robots meta, Open Graph and Twitter tags, one H1, and image alt text.
- Structured data (JSON-LD): ProfessionalService on Home, BreadcrumbList on all inner pages, ItemList of services on Services, ContactPage on Contact, CollectionPage + BreadcrumbList on the portfolio.
- `sitemap.xml` lists all pages including `/portfolio/`; `robots.txt` points to it.
- Images have width/height and lazy loading; fonts use `display=swap`.
- **You must still do:** replace `YOURDOMAIN.com` with your real domain in every file (search the whole project for `YOURDOMAIN`), then submit `sitemap.xml` in Google Search Console and add your Google Business Profile.
- Note: portfolio images are embedded inside `portfolio/index.html`, so Google reads the portfolio mainly as text. The Home page and Services page carry the main keywords.

## 5. Things you can change (and where)

| What | File | Where |
|---|---|---|
| WhatsApp number | all `.html` files and `portfolio/index.html` | search `923155553257` |
| Meeting email address | all `.html` files and `main.js` | search `Puridigitalservices@gmail.com` |
| Booking box: time slots, closed days, budget, services, meeting types | `main.js` | the block under `v9: meeting booking box`, lines marked `EDIT HERE` |
| WhatsApp default message | all `.html` files | search `book%20a%20meeting` (it is URL-encoded) |
| WhatsApp / email text written by the booking box | `main.js` | `waBody` and `emailBody` |
| Web3Forms access key (booking requests go straight to the PDS inbox) | `main.js` (line 1) | `W3F_KEY` (already set; if set back to `YOUR_WEB3FORMS_ACCESS_KEY`, "Send by email" opens Gmail instead). After going live, set the real domain in the form settings on app.web3forms.com |
| Budget options | `main.js` | `BUDGETS` in the booking box block |
| Team (website) | `team.html` | one `.card` per person (name, initials in `.av`, role, short text) |
| Team (portfolio) | `portfolio/index.html` | `var TEAM=[ ... ]` |
| Client feedback | `main.js` | `const REVIEWS=[ ... ]` |
| Portfolio live website links | `portfolio/index.html` | `var SITES={ ... }` (empty = shows a preview) |
| Portfolio videos | `portfolio/index.html` + `portfolio/videos/` | `var VIDEOS={ ... }` and the video cards |
| Home "Our Work" images | `index.html` + `assets/work/` | `#work` section |
| Colors | `style.css` (top) | `:root{ --gold, --bg ... }` |

## 6. Hosting notes (important)

- `_headers` works on Netlify and Cloudflare Pages. Other hosts ignore it (the site still works, but without those security headers).
- The main site uses a strict Content-Security-Policy (scripts only from the site itself). The portfolio needs a looser one (inline script and GSAP from cdnjs). That is why `_headers` lists each website page by name and gives `/portfolio/*` its own policy.
- **If you add a new website page**, add it to `_headers` with the same policy as the other pages, otherwise it will not get the strict policy.
- **Do not add inline `<script>` code to website pages**; put code in `main.js` (the strict policy blocks inline scripts).
- The portfolio needs internet for GSAP (cdnjs) and Google Fonts. Without it the portfolio still opens, only with less animation.
- Videos are about 8 MB in total; keep new videos 720p and under 10 MB each.

## 7. Technology used

Plain HTML, CSS and vanilla JavaScript (no build step). Fonts: Fraunces and Manrope (Google Fonts). Portfolio animations: GSAP 3.12.5 + ScrollTrigger (cdnjs). Booking requests: Gmail / WhatsApp, optionally Web3Forms. Website effects (background, cursor, carousel, timeline, magnet) are written in `main.js` without libraries.

## 8. Call button

"Call us now" uses `tel:+923155553257`. On a phone it opens the dialer. On a computer there is no dialer, so the site shows a small message with the number and copies it instead.
