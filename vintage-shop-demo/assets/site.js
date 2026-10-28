/* Small, dependency-free behavior for the demo.
   Works from a double-clicked file or from Netlify. */
(function () {
  var P = window.PRODUCTS || [];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Every tile links to the one fully written product page in this demo.
  function tile(p) {
    var sold = p.status === "sold";
    var foot = sold
      ? '<button type="button" class="tell-me" data-tell-me>Tell me if one like it turns up</button>'
      : '<span class="price">$' + p.price + '</span><span class="tile-meta">' + esc(p.era) + "</span>";
    return (
      '<article class="tile' + (sold ? " is-sold" : "") + '">' +
        '<a class="tile-link" href="product.html">' +
          '<span class="badge ' + (sold ? "badge-sold" : "badge-live") + '">' + (sold ? "Found a home" : "Only 1") + "</span>" +
          '<div class="ph tint-' + p.tint + '" role="img" aria-label="' + esc(p.alt) + '"><span class="ph-label" aria-hidden="true">' + esc(p.photo) + "</span></div>" +
          '<h3 class="tile-title">' + esc(p.title) + "</h3>" +
        "</a>" +
        '<p class="tile-found">' + esc(p.found) + "</p>" +
        '<div class="tile-foot">' + foot + "</div>" +
      "</article>"
    );
  }

  // Home: New Finds (8 live pieces)
  var newGrid = document.querySelector("[data-grid='new']");
  if (newGrid) {
    newGrid.innerHTML = P.filter(function (p) { return p.status === "live"; }).slice(0, 8).map(tile).join("");
  }

  // Shop: grid with filters
  var shopGrid = document.querySelector("[data-grid='shop']");
  if (shopGrid) {
    var form = document.getElementById("filters");
    var count = document.getElementById("result-count");
    var empty = document.getElementById("empty");
    var opts = window.FILTER_OPTIONS;
    var params = new URLSearchParams(window.location.search);

    ["type", "era", "material", "price"].forEach(function (key) {
      var sel = form.elements[key];
      opts[key].forEach(function (o) {
        var el = document.createElement("option");
        el.value = o[0]; el.textContent = o[1];
        sel.appendChild(el);
      });
      if (params.get(key)) sel.value = params.get(key);
    });

    function render() {
      var f = {
        type: form.elements.type.value,
        era: form.elements.era.value,
        material: form.elements.material.value,
        price: form.elements.price.value
      };
      var list = P.filter(function (p) {
        if (f.type && p.type !== f.type) return false;
        if (f.era && p.era !== f.era) return false;
        if (f.material && p.material !== f.material) return false;
        if (f.price) {
          var r = f.price.split("-").map(Number);
          if (p.price < r[0] || p.price >= r[1]) return false;
        }
        return true;
      });
      // live pieces first, sold pieces stay visible at the end
      list.sort(function (a, b) { return (a.status === "sold") - (b.status === "sold"); });
      shopGrid.innerHTML = list.map(tile).join("");
      var live = list.filter(function (p) { return p.status === "live"; }).length;
      count.textContent = live + (live === 1 ? " piece" : " pieces") + " up for grabs, " + (list.length - live) + " already found a home";
      empty.hidden = list.length !== 0;

      var q = new URLSearchParams();
      Object.keys(f).forEach(function (k) { if (f[k]) q.set(k, f[k]); });
      var qs = q.toString();
      try { history.replaceState(null, "", qs ? "?" + qs : window.location.pathname); } catch (e) {}
    }

    form.addEventListener("change", render);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.addEventListener("reset", function () { setTimeout(render, 0); });
    render();
  }

  // "Tell me if one like it turns up"
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tell-me]");
    if (!b) return;
    b.textContent = "Got it. I'll keep an eye out.";
    b.disabled = true;
  });

  // Email signup (demo only, nothing is sent)
  document.querySelectorAll("[data-signup]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var done = f.parentNode.querySelector(".signup-done");
      f.hidden = true;
      if (done) done.hidden = false;
    });
  });

  // Hero line options (demo only): ?hero=1, 2 or 3, or click the buttons
  var heroes = document.querySelectorAll("[data-hero]");
  if (heroes.length) {
    var pick = new URLSearchParams(window.location.search).get("hero") || "1";
    var buttons = document.querySelectorAll("[data-hero-pick]");
    function show(n) {
      heroes.forEach(function (h) { h.hidden = h.getAttribute("data-hero") !== n; });
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-hero-pick") === n ? "true" : "false"); });
    }
    buttons.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-hero-pick")); }); });
    show(pick);
  }
})();
