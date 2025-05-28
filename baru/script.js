document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('wedding-audio');
  const toggleBtn = document.getElementById('audioToggle');
  let isPlaying = false;

  toggleBtn.addEventListener('click', function () {
    if (isPlaying) {
      audio.pause();
      toggleBtn.textContent = '🔇';
    } else {
      audio.play();
      toggleBtn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
  });

function adminLogin() {
  const user = document.getElementById('admin-user').value;
  const pass = document.getElementById('admin-pass').value;
  const error = document.getElementById('admin-error');

  if (user === 'admin' && pass === 'admin123') {
    error.style.display = 'none';
    document.querySelector('.admin-login').style.display = 'none';
    document.getElementById('admin-rsvp').style.display = 'block';
    window.location.href = 'admin-rsvp.html';

    // Dummy data RSVP
    const rsvpList = [
      { nama: 'Andi', email: 'andi@mail.com', jumlah: 2 },
      { nama: 'Budi', email: 'budi@mail.com', jumlah: 1 },
      { nama: 'Citra', email: 'citra@mail.com', jumlah: 3 }
    ];

    const tbody = document.getElementById('rsvp-data');
    let totalKehadiran = 0;
    tbody.innerHTML = ''; // Kosongkan dulu
    rsvpList.forEach(item => {
      const row = `<tr>
        <td>${item.nama}</td>
        <td>${item.email}</td>
        <td>${item.jumlah}</td>
      </tr>`;
      tbody.innerHTML += row;
      totalKehadiran += item.jumlah;
    });

    // Tampilkan total jumlah kehadiran
    const totalBox = document.getElementById('total-kehadiran');
    totalBox.textContent = `Total Konfirmasi Kehadiran: ${totalKehadiran} orang`;

  } else {
    error.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const rsvpData = JSON.parse(localStorage.getItem('rsvpList')) || [];
  const tableBody = document.getElementById('rsvp-table');
  const jumlahHadir = document.getElementById('jumlah-hadir');

  let totalHadir = 0;

  rsvpData.forEach(item => {
    const row = document.createElement('tr');

    const nama = document.createElement('td');
    nama.textContent = item.nama;

    const email = document.createElement('td');
    email.textContent = item.email;

    const status = document.createElement('td');
    status.textContent = item.kehadiran;

    if (item.kehadiran.toLowerCase() === 'hadir') totalHadir++;

    row.appendChild(nama);
    row.appendChild(email);
    row.appendChild(status);
    tableBody.appendChild(row);
  });

  jumlahHadir.textContent = `Total tamu yang hadir: ${totalHadir} dari ${rsvpData.length}`;
});






  // === 2. SLIDER ===
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

  // === 3. SMOOTH SCROLL ===
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

  // === 4. STORY "READ MORE" ===
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

  // === 5. RSVP POPUP ===
  const rsvpForm = document.getElementById("rsvpForm");
  const overlay = document.getElementById("popupOverlay");
  const popup = document.getElementById("promoPopup");

  if (rsvpForm && overlay && popup) {
    rsvpForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = rsvpForm.name.value.trim();
      const attendance = rsvpForm.attendance.value;
      const content = popup.querySelector(".popup-content");

      content.innerHTML = attendance === "yes"
        ? `<span id="closePopup" class="close-popup">&times;</span>
           <h3>Terima kasih, ${name}!</h3>
           <p>Kami sangat senang Anda akan hadir 😊</p>
           <p>Sampai jumpa pada 1 Juli 2025!</p>`
        : `<span id="closePopup" class="close-popup">&times;</span>
           <h3>Terima kasih, ${name}</h3>
           <p>Sayang Anda tidak bisa bergabung ❤️</p>
           <p>Kami akan merindukan Anda!</p>`;

      overlay.style.display = "block";
      popup.style.display = "block";

      popup.querySelector("#closePopup").addEventListener("click", closePopup);
      overlay.addEventListener("click", closePopup);
    });
  }

  function closePopup() {
    overlay.style.display = "none";
    popup.style.display = "none";
    rsvpForm?.reset();
  }
});
