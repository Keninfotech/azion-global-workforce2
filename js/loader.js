(function () {
  function hideLoader(root, video) {
    if (!root) return;

    if (video) {
      video.pause();
    }

    document.body.classList.remove("is-loading");
    root.classList.add("is-fading-out");
    window.dispatchEvent(new CustomEvent("loader-complete"));

    window.setTimeout(() => {
      root.style.display = "none";
    }, 600);
  }

  function init() {
    const root = document.getElementById("page-loader");
    if (!root) return;

    const video = document.getElementById("loader-video");
    document.body.classList.add("is-loading");

    if (!video) {
      hideLoader(root, null);
      return;
    }

    const finishLoader = () => hideLoader(root, video);
    let playbackStarted = false;
    let fallbackTimer = null;

    const clearFallbackTimer = () => {
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
    };

    const scheduleFallback = () => {
      clearFallbackTimer();

      if (Number.isFinite(video.duration) && video.duration > 0) {
        fallbackTimer = window.setTimeout(finishLoader, Math.max(video.duration * 1000 + 400, 4000));
      } else {
        fallbackTimer = window.setTimeout(finishLoader, 10000);
      }
    };

    const startPlayback = () => {
      if (playbackStarted) return;
      playbackStarted = true;

      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          scheduleFallback();
        });
      }
    };

    video.addEventListener("ended", () => {
      clearFallbackTimer();
      finishLoader();
    }, { once: true });

    video.addEventListener("loadedmetadata", scheduleFallback, { once: true });
    video.addEventListener("durationchange", scheduleFallback, { once: true });

    if (video.readyState >= 2) {
      startPlayback();
      scheduleFallback();
    } else {
      video.addEventListener("loadeddata", startPlayback, { once: true });
      video.addEventListener("canplay", startPlayback, { once: true });
      video.addEventListener("canplaythrough", () => {
        startPlayback();
        scheduleFallback();
      }, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
