(function () {
  "use strict";

  var WEBHOOK = "https://arax.app.n8n.cloud/webhook/clique";
  var REDIRECT_DELAY = 3000;
  var TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "gclid", "ttclid"];
  var root = document.getElementById("telegram-redirect");
  var link = document.getElementById("telegram-link");
  var seconds = document.getElementById("seconds");
  var sent = false;
  var redirected = false;

  if (!root || !link || !seconds) return;

  var sourceName = root.getAttribute("data-source") || "telegram";
  var botUrl = root.getAttribute("data-bot-url") || "https://t.me";

  function readCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : "";
  }

  function createClickId() {
    try {
      var storageKey = sourceName + "_click_id";
      var stored = sessionStorage.getItem(storageKey);
      if (stored) return stored;
      var random = window.crypto && crypto.getRandomValues
        ? Array.from(crypto.getRandomValues(new Uint32Array(2)), function (number) { return number.toString(36); }).join("")
        : Math.random().toString(36).slice(2, 14);
      var id = Date.now().toString(36) + random.slice(0, 14);
      sessionStorage.setItem(storageKey, id);
      return id;
    } catch (_) {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
    }
  }

  var clickId = createClickId();
  var telegramUrl = botUrl + "?start=" + encodeURIComponent(sourceName + "__" + clickId);
  link.href = telegramUrl;

  function attributionPayload() {
    var query = new URLSearchParams(window.location.search);
    var fbclid = query.get("fbclid") || "";
    var payload = new URLSearchParams({
      cid: clickId,
      source: sourceName,
      fbc: readCookie("_fbc") || (fbclid ? "fb.1." + Date.now() + "." + fbclid : ""),
      fbp: readCookie("_fbp"),
      url: window.location.href.split("#")[0],
      referrer: document.referrer || "",
      timestamp: new Date().toISOString(),
    });

    TRACKING_KEYS.forEach(function (key) {
      var value = query.get(key);
      if (value) payload.set(key, value);
    });

    return payload;
  }

  function sendTracking() {
    if (sent) return;
    sent = true;

    try {
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "TelegramRedirect", { source: sourceName, click_id: clickId });
      }
    } catch (_) {}

    try {
      var endpoint = WEBHOOK + "?" + attributionPayload().toString();
      if (!(navigator.sendBeacon && navigator.sendBeacon(endpoint))) {
        fetch(endpoint, { method: "POST", mode: "no-cors", keepalive: true }).catch(function () {});
      }
    } catch (_) {}
  }

  function redirect() {
    if (redirected) return;
    redirected = true;
    sendTracking();
    window.location.assign(telegramUrl);
  }

  link.addEventListener("click", function (event) {
    event.preventDefault();
    redirect();
  });

  window.addEventListener("pagehide", sendTracking, { once: true });

  var startedAt = Date.now();
  var timer = window.setInterval(function () {
    var remaining = Math.max(0, Math.ceil((REDIRECT_DELAY - (Date.now() - startedAt)) / 1000));
    seconds.textContent = String(remaining);
    if (remaining === 0) window.clearInterval(timer);
  }, 150);

  window.setTimeout(sendTracking, 250);
  window.setTimeout(redirect, REDIRECT_DELAY);
})();
