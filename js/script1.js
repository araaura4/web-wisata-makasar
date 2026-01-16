// Data untuk galeri popup
const galleryItems = [
  {
    type: "image",
    src: "/img/1.png",
    title: "Pantai Losari Siang Hari",
    description: "Pemandangan Pantai Losari di siang hari dengan langit biru dan air laut yang jernih.",
  },
  {
    type: "video",
    src: "/img/v1.mp4",
    title: "Ombak Pantai Losari",
    description: "Video ombak yang menyapu pinggir pantai dengan suara khas yang menenangkan.",
  },
  {
    type: "image",
    src: "/img/2.jpg",
    title: "Sunset di Pantai Losari",
    description: "Matahari terbenam dengan warna jingga yang memukau di Pantai Losari.",
  },
];
// Variabel global
let currentIndex = 0;
const modalOverlay = document.getElementById("modalOverlay");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCounter = document.getElementById("modalCounter");
const closeModalBtn = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const galleryItemsElements = document.querySelectorAll(".gallery-item");

// Fungsi untuk membuka modal
function openModal(index) {
  currentIndex = index;
  updateModal();
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Mencegah scroll di belakang modal
}

// Fungsi untuk menutup modal
function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto"; // Mengembalikan scroll
  // Hentikan video jika sedang diputar
  const video = modalMedia.querySelector("video");
  if (video) {
    video.pause();
  }
}

// Fungsi untuk memperbarui konten modal
function updateModal() {
  const item = galleryItems[currentIndex];

  // Update counter
  modalCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;

  // Update judul dan deskripsi
  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;

  // Update media
  if (item.type === "image") {
    modalMedia.innerHTML = `<img src="${item.src}" alt="${item.title}" />`;
  } else if (item.type === "video") {
    modalMedia.innerHTML = `
                    <video controls autoplay>
                        <source src="${item.src}" type="video/mp4" />
                        Browser Anda tidak mendukung pemutaran video.
                    </video>
                `;
  }
}

// Fungsi untuk navigasi ke item sebelumnya
function prevItem() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateModal();
}

// Fungsi untuk navigasi ke item berikutnya
function nextItem() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateModal();
}

// Event listener untuk item galeri
galleryItemsElements.forEach((item, index) => {
  item.addEventListener("click", () => {
    openModal(index);
  });
});

// Event listener untuk tombol navigasi
closeModalBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", prevItem);
nextBtn.addEventListener("click", nextItem);

// Tutup modal saat mengklik di luar konten modal
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Navigasi dengan keyboard
document.addEventListener("keydown", (e) => {
  if (!modalOverlay.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    prevItem();
  } else if (e.key === "ArrowRight") {
    nextItem();
  }
});

// Hover effect untuk item galeri
galleryItemsElements.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const video = this.querySelector("video");
    if (video) {
      video.play();
    }
  });

  item.addEventListener("mouseleave", function () {
    const video = this.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
});
