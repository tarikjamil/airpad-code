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
  ); // <-- position parameter set to the label

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
  ); // <-- position parameter set to the label
}

pageLoad();

$("[animation=fade-overflow]").each(function (index) {
  let target = $(this);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top bottom -=200",
    },
  });

  tl.from(
    target,
    {
      y: "20rem",
      opacity: 0,
      ease: "Quint.easeOut",
      duration: 1,
    },
    0
  );
});

$("[animation=fade]").each(function (index) {
  let target = $(this);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top bottom -=200",
    },
  });

  tl.from(
    target,
    {
      y: "20rem",
      opacity: 0,
      ease: "Quint.easeOut",
      duration: 1,
    },
    0
  );
});

$(document).ready(function () {
  var $navbar = $(".navbar");
  var $reserveBtn = $(".reserve--btn");
  var $hamburgerWrapper = $(".hamburger-wrapper");

  function checkBothClickedOnce() {
    return (
      $reserveBtn.data("clicked") == 1 && $hamburgerWrapper.data("clicked") == 1
    );
  }

  function handleClick($element) {
    var count = $element.data("clicked") || 0;

    // If it's the second click on the same element and both haven't been clicked once
    if (count == 1 && !checkBothClickedOnce()) {
      $navbar.removeClass("is--active");
      $element.data("clicked", 0);
      return;
    }

    // Otherwise, increment or initialize the click count
    $element.data("clicked", count + 1);

    if ($element.data("clicked") == 1) {
      $navbar.addClass("is--active");
    }

    if (checkBothClickedOnce()) {
      // Reset both click counts when both are clicked once
      $reserveBtn.data("clicked", 0);
      $hamburgerWrapper.data("clicked", 0);
    }
  }

  $reserveBtn.on("click", function () {
    handleClick($(this));
  });

  $hamburgerWrapper.on("click", function () {
    handleClick($(this));
  });
});
