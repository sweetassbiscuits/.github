(function () {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Only allow real web links from content.js (blocks "javascript:" and typos)
  const safeUrl = (u) => (/^https:\/\//i.test(u || "") ? u : "");
  // House style: no em or en dashes in anything the visitor reads
  const plain = (s) => String(s).replace(/\s*[–—]\s*/g, " to ");

  const now = new Date();
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const year = $("#year"); if (year) year.textContent = now.getFullYear();

  // ---------- Contact links: shown only when filled in content.js ----------
  const tel = (S.phone || "").replace(/[^\d+]/g, "");
  $$("[data-phone]").forEach((a) => {
    if (!tel) return;
    a.href = "tel:" + tel; a.hidden = false;
    if (a.hasAttribute("data-phone-text")) a.textContent = S.phone;
  });
  $$("[data-social]").forEach((a) => {
    const u = safeUrl(S[a.dataset.social]);
    if (u) { a.href = u; a.hidden = false; }
  });
  const reserveUrl = safeUrl(S.reservationsUrl);
  if (reserveUrl) {
    $$("[data-reserve], [data-reserve-online]").forEach((a) => { a.href = reserveUrl; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; });
  }

  // ---------- Nav ----------
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  const closeNav = () => { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); };
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", links.classList.toggle("open")));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") closeNav(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });
  const nav = $(".nav");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });

  // ---------- Hours & open status ----------
  const fmt = (t) => {
    const [h, m] = t.split(":").map(Number);
    return `${((h + 11) % 12) + 1}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
  };
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const closedOn = (dateIso) => S.events.find((e) => e.badge === "Closed" && e.date === dateIso);
  const closedName = (e) => e.title.replace(/^Closed\s*[-–]?\s*/i, "");
  const hoursText = (d) => {
    const h = S.hours[d.getDay()];
    return closedOn(iso(d)) || !h ? "Closed" : `${fmt(h[0])} to ${fmt(h[1])}`;
  };
  const status = $("#open-status");
  if (status) {
    const h = S.hours[now.getDay()];
    const mins = now.getHours() * 60 + now.getMinutes();
    const closure = closedOn(iso(now));
    let html;
    if (closure) html = `<span class="dot"></span> Closed today: ${esc(closedName(closure))}`;
    else if (h && mins >= toMin(h[0]) && mins < toMin(h[1])) html = `<span class="dot open"></span> Open now until ${fmt(h[1])}`;
    else if (h && mins < toMin(h[0])) html = `<span class="dot"></span> Open today ${fmt(h[0])} to ${fmt(h[1])}`;
    else html = `<span class="dot"></span> Closed now. Tomorrow: ${hoursText(new Date(today.getTime() + 864e5))}`;
    status.innerHTML = html;
  }
  const hoursTable = $("#hours-table");
  if (hoursTable) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    hoursTable.innerHTML = [1, 2, 3, 4, 5, 6, 0].map((i) => {
      const h = S.hours[i];
      return `<tr class="${i === now.getDay() ? "today" : ""}"><td>${days[i]}</td><td>${h ? fmt(h[0]) + " to " + fmt(h[1]) : "Closed"}</td></tr>`;
    }).join("");
  }

  // ---------- Events data ----------
  const groupOf = { "Live Music": "music", DJ: "music", Bingo: "games", Trivia: "games", "Paint Party": "classes", Class: "classes", Closed: "closed" };
  const upcoming = S.events
    .map((e, i) => ({ ...e, i, d: new Date(e.date + "T00:00:00"), group: groupOf[e.badge] || "other" }))
    .filter((e) => e.d >= today)
    .sort((a, b) => a.d - b.d || a.i - b.i);
  const monthDay = (d) => d.toLocaleString("en-US", { month: "short", day: "numeric" });
  const weekday = (d) => d.toLocaleString("en-US", { weekday: "long" });

  // Home: This Week strip (next 7 days, every day filled in)
  const week = $("#week");
  if (week) {
    week.innerHTML = Array.from({ length: 7 }, (_, n) => {
      const d = new Date(today.getTime() + n * 864e5);
      const evs = upcoming.filter((e) => +e.d === +d);
      const closure = evs.find((e) => e.group === "closed");
      const shows = evs.filter((e) => e.group !== "closed");
      const label = n === 0 ? "Tonight" : n === 1 ? "Tomorrow" : weekday(d);
      const body = closure
        ? `<p class="day-title">Closed</p><p>${esc(closedName(closure))}</p>`
        : shows.length
          ? shows.map((e) => `<p class="day-title">${esc(e.title)}</p><p>${esc(plain(e.time))}</p>`).join("")
          : `<p class="day-title">Wine bar & fire pit</p><p>${esc(hoursText(d))}</p>`;
      const link = shows[0] && safeUrl(shows[0].link);
      return `<a class="day${n === 0 ? " is-today" : ""}${closure ? " is-closed" : ""}" href="${link ? esc(link) : "whats-on.html"}" ${link ? 'target="_blank" rel="noopener"' : ""}>
        <span class="day-name">${label}</span><span class="day-date">${monthDay(d)}</span>${body}</a>`;
    }).join("");
  }

  // Home: Every Week + Wine lines
  const rhythm = $("#rhythm");
  if (rhythm) rhythm.innerHTML = S.weekly.map((w) => `
    <div class="beat"><span class="beat-day">${esc(w.day)}</span><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div>`).join("");
  const wineLines = $("#wine-lines");
  if (wineLines) wineLines.innerHTML = S.wine.map((w) => `<li><strong>${esc(w.title)}.</strong> ${esc(w.text)}</li>`).join("");
  const choc = $("#choc-line"); if (choc) choc.innerHTML = `<strong>Chocolate.</strong> ${esc(S.chocolate)}`;

  // Wine & Chocolate page
  const program = $("#program");
  if (program) program.innerHTML = S.wine.map((w) => `<div class="program-item"><h2>${esc(w.title)}</h2><p>${esc(w.text)}</p></div>`).join("");
  const list = $("#wine-list");
  if (list && S.byTheGlass.length) {
    $("#list-section").hidden = false;
    list.innerHTML = `<tr><th>Wine</th><th>Glass</th><th>Bottle</th></tr>` + S.byTheGlass.map((w) =>
      `<tr><td><strong>${esc(w.name)}</strong><br>${esc(w.region || "")}</td><td>${esc(w.glass || "")}</td><td>${esc(w.bottle || "")}</td></tr>`).join("");
  }
  const chocText = $("#choc-text"); if (chocText) chocText.textContent = S.chocolate;
  const charText = $("#char-text"); if (charText) charText.textContent = S.charcuterie;

  // What's On: full calendar with filters
  const eventList = $("#event-list");
  if (eventList) {
    let filter = "all";
    const dateBox = (e) => `<div class="event-date"><span class="m">${e.d.toLocaleString("en-US", { month: "short" })}</span><span class="d">${e.d.getDate()}</span></div>`;
    const card = (e) => e.group === "closed" ? `
      <article class="event event-closed">
        ${dateBox(e)}
        <div class="event-body"><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div>
      </article>` : `
      <article class="event${e.image ? " has-img" : ""}">
        ${e.image ? `<img class="event-img" src="${esc(e.image)}" alt="" loading="lazy">` : ""}
        ${dateBox(e)}
        <div class="event-body">
          ${e.badge ? `<span class="badge">${esc(e.badge)}</span>` : ""}
          <h3>${esc(e.title)}</h3>
          <p class="when">${+e.d === +today ? '<strong class="tonight">Tonight</strong>' : weekday(e.d)} · ${esc(plain(e.time))}</p>
          <p>${esc(plain(e.text))}</p>
        </div>
        <div class="event-actions">
          ${safeUrl(e.link) ? `<a class="btn btn-small" href="${esc(e.link)}" target="_blank" rel="noopener">Tickets & RSVP</a>` : ""}
          <button class="cal-btn" type="button" data-cal="${e.i}" aria-label="Add ${esc(e.title)} to your calendar">Add to calendar</button>
        </div>
      </article>`;
    const render = () => {
      const shown = upcoming.filter((e) => filter === "all" || e.group === filter);
      eventList.innerHTML = shown.length
        ? shown.map(card).join("")
        : `<p class="empty">Nothing in this category on the calendar right now. The bar and the fire pit are open every day.</p>`;
    };
    $("#event-filters").addEventListener("click", (ev) => {
      const b = ev.target.closest(".chip");
      if (!b) return;
      $$("#event-filters .chip").forEach((c) => c.classList.toggle("active", c === b));
      filter = b.dataset.filter; render();
    });
    render();

    // "Add to calendar": downloads a .ics file for Apple, Google or Outlook
    const parseTime = (t) => {
      const m = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(t || "");
      if (!m) return null;
      let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12;
      return [h, +(m[2] || 0)];
    };
    const stamp = (date, [h, m]) => date.replace(/-/g, "") + "T" + String(h).padStart(2, "0") + String(m).padStart(2, "0") + "00";
    const icsText = (s) => String(s).replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
    eventList.addEventListener("click", (ev) => {
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
        "DTSTART;TZID=America/Los_Angeles:" + stamp(e.date, start),
        "DTEND;TZID=America/Los_Angeles:" + stamp(e.date, end),
        "SUMMARY:" + icsText(e.title + " at Cocoa Vino"),
        "DESCRIPTION:" + icsText(plain(e.text) + (safeUrl(e.link) ? "\n" + e.link : "")),
        "LOCATION:" + icsText("Cocoa Vino, 312 Capitola Ave, Capitola, CA 95010"),
        "END:VEVENT", "END:VCALENDAR",
      ].join("\r\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
      a.download = e.title.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "") + ".ics";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }

  // ---------- Search engines: BarOrPub with hours, an Event for each calendar item ----------
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const startIso = (e) => {
    const m = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(e.time || "");
    if (!m) return e.date;
    let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12;
    return `${e.date}T${String(h).padStart(2, "0")}:${m[2] || "00"}`;
  };
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Cocoa Vino",
    description: "Wine bar with a fire pit patio and live music in Capitola Village.",
    address: { "@type": "PostalAddress", streetAddress: "312 Capitola Ave", addressLocality: "Capitola", addressRegion: "CA", postalCode: "95010", addressCountry: "US" },
    ...(tel && { telephone: tel }),
    ...(safeUrl(S.instagram) && { sameAs: [S.instagram] }),
    openingHoursSpecification: Object.entries(S.hours).filter(([, h]) => h).map(([d, h]) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[d], opens: h[0], closes: h[1],
    })),
    event: upcoming.filter((e) => e.group !== "closed").map((e) => ({
      "@type": "Event", name: e.title, startDate: startIso(e), description: plain(e.text),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: "Cocoa Vino", address: "312 Capitola Ave, Capitola, CA 95010" },
      ...(safeUrl(e.link) && { url: e.link }),
    })),
  });
  document.head.appendChild(ld);

  // ---------- Map: Google Maps only loads when asked ----------
  const map = $("#map");
  if (map) map.querySelector(".map-load").addEventListener("click", () => {
    map.innerHTML = '<iframe title="Map to Cocoa Vino" referrerpolicy="strict-origin-when-cross-origin" src="https://www.google.com/maps?q=312+Capitola+Ave,+Capitola,+CA&output=embed"></iframe>';
  });

  // ---------- Forms ----------
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const say = (el, text, ok) => { el.textContent = text; el.className = "form-msg " + (ok ? "ok" : "error"); };

  const signup = $("#signup");
  if (signup) signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $("#form-msg");
    if (signup.company.value) return; // spam bot filled the hidden field
    if (!validEmail(signup.email.value.trim())) return say(msg, "That email doesn't look right. Mind checking it?");
    if (!S.newsletterFormAction) return say(msg, "Our email list isn't connected yet. Follow us on Instagram for this week's lineup.", true);
    const btn = signup.querySelector("button"); btn.disabled = true;
    try {
      await fetch(S.newsletterFormAction, { method: "POST", body: new FormData(signup), mode: "no-cors" });
      say(msg, "You're on the list. See you at the fire pit.", true);
      signup.reset();
    } catch { say(msg, "That didn't go through. Please try again."); }
    finally { btn.disabled = false; }
  });

  const eventForm = $("#event-form");
  if (eventForm) eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = eventForm;
    const msg = $("#event-msg");
    if (f.company.value) return;
    if (!f.name.value.trim() || !validEmail(f.email.value.trim()) || !f.date.value || !f.guests.value)
      return say(msg, "Please add your name, email, date and number of guests.");
    if (!S.privateEventsFormAction)
      return say(msg, tel ? `Thanks, ${f.name.value.trim()}. Online requests aren't connected yet, so please call ${S.phone} to book your date.` : "Online requests aren't connected yet. Please stop by the bar to book.", true);
    const btn = f.querySelector("button"); btn.disabled = true;
    try {
      await fetch(S.privateEventsFormAction, { method: "POST", body: new FormData(f), mode: "no-cors" });
      say(msg, "Request sent. We'll be in touch to confirm your date.", true);
      f.reset();
    } catch { say(msg, "That didn't go through. Please try again or give us a call."); }
    finally { btn.disabled = false; }
  });

  // ---------- Fade-in on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => io.observe(el));
})();
