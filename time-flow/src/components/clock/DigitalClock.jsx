import React from "react";
import { motion } from "framer-motion";

export default function DigitalClock({ time }) {
  const timeString = time.toLocaleTimeString([], { 
    hour12: false,
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  const [hours, minutes, seconds] = timeString.split(':');

  return (
    <div className="text-center space-y-8">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex justify-center items-center space-x-3"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 font-mono text-6xl font-black min-w-[120px] shadow-2xl number-display"
        >
          {hours}
        </motion.div>
        <div className="text-6xl font-black text-primary animate-pulse">
          :
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground rounded-2xl p-6 font-mono text-6xl font-black min-w-[120px] shadow-2xl number-display"
        >
          {minutes}
        </motion.div>
        <div className="text-6xl font-black text-secondary animate-pulse">
          :
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-2xl p-6 font-mono text-6xl font-black min-w-[120px] shadow-2xl number-display"
        >
          {seconds}
        </motion.div>
      </motion.div>
      
      <div className="space-y-3">
        <p className="text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          {time.toLocaleDateString([], { weekday: 'long' })}
        </p>
        <p className="text-2xl font-semibold text-secondary-foreground">
          {time.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}