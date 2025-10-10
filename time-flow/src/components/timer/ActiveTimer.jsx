import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ActiveTimer({ timer, onUpdate, onDelete, isDark }) {
  const [localRemaining, setLocalRemaining] = useState(timer.remaining);
  const [localStatus, setLocalStatus] = useState(timer.status);
  const intervalRef = useRef(null);

  useEffect(() => {
    setLocalRemaining(timer.remaining);
    setLocalStatus(timer.status);
  }, [timer.remaining, timer.status]);

  useEffect(() => {
    if (localStatus === 'running') {
      intervalRef.current = setInterval(() => {
        setLocalRemaining(prev => {
          if (prev <= 1) {
            setLocalStatus('completed');
            onUpdate(timer.id, { remaining: 0, status: 'completed' });
            // Timer completed notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`Timer "${timer.name}" completed!`);
            }
            return 0;
          }
          const newRemaining = prev - 1;
          // Update database every 10 seconds
          if (newRemaining % 10 === 0) {
            onUpdate(timer.id, { remaining: newRemaining, status: 'running' });
          }
          return newRemaining;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [localStatus, timer.id, timer.name, onUpdate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setLocalStatus('running');
    onUpdate(timer.id, { status: 'running' });
  };

  const handlePause = () => {
    setLocalStatus('paused');
    onUpdate(timer.id, { remaining: localRemaining, status: 'paused' });
  };

  const handleReset = () => {
    setLocalRemaining(timer.duration);
    setLocalStatus('stopped');
    onUpdate(timer.id, { remaining: timer.duration, status: 'stopped' });
  };

  const progress = ((timer.duration - localRemaining) / timer.duration) * 100;

  return (
    <div className={`glass-card rounded-2xl p-6 space-y-4 ${
      localStatus === 'completed' ? (isDark ? 'bg-green-500/20' : 'bg-green-100') : ''
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {timer.name}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {formatTime(timer.duration)} total
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(timer.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center space-y-4">
        <div className={`text-4xl font-mono font-bold ${
          localStatus === 'completed' 
            ? 'text-green-500' 
            : (isDark ? 'text-white' : 'text-gray-900')
        }`}>
          {localStatus === 'completed' ? '🎉 Done!' : formatTime(localRemaining)}
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex justify-center gap-3">
          {localStatus === 'completed' ? (
            <Button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          ) : (
            <>
              <Button
                onClick={localStatus === 'running' ? handlePause : handleStart}
                className={`${
                  localStatus === 'running' 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white transition-all duration-300 hover:scale-105`}
              >
                {localStatus === 'running' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="ghost"
                className="hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}