document.addEventListener("DOMContentLoaded", () => {
    // Audio Play/Pause
    const playButton = document.querySelector(".play-button");
    const audio = document.getElementById("wedding-audio");
  
    if (playButton && audio) {
      // Set initial state
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
  
    // Slider
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    let currentSlide = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
    }
  
    if (slides.length > 0) {
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
  
    // Smooth Scroll for Anchor Links (HOME, ABOUT, STORY, dll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        
      });
    });

    // Tombol khusus di dalam story section (misalnya "Read More")
    const storyButton = document.querySelector(".story-button");
    if (storyButton) {
      storyButton.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector("#detailed-story");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
  
  