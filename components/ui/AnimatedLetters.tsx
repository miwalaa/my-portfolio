"use client";
import { motion } from "framer-motion";

interface AnimatedLettersProps {
  text: string;
  delay?: number;
}

export default function AnimatedLetters({ text, delay = 0 }: AnimatedLettersProps) {
  return (
    <span className="inline-block">
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block text-white transition-all duration-100 ease-out"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.03, duration: 0.2 }}
          whileHover={{
            scale: 1.2,
            color: "#22c55e",
            transition: { duration: 0.08 },
          }}
          whileTap={{ scale: 1.1 }}
        >
          {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
        </motion.span>
      ))}
    </span>
  );
}
