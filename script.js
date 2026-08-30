(() => {
  "use strict";

  const page = document.getElementById("page");
  const opening = document.getElementById("opening");
  const openButton = document.getElementById("openButton");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  let opened = false;
  let musicAvailable = true;

  function startMusic() {
    if (!bgMusic) return;

    bgMusic.volume = 0.42;

    const playAttempt = bgMusic.play();

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        // Missing file, unsupported format, or another browser audio restriction.
        // The invitation itself remains fully functional.
        musicAvailable = false;
        musicToggle?.classList.add("is-muted");
        musicToggle?.setAttribute("aria-label", "Background music unavailable");
      });
    }
  }

  function openInvitation() {
    if (opened) return;
    opened = true;

    // The click is a trusted user gesture, so this is the ideal point to start audio.
    startMusic();

    page.classList.add("is-opening");
    openButton.disabled = true;

    // Let the doors travel before fully removing the opening layer.
    window.setTimeout(() => {
      page.classList.add("is-open");
      musicToggle.hidden = false;
      document.body.classList.add("invitation-open");
      opening.setAttribute("aria-hidden", "true");
    }, 1050);

    // Clean up the opening interaction after the cinematic transition.
    window.setTimeout(() => {
      page.classList.remove("is-opening");
    }, 1500);
  }

  openButton.addEventListener("click", openInvitation);

  musicToggle.addEventListener("click", () => {
    if (!bgMusic || !musicAvailable) return;

    if (bgMusic.paused) {
      const attempt = bgMusic.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {});
      }
      musicToggle.classList.remove("is-muted");
      musicToggle.setAttribute("aria-label", "Mute background music");
      musicToggle.setAttribute("aria-pressed", "false");
    } else {
      bgMusic.pause();
      musicToggle.classList.add("is-muted");
      musicToggle.setAttribute("aria-label", "Play background music");
      musicToggle.setAttribute("aria-pressed", "true");
    }
  });

  // If a music file is not supplied, hide the control instead of presenting
  // a broken audio UI. Put your MP3 at assets/music.mp3 to enable it.
  bgMusic.addEventListener("error", () => {
    musicAvailable = false;
    musicToggle.hidden = true;
  });

  // Prevent accidental double activation from keyboard/mouse combinations.
  openButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInvitation();
    }
  });
})();
