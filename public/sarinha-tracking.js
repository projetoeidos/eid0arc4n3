(function () {
  "use strict";

  var WEBHOOK = "https://arax.app.n8n.cloud/webhook/clique";
  var BOT_URL = "https://t.me/sarahninfabot";
  var REDIRECT_DELAY = 3000;
  var TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "gclid", "ttclid"];
  var sent = false;
  var redirected = false;

  function readCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : "";
  }

  function createClickId() {
    try {
      var stored = sessionStorage.getItem("sarinha_click_id");
      if (stored) return stored;
      var random = window.crypto && crypto.getRandomValues
        ? Array.from(crypto.getRandomValues(new Uint32Array(2)), function (number) { return number.toString(36); }).join("")
        : Math.random().toString(36).slice(2, 14);
      var id = Date.now().toString(36) + random.slice(0, 14);
      sessionStorage.setItem("sarinha_click_id", id);
      return id;
    } catch (_) {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
    }
  }

  var clickId = createClickId();
  var telegramUrl = BOT_URL + "?start=" + encodeURIComponent("sarinha__" + clickId);
  var link = document.getElementById("telegram-link");
  var seconds = document.getElementById("seconds");

  if (!link || !seconds) return;
  link.href = telegramUrl;

  function attributionPayload() {
    var source = new URLSearchParams(window.location.search);
    var fbclid = source.get("fbclid") || "";
    var payload = new URLSearchParams({
      cid: clickId,
      source: "sarinha",
      fbc: readCookie("_fbc") || (fbclid ? "fb.1." + Date.now() + "." + fbclid : ""),
      fbp: readCookie("_fbp"),
      url: window.location.href.split("#")[0],
      referrer: document.referrer || "",
      timestamp: new Date().toISOString(),
    });

    TRACKING_KEYS.forEach(function (key) {
      var value = source.get(key);
      if (value) payload.set(key, value);
    });

    return payload;
  }

  function sendTracking() {
    if (sent) return;
    sent = true;

    try {
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "TelegramRedirect", { source: "sarinha", click_id: clickId });
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

