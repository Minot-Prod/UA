import React from "react";

export default function LapList({ laps, isDark }) {
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const fastestLap = laps.reduce((min, lap) => lap.lapTime < min.lapTime ? lap : min, laps[0]);
  const slowestLap = laps.reduce((max, lap) => lap.lapTime > max.lapTime ? lap : max, laps[0]);

  return (
    <div className="max-h-64 overflow-y-auto">
      <div className="space-y-2">
        {laps.slice().reverse().map((lap, index) => {
          const isReversedIndex = laps.length - 1 - index;
          const isFastest = lap.lapNumber === fastestLap.lapNumber && laps.length > 1;
          const isSlowest = lap.lapNumber === slowestLap.lapNumber && laps.length > 1;
          
          return (
            <div
              key={lap.lapNumber}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isFastest 
                  ? (isDark ? 'bg-green-500/20 border border-green-400/30' : 'bg-green-100 border border-green-200')
                  : isSlowest
                  ? (isDark ? 'bg-red-500/20 border border-red-400/30' : 'bg-red-100 border border-red-200')
                  : (isDark ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-white/20')
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`font-bold text-lg ${
                  isFastest 
                    ? (isDark ? 'text-green-400' : 'text-green-600')
                    : isSlowest
                    ? (isDark ? 'text-red-400' : 'text-red-600')
                    : (isDark ? 'text-purple-400' : 'text-purple-600')
                }`}>
                  #{lap.lapNumber}
                </span>
                {isFastest && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">FASTEST</span>}
                {isSlowest && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">SLOWEST</span>}
              </div>
              <div className="text-right">
                <p className={`font-mono text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatTime(lap.lapTime)}
                </p>
                <p className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total: {formatTime(lap.totalTime)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}