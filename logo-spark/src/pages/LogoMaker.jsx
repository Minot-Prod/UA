
import React, { useState, useCallback, useRef } from "react";
import { LogoDesign } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Download,
  RotateCcw,
  Wand2,
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Heart
} from "lucide-react";

import LogoCanvas from "../components/logomaker/LogoCanvas";
import ElementsLibrary from "../components/logomaker/ElementsLibrary";
import PropertiesPanel from "../components/logomaker/PropertiesPanel";
import SaveLoadPanel from "../components/logomaker/SaveLoadPanel";

export default function LogoMaker() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasColor, setCanvasColor] = useState("#F2F2F7");
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  const [designName, setDesignName] = useState("");
  const canvasRef = useRef(null);

  const addElement = useCallback((elementData) => {
    const newElement = {
      id: Date.now(),
      x: canvasSize.width / 2 - 50,
      y: canvasSize.height / 2 - 25,
      width: 100,
      height: 50,
      rotation: 0,
      color: "#007AFF",
      ...elementData
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  }, [canvasSize]);

  const updateElement = useCallback((elementId, updates) => {
    setElements(prev =>
      prev.map(el => el.id === elementId ? { ...el, ...updates } : el)
    );

    if (selectedElement?.id === elementId) {
      setSelectedElement(prev => ({ ...prev, ...updates }));
    }
  }, [selectedElement]);

  const deleteElement = useCallback((elementId) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
    setCanvasColor("#F2F2F7");
  };

  const exportLogo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `logo-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const saveDesign = async (name) => {
    const designData = {
      name,
      elements: elements.map(({ id, ...el }) => el),
      canvasColor,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height
    };

    await LogoDesign.create(designData);
    setDesignName(name);
  };

  const loadDesign = (design) => {
    setElements(design.elements.map((el, index) => ({ ...el, id: Date.now() + index })));
    setCanvasColor(design.canvasColor || "#F2F2F7");
    setCanvasSize({
      width: design.canvasWidth || 400,
      height: design.canvasHeight || 400
    });
    setDesignName(design.name);
    setSelectedElement(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AnimAIrium</h1>
              <p className="text-sm text-slate-500">Crafting logos with AI & Animation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={clearCanvas}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportLogo}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export PNG
            </Button>
            {designName && (
              <Badge variant="secondary" className="px-3 py-1">
                {designName}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Tools & Elements */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Design Tools</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="elements" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
                    <TabsTrigger value="elements">Elements</TabsTrigger>
                    <TabsTrigger value="save">Save/Load</TabsTrigger>
                  </TabsList>

                  <div className="px-4 pb-4">
                    <TabsContent value="elements" className="mt-0">
                      <ElementsLibrary onAddElement={addElement} />
                    </TabsContent>

                    <TabsContent value="save" className="mt-0">
                      <SaveLoadPanel
                        onSave={saveDesign}
                        onLoad={loadDesign}
                        currentName={designName}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Center - Canvas */}
          <motion.div className="lg:col-span-2 flex items-center justify-center" variants={itemVariants}>
            <Card className="w-full max-w-lg">
              <CardContent className="p-6">
                <LogoCanvas
                  ref={canvasRef}
                  elements={elements}
                  selectedElement={selectedElement}
                  canvasColor={canvasColor}
                  canvasSize={canvasSize}
                  onSelectElement={setSelectedElement}
                  onUpdateElement={updateElement}
                  onDeleteElement={deleteElement}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Sidebar - Properties */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <AnimatePresence mode="wait">
              <PropertiesPanel
                key={selectedElement ? selectedElement.id : "canvas"}
                selectedElement={selectedElement}
                canvasColor={canvasColor}
                canvasSize={canvasSize}
                onUpdateElement={updateElement}
                onUpdateCanvas={({ color, size }) => {
                  if (color !== undefined) setCanvasColor(color);
                  if (size !== undefined) setCanvasSize(size);
                }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
