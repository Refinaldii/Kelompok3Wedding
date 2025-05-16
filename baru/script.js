document.addEventListener("DOMContentLoaded", () => {
  // 1. Audio Play/Pause
  const playButton = document.querySelector(".play-button");
  const audio = document.getElementById("wedding-audio");
  if (playButton && audio) {
    playButton.textContent = audio.paused ? "▶" : "❚❚";
    playButton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playButton.textContent = "❚❚";
      } else {
        audio.pause();
        playButton.textContent = "▶";
      }
    });
  }

  // 2. Slider
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let currentSlide = 0;
  function showSlide(i) {
    slides.forEach((s, idx) => s.style.display = idx === i ? "block" : "none");
  }
  if (slides.length) {
    showSlide(currentSlide);
    nextBtn?.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
    prevBtn?.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  // 3. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: topPos, behavior: "smooth" });
        if (history.pushState) history.pushState(null, null, targetId);
        else window.location.hash = targetId;
      }
    });
  });

  // 4. Story "Read More" Button
  const storyButton = document.querySelector(".story-button");
  storyButton?.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector("#detailed-story");
    if (target) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  });

  // 5. RSVP Popup
  const rsvpForm = document.getElementById("rsvpForm");
  const overlay = document.getElementById("popupOverlay");
  const popup   = document.getElementById("promoPopup");
  if (rsvpForm && overlay && popup) {
    rsvpForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = rsvpForm.name.value.trim();
      const attendance = rsvpForm.attendance.value;
      const content = popup.querySelector(".popup-content");
      
      // Set message
      if (attendance === "yes") {
        content.innerHTML = `
          <span id="closePopup" class="close-popup">&times;</span>
          <h3>Terima kasih, ${name}!</h3>
          <p>Kami sangat senang Anda akan hadir 😊</p>
          <p>Sampai jumpa pada 1 Juli 2025!</p>`;
      } else {
        content.innerHTML = `
          <span id="closePopup" class="close-popup">&times;</span>
          <h3>Terima kasih, ${name}</h3>
          <p>Sayang Anda tidak bisa bergabung ❤️</p>
          <p>Kami akan merindukan Anda!</p>`;
      }

      // Show popup
      overlay.style.display = "block";
      popup.style.display   = "block";

      // Close handler
      popup.querySelector("#closePopup").addEventListener("click", closePopup);
      overlay.addEventListener("click", closePopup);
    });
  }

  // Close popup function
  function closePopup() {
    overlay.style.display = "none";
    popup.style.display   = "none";
    rsvpForm?.reset();
  }
});
