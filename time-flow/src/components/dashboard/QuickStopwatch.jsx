import React, { useState, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  }, []);

  const addLap = useCallback(() => {
    if (time > 0) {
      const lapTime = laps.length > 0 ? time - laps[laps.length - 1].totalTime : time;
      setLaps(prev => [...prev, { lapNumber: prev.length + 1, lapTime, totalTime: time }]);
    }
  }, [time, laps]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Display */}
      <div className="text-center">
        <div className="text-3xl font-bold font-mono number-display text-foreground">
          {formatTime(time)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <Button
          onClick={isRunning ? pauseTimer : startTimer}
          className={`w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 micro-interaction ripple ${
            isRunning 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold`}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        
        <Button
          onClick={addLap}
          disabled={!isRunning && time === 0}
          className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-110 micro-interaction ripple disabled:opacity-50"
        >
          <Flag className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={resetTimer}
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-110 micro-interaction ripple"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Recent Laps */}
      <AnimatePresence>
        {laps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1 max-h-20 overflow-y-auto"
          >
            {laps.slice(-2).map((lap) => (
              <div key={lap.lapNumber} className="flex justify-between text-sm">
                <span className="text-secondary-foreground">Lap {lap.lapNumber}</span>
                <span className="font-mono font-semibold">{formatTime(lap.lapTime)}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}