import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Portfolio from "./Portfolio";
import { ScreenTransition, TarotCard } from "./FoolMode";

export default function App() {
  const [mode, setMode] = useState("professional");
  const [animState, setAnimState] = useState("idle");

  const flip = useCallback(() => {
    if (animState !== "idle") return;
    setAnimState("expanding");
    
    setTimeout(() => {
      setMode(m => m === "professional" ? "fool" : "professional");
      setAnimState("contracting");
      
      setTimeout(() => {
        setAnimState("idle");
      }, 800);
    }, 800);
  }, [animState]);

  const nextMode = mode === "professional" ? "fool" : "professional";

  return (
    <>
      <ScreenTransition state={animState} nextMode={nextMode} currentMode={mode} />
      
      <div style={{ position: "fixed", bottom: 40, right: 40, zIndex: 9999 }}>
        <motion.div
           whileHover={{ scale: 1.08, rotate: mode === "fool" ? -5 : 5 }}
           transition={{ type: "spring", stiffness: 300 }}
           style={{ opacity: 0.95 }}
        >
          <TarotCard mode={mode} onFlip={flip} />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Portfolio mode={mode} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}