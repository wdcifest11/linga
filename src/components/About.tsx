import Spline from "@splinetool/react-spline";
import Overlay from "./Overlay";
import { useState } from "react";
import "./About.scss";
import Transition from "../assets/Transition";

function About() {
  const [splineLoaded, updateSplineLoaded] = useState(false);

  const onSplineLoad = () => {
    updateSplineLoaded(true);
  };

  return (
    <>
      <div className="aboutContainer">
        {splineLoaded && <Overlay />}
        <Spline
          scene="https://prod.spline.design/MmqgHBIeJTWJObrE/scene.splinecode"
          className="splineScene"
          onLoad={onSplineLoad}
        />
      </div>
    </>
  );
}

const WrappedAbout = Transition(About);

export { About };
export default WrappedAbout;
