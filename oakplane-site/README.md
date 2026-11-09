# Oakplane website

Plain HTML, CSS and JavaScript. No build step, no installs.
Open the folder in VS Code and either double-click `index.html` or use the **Live Server** extension.

```
index.html  services.html  work.html  about.html  contact.html
css/style.css      all styling (colours are the variables at the top)
js/main.js         boot screen, page transitions, project windows, contact form  <- settings at the top
js/icons.js        every icon, drawn as SVG
assets/            logo, favicon (add pedro.jpg here)
```

## Before you launch (checklist)

1. **Contact form:** go to https://web3forms.com, enter oakpaneweb@gmail.com, copy the access key and paste it into `web3formsKey` at the top of `js/main.js`. Then send yourself a test message and check it is not in spam.
2. **Booking:** paste your Calendly/Cal.com link into `calendly` in `js/main.js`. The "Book a call" buttons then open it automatically.
3. **Your photo:** save it as `assets/pedro.jpg` (square). Until then an icon shows.
4. **About text:** `about.html` has a draft story. Rewrite it in your own words.
5. **Work page:** the three projects (Brew & Bloom, Peak Physio, Studio Verde) are labelled "Concept" and use generated illustrations, not real screenshots. Replace them with your real practice sites (names and text are in `PROJECTS` in `js/main.js`).
6. **Check these assumed details:** working hours (Mon-Fri 10-18 Madrid), languages (English, Portugues, Espanol), "reply within 24 hours", and the "Open for projects" badge. They are in `contact.html`, `about.html` and the menu bar of every page.
7. **Prices:** only "from about $2,000" (5 pages) and the $50-100 care plan are stated. The other packages say "Request a quote".
8. **Privacy text:** the privacy and cookie notice is a draft in `js/main.js`. Have it reviewed before launch, and update it if you add analytics.
9. **Address:** your street address is deliberately NOT on the site. Add it only if it is a business address.
10. **Fonts:** Space Grotesk and Silkscreen load from Google Fonts. Your PDF said fonts were still to be decided; change them in `css/style.css` and in the `<link>` in each page head.

## Putting it live (Cloudflare Pages)

Upload this folder to GitHub, then in Cloudflare Pages connect the repo with **no build command** and output directory `/`.

## Notes

- Sound is off by default (toggle in the top bar). Boot screen shows once per browser session; click the logo on Home to replay it.
- Visitors who prefer reduced motion get no boot screen, transitions or animations.
- The icons are original drawings in the style of your reference. The Unsplash+ images and the KRAI design you sent were used only as mood references and are not in the site.
