document.documentElement.classList.remove("no-js");
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js");

document.addEventListener("DOMContentLoaded", function() {
  if (window.sessionStorage.dankMode == "true")
    document.querySelector("body").classList.add("dank");
});
