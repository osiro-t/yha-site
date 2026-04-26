# YHA — Young Humanitarians in Action
## Website Project — Frontend Code

---

##  Project Structure

```
yha-website/
├── index.html       ← Home Page
├── about.html       ← About Us Page
├── donate.html      ← Donate Page
├── impact.html      ← Our Impact Page (4th page)
├── styles.css       ← All shared styles (one file)
├── script.js        ← All shared JavaScript (one file)
├── assets/
│   └── logo.png     ← YHA Logo
└── README.md        ← This file
```

---

##  Pages

| File | Page | Description |
|------|------|-------------|
| `index.html` | Home | Opening hero, YHA story, Nairobi floods crisis, three pillars, contact form |
| `about.html` | About Us | Who we are, mission/vision, all three work pillars in detail, team, values |
| `donate.html` | Donate | Payment methods (M-Pesa/PayPal/Bank), donate in kind, testimonials, FAQ |
| `impact.html` | Our Impact | Stats, field stories, before/after, timeline, events, volunteer wall |

---

## Placeholders to Replace

Throughout the site you will find clearly labelled placeholders:

- **Image placeholders** — grey boxes with dashed borders labelled with what photo goes there
- **Video placeholders** — dark boxes with a play button, labelled with the suggested video
- **Text placeholders** — marked with `[Placeholder]` — address, phone number, email
- **Link placeholder** — in `donate.html`, the "Fill Donation Form" button has `href="[INSERT GOOGLE FORM LINK]"` — replace with your actual Google Form URL

---

##  Design Notes

- **Colour palette:** Green (#1a7a3c primary) and white only, as per the YHA logo
- **Fonts:** Cormorant Garamond (display/headings) + Outfit (body) — loaded from Google Fonts
- **Icons:** Font Awesome 6 Free — loaded from CDN
- **No framework:** Pure HTML, CSS, and vanilla JavaScript

---

##  Key Things to Update Before Going Live

1. Replace all `[Placeholder]` address, phone, and email fields with real contact info
2. Replace `[DONATION FORM]` contact details with actual contact info.
3. Drop real photos into image placeholders (just swap the `<div class="img-ph">` for an `<img>` tag)
4. Add real team member names and photos in `about.html`
5. Update the payment details in `script.js` → `paymentDetails` object (M-Pesa paybill, PayPal email, bank details)
6. Add real social media links in all navbars and footers (search for `href="#"` on the social icons)

---

## Payment Modal (Donate Page)

The three payment method buttons open a modal popup with instructions. The content is in `script.js` in the `paymentDetails` object. Update:
- M-Pesa **Paybill Number** and **Account Name**
- PayPal **email address**
- Bank **name, account number, branch, and SWIFT code**

---

*Built for Young Humanitarians in Action — Nairobi, Kenya*
