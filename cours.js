document.addEventListener("DOMContentLoaded", function () {
  // Select all .tennis-ball elements
  let balls = document.querySelectorAll(".tennis-ball");

  // Animate based on the given nth-child
  balls.forEach((ball, index) => {
    let movement = 0; // Default movement value
    switch (
      (index + 1) %
      4 // +1 because nth-child is 1-based
    ) {
      case 1:
        movement = 5; // 4n+1
        break;
      case 2:
        movement = -6; // 4n+2
        break;
      case 3:
        movement = 8; // 4n+3
        break;
      case 0:
        movement = -10; // 4n+4
        break;
    }

    // Create the animation with GSAP and ScrollTrigger
    gsap.to(ball, {
      y: movement + "vw",
      scrollTrigger: {
        trigger: ball,
        start: "top bottom", // when the top of the ball hits the bottom of the viewport
        end: "bottom top", // when the bottom of the ball hits the top of the viewport
        scrub: true, // enables the scrubbing effect
        markers: true, // enables the markers
      },
    });
  });
});
