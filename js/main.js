const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navList = document.querySelector("[data-nav-list]");
const navLinks = document.querySelectorAll(".nav-list a");
const themeToggle = document.querySelector("[data-theme-toggle]");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const linkedInLink = document.querySelector('.social-links a[href*="linkedin.com"]');
const revealElements = document.querySelectorAll(".reveal");

const state = {
  theme: localStorage.getItem("theme") || "light",
  isMenuOpen: false,
};

const renderTheme = () => {
  document.documentElement.dataset.theme = state.theme;
  themeToggle.textContent = state.theme === "dark" ? "라이트 모드" : "다크 모드";
};

const renderMenu = () => {
  navList.classList.toggle("active", state.isMenuOpen);
  menuToggle.setAttribute("aria-expanded", String(state.isMenuOpen));
  menuToggle.setAttribute("aria-label", state.isMenuOpen ? "메뉴 닫기" : "메뉴 열기");
};

const handleScroll = () => {
  const isScrolled = window.scrollY > 60;
  const linkedInTop = linkedInLink.getBoundingClientRect().top;
  const buttonBottom = Math.max(18, window.innerHeight - linkedInTop + 16);

  header.classList.toggle("scrolled", isScrolled);
  scrollTopButton.classList.toggle("visible", window.scrollY > 300);
  scrollTopButton.style.setProperty("--scroll-top-bottom", `${buttonBottom}px`);
};

menuToggle.addEventListener("click", () => {
  state.isMenuOpen = !state.isMenuOpen;
  renderMenu();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    state.isMenuOpen = false;
    renderMenu();
  });
});

themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", state.theme);
  renderTheme();
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));
renderTheme();
renderMenu();
handleScroll();
