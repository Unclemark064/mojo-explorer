// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
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

// Enhanced contact form with validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form elements
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const inquiry = document.getElementById("inquiry").value;
  const destination = document.getElementById("destination").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation
  if (!name || !email || !inquiry || !message) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  setTimeout(() => {
    showNotification(
      "Thank you for your message! We'll get back to you within 24 hours.",
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

// Mobile menu toggle (if needed in future)
document.querySelector(".mobile-menu")?.addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Enhanced form field animations
document
  .querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea"
  )
  .forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)";
    });

    field.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
    });
  });

// Faster stagger animations for service cards
const serviceCards = document.querySelectorAll(".service-card");
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Reduced delay from 200ms to 100ms
      setTimeout(() => {
        entry.target.classList.add("animate");
      }, index * 100);
    }
  });
}, observerOptions);

serviceCards.forEach((card) => {
  serviceObserver.observe(card);
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isOpen = answer.style.maxHeight;

    // Close all other answers
    document.querySelectorAll('.faq-answer').forEach(a => {
      a.style.maxHeight = null;
      a.previousElementSibling.classList.remove('active');
    });

    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      question.classList.add('active');
    } else {
      question.classList.remove('active');
    }
  });
});