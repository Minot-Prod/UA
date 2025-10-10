
"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clapperboard, Film, UploadCloud } from "lucide-react";

const navigationItems = [{
    title: "Projects",
    url: createPageUrl("Projects"),
    icon: Film,
}, {
    title: "Upload",
    url: createPageUrl("Upload"),
    icon: UploadCloud,
}, ];

export default function Layout({ children, currentPageName }) {
    const location = useLocation();

    return (
        <div className="min-h-screen flex bg-gray-900 text-white">
    <aside className="w-64 bg-black/50 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-12">
        <Clapperboard className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold tracking-wider">GodKo</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === item.url
                ? "bg-purple-500/20 text-purple-300"
                : "hover:bg-gray-800"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
    <main className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">{children}</div>
    </main>
  </div>
    );
}
