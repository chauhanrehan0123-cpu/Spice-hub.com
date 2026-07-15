import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'button, a, input, select, textarea, [role="button"], .interactive-card'
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    // Run initially and set up an observer to watch for DOM updates
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Golden Cursor Main Pointer */}
      <motion.div
        id="custom-cursor-pointer"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-luxury-gold/50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.03)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Soft Ambient Cursor Background Light Glow */}
      <motion.div
        id="custom-cursor-glow"
        className="radial-glow pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-[150px] -translate-y-[150px] h-[300px] w-[300px] rounded-full opacity-60"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.3 : 1,
        }}
      />
    </>
  );
}
