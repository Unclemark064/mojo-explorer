// Enhanced Intersection Observer for faster animations
const observerOptions = {
  threshold: 0.05,
  rootMargin: "50px 0px -20px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-in")
  .forEach((el) => {
    observer.observe(el);
  });

// Enhanced sticky navigation
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

  // Hide/show header on scroll
  if (scrollTop > lastScrollTop && scrollTop > 300) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced newsletter form with validation
document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value.trim();

    if (!email || !isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = "Subscribing...";
    submitButton.disabled = true;

    setTimeout(() => {
      showNotification(
        "Thank you for subscribing! You'll receive our latest updates soon.",
        "success"
      );
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                backdrop-filter: blur(10px);
            `;

  if (type === "success") {
    notification.style.background =
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
  } else {
    notification.style.background =
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
  }

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Category card interactions
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", function () {
    // Add ripple effect
    const ripple = document.createElement("div");
    ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.marginLeft = ripple.style.marginTop = -(size / 2) + "px";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Stagger animations for blog cards
const blogCards = document.querySelectorAll(".blog-card");
const blogObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("animate");
      }, index * 100);
    }
  });
}, observerOptions);

blogCards.forEach((card) => {
  blogObserver.observe(card);
});

// Stagger animations for category cards
const categoryCards = document.querySelectorAll(".category-card");
const categoryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("animate");
      }, index * 150);
    }
  });
}, observerOptions);

categoryCards.forEach((card) => {
  categoryObserver.observe(card);
});

// Mobile menu toggle
document.querySelector(".mobile-menu")?.addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".blog-hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});
