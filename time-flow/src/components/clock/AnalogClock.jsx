import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const clockStyles = {
  classic: {
    faceColor: "transparent",
    hourHandColor: "var(--primary)",
    minuteHandColor: "var(--secondary)",
    secondHandColor: "var(--accent)",
    numbersColor: "var(--foreground)",
    marksColor: "var(--foreground)"
  },
  modern: {
    faceColor: "rgba(255,255,255,0.1)",
    hourHandColor: "#ff6b6b",
    minuteHandColor: "#4ecdc4", 
    secondHandColor: "#45b7d1",
    numbersColor: "var(--foreground)",
    marksColor: "var(--secondary-foreground)"
  },
  elegant: {
    faceColor: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
    hourHandColor: "#d4af37",
    minuteHandColor: "#c0c0c0",
    secondHandColor: "#ff4757",
    numbersColor: "var(--foreground)",
    marksColor: "var(--primary)"
  }
};

const numberStyles = ["roman", "arabic", "dots", "none"];

export default function AnalogClock({ time }) {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [clockStyle, setClockStyle] = useState("classic");
  const [numberStyle, setNumberStyle] = useState("arabic");
  const [showSecondHand, setShowSecondHand] = useState(true);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Smooth continuous movement
  const hourAngle = (hours * 30) + (minutes * 0.5) + (seconds * 0.008333);
  const minuteAngle = (minutes * 6) + (seconds * 0.1) + (milliseconds * 0.0001);
  const secondAngle = (seconds * 6) + (milliseconds * 0.006);

  const style = clockStyles[clockStyle];

  const getRomanNumeral = (num) => {
    const romanNumerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
    return romanNumerals[num];
  };

  const renderNumbers = () => {
    if (numberStyle === "none") return null;
    
    return [...Array(12)].map((_, i) => {
      const angle = i * 30;
      const hourNumber = i === 0 ? 12 : i;
      let displayNumber = hourNumber;
      
      if (numberStyle === "roman") {
        displayNumber = getRomanNumeral(i);
      } else if (numberStyle === "dots") {
        return (
          <circle
            key={i}
            cx="100" cy="40"
            r="2"
            fill={style.numbersColor}
            transform={`rotate(${angle} 100 100)`}
          />
        );
      }

      return (
        <text
          key={i}
          x="100" y="45"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${angle} 100 100)`}
          className="text-lg font-bold fill-current"
          style={{ 
            fontFamily: numberStyle === "roman" ? 'var(--font-display)' : 'var(--font-primary)',
            fill: style.numbersColor
          }}
        >
          <tspan transform={`rotate(${-angle} 100 45)`}>
            {displayNumber}
          </tspan>
        </text>
      );
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Customizer Toggle */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCustomizer(!showCustomizer)}
          className="glass-card hover:scale-105 transition-all duration-300"
        >
          <Settings className="w-4 h-4 mr-2" />
          Customize
        </Button>
      </div>

      {/* Customizer Panel */}
      {showCustomizer && (
        <div className="glass-card rounded-2xl p-4 space-y-4 w-full max-w-md">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Clock Style</label>
            <Select value={clockStyle} onValueChange={setClockStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Numbers</label>
            <Select value={numberStyle} onValueChange={setNumberStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arabic">Arabic (1,2,3)</SelectItem>
                <SelectItem value="roman">Roman (I,II,III)</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Second Hand</label>
            <Button
              variant={showSecondHand ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSecondHand(!showSecondHand)}
            >
              {showSecondHand ? "ON" : "OFF"}
            </Button>
          </div>
        </div>
      )}

      {/* Clock Face */}
      <div className="relative w-80 h-80">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Clock face background */}
          <defs>
            <radialGradient id="clockFace" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </radialGradient>
          </defs>
          
          <circle 
            cx="100" cy="100" r="95" 
            fill="url(#clockFace)"
            stroke={style.marksColor}
            strokeWidth="3"
            opacity="0.8"
          />
          
          {/* Hour marks */}
          {[...Array(12)].map((_, i) => {
            const angle = i * 30;
            const isMainHour = i % 3 === 0;
            
            return (
              <line
                key={i}
                x1="100" y1="8" x2="100" y2={isMainHour ? "28" : "18"}
                stroke={style.marksColor}
                strokeWidth={isMainHour ? "3" : "2"}
                strokeLinecap="round"
                transform={`rotate(${angle} 100 100)`}
                opacity="0.8"
              />
            );
          })}

          {/* Numbers */}
          {renderNumbers()}

          {/* Hour hand */}
          <line
            x1="100" y1="100" x2="100" y2="55"
            stroke={style.hourHandColor}
            strokeWidth="8" strokeLinecap="round"
            transform={`rotate(${hourAngle} 100 100)`}
            style={{ transition: 'transform 0.5s ease-out' }}
          />

          {/* Minute hand */}
          <line
            x1="100" y1="100" x2="100" y2="35"
            stroke={style.minuteHandColor}
            strokeWidth="6" strokeLinecap="round"
            transform={`rotate(${minuteAngle} 100 100)`}
            style={{ transition: 'transform 0.5s ease-out' }}
          />

          {/* Second hand */}
          {showSecondHand && (
            <line
              x1="100" y1="100" x2="100" y2="25"
              stroke={style.secondHandColor}
              strokeWidth="2" strokeLinecap="round"
              transform={`rotate(${secondAngle} 100 100)`}
              style={{ transition: 'none' }}
            />
          )}

          {/* Center decorative circle */}
          <circle cx="100" cy="100" r="8" fill={style.hourHandColor} />
          <circle cx="100" cy="100" r="4" fill="rgba(255,255,255,0.8)" />
        </svg>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-5xl font-bold number-display text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-lg font-semibold text-secondary-foreground">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}