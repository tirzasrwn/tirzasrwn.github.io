// Smooth scrolling for page links
$(".page-scroll").on("click", function (e) {
  e.preventDefault(); // Prevent default anchor click behavior
  var targetId = $(this).attr("href"); // Get the href attribute
  var targetElement = $(targetId); // Select the target element
  var offset = 60; // Offset for the scroll position

  // Animate the scroll to the target element
  $("html").animate(
    {
      scrollTop: targetElement.offset().top - offset,
    },
    500,
    "easeInOutExpo",
  );
});

// Typing animation class
class TypingAnimation {
  constructor(element, phrases, period) {
    this.phrases = phrases;
    this.element = element;
    this.loopIndex = 0;
    this.period = parseInt(period, 10) || 2000;
    this.currentText = "";
    this.isDeleting = false;
    this.startTyping();
  }

  startTyping() {
    const currentPhrase = this.phrases[this.loopIndex % this.phrases.length];

    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(
        0,
        this.currentText.length - 1,
      );
    } else {
      this.currentText = currentPhrase.substring(
        0,
        this.currentText.length + 1,
      );
    }

    this.element.innerHTML = `<span class="wrap">${this.currentText}</span>`;

    let typingSpeed = 200 - Math.random() * 100;

    if (this.isDeleting) {
      typingSpeed /= 2; // Speed up when deleting
    }

    if (!this.isDeleting && this.currentText === currentPhrase) {
      typingSpeed = this.period; // Pause at the end of the phrase
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false;
      this.loopIndex++;
      typingSpeed = 500; // Pause before starting the next phrase
    }

    setTimeout(() => this.startTyping(), typingSpeed);
  }
}

// Initialize typing animation on page load
window.onload = function () {
  const elements = document.getElementsByClassName("typewrite");
  for (let element of elements) {
    const phrases = JSON.parse(element.getAttribute("data-type"));
    const period = element.getAttribute("data-period");
    if (phrases) {
      new TypingAnimation(element, phrases, period);
    }
  }

  // Inject CSS for typing effect
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
  document.body.appendChild(style);
};

// Theme toggle functionality
const themeToggleButton = document.querySelector(".theme-toggle");
const bodyElement = document.body;

// Check local storage for theme preference
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  bodyElement.classList.add("dark-theme");
  themeToggleButton.innerHTML = '<i class="bi bi-sun"></i>';
}

// Toggle theme on button click
themeToggleButton.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-theme");
  if (bodyElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    themeToggleButton.innerHTML = '<i class="bi bi-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");
    themeToggleButton.innerHTML = '<i class="bi bi-moon-stars"></i>';
  }
});
