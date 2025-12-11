// 1. Variables & Selections
const navLinks = document.querySelectorAll(".ul-list li a");
const sections = document.querySelectorAll("section");
const backToTop = document.getElementById("back-to-top");
const revealElements = document.querySelectorAll(
  ".home-container, .about-container, .projects-container, .services-container, .contact-content"
);

// 2. Helper to remove active class from nav
function removeActive() {
  navLinks.forEach((link) => link.parentElement.classList.remove("active"));
}

// 3. Smooth Scroll Click Handler
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: "smooth",
    });

    removeActive();
    link.parentElement.classList.add("active");
  });
});

// 4. Scroll Event Listener (Scroll Spy & Animations)
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 100;

  // Update Active Nav Link
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      removeActive();
      const activeLink = document.querySelector(
        `.ul-list li a[href="#${section.id}"]`
      );
      if (activeLink) activeLink.parentElement.classList.add("active");
    }
  });

  // Show/Hide Back To Top Button
  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  // Reveal Elements on Scroll
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active-reveal");
    }
  });
});

// Initialize reveal class
revealElements.forEach((el) => el.classList.add("reveal"));

// 5. Back to Top Click Event
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 6. Typing Effect Logic
const typingElement = document.querySelector(".info-home h3");
const words = [
  "Data Analyst",
  "Python Developer",
  "Power BI Expert",
  "Excel Specialist",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    if(!typingElement) return; 
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1200);
    }
}

// 7. Loading Screen Animation (Fast Version)
document.addEventListener("DOMContentLoaded", () => {
  type(); // Start typing effect immediately

  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay) {
    if(!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  // --- Animation Timeline ---
  
  // 1. "MY PROFILE" text - Immediate
  showElement(loadingText, 100);

  // 2. Main Laptop Icon - 0.4s
  showElement(mainIcon, 400); 

  // 3. Sub Icons - Rapid fire starting at 0.7s
  subIcons.forEach((icon, idx) => {
    showElement(icon, 700 + (idx * 150)); 
  });

  // 4. "Designed by Bharath" - 1.3s
  showElement(designerText, 1300);

  // 5. Fade Out Loading Screen - 2.3s
  setTimeout(() => {
    if(loadingScreen) {
        loadingScreen.style.opacity = "0"; // Fade out
        
        // Remove from display after fade completes
        setTimeout(() => {
            loadingScreen.style.display = "none";
            if(mainPage) mainPage.classList.add("visible"); // Show main content
        }, 500);
    }
  }, 2300); 
});