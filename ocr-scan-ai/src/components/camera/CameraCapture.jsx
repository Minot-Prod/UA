import React, { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Square, RotateCcw } from 'lucide-react';

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) {
      console.error('Camera not ready for capture');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match video
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    
    canvas.width = width;
    canvas.height = height;
    
    console.log('Capturing image:', { width, height });
    
    // Draw the video frame to canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Convert canvas to blob with proper error handling
    canvas.toBlob((blob) => {
      if (blob && blob.size > 0) {
        console.log('Image captured successfully:', {
          type: blob.type,
          size: blob.size
        });
        
        // Create a proper File object with a name
        const timestamp = Date.now();
        const imageFile = new File([blob], `capture_${timestamp}.jpg`, {
          type: 'image/jpeg',
          lastModified: timestamp
        });
        
        const imageUrl = URL.createObjectURL(imageFile);
        onCapture(imageFile, imageUrl);
        stopCamera();
      } else {
        console.error('Failed to create blob from canvas');
        setError('Failed to capture image. Please try again.');
      }
    }, 'image/jpeg', 0.9);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  if (error) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-clay border-0 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-clay-inner">
            <Camera className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-medium mb-2">Camera Error</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <Button
            onClick={startCamera}
            className="bg-gradient-to-r from-red-300 to-pink-300 hover:from-red-400 hover:to-pink-400 text-white rounded-2xl px-6 py-3 shadow-clay border-0"
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-clay border-0 overflow-hidden">
      {/* Camera Preview */}
      <div className="relative aspect-square bg-black rounded-t-3xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          onLoadedMetadata={() => {
            console.log('Video loaded:', {
              width: videoRef.current?.videoWidth,
              height: videoRef.current?.videoHeight
            });
            setIsStreaming(true);
          }}
        />
        
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Overlay guides */}
        {isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-white/50 rounded-2xl w-80 h-48 shadow-lg">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-white rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-white rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-white rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-white rounded-br-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={switchCamera}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white/50 shadow-clay-inner"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            onClick={capturePhoto}
            disabled={!isStreaming}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 hover:from-purple-400 hover:to-blue-400 text-white shadow-clay border-0 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Square className="w-8 h-8 fill-current" />
          </Button>

          <div className="w-12"></div>
        </div>
        
        <p className="text-center text-gray-600 text-sm mt-4">
          Point camera at document and tap to capture
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
}