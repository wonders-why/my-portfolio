import { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";

/* ─── Screen Transition ─────────────────────────────────── */
export function ScreenTransition({ state, nextMode, currentMode }) {
  if (state === "idle") return null;

  const bg = state === "expanding" 
    ? (nextMode === "fool" ? "#05030c" : "#0d1220") 
    : (currentMode === "fool" ? "#05030c" : "#0d1220");
    
  return (
    <motion.div
      initial={state === "expanding" ? { clipPath: "circle(0% at calc(100% - 66px) calc(100% - 81px))", opacity: 1 } : { opacity: 1, clipPath: "circle(150% at calc(100% - 66px) calc(100% - 81px))" }}
      animate={state === "expanding" ? { clipPath: "circle(150% at calc(100% - 66px) calc(100% - 81px))", opacity: 1 } : { opacity: 0, clipPath: "circle(150% at calc(100% - 66px) calc(100% - 81px))" }}
      transition={{ duration: 0.8, ease: [0.64, 0, 0.36, 1] }}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: bg, pointerEvents: "none"
      }}
    />
  );
}

/* ─── Tarot Card (top-center mode switcher) ──────────────────────── */
export function TarotCard({ mode, onFlip }) {
  const [flipping, setFlipping] = useState(false);
  const [flipped,  setFlipped]  = useState(false);
  const showFoolFront = mode === "fool" ? true : flipped;

  const handleClick = () => {
    if (flipping) return;
    setFlipping(true);
    setFlipped(f => !f);
    setTimeout(() => onFlip(), 300);
    setTimeout(() => setFlipping(false), 700);
  };

  return (
    <div
      onClick={handleClick}
      title={mode === "professional" ? "Flip to Fool Mode" : "Back to Pro Mode"}
      style={{ perspective:"800px", cursor:"pointer", userSelect:"none", width:52, height:82 }}
    >
      <div style={{
        width:"100%", height:"100%",
        position:"relative", transformStyle:"preserve-3d",
        transform: showFoolFront ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        borderRadius:7,
        boxShadow:"0 6px 24px rgba(0,0,0,0.55)",
      }}>
        {/* Back face */}
        <div style={{ position:"absolute", inset:0, borderRadius:7, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", overflow:"hidden" }}>
          <img src="/fool-card-back.jpg" alt="card back" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        </div>
        {/* Front face */}
        <div style={{ position:"absolute", inset:0, borderRadius:7, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", transform:"rotateY(180deg)", overflow:"hidden" }}>
          <img src="/fool-card-front.jpg" alt="The Fool" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        </div>
      </div>
    </div>
  );
}
