import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "./Loading.scss";

export default function Loading() {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotate: "+=360",
        duration: 2,
        ease: "power4.inOut",
        repeat: -1,
      });
    }
  }, []);

  return (
    <div className="loadingContainer">
      <img ref={imageRef} src="/logo.png" className="loadingLogo" />
    </div>
  );
}
