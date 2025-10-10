
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Scan, FileText, FileDown, Loader2 } from 'lucide-react';

import CameraCapture from '../components/camera/CameraCapture';
import BottomSheet from '../components/ui/BottomSheet';
import DocumentResult from '../components/ocr/DocumentResult';
import { ocrService } from '../components/services/OCRService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SnapOCR() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // New state for PDF to Doc conversion
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState(null);
  const [convertedDoc, setConvertedDoc] = useState(null);
  const pdfFileRef = useRef(null);
  const [conversionProgress, setConversionProgress] = useState(0);

  const handleImageCapture = async (imageFile, imageUrl) => {
    if (!imageFile || imageFile.size === 0) {
      setError('Invalid image captured. Please try again.');
      return;
    }
    
    setCapturedImage({ file: imageFile, url: imageUrl, type: 'image' });
    setError(null);
    await processImage(imageFile);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage({ file, url: imageUrl, type: 'image' });
      setError(null);
      processImage(file);
    } else {
      setError('Please select a valid image file for OCR scanning.');
    }
  };

  const processImage = async (imageFile) => {
    setIsProcessing(true);
    setShowBottomSheet(true);
    setOcrResult(null);
    setError(null);
    
    try {
      const result = await ocrService.extractFromImage(imageFile);
      setOcrResult(result);
    } catch (err) {
      setError(err.message || 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePdfToDocUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      setConversionError('No file selected.');
      return;
    }
    
    if (file.type !== 'application/pdf') {
      setConversionError('Please select a valid PDF file.');
      return;
    }
    
    if (file.size === 0) {
      setConversionError('Selected PDF file is empty.');
      return;
    }
    
    console.log('PDF file selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });
    
    setConversionError(null);
    setConvertedDoc(null);
    setIsConverting(true);
    setConversionProgress(0);
    
    // Simulate progress during conversion
    const progressInterval = setInterval(() => {
      setConversionProgress(prev => {
        // Stop increasing if it's already very high, to make room for final 100%
        if (prev >= 90) return prev; 
        return Math.min(99, prev + Math.random() * 10); // Ensure it doesn't hit 100 prematurely
      });
    }, 500); // Shorter interval for a more dynamic feel
    
    try {
      const docHtml = await ocrService.convertPdfToWord(file);
      setConvertedDoc(docHtml);
      setConversionProgress(100); // Ensure it reaches 100% on success
    } catch (err) {
      console.error('PDF conversion error:', err);
      setConversionError(err.message || 'Failed to convert PDF.');
    } finally {
      clearInterval(progressInterval);
      setIsConverting(false);
      // Reset progress after a short delay to allow 100% to be visible briefly
      setTimeout(() => setConversionProgress(0), 2000); 
    }
  };

  const downloadWordDoc = () => {
    if (!convertedDoc) return;
    
    // Enhanced Word document header with better image support
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>PDF Document Conversion</title>
<style>
body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
img { max-width: 100%; height: auto; margin: 10px 0; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f2f2f2; }
h1, h2, h3 { color: #333; margin-top: 20px; }
p { margin: 10px 0; }
</style>
</head>
<body>`;

    const footer = "</body></html>";
    const sourceHTML = header + convertedDoc + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `pdf_conversion_${Date.now()}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setOcrResult(null);
    setShowBottomSheet(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-3xl shadow-clay mb-4">
            <Scan className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Tools</h1>
          <p className="text-gray-600">Scan images and convert PDFs to Word</p>
        </div>
        
        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 rounded-2xl p-1 shadow-clay-inner mb-6">
            <TabsTrigger value="scanner" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-clay">Image Scanner</TabsTrigger>
            <TabsTrigger value="converter" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-clay">PDF to Word</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scanner">
            <div className="space-y-6">
              {!capturedImage ? (
                <>
                  <CameraCapture onCapture={handleImageCapture} />
                  <Card className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-clay border-0 p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-clay-inner">
                        <Upload className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Upload Image</h3>
                      <p className="text-gray-600 text-sm mb-4">Choose an image for OCR scanning</p>
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleFileUpload} className="hidden" />
                      <Button onClick={() => fileInputRef.current?.click()} className="bg-gradient-to-r from-green-300 to-blue-300 text-white rounded-2xl px-6 py-3 shadow-clay border-0">Choose Image</Button>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-clay border-0 overflow-hidden">
                  <div className="aspect-square bg-gray-100 rounded-t-3xl overflow-hidden">
                    <img src={capturedImage.url} alt="Captured document" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <Button onClick={handleRetake} variant="outline" className="w-full rounded-2xl border-2 bg-white/50 shadow-clay-inner">Scan Another Image</Button>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="converter">
            <Card className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-clay border-0 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-clay-inner">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">PDF to Word Converter</h3>
                <p className="text-gray-600 text-sm mb-4">Extract all text and images from a PDF into a Word document.</p>
                <input ref={pdfFileRef} type="file" accept="application/pdf" onChange={handlePdfToDocUpload} className="hidden" />
                
                {isConverting ? (
                  <div className="w-full">
                    <Button disabled className="bg-gray-300 text-gray-500 rounded-2xl px-6 py-3 shadow-clay-inner border-0 w-48 mb-4">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Converting...
                    </Button>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-clay-inner mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${Math.round(conversionProgress)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{Math.round(conversionProgress)}% complete</p>
                  </div>
                ) : (
                  <Button onClick={() => pdfFileRef.current?.click()} className="bg-gradient-to-r from-blue-300 to-purple-300 text-white rounded-2xl px-6 py-3 shadow-clay border-0">
                    Upload PDF
                  </Button>
                )}

                {conversionError && <p className="text-red-600 text-sm mt-4">{conversionError}</p>}
                
                {convertedDoc && (
                  <div className="mt-6 p-4 bg-green-50/50 rounded-2xl shadow-clay-inner">
                    <h4 className="font-semibold text-green-800 mb-2">Conversion Successful!</h4>
                    <p className="text-green-700 text-sm mb-4">Your Word document is ready to download.</p>
                    <Button onClick={downloadWordDoc} className="bg-gradient-to-r from-green-300 to-teal-300 text-white rounded-2xl px-6 py-3 shadow-clay border-0 w-full">
                      <FileDown className="w-4 h-4 mr-2" />
                      Download .doc File
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <BottomSheet isOpen={showBottomSheet} onClose={() => setShowBottomSheet(false)}>
          <DocumentResult result={ocrResult} isProcessing={isProcessing} error={error} onRetake={handleRetake} />
        </BottomSheet>
      </div>
    </div>
  );
}
