# 202363250-JudeNasser-assignment2

**Personal Portfolio — SWE 363 Assignment 2: Interactive Features**

A responsive personal portfolio website built with HTML, CSS and vanilla JavaScript. It introduces who I am, presents two things I am working on, and provides a way to get in touch, with a light/dark theme the visitor controls.

This version builds on my Assignment 1 portfolio and makes it interactive: the site now greets visitors by name and remembers them, checks the contact form and explains any mistakes, and animates the project cards.

**Author:** Jude Nasser · 202363250
**Course:** SWE 363 — Web Engineering & Development, KFUPM

---

## What's New in Assignment 2

| Feature | What it does | Requirement it covers |
|---|---|---|
| Personal greeting | After a valid form submission the page says "Welcome, [name]!"; returning visitors see "Welcome back, [name]!" | Dynamic content |
| Remembered name | The name is saved in the browser with `localStorage` and pre-filled in the form on the next visit | Data handling |
| Form validation | Empty fields and invalid email addresses show a clear message on the page instead of submitting | Data handling · User feedback |
| Card hover animation | Project cards fade smoothly into the opposite colour palette when hovered | Animation |

---

## Features

- **About Me** — a short introduction and tagline
- **Projects** — two cards, each with a title, description, image and external link; the cards animate on hover
- **Contact** — a form with name, email and message fields, checked with JavaScript before it is accepted
- **Personal greeting** — greets the visitor by name after they submit the form, and welcomes them back on later visits
- **Light / dark theme toggle** — switches the whole site between two colour palettes
- **Responsive layout** — the project cards sit side by side on desktop and stack automatically on narrower screens

---

## Technologies Used

| Technology | Used for |
|---|---|
| HTML5 | Page structure and semantic elements |
| CSS3 | Styling, Flexbox layout, custom properties (CSS variables), transitions |
| JavaScript (vanilla) | Theme toggle, greeting and form validation — no libraries or frameworks |
| Web Storage API (`localStorage`) | Remembering the visitor's name between visits |
| Git / GitHub | Version control |

No frameworks, no build tools, no dependencies.

---

## Project Structure

```
202363250-JudeNasser-assignment2/
├── index.html                      # the page itself — all content and structure
├── css/
│   └── styles.css                  # all styling, both colour palettes, hover animation
├── js/
│   └── script.js                   # theme toggle, greeting and form validation
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

There is no build step and nothing to install. The site is plain HTML, CSS and JavaScript, so a browser can open it directly.

**1. Clone the repository**

```bash
git clone https://github.com/S0DA-dot-PDF/202363250-JudeNasser-assignment2.git
```

**2. Move into the folder**

```bash
cd 202363250-JudeNasser-assignment2
```

**3. Open the page**

Double-click `index.html`, or from the terminal:

```bash
open index.html          # macOS
start index.html         # Windows
```

**Optional — run it on a local server.** Opening the file directly works, but a local server more closely matches how the site behaves when deployed:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

**Requirements:** any modern browser (Chrome, Firefox, Safari or Edge). Nothing else.

---

## How to Use the Site

### Getting a personal greeting

1. Scroll down to **Contact Me!** at the bottom of the page.
2. Fill in your name, email and message, then press **Submit**.
3. A greeting — **"Welcome, [your name]!"** — appears below the form.
4. Reload the page. You are greeted with **"Welcome back, [your name]!"** and your name is already filled in.

Your name is stored only in your own browser and is never sent anywhere. To make the site forget it, clear this site's data in your browser settings.

### If something is missing or wrong

The form tells you what to fix instead of submitting:

- Leave any field empty → **"Please fill in all fields."**
- Type an email that isn't a real address, such as `jude@` → **"Please enter a valid email address."**

Correct the field and press **Submit** again.

> **Note:** this assignment covers the front end only, so the contact form has no server behind it. Your message is not sent or stored; only your name is saved, and only in your browser. Connecting the form to a back end is planned for a later assignment.

### Switching between light and night mode

The **Night mode** button sits at the bottom of the page, below the contact form. Click it and the entire site switches to a dark plum palette; the button then reads **Day mode**, and clicking it again returns the site to light. The button works with the keyboard as well — tab to it and press Enter or Space.

### Viewing the projects

Move your mouse over a project card and it fades into the opposite colour palette; move away and it fades back. Each card has a link: **You dont know KFUPM?!** opens a short video about the university, and **for the CURIOUS** opens my art portfolio on Notion. Both open in a new tab, so you won't lose your place here.

### On a phone or tablet

The two project cards sit side by side on a wide screen and stack into a single column when the window is too narrow to fit both.

---

## AI Usage

I used Claude (Opus 5.5) through the claude.ai chat as my only AI tool in this assignment. I used it to break down the assignment requirements, to review my HTML, CSS and JavaScript and explain the problems it found, and to draft this README and the technical documentation, which I then reviewed and edited. I wrote the feature code myself; the only code written by Claude was two short CSS snippets for the hover transitions.

Every conversation and AI-generated draft is listed in [`docs/ai-usage-report.md`](docs/ai-usage-report.md), and commits that contain AI-assisted changes are marked `Assisted-by: Claude (Opus 5.5)`.

---

## Documentation

- [Technical Documentation](docs/technical-documentation.md) — architecture, how each feature works, design decisions and testing
- [AI Usage Report](docs/ai-usage-report.md) — tools used, usage log, benefits and challenges, learning outcomes and responsible use

---

## Author

**Jude Nasser** — 202363250
Software Engineering, King Fahd University of Petroleum and Minerals
SWE 363 — Web Engineering & Development
