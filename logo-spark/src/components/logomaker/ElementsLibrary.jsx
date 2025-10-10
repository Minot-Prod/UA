
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Star, 
  Heart,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function ElementsLibrary({ onAddElement }) {
  const textElements = [
    { name: "Heading", fontSize: 32, fontWeight: "bold", content: "Your Brand" },
    { name: "Subtext", fontSize: 16, fontWeight: "normal", content: "Tagline here" },
    { name: "Script", fontSize: 28, fontWeight: "normal", content: "Elegant", fontFamily: "cursive" }
  ];

  const shapes = [
    { name: "Rectangle", content: "rectangle", icon: Square },
    { name: "Circle", content: "circle", icon: Circle },
    { name: "Triangle", content: "triangle", icon: Triangle },
    { name: "Star", content: "star", icon: Star },
    { name: "Heart", content: "heart", icon: Heart }
  ];

  const addText = (textElement) => {
    onAddElement({
      type: "text",
      content: textElement.content,
      fontSize: textElement.fontSize,
      fontWeight: textElement.fontWeight,
      fontFamily: textElement.fontFamily || "Arial",
      width: 150,
      height: textElement.fontSize + 10
    });
  };

  const addShape = (shape) => {
    onAddElement({
      type: "shape",
      content: shape.content,
      width: 80,
      height: 80
    });
  };

  return (
    <div className="space-y-6">
      {/* Text Elements */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Text</h3>
        </div>
        
        <div className="grid gap-2">
          {textElements.map((text) => (
            <motion.div key={text.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addText(text)}
                className="w-full justify-start gap-2 h-auto py-2"
              >
                <Plus className="w-3 h-3" />
                <div className="text-left">
                  <div className="font-medium">{text.name}</div>
                  <div className="text-xs text-slate-500">{text.content}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Shapes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Shapes</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {shapes.map((shape) => (
            <motion.div key={shape.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addShape(shape)}
                className="w-full gap-2 h-12 flex-col"
              >
                <shape.icon className="w-4 h-4" />
                <span className="text-xs">{shape.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
