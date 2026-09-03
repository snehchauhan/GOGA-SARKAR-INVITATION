document.addEventListener("DOMContentLoaded", function () {

  const page = document.getElementById("page");
  const openButton = document.getElementById("openButton");
  const opening = document.getElementById("opening");
  const doors = document.getElementById("doors");
  const music = document.getElementById("bgMusic");

  if (!page || !openButton) {
    console.error("Invitation setup failed: required elements are missing.");
    return;
  }

  let opened = false;

  openButton.addEventListener("click", function () {

    if (opened) {
      return;
    }

    opened = true;

    /* ================= MUSIC ================= */

    if (music) {

      music.volume = 0.65;

      const playMusic = music.play();

      if (playMusic !== undefined) {

        playMusic.catch(function () {
          console.log("Music playback was blocked by the browser.");
        });

      }
    }


    /* ================= START DOOR ANIMATION ================= */

    page.classList.add("is-opening");


    /* ================= REVEAL INVITATION ================= */

    setTimeout(function () {

      page.classList.add("is-open");

    }, 2000);


    /* ================= REMOVE DOORS ================= */

    setTimeout(function () {

      if (doors) {
        doors.style.display = "none";
      }

      if (opening) {
        opening.style.pointerEvents = "none";
      }

    }, 1500);

  });

});
