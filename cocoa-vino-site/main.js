(function () {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  $("#year").textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

  // Shrink nav on scroll
  const nav = $(".nav");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });

  // Now-pouring ticker (duplicated for a seamless loop)
  const items = S.nowPouring.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = items + items;

  // Menu cards + filter
  const cards = $("#menu-cards");
  const label = { red: "Red", white: "White", bubbles: "Bubbles", flight: "Flight" };
  function renderMenu(filter) {
    cards.innerHTML = S.menu
      .filter((m) => filter === "all" || m.type === filter)
      .map((m) => `
        <article class="card card-${m.type}">
          <span class="tag">${label[m.type] || ""}</span>
          <h3>${esc(m.name)}</h3>
          <p class="region">${esc(m.region)}</p>
          <p>${esc(m.note)}</p>
          <p class="price">${esc(m.price)}</p>
        </article>`).join("");
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === b));
    renderMenu(b.dataset.filter);
  });
  renderMenu("all");

  // Events: hide past ones, show the next 6
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = S.events
    .map((e) => ({ ...e, d: new Date(e.date + "T00:00:00") }))
    .filter((e) => e.d >= today)
    .sort((a, b) => a.d - b.d)
    .slice(0, 6);
  $("#event-list").innerHTML = upcoming.length
    ? upcoming.map((e) => `
      <article class="event${e.image ? " has-img" : ""}">
        ${e.image ? `<img class="event-img" src="${esc(e.image)}" alt="" loading="lazy">` : ""}
        <div class="event-date">
          <span class="m">${e.d.toLocaleString("en-US", { month: "short" })}</span>
          <span class="d">${e.d.getDate()}</span>
        </div>
        <div class="event-body">
          ${e.badge ? `<span class="badge">${esc(e.badge)}</span>` : ""}
          <h3>${esc(e.title)}</h3>
          <p class="when">${e.d.toLocaleString("en-US", { weekday: "long" })} · ${esc(e.time)}</p>
          <p>${esc(e.text)}</p>
        </div>
        <a class="btn btn-small" href="${e.link ? esc(e.link) : "#newsletter"}" ${e.link ? 'target="_blank" rel="noopener"' : ""}>${e.link ? "Reserve" : "Get Notified"}</a>
      </article>`).join("")
    : `<p class="empty">New events coming soon — join the newsletter to hear first.</p>`;

  // Hours table + live open/closed badge
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const fmt = (t) => {
    const [h, m] = t.split(":").map(Number);
    return `${((h + 11) % 12) + 1}${m ? ":" + String(m).padStart(2, "0") : ""}${h < 12 ? "am" : "pm"}`;
  };
  const now = new Date();
  const order = [1, 2, 3, 4, 5, 6, 0];
  $("#hours-table").innerHTML = order.map((i) => {
    const h = S.hours[i];
    return `<tr class="${i === now.getDay() ? "today" : ""}"><td>${days[i]}</td><td>${h ? fmt(h[0]) + " – " + fmt(h[1]) : "Closed"}</td></tr>`;
  }).join("");

  const todayHours = S.hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const status = $("#open-status");
  if (todayHours && mins >= toMin(todayHours[0]) && mins < toMin(todayHours[1])) {
    status.innerHTML = `<span class="dot open"></span> Open now · until ${fmt(todayHours[1])}`;
  } else if (todayHours && mins < toMin(todayHours[0])) {
    status.innerHTML = `<span class="dot"></span> Opens today at ${fmt(todayHours[0])}`;
  } else {
    status.innerHTML = `<span class="dot"></span> Closed now · see you soon`;
  }

  // Newsletter signup
  const form = $("#signup");
  const msg = $("#form-msg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "form-msg error";
      return;
    }
    const btn = form.querySelector("button");
    btn.disabled = true;
    try {
      if (S.newsletterFormAction) {
        const data = new FormData(form);
        await fetch(S.newsletterFormAction, { method: "POST", body: data, mode: "no-cors" });
      }
      msg.textContent = "Cheers! 🥂 You're on the list.";
      msg.className = "form-msg ok";
      form.reset();
    } catch {
      msg.textContent = "Something went wrong — please try again.";
      msg.className = "form-msg error";
    } finally {
      btn.disabled = false;
    }
  });

  // Fade-in on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
