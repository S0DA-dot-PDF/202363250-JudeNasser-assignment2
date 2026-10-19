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


// assignment 2: from here and below 


const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const greetingMessage = document.getElementById("greetingMessage");
const errorMessage = document.getElementById("errorMessage");

// Greet returning users who already have a saved name
const savedName = localStorage.getItem("name");

if (savedName) {
    greetingMessage.textContent = `Welcome back, ${savedName}!`;
    nameInput.value = savedName;
}

// Handle form submission

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear 
    errorMessage.textContent = "";
    greetingMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validate the fields
    if (!name || !email || !message) {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!emailInput.validity.valid) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // Save the name only after successful validation
    localStorage.setItem("name", name);

    // Greet the user immediately
    greetingMessage.textContent = `Welcome, ${name}!`;
});


