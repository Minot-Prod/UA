
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Copy, 
  Download, 
  RefreshCw, 
  FileText, 
  CreditCard, 
  Receipt, 
  IdCard, 
  Users, 
  Check,
  Loader2
} from 'lucide-react';

import FieldsDisplay from './FieldsDisplay';

const documentIcons = {
  receipt: Receipt,
  invoice: FileText,
  business_card: Users,
  id_card: IdCard,
  generic: CreditCard
};

const documentLabels = {
  receipt: 'Receipt',
  invoice: 'Invoice',
  business_card: 'Business Card',
  id_card: 'ID Card',
  generic: 'Document'
};

export default function DocumentResult({ result, isProcessing, error, onRetake }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadJSON = () => {
    if (!result) return;
    
    const dataStr = JSON.stringify(result, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `document-scan-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-clay-inner">
          <FileText className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="font-semibold text-red-600 mb-2">Processing Failed</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button
          onClick={onRetake}
          className="bg-gradient-to-r from-red-300 to-pink-300 hover:from-red-400 hover:to-pink-400 text-white rounded-2xl px-6 py-3 shadow-clay border-0"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-clay-inner">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Processing Document</h3>
        <p className="text-gray-600">Extracting text, please wait...</p>
      </div>
    );
  }

  if (!result) return null;

  const DocIcon = documentIcons[result.doc_type] || FileText;

  // Ensure confidence is a number
  const confidenceScore = typeof result.confidence === 'number' ? result.confidence : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-clay-inner">
          <DocIcon className="w-8 h-8 text-green-600" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-800">
            {documentLabels[result.doc_type] || 'Document'}
          </h3>
          <Badge 
            className={`rounded-full px-2 py-1 text-xs border-0 shadow-clay-inner ${
              confidenceScore >= 0.8 
                ? 'bg-green-100 text-green-700'
                : confidenceScore >= 0.6
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {Math.round(confidenceScore * 100)}%
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 rounded-2xl p-1 shadow-clay-inner">
          <TabsTrigger 
            value="summary" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-clay"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger 
            value="fields"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-clay"
          >
            Fields
          </TabsTrigger>
          <TabsTrigger 
            value="fulltext"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-clay"
          >
            Full Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4 mt-4">
          <Card className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-clay border-0 p-4">
            <FieldsDisplay docType={result.doc_type} fields={result.structured_data} />
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-4 mt-4">
          <Card className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-clay border-0 p-4">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50/50 p-3 rounded-xl">
              {JSON.stringify(result.structured_data, null, 2)}
            </pre>
          </Card>
        </TabsContent>

        <TabsContent value="fulltext" className="space-y-4 mt-4">
          <Card className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-clay border-0 p-4">
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {result.full_text}
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Warnings */}
      {result.warnings && result.warnings.length > 0 && (
        <Card className="bg-yellow-50/50 backdrop-blur-sm rounded-2xl shadow-clay border-0 p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Warnings</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            {result.warnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => copyToClipboard(result.full_text)}
          className="flex-1 bg-gradient-to-r from-blue-300 to-green-300 hover:from-blue-400 hover:to-green-400 text-white rounded-2xl py-3 shadow-clay border-0 transition-all duration-300"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </>
          )}
        </Button>
        
        <Button
          onClick={downloadJSON}
          className="flex-1 bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400 text-white rounded-2xl py-3 shadow-clay border-0 transition-all duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Save JSON
        </Button>
      </div>

      <Button
        onClick={onRetake}
        variant="outline"
        className="w-full rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white/50 shadow-clay-inner py-3"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Scan Another Document
      </Button>
    </div>
  );
}
