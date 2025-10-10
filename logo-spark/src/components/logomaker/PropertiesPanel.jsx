
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Settings, Palette, Move, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const fontFamilies = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Helvetica", value: "Helvetica, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Courier New", value: "Courier New, monospace" },
  { name: "Script", value: "cursive" },
  { name: "Fantasy", value: "fantasy" }
];

const colorPalette = [
  "#1C1C1E", "#F2F2F7", "#FF3B30", "#FF9500",
  "#FFCC00", "#34C759", "#5AC8FA", "#007AFF",
  "#5856D6", "#AF52DE",
];

export default function PropertiesPanel({
  selectedElement,
  canvasColor,
  canvasSize,
  onUpdateElement,
  onUpdateCanvas
}) {
  const cardVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  if (!selectedElement) {
    return (
      <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="w-5 h-5" />
              Canvas Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {colorPalette.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded border-2 ${
                      canvasColor === color ? 'border-blue-500' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => onUpdateCanvas({ color })}
                  />
                ))}
              </div>
              <Input
                type="color"
                value={canvasColor}
                onChange={(e) => onUpdateCanvas({ color: e.target.value })}
                className="w-full h-10"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Canvas Size</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-slate-500">Width</Label>
                  <Input
                    type="number"
                    min="200"
                    max="800"
                    value={canvasSize.width}
                    onChange={(e) => onUpdateCanvas({
                      size: { ...canvasSize, width: parseInt(e.target.value) || 400 }
                    })}
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500">Height</Label>
                  <Input
                    type="number"
                    min="200"
                    max="800"
                    value={canvasSize.height}
                    onChange={(e) => onUpdateCanvas({
                      size: { ...canvasSize, height: parseInt(e.target.value) || 400 }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-slate-500 py-4">
              Select an element to edit its properties
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5" />
            Element Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Position & Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-slate-600" />
              <Label className="font-semibold">Position & Size</Label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-slate-500">X Position</Label>
                <Input
                  type="number"
                  min="0"
                  value={selectedElement.x}
                  onChange={(e) => onUpdateElement(selectedElement.id, { x: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Y Position</Label>
                <Input
                  type="number"
                  min="0"
                  value={selectedElement.y}
                  onChange={(e) => onUpdateElement(selectedElement.id, { y: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-slate-500">Width</Label>
                <Input
                  type="number"
                  min="10"
                  value={selectedElement.width}
                  onChange={(e) => onUpdateElement(selectedElement.id, { width: parseInt(e.target.value) || 100 })}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Height</Label>
                <Input
                  type="number"
                  min="10"
                  value={selectedElement.height}
                  onChange={(e) => onUpdateElement(selectedElement.id, { height: parseInt(e.target.value) || 50 })}
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-slate-500">Rotation (degrees)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[selectedElement.rotation || 0]}
                  onValueChange={(value) => onUpdateElement(selectedElement.id, { rotation: value[0] })}
                  min={-180}
                  max={180}
                  step={1}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateElement(selectedElement.id, { rotation: 0 })}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-slate-500 mt-1">{selectedElement.rotation || 0}°</div>
            </div>
          </div>

          <Separator />

          {/* Color */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-slate-600" />
              <Label className="font-semibold">Color</Label>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {colorPalette.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded border-2 ${
                    selectedElement.color === color ? 'border-blue-500' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onUpdateElement(selectedElement.id, { color })}
                />
              ))}
            </div>

            <Input
              type="color"
              value={selectedElement.color}
              onChange={(e) => onUpdateElement(selectedElement.id, { color: e.target.value })}
              className="w-full h-10"
            />
          </div>

          {/* Text-specific properties */}
          {selectedElement.type === 'text' && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="font-semibold">Text Properties</Label>

                <div>
                  <Label className="text-xs text-slate-500">Content</Label>
                  <Input
                    value={selectedElement.content}
                    onChange={(e) => onUpdateElement(selectedElement.id, { content: e.target.value })}
                    placeholder="Enter text"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Font Size</Label>
                  <Slider
                    value={[selectedElement.fontSize || 24]}
                    onValueChange={(value) => onUpdateElement(selectedElement.id, { fontSize: value[0] })}
                    min={8}
                    max={72}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-slate-500 mt-1">{selectedElement.fontSize || 24}px</div>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Font Family</Label>
                  <Select
                    value={selectedElement.fontFamily || "Arial"}
                    onValueChange={(value) => onUpdateElement(selectedElement.id, { fontFamily: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Font Weight</Label>
                  <Select
                    value={selectedElement.fontWeight || "normal"}
                    onValueChange={(value) => onUpdateElement(selectedElement.id, { fontWeight: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="lighter">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
