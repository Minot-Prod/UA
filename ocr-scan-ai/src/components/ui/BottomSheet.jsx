import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { X, Minus } from 'lucide-react';

export default function BottomSheet({ isOpen, onClose, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsExpanded(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY - startY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (currentY > threshold) {
      if (isExpanded) {
        setIsExpanded(false);
      } else {
        onClose();
      }
    } else if (currentY < -threshold && !isExpanded) {
      setIsExpanded(true);
    }

    setCurrentY(0);
    setIsDragging(false);
  };

  if (!isOpen) return null;

  const translateY = isDragging ? Math.max(0, currentY) : 0;
  const height = isExpanded ? '90vh' : '35vh';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose} />


      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
        style={{
          transform: `translateY(${translateY}px)`,
          height: height
        }}>

        <Card className="h-full bg-white/95 backdrop-blur-md rounded-t-3xl shadow-clay border-0 overflow-hidden flex flex-col">
          {/* Handle */}
          <div
            className="flex-shrink-0 flex items-center justify-center py-4 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => {
              setStartY(e.clientY);
              setIsDragging(true);
            }}
            onMouseMove={(e) => {
              if (!isDragging) return;
              setCurrentY(e.clientY - startY);
            }}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}>

            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full shadow-clay-inner"></div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-200/50 rounded-full flex items-center justify-center shadow-clay-inner hover:bg-gray-200/70 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4 pt-0">
            {children}
          </div>

          {/* Expand indicator */}
          {!isExpanded &&
            <div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
              onClick={() => setIsExpanded(true)}>
              <div className="w-10 h-10 bg-white/70 rounded-full flex items-center justify-center shadow-clay">
                <Minus className="w-5 h-5 text-gray-600 rotate-90" />
              </div>
            </div>
          }
        </Card>
      </div>
    </>
  );
}