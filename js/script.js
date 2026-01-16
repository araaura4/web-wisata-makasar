// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu");
const navMenu = document.getElementById("navMenu");

mobileMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenu.innerHTML = navMenu.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on a link
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input").value;
  alert(`Terima kasih! Email ${email} telah berhasil didaftarkan untuk menerima info wisata terbaru.`);
  this.reset();
});
