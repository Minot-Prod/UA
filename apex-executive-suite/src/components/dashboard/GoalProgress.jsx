
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, User } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  on_track: "bg-emerald-100 text-emerald-800",
  at_risk: "bg-amber-100 text-amber-800",
  behind: "bg-rose-100 text-rose-800",
  completed: "bg-sky-100 text-sky-800"
};

const priorityColors = {
  critical: "bg-rose-100 text-rose-800 border-rose-200",
  high: "bg-amber-100 text-amber-800 border-amber-200",
  medium: "bg-slate-100 text-slate-800 border-slate-200",
  low: "bg-green-100 text-green-800 border-green-200"
};

export default function GoalProgress({ goals }) {
  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800 font-serif">
          <Target className="w-5 h-5 text-rose-500" />
          Strategic Goals Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {goals.map((goal) => {
          const progress = (goal.current_value / goal.target_value) * 100;
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">{goal.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(goal.deadline), "MMM dd, yyyy")}
                    </div>
                    {goal.assigned_to && (
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {goal.assigned_to}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${priorityColors[goal.priority]} capitalize`} variant="outline">
                    {goal.priority}
                  </Badge>
                  <Badge className={`${statusColors[goal.status]} capitalize`} variant="secondary">
                    {goal.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-semibold text-slate-800">
                    {goal.current_value}{goal.unit} / {goal.target_value}{goal.unit}
                  </span>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-2" />
                <div className="text-right text-sm font-medium text-slate-700">
                  {progress.toFixed(0)}% complete
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
