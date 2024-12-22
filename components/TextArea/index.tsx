import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

export function TextArea({ value, onChange, width }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={`
        relative 
        border-4 
        border-black 
        bg-white 
        transition-all 
        duration-300
        ${width}
        h-52
      `}
      animate={{
        boxShadow: isFocused
          ? "2px 2px 0px 0px rgba(0,0,0,1)"
          : "8px 8px 0px 0px rgba(0,0,0,1)",
        x: isFocused ? 6 : 0,
        y: isFocused ? 6 : 0,
      }}
    >
      <motion.label
        className="absolute -top-3 left-2 bg-yellow-300 px-2 font-mono text-sm font-bold"
        animate={{
          scale: isFocused ? 1.1 : 1,
          x: isFocused ? -5 : 0,
        }}
      >
        Your Description
      </motion.label>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isFocused ? [0, -2, 2, -2, 2, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <textarea
          name="message"
          placeholder="Type your Description here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full resize-none bg-transparent px-4 py-3 font-mono text-lg font-bold placeholder:text-black/30 outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </motion.div>
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-black"
          >
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white">
              ✓
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
