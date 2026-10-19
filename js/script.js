/* Jude Nasser - 202363250 - SWE 363 Assignment 1
   Night mode button. No colours in here - this only flips the
   data-theme attribute and the CSS does the rest. */

const toggle = document.querySelector("#themeToggle");
const root = document.documentElement;   // this is <html>

toggle.addEventListener("click", function () {
  // getAttribute gives "dark" or null
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");   // back to light
    toggle.textContent = "Night mode";
    toggle.setAttribute("aria-pressed", "false");
  } else {
    root.setAttribute("data-theme", "dark");
    toggle.textContent = "Day mode";
    toggle.setAttribute("aria-pressed", "true");
  }
  // label says what the next click does, not what mode you're in
});
