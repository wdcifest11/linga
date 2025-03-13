import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import "./Overlay.scss";

gsap.registerPlugin(TextPlugin);

export default function Overlay() {
  const titleRef = useRef(null);
  const [whichState, setState] = useState(0);

  useEffect(() => {
    console.log(`${whichState}`);

    const FULL_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    const ZERO_CLIP = "polygon(0 0, 0 0, 0 100%, 0 100%)";
    const WIPE_OUT_CLIP = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

    if (whichState === 0) {
      setTimeout(() => {
        gsap.set(".title", {
          clipPath: FULL_CLIP,
          visibility: "visible",
        });
        gsap.set(".stateOne, .stateTwo, .stateThree", {
          clipPath: ZERO_CLIP,
          visibility: "visible",
        });
      });
      return;
    }

    const disablePointerEvents = {
      onStart: () => {
        document.getElementById("clickBlocker")!.style.display = "block";
      },
      onComplete: () => {
        setTimeout(() => {
          document.getElementById("clickBlocker")!.style.display = "none";
        });
      },
    };

    const animations = [
      () => {
        gsap
          .timeline({ defaults: { duration: 1 } })
          .to(".title", { clipPath: WIPE_OUT_CLIP, ...disablePointerEvents })
          .to(
            ".stateOne",
            { clipPath: FULL_CLIP, ...disablePointerEvents },
            "-=0.3"
          );
      },
      () => {
        gsap
          .timeline({ defaults: { duration: 1 } })
          .to(".stateOne", {
            clipPath: WIPE_OUT_CLIP,
            ...disablePointerEvents,
          })
          .to(
            ".stateTwo",
            { clipPath: FULL_CLIP, ...disablePointerEvents },
            "-=0.3"
          );
      },
      () => {
        gsap
          .timeline({ defaults: { duration: 1 } })
          .to(".stateTwo", {
            clipPath: WIPE_OUT_CLIP,
            ...disablePointerEvents,
          })
          .to(
            ".stateThree",
            {
              clipPath: FULL_CLIP,
              ...disablePointerEvents,
            },
            "-=0.3"
          );
      },
      () => {
        gsap
          .timeline({ defaults: { duration: 1 } })
          .to(".stateThree", {
            clipPath: WIPE_OUT_CLIP,
            ...disablePointerEvents,
          })
          .to(".title", {
            clipPath: FULL_CLIP,
            ...disablePointerEvents,
          });
      },
    ];

    animations[whichState - 1]?.();
  }, [whichState]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, { duration: 1.5, text: "Tradein<br/>Aja!" });
    }

    const handleClick = () => {
      if (document.getElementById("clickBlocker")!.style.display === "block")
        return;

      setState((prev) => {
        if (prev === 3) {
          setTimeout(() => setState(0), 200);
          return prev;
        }
        return (prev + 1) % 4;
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div className="overlayContainer" id="overlayContainer">
      <div className="clickBlocker" id="clickBlocker"></div>
      <div className="clickContinue title">Click to continue &gt;&gt;</div>
      <div className="title" id="title">
        <div className="hashtag" id="hashtag">
          <img className="hashtagImage" src="./hashtag.png" alt="Hashtag" />
        </div>
        <div className="titleText" id="titleText">
          <p className="titleTextp" ref={titleRef} id="titleTextp"></p>
        </div>
      </div>

      <div className="stateTextContainer stateOne" id="stateOneTextContainer">
        <p className="stateTextTitle" id="stateOneTitle">
          What is Tradein?
        </p>
        <p className="stateText" id="stateOneText">
          Tradein is a movement that encourages people to lessen pollution
          caused by the clothing industry.
        </p>
      </div>

      <div className="stateTextContainer stateTwo" id="stateTwoTextContainer">
        <p className="stateTextTitle" id="stateTwoTitle">
          What do we do?
        </p>
        <p className="stateText" id="stateTwoText">
          We help by providing features to buy, sell, trade, or even donate
          second-hand clothes!
        </p>
      </div>

      <div
        className="stateTextContainer stateThree"
        id="stateThreeTextContainer"
      >
        <p className="stateText" id="stateThreeText">
          Ready to make an impact?
        </p>
        <div className="getStarted">
          <a
            href="shop"
            className="getStartedText"
            onClick={(e) => e.stopPropagation()}
          >
            Get started &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
