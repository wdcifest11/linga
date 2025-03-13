import { useRef } from "react";
import gsap from "gsap";
import "./EduBanner.scss";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function EduBanner() {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const textArray = [
    "Did you know? Fast fashion is responsible for 1.2 billion tons of greenhouse gases annually.",
    "And that amount is predicted to increase by 50% in 2030!",
    "Save your wardrobe. Save our earth. #Tradein Aja",
  ];

  useGSAP(() => {
    gsap
      .timeline({ repeat: -1, repeatDelay: 5 })
      .to(textRef.current, {
        duration: 1,
        text: textArray[0],
        ease: "power2.out",
      })
      .to(textRef.current, {
        duration: 1,
        text: textArray[1],
        ease: "power2.out",
        delay: 5
      })
      .to(textRef.current, {
        duration: 1,
        text: textArray[2],
        ease: "power2.out",
        delay: 5,
      });
  });

  return (
    <div className="eduBanner">
      <div className="eduBannerInner">
        <img
          className="bulb"
          src="/bulb.png"
          loading="lazy"
          alt="Did you know?"
        />
        <div ref={textContainerRef} className="eduText">
          <p ref={textRef}></p>
        </div>
      </div>
    </div>
  );
}
