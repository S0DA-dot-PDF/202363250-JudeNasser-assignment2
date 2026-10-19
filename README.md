# 202363250-JudeNasser-assignment1
# Personal Portfolio — SWE 363 Assignment 1

A responsive personal portfolio website built with HTML, CSS and vanilla
JavaScript. It introduces who I am, presents two things I am working on, and
provides a way to get in touch — with a light/dark theme the visitor controls.

**Author:** Jude Nasser · 202363250
**Course:** SWE 363 — Web Engineering & Development, KFUPM

---

## Features

- **About Me** — a short introduction and tagline
- **Projects** — two cards, each with a title, description, image and external link
- **Contact** — a form with name, email and message fields, using built-in HTML validation
- **Light / dark theme toggle** — switches the whole site between two colour palettes
- **Responsive layout** — the project cards sit side by side on desktop and stack
  automatically on narrower screens

---

## Technologies Used

| Technology | Used for |
|---|---|
| HTML5 | Page structure and semantic elements |
| CSS3 | Styling, Flexbox layout, custom properties (CSS variables) |
| JavaScript (vanilla) | The theme toggle — no libraries or frameworks |
| Git / GitHub | Version control |

No frameworks, no build tools, no dependencies.

---

## Project Structure

```
202363250-JudeNasser-assignment1/
├── index.html                      # the page itself — all content and structure
├── css/
│   └── styles.css                  # all styling, including both colour palettes
├── js/
│   └── script.js                   # the light/dark theme toggle
├── assets/
│   └── images/                     # project card images
├── docs/
│   ├── ai-usage-report.md          # how AI tools were used in this assignment
│   └── technical-documentation.md  # how the site is built and why
├── .gitignore
└── README.md
```

---

## Setup — Running It Locally

There is **no build step and nothing to install.** The site is plain HTML, CSS
and JavaScript, so a browser can open it directly.

**1. Clone the repository**

```bash
git clone https://github.com/S0DA-dot-PDF/202363250-JudeNasser-assignment1.git
```

**2. Move into the folder**

```bash
cd 202363250-JudeNasser-assignment1
```

**3. Open the page**

Double-click `index.html`, or from the terminal:

```bash
open index.html          # macOS
start index.html         # Windows
```

**Optional — run it on a local server.** Opening the file directly works, but a
local server more closely matches how the site behaves when deployed:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

**Requirements:** any modern browser (Chrome, Firefox, Safari or Edge). Nothing else.

---

## How to Use the Site

**Switching between light and night mode.** The **Night mode** button sits at the
bottom of the page, below the contact form. Click it and the entire site switches
to a dark plum palette; the button then reads **Day mode**, and clicking it again
returns the site to light. The button works with the keyboard as well — tab to it
and press Enter or Space.

**Viewing the projects.** Each project card has a link. *You dont know KFUPM?!*
opens a short video about the university, and *for the CURIOUS* opens my art
portfolio on Notion. Both open in a new tab, so you won't lose your place here.

**Sending a message.** Fill in your name, email and message, then press **Submit**.
All three fields are required, and the email field checks that what you typed looks
like a real address before the form will submit.

> **Note:** this assignment covers the front end only, so the contact form has no
> server behind it. Nothing is sent or stored when you press Submit. Connecting it
> to a back end is planned for a later assignment.

**On a phone or tablet.** The two project cards sit side by side on a wide screen
and stack into a single column when the window is too narrow to fit both.

---

## AI Usage

AI tools were used during this assignment for planning, explanation, code review
and documentation support. All code was reviewed and adapted before being
included, and the process is documented in full in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## Documentation

- [Technical Documentation](docs/technical-documentation.md) — architecture,
  design decisions and how the theme toggle works
- [AI Usage Report](docs/ai-usage-report.md) — tools used, benefits and
  challenges, learning outcomes, and responsible use

---

## Author

**Jude Nasser** — 202363250
Software Engineering, King Fahd University of Petroleum and Minerals
SWE 363 — Web Engineering & Development
