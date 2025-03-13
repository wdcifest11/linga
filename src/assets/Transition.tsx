import { motion } from "framer-motion";
import "../App.scss";

export default function Transition(Component: React.FC) {
  return function WrappedComponent() {
    return (
      <>
        <Component />
        <motion.div
          className="transit-in"
          initial={{ scaleX: 0, translateX: "-100%", transformOrigin: "left" }}
          animate={{ scaleX: [0, 1, 1, 0], translateX: ["-100%", "0%", "0%", "100%"] }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </>
    );
  };
}
