gsap.registerPlugin(ScrollTrigger);

// On Page Load
function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "Quint.easeOut",
    duration: 0.5,
  }).from(
    "[animation=loading]",
    {
      y: "20rem",
      opacity: 0,
      stagger: { each: 0.1, from: "start" },
      ease: "Quint.easeOut",
      duration: 1,
    },
    "loadingAnimationsStart"
  );
}

function scrollFadeAnimation(selector) {
  $(selector).each(function () {
    let target = $(this);
    gsap.from(target, {
      y: "20rem",
      opacity: 0,
      ease: "Quint.easeOut",
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: "top bottom -=200",
        // markers: true // Uncomment for debugging
      },
    });
  });
}

// On Document Ready
$(document).ready(function () {
  pageLoad();
  scrollFadeAnimation("[animation=fade-overflow]");
  scrollFadeAnimation("[animation=fade]");
});

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
