

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Gem, // Changed from Crown
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Executive Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Strategic Goals",
    url: createPageUrl("Goals"),
    icon: Target,
  },
  {
    title: "Team Leadership",
    url: createPageUrl("Team"),
    icon: Users,
  },
  {
    title: "Financial Performance",
    url: createPageUrl("Finance"),
    icon: TrendingUp,
  },
  {
    title: "Executive Calendar",
    url: createPageUrl("Meetings"),
    icon: Calendar,
  },
  {
    title: "Business Insights",
    url: createPageUrl("Insights"),
    icon: BarChart3,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@400;500;600&display=swap');
          
          :root {
            --sidebar-bg: #111827; /* Deep Charcoal */
            --sidebar-text: #F3F4F6;
            --sidebar-accent: #E6D3D3; /* Muted Blush/Rose */
            --sidebar-hover: #1F2937;
            --main-bg: #F9FAFB;
            --heading-font: 'Lora', serif;
            --body-font: 'Inter', sans-serif;
          }
          
          .dodohee-sidebar {
            background: var(--sidebar-bg);
            border-right: 1px solid #374151;
          }
          
          .dodohee-sidebar .sidebar-header {
            border-bottom: 1px solid #374151;
          }
          
          .nav-item-active {
            background-color: var(--sidebar-hover);
            color: #FFFFFF !important;
            font-weight: 600;
          }
          
          .nav-item-active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--sidebar-accent);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          
          .nav-item {
            position: relative;
          }
          
          .nav-item:hover {
            background: var(--sidebar-hover);
            color: #FFFFFF;
            transform: translateX(2px);
          }
          
          .executive-header {
            background: #FFFFFF;
            border-bottom: 1px solid #E5E7EB;
          }
          
          h1, h2, h3, h4, h5, h6, .font-serif {
            font-family: var(--heading-font);
          }
          
          body, p, span, div, a, button {
            font-family: var(--body-font);
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full" style={{ background: 'var(--main-bg)' }}>
        <Sidebar className="dodohee-sidebar">
          <SidebarHeader className="sidebar-header p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center shadow-lg border border-slate-600">
                <Gem className="w-6 h-6 text-pink-200" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-white font-serif">Mirae F&B</h2>
                <p className="text-sm text-slate-400">CEO Suite</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`nav-item transition-all duration-300 rounded-md p-3 ${
                          location.pathname === item.url ? 'nav-item-active' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-4">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-6 border-t border-slate-700">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
                <span className="font-bold text-pink-200 font-serif">Z</span>
              </div>
              <div>
                <p className="font-semibold text-white">Miss Zakaria</p>
                <p className="text-xs text-slate-400">Chief Executive Officer</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="executive-header px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-800 font-serif">Mirae F&B</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

