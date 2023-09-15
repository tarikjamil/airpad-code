window.onload = function () {
  // Put your ScrollTrigger initialization code here
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
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    });
  });
};
