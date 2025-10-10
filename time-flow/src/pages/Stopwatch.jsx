import React, { useState, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Download, Flag, Expand, RotateCcw as Rotate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LapTime } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";
import StopwatchDisplay from "../components/stopwatch/StopwatchDisplay";
import LapList from "../components/stopwatch/LapList";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isLandscape, setIsLandscape] = useState(false);
  const intervalRef = useRef(null);
  const sessionIdRef = useRef(`session_${Date.now()}`);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
      setIsRunning(true);
    }
  }, [isRunning]);

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
    sessionIdRef.current = `session_${Date.now()}`;
  }, []);

  const addLap = useCallback(async () => {
    if (time > 0) {
      const lapNumber = laps.length + 1;
      const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
      const lapTime = time - lastLapTime;
      
      const newLap = {
        lapNumber,
        lapTime,
        totalTime: time
      };

      setLaps(prev => [...prev, newLap]);

      await LapTime.create({
        session_id: sessionIdRef.current,
        lap_number: lapNumber,
        lap_time: lapTime,
        total_time: time
      });
    }
  }, [time, laps]);

  const exportLaps = useCallback(() => {
    if (laps.length === 0) return;

    const formatTime = (ms) => {
      const hours = Math.floor(ms / 3600000);
      const minutes = Math.floor((ms % 3600000) / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const centiseconds = Math.floor((ms % 1000) / 10);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const csvContent = [
      'Lap,Lap Time,Total Time',
      ...laps.map(lap => `${lap.lapNumber},${formatTime(lap.lapTime)},${formatTime(lap.totalTime)}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stopwatch_laps_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }, [laps]);

  const toggleLandscape = () => {
    setIsLandscape(!isLandscape);
    if (!isLandscape) {
      // Request fullscreen for landscape mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      // Lock to landscape orientation if supported
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
          // Orientation lock not supported or failed
        });
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      // Unlock orientation
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle orientation change
  React.useEffect(() => {
    const handleOrientationChange = () => {
      const isCurrentlyLandscape = window.innerWidth > window.innerHeight;
      if (isCurrentlyLandscape !== isLandscape && document.fullscreenElement) {
        setIsLandscape(isCurrentlyLandscape);
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setIsLandscape(false);
      }
    });

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [isLandscape]);

  if (isLandscape) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-between p-6 z-50">
        {/* Left Side - Stopwatch Display */}
        <div className="flex-1 flex items-center justify-center">
          <StopwatchDisplay time={time} isLandscape={true} />
        </div>

        {/* Right Side - Controls */}
        <div className="flex flex-col items-center justify-center gap-6 px-6">
          <Button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`w-20 h-20 rounded-full transition-all duration-300 hover:scale-110 micro-interaction ripple font-black text-2xl shadow-2xl ${
              isRunning 
                ? 'bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                : 'bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            } text-white`}
          >
            {isRunning ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
          </Button>
          
          <Button
            onClick={addLap}
            disabled={!isRunning && time === 0}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 hover:scale-110 micro-interaction ripple disabled:opacity-50 font-black shadow-2xl"
          >
            <Flag className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white transition-all duration-300 hover:scale-110 micro-interaction ripple font-black shadow-2xl"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>

          <Button
            onClick={toggleLandscape}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white transition-all duration-300 hover:scale-110 micro-interaction"
          >
            <Rotate className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Mobile Orientation Toggle */}
      <div className="flex justify-between items-center md:hidden">
        <h2 className="text-2xl font-bold gradient-text">Stopwatch</h2>
        <Button
          onClick={toggleLandscape}
          variant="ghost"
          size="icon"
          className="glass-card hover:scale-105 transition-all duration-300"
        >
          <Rotate className="w-5 h-5" />
        </Button>
      </div>

      {/* Stopwatch Display */}
      <motion.div 
        layout
        className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8"
      >
        <StopwatchDisplay time={time} />
      </motion.div>

      {/* Controls */}
      <motion.div 
        layout
        className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6"
      >
        <div className="flex justify-center gap-3 md:gap-6">
          <Button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 hover:scale-110 micro-interaction ripple font-black text-lg md:text-xl shadow-2xl ${
              isRunning 
                ? 'bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                : 'bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            } text-white`}
          >
            {isRunning ? <Pause className="w-6 h-6 md:w-8 md:h-8" /> : <Play className="w-6 h-6 md:w-8 md:h-8" />}
          </Button>
          
          <Button
            onClick={addLap}
            disabled={!isRunning && time === 0}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 hover:scale-110 micro-interaction ripple disabled:opacity-50 font-black shadow-2xl"
          >
            <Flag className="w-6 h-6 md:w-8 md:h-8" />
          </Button>
          
          <Button
            onClick={resetTimer}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white transition-all duration-300 hover:scale-110 micro-interaction ripple font-black shadow-2xl"
          >
            <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
          </Button>
        </div>
      </motion.div>

      {/* Lap Times */}
      <AnimatePresence>
        {laps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
          >
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="font-bold text-lg md:text-xl text-foreground">
                Lap Times ({laps.length})
              </h3>
              <Button
                onClick={exportLaps}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 micro-interaction text-xs md:text-sm"
              >
                <Download className="w-3 h-3 md:w-4 md:h-4" />
                Export
              </Button>
            </div>
            <LapList laps={laps} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}