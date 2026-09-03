```javascript
document.addEventListener("DOMContentLoaded", () => {

  const page = document.getElementById("page");
  const openButton = document.getElementById("openButton");
  const bgMusic = document.getElementById("bgMusic");

  if (!page || !openButton) {
    console.error("Invitation elements not found.");
    return;
  }

  let opened = false;

  openButton.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    /*
     * Start music after the user's tap.
     * This is important because mobile browsers
     * normally block automatic audio playback.
     */

    if (bgMusic) {

      bgMusic.volume = 0.65;

      bgMusic.play().catch((error) => {
        console.log("Music could not start:", error);
      });

    }

    /*
     * Start cinematic doors.
     */

    page.classList.add("is-opening");

    /*
     * Reveal invitation.
     */

    setTimeout(() => {
      page.classList.add("is-open");
    }, 950);

  });

});
```
