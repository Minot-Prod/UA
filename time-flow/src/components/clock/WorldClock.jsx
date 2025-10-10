import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const timezones = [
  { name: "New York", timezone: "America/New_York", flag: "🇺🇸", offset: "UTC-5" },
  { name: "London", timezone: "Europe/London", flag: "🇬🇧", offset: "UTC+0" },
  { name: "Tokyo", timezone: "Asia/Tokyo", flag: "🇯🇵", offset: "UTC+9" },
  { name: "Sydney", timezone: "Australia/Sydney", flag: "🇦🇺", offset: "UTC+11" },
  { name: "Dubai", timezone: "Asia/Dubai", flag: "🇦🇪", offset: "UTC+4" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", flag: "🇺🇸", offset: "UTC-8" },
];

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeForTimezone = (timezone) => {
    return new Date().toLocaleString("en-US", {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getDateForTimezone = (timezone) => {
    return new Date().toLocaleDateString("en-US", {
      timeZone: timezone,
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {timezones.map((tz, index) => (
        <motion.div
          key={tz.timezone}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105 glass-card border border-white/10 micro-interaction"
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{tz.flag}</div>
            <div>
              <p className="font-bold text-lg text-foreground">{tz.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-secondary-foreground">{getDateForTimezone(tz.timezone)}</p>
                <span className="text-xs px-2 py-1 bg-primary/20 rounded-full text-primary font-medium">
                  {tz.offset}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-mono number-display text-foreground">
              {getTimeForTimezone(tz.timezone)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}