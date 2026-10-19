# Technical Documentation

**Project:** Personal Portfolio — SWE 363 Assignment 2: Interactive Features
**Author:** Jude Nasser · 202363250

---

## 1. Overview

This is a static personal portfolio website built with HTML, CSS and vanilla JavaScript. It has three content sections — About Me, Projects and Contact — and a button that switches the whole site between a light and a dark colour palette.

Assignment 2 builds on the Assignment 1 site and adds three interactive features:

- **Personal greeting with a remembered name.** After a valid form submission the page greets the visitor by name and saves the name in `localStorage`. Returning visitors are welcomed back and find their name already filled in.
- **JavaScript form validation.** The contact form checks for empty fields and invalid email addresses and explains the problem in a message on the page.
- **Animated project cards.** Hovering a card fades it into the opposite colour palette.

There is no back end, no framework and no dependencies. The browser opens `index.html` directly and everything runs client-side.

---

## 2. File Structure

```
202363250-JudeNasser-assignment2/
├── index.html                      # all page content and structure
├── css/
│   └── styles.css                  # all styling, both colour palettes, layout, hover animation
├── js/
│   └── script.js                   # theme toggle, greeting and form validation
├── assets/
│   └── images/                     # the two project card images
├── docs/
│   ├── ai-usage-report.md          # how AI tools were used
│   └── technical-documentation.md  # this file
├── .gitignore
└── README.md
```

Each file has one job. `index.html` says what is on the page, `styles.css` decides how it looks, and `script.js` handles everything that happens in response to the user: the theme toggle, the greeting and the form validation. Nothing about appearance lives outside the stylesheet.

---

## 3. Architecture and Separation of Concerns

The three files divide the work as follows:

- **HTML** — structure and content only. No inline styles, no `style` attributes.
- **CSS** — every visual decision: colour, spacing, layout, borders, typography, animation.
- **JavaScript** — behaviour. It changes attributes and text; it never changes a style.

The theme toggle is where this division does real work. Clicking the button runs JavaScript that does exactly one thing: it adds or removes `data-theme="dark"` on the `<html>` element. It sets no colours. The stylesheet has a `[data-theme="dark"]` rule that redefines eight colour variables, and because every rule in the file refers to those variables rather than to literal colour values, the entire page repaints from that single attribute change.

The Assignment 2 features follow the same rule. The greeting and the error messages are written into `<p>` elements that already exist in the HTML, using `textContent`. The hover animation is pure CSS and needs no JavaScript at all.

---

## 4. The Colour System

The palette is defined once as CSS custom properties on `:root`:

```css
:root {
  --ink:      #242220;   /* body text */
  --paper:    #faf7f2;   /* card background */
  --invpaper: #271d23;   /* card background on hover */
  --invink:   #f2e7ec;   /* card text on hover */
  --shell:    #f0ece6;   /* page background */
  --accent:   #7a5c3e;   /* borders and links */
  --muted:    #8a8279;   /* secondary text */
  --rule:     #ddd6cc;   /* divider lines */
}
```

Every rule in the stylesheet uses `var(--name)` instead of a hex value. Dark mode is then one additional block that redefines the same eight names with different values:

```css
[data-theme="dark"] {
  --ink:      #f2e7ec;
  --paper:    #271d23;
  --invpaper: #faf7f2;
  --invink:   #242220;
  --shell:    #1b1418;
  --accent:   #d99ab0;
  --muted:    #a8949c;
  --rule:     #3a2c33;
}
```

The variable names never change — only their values — so no other rule in the file needed editing to support a second theme.

I found out in practice why this only works if the discipline is complete. My first version had four colours written literally: `aliceblue` on the cards, `rgb(255, 240, 254)` on the header, and `#7a5c3e` in two border declarations. Those four covered most of the visible page, so switching to dark mode appeared to do almost nothing. Replacing them with `var(--paper)`, `var(--shell)` and `var(--accent)` fixed it. A hardcoded colour is invisible to the theme system.

**The two hover variables (Assignment 2).** `--invpaper` and `--invink` are used only by the card hover effect (Section 9). Each one holds the *other* palette's card background or text colour: in light mode they are the dark values, and in dark mode they are the light values. Because both theme blocks define them, the hover effect always flips a card into the opposite palette, whichever theme is active, without any extra rule for dark mode.

One deliberate choice in both palettes: `--paper` is kept lighter than `--shell`. That small difference is what makes the cards read as sitting on top of the page rather than being cut out of it, and it holds in dark mode as well as light.

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

`flex-direction` applies only to a container's *direct children*, which is why `.projects` can run as a row while each `.projectsCard` inside it runs as a column. The two settings never conflict.

`align-items: flex-start` on `.projects` stops one card from stretching to match the height of the other, which is the default behaviour and looks wrong when the two cards have different amounts of text.

Spacing is handled entirely by `gap` rather than margins. To make that work, the browser's default margins are removed from headings and paragraphs first. This matters specifically because margins **do not collapse inside a flex container** — two adjacent 16px margins that would normally merge into one instead add together and then add again to the `gap`, which produced roughly three times the intended spacing before the reset was in place.

---

## 6. Responsive Design

The project cards use `flex: 1 1 300px` inside a container with `flex-wrap: wrap`. Each card asks for 300px, grows to share whatever space is available, and shrinks when it has to. Once the container is too narrow for two cards at 300px, the second wraps onto its own line and the layout becomes a single column.

---

## 7. Theme Toggle (from Assignment 1)

The theme toggle is one event listener:

```javascript
const toggle = document.querySelector("#themeToggle");
const root = document.documentElement;

toggle.addEventListener("click", function () {
  const isDark = root.getAttribute("data-theme") === "dark";
  ...
});
```

**How it works:**

1. `querySelector("#themeToggle")` locates the button using a CSS selector — the same syntax used in the stylesheet.
2. `documentElement` is the `<html>` element. The attribute has to go there because the colour variables are defined on `:root`, which *is* `<html>`; putting it lower in the tree would limit which elements inherit the change.
3. `addEventListener("click", …)` hands a function to the browser to be called on each click. The function is not run at load time.
4. `getAttribute("data-theme")` returns `"dark"` or `null`. Comparing it to `"dark"` with `===` turns the current state into a boolean.
5. `setAttribute` / `removeAttribute` flips it, and the browser re-evaluates which CSS rules match.
6. The button's `textContent` and `aria-pressed` attribute are updated so both the label and the accessibility state stay in sync with the theme.

`data-theme` is a custom `data-*` attribute — HTML reserves that prefix for author-defined attributes, so it is valid without being a built-in feature.

**No state variable is stored.** The attribute on `<html>` *is* the state, and it is read fresh on every click. Keeping a separate JavaScript variable alongside it would introduce the possibility of the two disagreeing; with a single source of truth that cannot happen.

The trigger is a real `<button>` rather than a styled `<div>`. A button is focusable, responds to Enter and Space, and is announced correctly by screen readers — all without any extra code.

---

## 8. Personal Greeting and Form Validation (Assignment 2)

These two features share the contact form. The greeting reuses the form's **Name** field rather than adding a separate name box, so the visitor only types their name once.

| Element | `id` | Role |
|---|---|---|
| `<form novalidate>` | `contactForm` | the contact form; its `submit` event drives both features |
| `<input type="text">` | `name` | the visitor's name — validated, saved and greeted |
| `<input type="email">` | `email` | validated |
| `<textarea>` | `message` | validated |
| `<p aria-live="polite">` | `greetingMessage` | where the greeting appears |
| `<p aria-live="polite">` | `errorMessage` | where validation errors appear |

### 8.1 Greeting returning visitors

This runs once, when the page loads:

```javascript
const savedName = localStorage.getItem("name");

if (savedName) {
    greetingMessage.textContent = `Welcome back, ${savedName}!`;
    nameInput.value = savedName;
}
```

`localStorage.getItem` returns `null` when nothing has been saved, so a first-time visitor skips the `if` block and sees no greeting. A returning visitor sees "Welcome back, [name]!" and finds the Name field pre-filled.

`localStorage` stores text per website in the visitor's own browser. It survives reloads and closing the browser, but it is never sent to a server.

### 8.2 Handling a submission

A single `submit` listener on the form does the rest. In order, it:

1. **Calls `event.preventDefault()`.** The site has no server, so the browser's default submit — navigating to a new page — must not happen.
2. **Clears both messages,** so an old error or greeting never sits next to a new one.
3. **Reads and trims all three fields.** `trim()` removes spaces at both ends, so a field containing only spaces counts as empty.
4. **Checks for empty fields.** If any is empty, it shows "Please fill in all fields." and stops (`return`).
5. **Checks the email.** If `emailInput.validity.valid` is `false`, it shows "Please enter a valid email address." and stops. This reuses the browser's own email rule for `type="email"`, so no custom regular expression is needed.
6. **Saves the name** with `localStorage.setItem("name", name)` — only after both checks have passed.
7. **Shows the greeting,** "Welcome, [name]!", immediately — no reload needed.

```javascript
if (!name || !email || !message) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
}

if (!emailInput.validity.valid) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
}

localStorage.setItem("name", name);
greetingMessage.textContent = `Welcome, ${name}!`;
```

### 8.3 Why the form uses `novalidate`

With `required` and `type="email"` alone, the browser runs its own validation: it shows a pop-up and blocks the `submit` event before any JavaScript runs, so the page's own error messages would never appear. Adding `novalidate` to the `<form>` switches the browser's checking off and leaves validation to `script.js`.

`required` and `type="email"` are still on the inputs. They tell assistive technology which fields are required, they bring up the email keyboard on phones, and they are what `emailInput.validity.valid` checks against — `validity` keeps working even with `novalidate`.

### 8.4 Implementation notes

- **Saving on submit, not while typing.** My first version saved the name on the `input` event, which fires on every keystroke. That saved half-typed names ("J", "Ju", …), saved a name even if the visitor never submitted, and never updated the greeting until the page was reloaded. Moving the logic into the `submit` handler fixed all three.
- **`textContent`, not `innerHTML`.** The visitor's name is inserted into the page as plain text. A "name" such as `<img src=x onerror=alert(1)>` is displayed as those characters instead of being run as HTML.
- **`aria-live="polite"`** on both message elements makes screen readers announce a new greeting or error without the visitor having to find it.
- **Placement.** The greeting and error messages appear directly below the form, where the visitor has just acted.

---

## 9. Card Hover Animation (Assignment 2)

The animation is pure CSS:

```css
.projectsCard {
  /* ...layout, border and colour rules... */
  background-color: var(--paper);
  color: var(--ink);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.projectsCard:hover {
  background-color: var(--invpaper);
  color: var(--invink);
}

.projectsCard h2,
.projectsCard p,
.projectsCard a {
  transition: color 0.3s ease;
}

.projectsCard:hover h2,
.projectsCard:hover p,
.projectsCard:hover a {
  color: var(--invink);
}
```

**Why the headings, paragraphs and links need their own rules.** `h2` and `p` have their colours set globally (`h2 { color: var(--ink); }`, `p { color: var(--muted); }`), and links have their own colour, so none of them inherit the card's `color`. Without the second pair of rules, paragraph text stayed in the muted colour on the flipped card, which was hard to read — especially in dark mode, where the hovered card turns light.

**Why the transitions are in the normal rules, not in `:hover`.** The browser uses the `transition` of the state an element is moving *into*. A transition written only inside `:hover` animates on the way in, but the colour snaps back instantly when the mouse leaves. Placing it in the normal rule makes it apply in both states, so the card fades both ways.

**Timing.** 0.3 seconds with `ease` is long enough to read as a smooth fade and short enough not to distract.

---

## 10. Accessibility

Implemented:

- `lang="en"` on `<html>`
- `alt` text on both project images
- `<label for="…">` bound to every form field by matching `id`
- `required` and `type="email"` kept on the inputs for assistive technology and mobile keyboards, with validation handled by JavaScript (`novalidate`)
- Greeting and error messages in `aria-live="polite"` regions, so screen readers announce them
- A semantic `<button>` for the theme toggle, with `aria-pressed` reflecting its state
- External links carry `target="_blank"` with `rel="noopener noreferrer"`
- The hover effect is decorative only: all card content and links are available without hovering

**Known limitation:** the secondary text colour `--muted` (`#8a8279`) against the light background `--shell` (`#f0ece6`) gives a contrast ratio of roughly 3:1, below the WCAG AA minimum of 4.5:1 for body text. It was kept for visual reasons. A darker value such as `#6b635a` would clear the threshold while preserving the same effect, and that is the change I would make in a future revision.

---

## 11. Design Decisions and Trade-offs

**Flexbox rather than CSS Grid for the card row.** Grid would have expressed "two equal columns" more directly, but Flexbox with `flex-wrap` produces the responsive behaviour without a media query, and the card count is not fixed. Grid would be the better choice if the layout ever needed alignment in two dimensions at once.

**`object-fit: contain` rather than `cover` for card images.** `cover` fills the box by cropping, which looks better for photographs but cuts the edges off a logo. Since one of the two images is the KFUPM logo, `contain` was the correct trade-off: nothing is cropped, at the cost of empty space when an image's proportions don't match the 3:2 box.

**A single page rather than separate pages per section.** Earlier drafts considered separate pages for each section and a gallery with search. A single page keeps all three required sections immediately visible, avoids duplicating navigation markup across files, and matches the requirements the assignment asks for.

**Combining the greeting with the existing contact form (Assignment 2).** Instead of adding a separate name box, the greeting uses the form's Name field and the form's `submit` event, so one form provides the dynamic content, the saved data and the validation feedback.

**A full colour flip on hover (Assignment 2).** A lighter effect, such as a small lift with a shadow, was considered. I kept the full colour flip, which shows each card in the opposite palette.

**The browser's email rule instead of a custom pattern (Assignment 2).** `validity.valid` applies the same rule the browser uses for `type="email"`, so there is no regular expression to write or maintain. The trade-off is that the rule is lenient: it accepts addresses such as `a@b` that have no dot in the domain. For a front-end form with no server behind it, that is acceptable.

---

## 12. Known Limitations and Future Work

- **The contact form has no back end.** Messages are checked but not sent or stored. Connecting the form to a server is planned for a later assignment.
- **There is no separate "message received" confirmation.** After a successful submit, the greeting is the only success feedback, and the message stays in its box.
- **A failed submit hides the "Welcome back" greeting.** Both messages are cleared at the start of every submit, so a returning visitor who makes a mistake loses their greeting until the next successful submit.
- **Storage errors are not handled.** If a browser blocks `localStorage` (for example, with all site data blocked), reading the saved name throws an error and the greeting and validation code after it does not run. Wrapping the `localStorage` calls in `try…catch` would fix this.
- **Hover can stick on touch screens.** On phones, a tapped card can stay in its hovered colours. Limiting the hover rules with `@media (hover: hover)` would restrict them to devices with a mouse.
- **The theme choice is not remembered.** Reloading the page returns it to light mode. Storing the choice in `localStorage` and reading it on load would fix this.
- **The system colour scheme is ignored.** `window.matchMedia("(prefers-color-scheme: dark)")` could set the initial theme to match the visitor's operating system.
- **Images are not optimised.** Adding `width`, `height` and `loading="lazy"` attributes would reduce layout shift and defer offscreen loading.

---

## 13. Testing

**Assignment 1:** tested in Chrome and Safari, and both passed. Some layout bugs appeared when the window was narrower than 400px; the flexbox width scaling had been lost and was added back, which resolved them.

**Assignment 2:**

| # | Test | Expected result | Result |
|---|---|---|---|
| 1 | Submit with all fields empty | "Please fill in all fields." appears; no browser pop-up; page does not reload | |
| 2 | Type only spaces in Name, fill the rest, submit | "Please fill in all fields." | |
| 3 | Enter `jude@` as the email, fill the rest, submit | "Please enter a valid email address." | |
| 4 | Fill all fields correctly, submit | "Welcome, [name]!" appears below the form; page does not reload | |
| 5 | Reload after test 4 | "Welcome back, [name]!" appears; Name field is pre-filled | |
| 6 | Clear site data, reload | No greeting; Name field is empty | |
| 7 | Hover a project card in light mode | Card fades to the dark palette and back; all text stays readable | |
| 8 | Hover a project card in dark mode | Card fades to the light palette and back; all text stays readable | |
| 9 | Click the theme toggle twice | Whole site switches to dark and back; label and `aria-pressed` update | |
| 10 | Narrow the window to phone width (~375px) | Cards stack in one column; the form fits without sideways scrolling | |
| 11 | Use only the keyboard (Tab, Enter) | Every field and button can be reached; Enter submits the form | |
| 12 | Repeat tests 1–9 in a second browser | Same results | |
