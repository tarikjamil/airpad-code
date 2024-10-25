gsap.registerPlugin(ScrollTrigger);

// On Page Load
function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "Quint.easeOut",
    duration: 0.5,
  });

  // Add a label to mark the starting point of simultaneous animations
  tl.add("loadingAnimationsStart");

  // Add the 'loading' animation and set its position to the label
  tl.from(
    "[animation=loading]",
    {
      y: "20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "Quint.easeOut",
      duration: 1,
    },
    "loadingAnimationsStart"
  );

  // Add the 'loading-reverse' animation and set its position to the label
  tl.from(
    "[animation=loading-reverse]",
    {
      y: "-20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "Quint.easeOut",
      duration: 1,
    },
    "loadingAnimationsStart"
  );
}

pageLoad();

window.onload = function () {
  // Animation for .tennis-ball elements
  let balls = document.querySelectorAll(".tennis-ball");
  balls.forEach((ball, index) => {
    let movement = 0;
    switch ((index + 1) % 4) {
      case 1:
        movement = 5;
        break;
      case 2:
        movement = -6;
        break;
      case 3:
        movement = 8;
        break;
      case 0:
        movement = -10;
        break;
    }

    gsap.to(ball, {
      y: movement + "vw",
      scrollTrigger: {
        trigger: ball,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });
  });

  // Refresh ScrollTrigger after 1 second
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
};

$(document).ready(function () {
  var $navbar = $(".navbar");
  var $reserveBtn = $(".reserve--btn");
  var $hamburgerWrapper = $(".hamburger-wrapper");

  function handleClick($element, $otherElement) {
    var count = $element.data("clicked") || 0;

    // Increment or initialize the click count
    count += 1;
    $element.data("clicked", count);

    // Check if the other button was clicked
    var otherClicked = $otherElement.data("clicked") || 0;

    if (count == 1) {
      $navbar.addClass("is--active");
    } else if (count == 2) {
      // If the other button was clicked once and this one is clicked twice, just reset the clicked element.
      if (otherClicked == 1) {
        $element.data("clicked", 0);
      } else {
        $navbar.removeClass("is--active");
        $element.data("clicked", 0);
      }
    } else if (count == 2 && otherClicked == 2) {
      // If both elements are clicked twice
      $navbar.removeClass("is--active");
      $reserveBtn.data("clicked", 0);
      $hamburgerWrapper.data("clicked", 0);
    }
  }

  $reserveBtn.on("click", function () {
    handleClick($(this), $hamburgerWrapper);
  });

  $hamburgerWrapper.on("click", function () {
    handleClick($(this), $reserveBtn);
  });
});

// accordion --------------------- //
$(".home--accordion-trigger").on("click", function () {
  // Close other accordions when opening new one
  if (!$(this).hasClass("open")) {
    $(".home--accordion-trigger.open").click();
  }
  // Save the sibling of the toggle we clicked on
  let sibling = $(this).siblings(".home--accordion--response");
  let animationDuration = 500;

  if ($(this).hasClass("open")) {
    // Close the content div if already open
    sibling.animate({ height: "0px" }, animationDuration);
  } else {
    // Open the content div if already closed
    sibling.css("height", "auto");
    let autoHeight = sibling.height();
    sibling.css("height", "0px");
    sibling.animate({ height: autoHeight }, animationDuration, () => {
      sibling.css("height", "auto");
    });
  }
  // Open and close the toggle div
  $(this).toggleClass("open");
});

// faq toggle animation --------------------- //
$(".button.is--faq").on("click", function () {
  // Save the .faq-wrapper.is--second div which needs to be animated
  let faqSecondWrapper = $(".faq-wrapper.is--second");
  let animationDuration = 500;

  if (faqSecondWrapper.height() === 0) {
    // If the height is 0, we want to animate it to 'auto'

    // Temporarily set height to auto to calculate the height it should have
    faqSecondWrapper.css("height", "auto");
    let autoHeight = faqSecondWrapper.height(); // Get the natural height

    // Set height back to 0 then animate to the autoHeight
    faqSecondWrapper.height(0);
    faqSecondWrapper.animate(
      { height: autoHeight },
      animationDuration,
      function () {
        faqSecondWrapper.css("height", "auto"); // Reset to auto for responsive behavior
      }
    );
  } else {
    // If the height is not 0, we want to animate it back to 0
    faqSecondWrapper.animate({ height: "0" }, animationDuration);
  }
});

// marquee is--scrolling
const scrollSpeed = 40; // pixels per second, adjust as needed

function updateScrollingSpeed() {
  document.querySelectorAll(".is--scrolling-js").forEach((element) => {
    const scrollWidth = element.offsetWidth;
    const duration = scrollWidth / scrollSpeed; // seconds

    element.style.setProperty("--scroll-width", `${scrollWidth}px`);
    element.style.animationDuration = `${duration}s`;
  });
}

// Call initially
updateScrollingSpeed();

// Update on window resize
window.addEventListener("resize", updateScrollingSpeed);

document.addEventListener("DOMContentLoaded", function () {
  // Event listener for French link
  document.getElementById("link-fr").addEventListener("click", function (e) {
    e.preventDefault();
    changeLanguage("");
  });

  // Event listener for English link
  document.getElementById("link-en").addEventListener("click", function (e) {
    e.preventDefault();
    changeLanguage("en");
  });

  // Event listener for German link
  document.getElementById("link-de").addEventListener("click", function (e) {
    e.preventDefault();
    changeLanguage("de");
  });

  function changeLanguage(lang) {
    var path = window.location.pathname;

    // Logic to construct the new URL based on the current path and selected language
    var newPath = path.split("/").filter(Boolean);
    if (["en", "de", "fr"].includes(newPath[0])) {
      newPath.shift();
    }
    newPath = "/" + lang + (lang ? "/" : "") + newPath.join("/");

    
    // Redirecting to the new URL
    window.location.href = window.location.origin + newPath;
  }
});
