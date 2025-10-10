
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MetricCard({ title, value, unit, change, trend, icon: Icon, color }) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-slate-500';
  };

  return (
    <Card className="relative overflow-hidden bg-white hover:shadow-md transition-all duration-300 border border-slate-200 shadow-none">
      <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 ${color} rounded-full opacity-10`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          {change && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800 font-serif">{value}</span>
            {unit && <span className="text-lg text-slate-500">{unit}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
