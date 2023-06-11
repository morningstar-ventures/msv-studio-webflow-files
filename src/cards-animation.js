import { gsap } from "gsap";

const ANIME = {
  speed: 0.6,
  ease: "power4.out"
}
const DOM = {
  SoftwareDevelopment: "#software-development-card",
  WebDesignCard: "#web-design-card",
  MarketingServicesCard: "#marketing-services-card",
  BusinessDevelopmentCard: "#business-development-card",
  strategyConsultingCard: "#strategy-consulting-card"
}

const softwareDevelopmentIcon = () => {

  const Card = document.querySelector(DOM.SoftwareDevelopment);
  const A = `${DOM.SoftwareDevelopment} .a`
  const B = `${DOM.SoftwareDevelopment} .b`
  const C = `${DOM.SoftwareDevelopment} .c`

  const timelineA = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineB = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineC = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});

  timelineA
    .to(A, {x: 41, y: -20, duration: ANIME.speed})
    .to(A, {x: 12, y: -45, duration: ANIME.speed})
    .to(A, {x: 0, y: 0, duration: ANIME.speed})

  timelineB
    .to(B, {x: 27, y: -13, duration: ANIME.speed})
    .to(B, {x: 8, y: -30, duration: ANIME.speed})
    .to(B, {x: 0, y: 0, duration: ANIME.speed})

  timelineC
    .to(C, {x: 13, y: -7, duration: ANIME.speed})
    .to(C, {x: 4, y: -15, duration: ANIME.speed})
    .to(C, {x: 0, y: 0, duration: ANIME.speed})

  Card.addEventListener("mouseenter", () => {
    timelineA.play();
    timelineB.play();
    timelineC.play();
  });

  Card.addEventListener("mouseleave", () => {
    timelineA.pause()
    timelineB.pause()
    timelineC.pause()
    gsap.to(A, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(B, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(C, {x: 0, y: 0, duration: ANIME.speed, onComplete: () => {
      timelineA.restart().pause()
      timelineB.restart().pause()
      timelineC.restart().pause()
    }});
  });

};

const webDesignCardIcon = () => {

  const Card = document.querySelector(DOM.WebDesignCard);
  const A = `${DOM.WebDesignCard} .a`
  const B = `${DOM.WebDesignCard} .b`
  const C = `${DOM.WebDesignCard} .c`
  const D = `${DOM.WebDesignCard} .d`

  const timelineA = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, ease: ANIME.ease});
  const timelineB = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, ease: ANIME.ease});
  const timelineC = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, ease: ANIME.ease});
  const timelineD = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, ease: ANIME.ease});

  gsap.set(A, { transformOrigin: "center center" });
  gsap.set(B, { transformOrigin: "center center" });
  gsap.set(C, { transformOrigin: "center center" });
  gsap.set(D, { transformOrigin: "center center" });

  timelineA
    .to(A, {rotate: 45, duration: ANIME.speed})
    .to(A, {rotate: 90, duration: ANIME.speed})
    .to(A, {rotate: 135, duration: ANIME.speed})

  timelineB
    .to(B, {rotate: 45, duration: ANIME.speed, delay: 0.11})
    .to(B, {rotate: 90, duration: ANIME.speed})
    .to(B, {rotate: 135, duration: ANIME.speed})

  timelineC
    .to(C, {rotate: 45,  duration: ANIME.speed, delay: 0.24})
    .to(C, {rotate: 90,  duration: ANIME.speed})
    .to(C, {rotate: 135,  duration: ANIME.speed})

  timelineD
    .to(D, {rotate: 45,  duration: ANIME.speed, delay: 0.35})
    .to(D, {rotate: 90,  duration: ANIME.speed})
    .to(D, {rotate: 135,  duration: ANIME.speed})

  Card.addEventListener("mouseenter", () => {
    timelineA.play();
    timelineB.play();
    timelineC.play();
    timelineD.play();
  });

  Card.addEventListener("mouseleave", () => {
    timelineA.pause()
    timelineB.pause()
    timelineC.pause()
    timelineD.pause()
    gsap.to(A, {rotation: 0,  duration: ANIME.speed});
    gsap.to(B, {rotation: 0,  duration: ANIME.speed});
    gsap.to(C, {rotation: 0,  duration: ANIME.speed});
    gsap.to(D, {rotation: 0,  duration: ANIME.speed, onComplete: () => {
        timelineA.restart().pause()
        timelineB.restart().pause()
        timelineC.restart().pause()
        timelineD.restart().pause()
      }});
  });

};

const marketingServicesCardIcon = () => {

  const Card = document.querySelector(DOM.MarketingServicesCard);
  const A = `${DOM.MarketingServicesCard} .a`
  const B = `${DOM.MarketingServicesCard} .b`
  const C = `${DOM.MarketingServicesCard} .c`

  const timelineA = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineB = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineC = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});

  timelineA
    .to(A, {x: 44, y: 25, duration: ANIME.speed})
    .to(A, {x: 15, y: -5, duration: ANIME.speed})
    .to(A, {x: 0, y: 0, duration: ANIME.speed})

  timelineB
    .to(B, {x: 29, y: 16, duration: ANIME.speed})
    .to(B, {x: 10, y: -4, duration: ANIME.speed})
    .to(B, {x: 0, y: 0, duration: ANIME.speed})

  timelineC
    .to(C, {x: 15, y: 8, duration: ANIME.speed})
    .to(C, {x: 5, y: -2, duration: ANIME.speed})
    .to(C, {x: 0, y: 0, duration: ANIME.speed})

  Card.addEventListener("mouseenter", () => {
    timelineA.play();
    timelineB.play();
    timelineC.play();
  });

  Card.addEventListener("mouseleave", () => {
    timelineA.pause()
    timelineB.pause()
    timelineC.pause()
    gsap.to(A, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(B, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(C, {x: 0, y: 0, duration: ANIME.speed, onComplete: () => {
        timelineA.restart().pause()
        timelineB.restart().pause()
        timelineC.restart().pause()
      }});
  });

};

const businessDevelopmentCardIcon = () => {

  const Card = document.querySelector(DOM.BusinessDevelopmentCard);
  const A = `${DOM.BusinessDevelopmentCard} .a`
  const B = `${DOM.BusinessDevelopmentCard} .b`
  const C = `${DOM.BusinessDevelopmentCard} .c`

  const timelineA = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineB = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineC = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});

  timelineA
    .to(A, {x: -25, y: -24, duration: ANIME.speed})
    .to(A, {x: 0, y: -24, duration: ANIME.speed})
    .to(A, {x: 0, y: 0, duration: ANIME.speed})

  timelineB
    .to(B, {x: -17, y: -16, duration: ANIME.speed})
    .to(B, {x: 0, y: -16, duration: ANIME.speed})
    .to(B, {x: 0, y: 0, duration: ANIME.speed})

  timelineC
    .to(C, {x: -9, y: -8, duration: ANIME.speed})
    .to(C, {x: 0, y: -8, duration: ANIME.speed})
    .to(C, {x: 0, y: 0, duration: ANIME.speed})

  Card.addEventListener("mouseenter", () => {
    timelineA.play();
    timelineB.play();
    timelineC.play();
  });

  Card.addEventListener("mouseleave", () => {
    timelineA.pause()
    timelineB.pause()
    timelineC.pause()
    gsap.to(A, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(B, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(C, {x: 0, y: 0, duration: ANIME.speed, onComplete: () => {
        timelineA.restart().pause()
        timelineB.restart().pause()
        timelineC.restart().pause()
      }});
  });

};

const strategyConsultingCardIcon = () => {

  const Card = document.querySelector(DOM.strategyConsultingCard);
  const A = `${DOM.strategyConsultingCard} .a`
  const B = `${DOM.strategyConsultingCard} .b`
  const C = `${DOM.strategyConsultingCard} .c`

  const timelineA = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineB = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
  const timelineC = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});

  timelineA
    .to(A, {x: -49, y: -49, duration: ANIME.speed})
    .to(A, {x: -24, y: -24, duration: ANIME.speed})
    .to(A, {x: 0, y: 0, duration: ANIME.speed})

  timelineB
    .to(B, {x: -32, y: -32, duration: ANIME.speed})
    .to(B, {x: -16, y: -16, duration: ANIME.speed})
    .to(B, {x: 0, y: 0, duration: ANIME.speed})

  timelineC
    .to(C, {x: -16, y: -16, duration: ANIME.speed})
    .to(C, {x: -8, y: -8, duration: ANIME.speed})
    .to(C, {x: 0, y: 0, duration: ANIME.speed})

  Card.addEventListener("mouseenter", () => {
    timelineA.play();
    timelineB.play();
    timelineC.play();
  });

  Card.addEventListener("mouseleave", () => {
    timelineA.pause()
    timelineB.pause()
    timelineC.pause()
    gsap.to(A, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(B, {x: 0, y: 0, duration: ANIME.speed});
    gsap.to(C, {x: 0, y: 0, duration: ANIME.speed, onComplete: () => {
        timelineA.restart().pause()
        timelineB.restart().pause()
        timelineC.restart().pause()
      }});
  });

};

const initAnimations = () => {
  softwareDevelopmentIcon()
  webDesignCardIcon()
  marketingServicesCardIcon()
  businessDevelopmentCardIcon()
  strategyConsultingCardIcon()
};

export default initAnimations;