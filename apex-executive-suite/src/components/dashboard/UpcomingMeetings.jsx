
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";

const meetingTypeColors = {
  board_meeting: "bg-purple-100 text-purple-800",
  client_meeting: "bg-sky-100 text-sky-800",
  team_meeting: "bg-emerald-100 text-emerald-800",
  investor_meeting: "bg-rose-100 text-rose-800",
  strategy_session: "bg-amber-100 text-amber-800",
  one_on_one: "bg-slate-100 text-slate-800"
};

const priorityColors = {
  critical: "border-l-rose-500",
  high: "border-l-amber-500",
  medium: "border-l-sky-500",
  low: "border-l-emerald-500"
};

export default function UpcomingMeetings({ meetings }) {
  const getDateLabel = (date) => {
    if (isToday(new Date(date))) return "Today";
    if (isTomorrow(new Date(date))) return "Tomorrow";
    return format(new Date(date), "MMM dd");
  };

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800 font-serif">
          <Calendar className="w-5 h-5 text-purple-500" />
          Upcoming Meetings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id} 
            className={`p-4 rounded-md border-l-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 ${priorityColors[meeting.priority]}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">{meeting.title}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {getDateLabel(meeting.date)} at {format(new Date(meeting.date), "h:mm a")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {meeting.attendees?.length || 0} attendees
                  </div>
                </div>
              </div>
              <Badge className={`${meetingTypeColors[meeting.type]} capitalize`} variant="secondary">
                {meeting.type.replace('_', ' ')}
              </Badge>
            </div>
            
            {meeting.location && (
              <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                {meeting.location}
              </div>
            )}
            
            {meeting.agenda && meeting.agenda.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-slate-700 mb-1">Agenda:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  {meeting.agenda.slice(0, 2).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                  {meeting.agenda.length > 2 && (
                    <li className="text-slate-500 italic">+{meeting.agenda.length - 2} more items</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
