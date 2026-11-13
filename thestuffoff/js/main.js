/* The Stuff Off — tiny bit of JavaScript: mobile nav + form submission.
   -------------------------------------------------------------------
   FORMS: GitHub Pages is static, so forms need a mail-forwarding service.
   1. Create a free form at https://formspree.io (or similar).
   2. Paste the endpoint it gives you (looks like https://formspree.io/f/abcdwxyz) below.
   Both the Sign Up and Contact forms will post there. Until you do, the forms
   fall back to opening the visitor's email app with the answers pre-filled,
   addressed to CONTACT_EMAIL.
*/
const FORM_ENDPOINT = "";                 // e.g. "https://formspree.io/f/abcdwxyz"
const CONTACT_EMAIL = "";                 // e.g. "hello@thestuffoff.com" (used only for the email fallback)

// --- Mobile navigation -----------------------------------------------------
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// --- Forms -----------------------------------------------------------------
document.querySelectorAll("form.stuff-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    const button = form.querySelector("button[type=submit]");
    const data = new FormData(form);
    const success = form.dataset.success || "Thanks! We got it.";

    const show = (msg, isError) => {
      if (!note) return;
      note.textContent = msg;
      note.classList.add("show");
      note.classList.toggle("error", Boolean(isError));
    };

    if (FORM_ENDPOINT) {
      button.disabled = true;
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("Bad response");
        form.reset();
        show(success, false);
      } catch (err) {
        show("Something went wrong sending that. Try again, or email us directly.", true);
      } finally {
        button.disabled = false;
      }
      return;
    }

    // Fallback: open the visitor's email client with the answers filled in.
    const lines = [];
    data.forEach((value, key) => { if (String(value).trim()) lines.push(`${key}: ${value}`); });
    const subject = encodeURIComponent(form.dataset.subject || "The Stuff Off");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    show(CONTACT_EMAIL ? success : "This form isn't connected yet. See js/main.js to hook it up.", !CONTACT_EMAIL);
  });
});
