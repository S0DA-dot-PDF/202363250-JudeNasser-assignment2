# Technical Documentation

**Project:** Personal Portfolio — SWE 363 Assignment 1
**Author:** Jude Nasser · 202363250

---

## 1. Overview

This is a static personal portfolio website built with HTML, CSS and vanilla
JavaScript. It has three content sections — About Me, Projects and Contact — and
a button that switches the whole site between a light and a dark colour palette.

There is no back end, no framework and no dependencies. The browser opens
`index.html` directly and everything runs client-side.

---

## 2. File Structure

```
202363250-JudeNasser-assignment1/
├── index.html                      # all page content and structure
├── css/
│   └── styles.css                  # all styling, both colour palettes, layout
├── js/
│   └── script.js                   # the light/dark theme toggle
├── assets/
│   └── images/                     # the two project card images
├── docs/
│   ├── ai-usage-report.md          # how AI tools were used
│   └── technical-documentation.md  # this file
├── .gitignore
└── README.md
```

Each file has one job. `index.html` says what is on the page, `styles.css` decides
how it looks, and `script.js` handles the one thing that happens in response to
the user. Nothing about appearance lives outside the stylesheet.

---

## 3. Architecture and Separation of Concerns

The three files divide the work as follows:

- **HTML** — structure and content only. No inline styles, no `style` attributes.
- **CSS** — every visual decision: colour, spacing, layout, borders, typography.
- **JavaScript** — behaviour. It changes an attribute; it never changes a style.

The theme toggle is where this division does real work. Clicking the button runs
JavaScript that does exactly one thing: it adds or removes `data-theme="dark"` on
the `<html>` element. It sets no colours. The stylesheet has a
`[data-theme="dark"]` rule that redefines six colour variables, and because every
rule in the file refers to those variables rather than to literal colour values,
the entire page repaints from that single attribute change.


---

## 4. The Colour System

The palette is defined once as CSS custom properties on `:root`:

```css
:root {
  --ink:    #242220;   /* body text */
  --paper:  #faf7f2;   /* card background */
  --shell:  #f0ece6;   /* page background */
  --accent: #7a5c3e;   /* borders and links */
  --muted:  #8a8279;   /* secondary text */
  --rule:   #ddd6cc;   /* divider lines */
}
```

Every rule in the stylesheet uses `var(--name)` instead of a hex value. Dark mode
is then one additional block that redefines the same six names with different
values:

```css
[data-theme="dark"] {
  --ink:    #f2e7ec;
  --paper:  #271d23;
  --shell:  #1b1418;
  --accent: #d99ab0;
  --muted:  #a8949c;
  --rule:   #3a2c33;
}
```

The variable names never change — only their values — so no other rule in the file
needed editing to support a second theme.

I found out in practice why this only works if the discipline is complete. My
first version had four colours written literally: `aliceblue` on the cards,
`rgb(255, 240, 254)` on the header, and `#7a5c3e` in two border declarations.
Those four covered most of the visible page, so switching to dark mode appeared to
do almost nothing. Replacing them with `var(--paper)`, `var(--shell)` and
`var(--accent)` fixed it. A hardcoded colour is invisible to the theme system.

One deliberate choice in both palettes: `--paper` is kept lighter than `--shell`.
That small difference is what makes the cards read as sitting on top of the page
rather than being cut out of it, and it holds in dark mode as well as light.

---

## 5. Layout

The site uses Flexbox throughout. Each container declares its own direction:

| Container | Direction | Purpose |
|---|---|---|
| `body` | column | major sections stack with even spacing |
| `header` | column | title and tagline, centred |
| `.aboutMe` | column | paragraphs stack |
| `.projects` | row | the two cards sit side by side |
| `.projectsCard` | column | contents of each card stack |
| `form` | row | fields laid out horizontally and centred |

`flex-direction` applies only to a container's *direct children*, which is why
`.projects` can run as a row while each `.projectsCard` inside it runs as a
column. The two settings never conflict.

`align-items: flex-start` on `.projects` stops one card from stretching to match
the height of the other, which is the default behaviour and looks wrong when the
two cards have different amounts of text.

Spacing is handled entirely by `gap` rather than margins. To make that work, the
browser's default margins are removed from headings and paragraphs first. This
matters specifically because margins **do not collapse inside a flex container** —
two adjacent 16px margins that would normally merge into one instead add together
and then add again to the `gap`, which produced roughly three times the intended
spacing before the reset was in place.

---

## 6. Responsive Design

The project cards use `flex: 1 1 300px` inside a container with
`flex-wrap: wrap`. Each card asks for 300px, grows to share whatever space is
available, and shrinks when it has to. Once the container is too narrow for two
cards at 300px, the second wraps onto its own line and the layout becomes a single
column.


---

## 7. The JavaScript Feature — Theme Toggle

The chosen feature is one event listener:

```javascript
const toggle = document.querySelector("#themeToggle");
const root = document.documentElement;

toggle.addEventListener("click", function () {
  const isDark = root.getAttribute("data-theme") === "dark";
  ...
});
```

**How it works:**

1. `querySelector("#themeToggle")` locates the button using a CSS selector — the
   same syntax used in the stylesheet.
2. `documentElement` is the `<html>` element. The attribute has to go there
   because the colour variables are defined on `:root`, which *is* `<html>`;
   putting it lower in the tree would limit which elements inherit the change.
3. `addEventListener("click", …)` hands a function to the browser to be called on
   each click. The function is not run at load time.
4. `getAttribute("data-theme")` returns `"dark"` or `null`. Comparing it to
   `"dark"` with `===` turns the current state into a boolean.
5. `setAttribute` / `removeAttribute` flips it, and the browser re-evaluates which
   CSS rules match.
6. The button's `textContent` and `aria-pressed` attribute are updated so both the
   label and the accessibility state stay in sync with the theme.

`data-theme` is a custom `data-*` attribute — HTML reserves that prefix for
author-defined attributes, so it is valid without being a built-in feature.

**No state variable is stored.** The attribute on `<html>` *is* the state, and it
is read fresh on every click. Keeping a separate JavaScript variable alongside it
would introduce the possibility of the two disagreeing; with a single source of
truth that cannot happen.

The trigger is a real `<button>` rather than a styled `<div>`. A button is
focusable, responds to Enter and Space, and is announced correctly by screen
readers — all without any extra code.

---

## 8. Accessibility

Implemented:

- `lang="en"` on `<html>`
- `alt` text on both project images
- `<label for="…">` bound to every form field by matching `id`
- `required` and `type="email"` for native validation without JavaScript
- A semantic `<button>` for the toggle, with `aria-pressed` reflecting its state
- External links carry `target="_blank"` with `rel="noopener noreferrer"`

**Known limitation:** the secondary text colour `--muted` (`#8a8279`) against the
light background `--shell` (`#f0ece6`) gives a contrast ratio of roughly 3:1, below
the WCAG AA minimum of 4.5:1 for body text. It was kept for visual reasons. A
darker value such as `#6b635a` would clear the threshold while preserving the same
effect, and that is the change I would make in a future revision.

---

## 9. Design Decisions and Trade-offs

**Flexbox rather than CSS Grid for the card row.** Grid would have expressed "two
equal columns" more directly, but Flexbox with `flex-wrap` produces the responsive
behaviour without a media query, and the card count is not fixed. Grid would be the
better choice if the layout ever needed alignment in two dimensions at once.

**`object-fit: contain` rather than `cover` for card images.** `cover` fills the
box by cropping, which looks better for photographs but cuts the edges off a logo.
Since one of the two images is the KFUPM logo, `contain` was the correct trade-off:
nothing is cropped, at the cost of empty space when an image's proportions don't
match the 3:2 box.

**A single page rather than separate pages per section.** Earlier drafts considered
separate pages for each section and a gallery with search. A single page keeps all
three required sections immediately visible, avoids duplicating navigation markup
across files, and matches the requirements the assignment asks for.

---

## 10. Known Limitations and Future Work

- **The contact form has no back end.** Submissions are validated by the browser
  but nothing is sent or stored. Connecting it to a server is planned for a later
  assignment.
- **The theme choice is not remembered.** Reloading the page returns it to light
  mode. Storing the choice in `localStorage` and reading it on load would fix this.
- **The system colour scheme is ignored.** `window.matchMedia("(prefers-color-scheme: dark)")`
  could set the initial theme to match the visitor's operating system.
- **Images are not optimised.** Adding `width`, `height` and `loading="lazy"`
  attributes would reduce layout shift and defer offscreen loading.

---
## 11. Testing

**Testings:** Tested on Chrome and Safari, both of whihc passed. some bugs resurfaced when window sizing became under 400, were corrected and bugs were resolved. (the flex box was not in use, added the width scaling back)
