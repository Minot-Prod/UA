import React, { forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogoCanvas = forwardRef(({ 
  elements, 
  selectedElement, 
  canvasColor, 
  canvasSize, 
  onSelectElement, 
  onUpdateElement, 
  onDeleteElement 
}, ref) => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref?.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    // Clear canvas
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw elements
    elements.forEach(element => {
      ctx.save();
      
      // Transform for rotation and position
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
      ctx.rotate((element.rotation || 0) * Math.PI / 180);
      ctx.translate(-element.width / 2, -element.height / 2);

      if (element.type === 'text') {
        ctx.fillStyle = element.color;
        ctx.font = `${element.fontWeight || 'normal'} ${element.fontSize || 24}px ${element.fontFamily || 'Arial'}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(element.content, 0, 0);
      } else if (element.type === 'shape') {
        ctx.fillStyle = element.color;
        
        switch (element.content) {
          case 'rectangle':
            ctx.fillRect(0, 0, element.width, element.height);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(element.width / 2, element.height / 2, Math.min(element.width, element.height) / 2, 0, 2 * Math.PI);
            ctx.fill();
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(element.width / 2, 0);
            ctx.lineTo(0, element.height);
            ctx.lineTo(element.width, element.height);
            ctx.closePath();
            ctx.fill();
            break;
          case 'star':
            drawStar(ctx, element.width / 2, element.height / 2, 5, Math.min(element.width, element.height) / 4, Math.min(element.width, element.height) / 8);
            ctx.fill();
            break;
          case 'heart':
            drawHeart(ctx, element.width / 2, element.height / 2, Math.min(element.width, element.height) / 4);
            ctx.fill();
            break;
        }
      }
      
      ctx.restore();

      // Draw selection outline
      if (selectedElement?.id === element.id) {
        ctx.save();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4);
        ctx.restore();
      }
    });
  }, [elements, selectedElement, canvasColor, canvasSize, ref]);

  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = cx + radius * Math.cos(angle - Math.PI / 2);
      const y = cy + radius * Math.sin(angle - Math.PI / 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  const drawHeart = (ctx, cx, cy, size) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + size / 4);
    ctx.bezierCurveTo(cx, cy - size / 4, cx - size, cy - size / 4, cx - size, cy + size / 8);
    ctx.bezierCurveTo(cx - size, cy + size / 2, cx, cy + size, cx, cy + size);
    ctx.bezierCurveTo(cx, cy + size, cx + size, cy + size / 2, cx + size, cy + size / 8);
    ctx.bezierCurveTo(cx + size, cy - size / 4, cx, cy - size / 4, cx, cy + size / 4);
    ctx.closePath();
  };

  const handleCanvasClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on an element
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      if (x >= element.x && x <= element.x + element.width &&
          y >= element.y && y <= element.y + element.height) {
        onSelectElement(element);
        return;
      }
    }
    
    // Click on empty space
    onSelectElement(null);
  };

  const handleMouseDown = (e) => {
    if (!selectedElement) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= selectedElement.x && x <= selectedElement.x + selectedElement.width &&
        y >= selectedElement.y && y <= selectedElement.y + selectedElement.height) {
      isDragging.current = true;
      dragStart.current = { x: x - selectedElement.x, y: y - selectedElement.y };
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !selectedElement) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragStart.current.x;
    const y = e.clientY - rect.top - dragStart.current.y;
    
    onUpdateElement(selectedElement.id, { x: Math.max(0, Math.min(x, canvasSize.width - selectedElement.width)), y: Math.max(0, Math.min(y, canvasSize.height - selectedElement.height)) });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="space-y-4">
      {selectedElement && (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm font-medium text-blue-900">
            {selectedElement.type === 'text' ? selectedElement.content : selectedElement.content} selected
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDeleteElement(selectedElement.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden cursor-pointer"
        style={{ width: canvasSize.width, height: canvasSize.height }}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={ref}
          className="block"
        />
      </div>
    </div>
  );
});

LogoCanvas.displayName = 'LogoCanvas';

export default LogoCanvas;