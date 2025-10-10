import React from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardWidget({ title, icon: Icon, children, onSettings }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card rounded-3xl p-6 h-full"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
        {onSettings && (
          <Button variant="ghost" size="icon" onClick={onSettings}>
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        )}
      </div>
      {children}
    </motion.div>
  );
}