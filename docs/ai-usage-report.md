# AI Usage Report – Assignment 2

## 1. Tools Used & Use Cases

| Tool (model) | How I used it |
|--------------|---------------|
| Claude (Opus 5.5), claude.ai chat | Breaking down the assignment requirements; understanding the course AI Usage Guidelines; setting up this report; advice on copying my Assignment 1 repository; choosing which features to build; reviewing my HTML, CSS and JavaScript and explaining problems in it; drafting the README and the technical documentation, which I then reviewed and edited. |

Claude is the only AI tool I used in this assignment. I wrote the feature code myself; the only code Claude wrote is two short CSS snippets for the hover transitions (A02).

## 2. Benefits & Challenges

I learned how to use `localStorage`, and I learned what it means to document AI use.

## 3. Learning Outcomes

I learned how to use `localStorage`. I also learned how to use CSS transitions: how an element transitions in and out of a state like `:hover`, and how the scope of a transition depends on which rule it is written in.

## 4. Responsible Use & Modifications

- I did not paste any AI-generated code into my project. The only AI-generated artifact is the skeleton of this report (A01).
- I did not always follow Claude's suggestions: Claude suggested moving the greeting out of the contact form area, and I kept it under the form. Claude also suggested a lighter hover effect than flipping the card's colours, and I kept the colour flip.
- I edited the AI-drafted README and technical documentation before submitting them: I rewrote the usage steps in the README, added my own reasons for two design decisions, and replaced the suggested test table with a summary of the testing I did.
## Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it | Evidence file |
|----|--------------|------|---------|----------------|------------------------------------------|---------------|
| C01 | Claude (Opus 5.5) | 2026-10-19 – | Planning the assignment requirements; setting up this report; explaining the course AI Usage Guidelines; advice on copying the A1 repo; choosing features (name greeting through the contact form, saved in localStorage); reviewing the contact-form HTML, the greeting JS and the hover-animation CSS; drafting the README and technical documentation | docs/ai-usage-report.md, index.html, js/script.js, css/styles.css, README.md, docs/technical-documentation.md | index.html: added `novalidate` and an `id` to the contact form, removed `method="post"`, added `aria-live="polite"` to the greeting, fixed the "Contact Me !" typo. js/script.js: replaced saving on every keystroke with a form submit handler (`preventDefault`, checks for empty fields and a valid email, saves the name only after validation, shows the greeting immediately) and pre-filled the name field for returning visitors. css/styles.css: set the text colour of headings, paragraphs and links inside a hovered project card so they flip with the card, and moved the colour transitions to the normal (non-hover) rules so they fade both ways. Verified: tested the site in Chrome by submitting the contact form empty, with spaces only, with an invalid email and correctly; reloading to check the saved greeting and pre-filled name; hovering the project cards in light and dark mode; using the theme toggle; and checking the narrow-screen layout and keyboard navigation. | conversations/C01_Jude_Claude_assignment2.pdf |
| A01 | Claude (Opus 5.5) | 2026-10-19 | Skeleton for this report (section headings, log table, declaration text copied from the brief) | docs/ai-usage-report.md | Wrote Sections 2 and 3 in my own words and completed the declaration. | artifacts/A01_Jude_Claude_ai-report-skeleton.md |
| A02 | Claude (Opus 5.5) | 2026-10-19 | Two CSS snippets showing where to put the hover transitions and hover colours on the project cards | css/styles.css | Applied both snippets in css/styles.css alongside my own hover rules. Verified by hovering the project cards. | artifacts/A02_Jude_Claude_hover-transition.css |
| A03 | Claude (Opus 5.5) | 2026-10-19 | README updated from my Assignment 1 README for Assignment 2 | README.md | Rewrote the "Getting a personal greeting" steps and the note on where the name is saved. Verified by reviewing the whole README against the site. | artifacts/A03_Jude_Claude_readme.md, artifacts/A03_Jude_Claude_readme_updated.md |
| A04 | Claude (Opus 5.5) | 2026-10-19 | Technical documentation updated from my Assignment 1 version for Assignment 2 | docs/technical-documentation.md | Added my own reasons for placing the greeting below the form (Section 8.4) and for keeping the full colour flip (Section 11); replaced the Assignment 2 test table with a summary of my testing and the browser used (Section 13). Verified by reviewing the whole document against my code. | artifacts/A04_Jude_Claude_technical-documentation.md, artifacts/A04_Jude_Claude_technical-documentation_updated.md |

Share link for C01:

### C01 in detail (2026-10-19)

1. **Requirements.** I shared the Assignment 2 brief. Claude summarised what has to be added, the AI declaration rules, and a suggested order of work.
2. **Declaration template.** I shared the AI Declaration Template. Claude pointed out it is for the term project, not this assignment, and made the skeleton for this report (A01).
3. **AI Usage Guidelines.** I shared the link to the course guidelines. Claude summarised the rules that apply here (file naming, exporting conversations, artifacts, what counts as AI use) and agreed to keep this report updated while I work.
4. **Feature list.** I asked for a short list of what to add. Claude listed the four required areas (dynamic content, data handling, animation, user feedback) and the rules for each.
5. **Copy or change Assignment 1.** Claude explained the brief asks for a new repository that starts from Assignment 1, leaving the original untouched.
6. **Copying the repository.** Claude explained GitHub's "Template repository" option. I created the new repository.
7. **Dynamic content ideas.** Claude listed the brief's examples and three options that fit my page (project filter, live search, name greeting).
8. **Choosing the greeting.** I chose the name greeting and asked whether one feature can cover two requirements. Claude said it is allowed and suggested contact-form validation as a separate data-handling feature.
9. **Combining with the form.** I decided to combine the greeting with my existing contact form, so the page greets the user and saves their name. Claude confirmed this fits and suggested also showing the greeting outside the form and on return visits.
10. **Checking the requirement.** I asked whether the greeting still counts as dynamic if it stays under the form and only appears after the user acts. Claude said yes; placement only affects how easy it is for a grader to recognise. I kept it under the form.
11. **HTML review.** Claude pointed out that the browser's built-in validation would block my own error messages, that `method="post"` would make the page try to post with no server, plus a typo and some placement suggestions. I fixed the validation, method, form `id`, `aria-live` and typo issues.
12. **JavaScript review.** Claude pointed out that my code saved the name on every keystroke and never updated the greeting until the page was reloaded, and suggested handling the form's submit event instead. Claude also noted that using `textContent` was correct. I rewrote the code myself around a submit handler that validates all fields, saves the name only after validation and greets the user straight away, and I added pre-filling the name field for returning visitors.
13. **Hover animation (CSS).** I added a colour-flip hover effect to the project cards. Claude pointed out that only the background colour was animated, that paragraph text didn't change colour on hover (hard to read in dark mode), that the effect may be heavy, that hover sticks on touch screens, and some comment and indentation issues. I kept the colour flip and fixed the text colours. Claude then gave two short CSS snippets showing where the transitions belong (A02), which I applied.
14. **Documentation.** I shared my Assignment 1 README and technical documentation and asked Claude to update them for Assignment 2. Claude drafted both (A03, A04), keeping my Assignment 1 text where it still applied and adding the new features, design decisions, known limitations and a test table. I reviewed both, rewrote the README's greeting instructions, added my reasons for the greeting placement and the colour flip, and replaced the test table with a summary of my own testing.
## Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

Name: Jude Nasser Alsaadouni
ID: 202363250
Date: 19 October 2026
