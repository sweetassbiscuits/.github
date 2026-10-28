(function () {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Only allow real web links from content.js (blocks "javascript:" and typos)
  const safeUrl = (u) => (/^https:\/\//i.test(u || "") ? u : "");

  $("#year").textContent = new Date().getFullYear();

  // Contact links: shown only when filled in content.js
  const tel = (S.phone || "").replace(/[^\d+]/g, "");
  document.querySelectorAll("[data-phone]").forEach((a) => {
    if (tel) { a.href = "tel:" + tel; a.hidden = false; }
  });
  document.querySelectorAll("[data-social]").forEach((a) => {
    const u = safeUrl(S[a.dataset.social]);
    if (u) { a.href = u; a.hidden = false; }
  });
  const reserve = safeUrl(S.reservationsUrl);
  document.querySelectorAll("[data-reserve]").forEach((a) => {
    if (reserve) { a.href = reserve; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; }
  });

  // Mobile nav
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  const closeNav = () => { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); };
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") closeNav(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

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
    document.querySelectorAll("#filters .chip").forEach((c) => c.classList.toggle("active", c === b));
    renderMenu(b.dataset.filter);
  });
  renderMenu("all");

  // Events: hide past ones, filter by kind, reveal more on demand
  const groupOf = { "Live Music": "music", DJ: "music", Bingo: "games", Trivia: "games", "Paint Party": "classes", Class: "classes", Closed: "closed" };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = S.events
    .map((e) => ({ ...e, src: e, d: new Date(e.date + "T00:00:00"), group: groupOf[e.badge] || "other" }))
    .filter((e) => e.d >= today)
    .sort((a, b) => a.d - b.d);
  const PAGE = 6;
  let evFilter = "all", evShown = PAGE;
  const moreBtn = $("#more-events");
  const eventCard = (e) => e.group === "closed" ? `
      <article class="event event-closed">
        <div class="event-date">
          <span class="m">${e.d.toLocaleString("en-US", { month: "short" })}</span>
          <span class="d">${e.d.getDate()}</span>
        </div>
        <div class="event-body">
          <h3>${esc(e.title)}</h3>
          <p>${esc(e.text)}</p>
        </div>
      </article>` : `
      <article class="event${e.image ? " has-img" : ""}">
        ${e.image ? `<img class="event-img" src="${esc(e.image)}" alt="" loading="lazy">` : ""}
        <div class="event-date">
          <span class="m">${e.d.toLocaleString("en-US", { month: "short" })}</span>
          <span class="d">${e.d.getDate()}</span>
        </div>
        <div class="event-body">
          ${e.badge ? `<span class="badge">${esc(e.badge)}</span>` : ""}
          <h3>${esc(e.title)}</h3>
          <p class="when">${+e.d === +today ? '<strong class="tonight">Tonight</strong>' : e.d.toLocaleString("en-US", { weekday: "long" })} · ${esc(e.time)}</p>
          <p>${esc(e.text)}</p>
        </div>
        <div class="event-actions">
          <a class="btn btn-small" href="${safeUrl(e.link) ? esc(e.link) : "#newsletter"}" ${safeUrl(e.link) ? 'target="_blank" rel="noopener"' : ""}>${safeUrl(e.link) ? "Details & RSVP" : "Get Notified"}</a>
          <button class="cal-btn" type="button" data-cal="${S.events.indexOf(e.src)}" aria-label="Add ${esc(e.title)} to your calendar">+ Calendar</button>
        </div>
      </article>`;
  function renderEvents() {
    const list = upcoming.filter((e) => evFilter === "all" || e.group === evFilter);
    $("#event-list").innerHTML = list.length
      ? list.slice(0, evShown).map(eventCard).join("")
      : `<p class="empty">New events coming soon — join the newsletter to hear first.</p>`;
    moreBtn.hidden = list.length <= evShown;
  }
  $("#event-filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll("#event-filters .chip").forEach((c) => c.classList.toggle("active", c === b));
    evFilter = b.dataset.filter; evShown = PAGE;
    renderEvents();
  });
  moreBtn.addEventListener("click", () => { evShown += PAGE; renderEvents(); });
  renderEvents();

  // "+ Calendar": downloads a .ics file that opens in Apple, Google or Outlook calendar
  const parseTime = (t) => {
    const m = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(t || "");
    if (!m) return null;
    let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12;
    return [h, +(m[2] || 0)];
  };
  const icsStamp = (date, [h, m]) => date.replace(/-/g, "") + "T" + String(h).padStart(2, "0") + String(m).padStart(2, "0") + "00";
  const icsText = (s) => String(s).replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  $("#event-list").addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-cal]");
    if (!b) return;
    const e = S.events[+b.dataset.cal];
    const parts = String(e.time).split(/[–-]/);
    const start = parseTime(parts[0]) || [18, 0];
    const end = parseTime(parts[1]) || [Math.min(start[0] + 2, 23), start[1]];
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Cocoa Vino//Events//EN", "BEGIN:VEVENT",
      "UID:" + e.date + "-" + e.title.replace(/\W+/g, "-").toLowerCase() + "@cocoavinocapitola.com",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z",
      "DTSTART;TZID=America/Los_Angeles:" + icsStamp(e.date, start),
      "DTEND;TZID=America/Los_Angeles:" + icsStamp(e.date, end),
      "SUMMARY:" + icsText(e.title + " at Cocoa Vino"),
      "DESCRIPTION:" + icsText(e.text + (safeUrl(e.link) ? "\n" + e.link : "")),
      "LOCATION:" + icsText("Cocoa Vino, 312 Capitola Ave, Capitola, CA 95010"),
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = e.title.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "") + ".ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // Help Google show the bar and its events in search (structured data)
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Cocoa Vino",
    servesCuisine: "Wine",
    address: { "@type": "PostalAddress", streetAddress: "312 Capitola Ave", addressLocality: "Capitola", addressRegion: "CA", postalCode: "95010", addressCountry: "US" },
    ...(tel && { telephone: tel }),
    event: upcoming.filter((e) => e.group !== "closed").slice(0, 20).map((e) => ({
      "@type": "Event", name: e.title, startDate: e.date, description: e.text,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: "Cocoa Vino", address: "312 Capitola Ave, Capitola, CA 95010" },
      ...(safeUrl(e.link) && { url: e.link }),
    })),
  });
  document.head.appendChild(ld);

  // Map: load Google Maps only when asked (keeps Google cookies off by default)
  $("#map .map-load").addEventListener("click", () => {
    $("#map").innerHTML = '<iframe title="Map to Cocoa Vino" referrerpolicy="strict-origin-when-cross-origin" src="https://www.google.com/maps?q=312+Capitola+Ave,+Capitola,+CA&output=embed"></iframe>';
  });

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
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const closure = S.events.find((e) => e.badge === "Closed" && e.date === iso(now));
  if (closure) {
    status.innerHTML = `<span class="dot"></span> Closed today · ${esc(closure.title.replace(/^Closed\s*[-–]?\s*/i, "") || "see you soon")}`;
  } else if (todayHours && mins >= toMin(todayHours[0]) && mins < toMin(todayHours[1])) {
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
    if (form.company.value) return; // spam bot filled the hidden field
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
