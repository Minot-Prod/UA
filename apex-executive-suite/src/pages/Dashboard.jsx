
import React, { useState, useEffect } from "react";
import { Goal, TeamMember, FinancialMetric, Meeting } from "@/api/entities";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  Briefcase,
  Award,
  Calendar,
  Gem 
} from "lucide-react";

import MetricCard from "../components/dashboard/MetricCard";
import GoalProgress from "../components/dashboard/GoalProgress";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [goalsData, teamData, metricsData, meetingsData] = await Promise.all([
        Goal.list("-created_date", 5),
        TeamMember.list("-created_date"),
        FinancialMetric.list("-date", 10),
        Meeting.filter({ status: "scheduled" }, "date", 5)
      ]);
      
      setGoals(goalsData);
      setTeamMembers(teamData);
      setMetrics(metricsData);
      setMeetings(meetingsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const getMetricByName = (name) => {
    return metrics.find(m => m.metric_name === name) || { value: 0, previous_value: 0 };
  };

  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getTrend = (current, previous) => {
    if (!previous) return 'neutral';
    return current > previous ? 'up' : current < previous ? 'down' : 'neutral';
  };

  const revenue = getMetricByName('Monthly Revenue');
  const profit = getMetricByName('Net Profit');
  const customers = getMetricByName('Active Customers');
  const growth = getMetricByName('Growth Rate');

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
              <Gem className="w-6 h-6 text-slate-800" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 font-serif">Mirae F&B</h1>
              <p className="text-slate-500">Executive Dashboard & Performance Overview</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Monthly Revenue"
            value={revenue.value ? `$${(revenue.value / 1000).toFixed(0)}K` : "$0"}
            change={calculateChange(revenue.value, revenue.previous_value)}
            trend={getTrend(revenue.value, revenue.previous_value)}
            icon={DollarSign}
            color="bg-emerald-500"
          />
          <MetricCard
            title="Net Profit"
            value={profit.value ? `$${(profit.value / 1000).toFixed(0)}K` : "$0"}
            change={calculateChange(profit.value, profit.previous_value)}
            trend={getTrend(profit.value, profit.previous_value)}
            icon={TrendingUp}
            color="bg-sky-500"
          />
          <MetricCard
            title="Team Members"
            value={teamMembers.length}
            icon={Users}
            color="bg-purple-500"
          />
          <MetricCard
            title="Active Goals"
            value={goals.filter(g => g.status !== 'completed').length}
            icon={Target}
            color="bg-rose-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Strategic Goals */}
          <div className="lg:col-span-2">
            <GoalProgress goals={goals} />
          </div>

          {/* Upcoming Meetings */}
          <div>
            <UpcomingMeetings meetings={meetings} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Goals On Track</p>
                <p className="text-2xl font-bold text-slate-800">
                  {goals.filter(g => g.status === 'on_track').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Leadership Team</p>
                <p className="text-2xl font-bold text-slate-800">
                  {teamMembers.filter(t => ['c_suite', 'vp'].includes(t.level)).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">This Week's Meetings</p>
                <p className="text-2xl font-bold text-slate-800">{meetings.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
