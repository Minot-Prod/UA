import React from "react";
import { motion } from "framer-motion";

export default function StopwatchDisplay({ time, isLandscape = false }) {
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <>
      <style jsx>{`
        .stopwatch-bg {
          background: linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          position: relative;
          overflow: hidden;
        }

        .stopwatch-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .neon-glow {
          box-shadow: 
            0 0 20px rgba(255,255,255,0.5),
            0 0 40px rgba(255,255,255,0.3),
            0 0 60px rgba(255,255,255,0.2),
            inset 0 0 20px rgba(255,255,255,0.1);
        }

        .time-unit {
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 
            0 8px 32px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
      `}</style>
      
      <div className={`stopwatch-bg ${isLandscape ? 'rounded-3xl p-12' : 'rounded-2xl md:rounded-3xl p-4 md:p-8'}`}>
        <div className="text-center space-y-4 md:space-y-8 relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex justify-center items-center ${isLandscape ? 'space-x-8' : 'space-x-2 md:space-x-4'}`}
          >
            {/* Hours */}
            <motion.div 
              key={hours}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`time-unit neon-glow ${
                isLandscape 
                  ? 'rounded-3xl p-8' 
                  : 'rounded-xl md:rounded-2xl p-3 md:p-6'
              }`}
            >
              <div className={`font-black text-white number-display ${
                isLandscape 
                  ? 'text-8xl' 
                  : 'text-3xl md:text-5xl'
              }`} style={{ fontFamily: 'var(--font-mono)' }}>
                {hours}
              </div>
              <div className={`font-bold text-white/80 mt-2 ${
                isLandscape 
                  ? 'text-lg' 
                  : 'text-xs md:text-sm'
              }`}>HOURS</div>
            </motion.div>

            <div className={`font-black text-white animate-pulse ${
              isLandscape 
                ? 'text-8xl' 
                : 'text-3xl md:text-5xl'
            }`}>:</div>

            {/* Minutes */}
            <motion.div 
              key={minutes}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`time-unit neon-glow ${
                isLandscape 
                  ? 'rounded-3xl p-8' 
                  : 'rounded-xl md:rounded-2xl p-3 md:p-6'
              }`}
            >
              <div className={`font-black text-white number-display ${
                isLandscape 
                  ? 'text-8xl' 
                  : 'text-3xl md:text-5xl'
              }`} style={{ fontFamily: 'var(--font-mono)' }}>
                {minutes}
              </div>
              <div className={`font-bold text-white/80 mt-2 ${
                isLandscape 
                  ? 'text-lg' 
                  : 'text-xs md:text-sm'
              }`}>MINUTES</div>
            </motion.div>

            <div className={`font-black text-white animate-pulse ${
              isLandscape 
                ? 'text-8xl' 
                : 'text-3xl md:text-5xl'
            }`}>:</div>

            {/* Seconds */}
            <motion.div 
              key={seconds}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`time-unit neon-glow ${
                isLandscape 
                  ? 'rounded-3xl p-8' 
                  : 'rounded-xl md:rounded-2xl p-3 md:p-6'
              }`}
            >
              <div className={`font-black text-white number-display ${
                isLandscape 
                  ? 'text-8xl' 
                  : 'text-3xl md:text-5xl'
              }`} style={{ fontFamily: 'var(--font-mono)' }}>
                {seconds}
              </div>
              <div className={`font-bold text-white/80 mt-2 ${
                isLandscape 
                  ? 'text-lg' 
                  : 'text-xs md:text-sm'
              }`}>SECONDS</div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className={`font-bold text-white/90 ${
              isLandscape 
                ? 'text-4xl' 
                : 'text-lg md:text-2xl'
            }`} style={{ fontFamily: 'var(--font-display)' }}>
              Elapsed Time
            </p>
            <div className={`bg-white/30 rounded-full mx-auto mt-3 overflow-hidden ${
              isLandscape 
                ? 'w-48 h-2' 
                : 'w-24 md:w-32 h-1'
            }`}>
              <div className="h-full bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}