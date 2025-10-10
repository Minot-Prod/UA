
import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, Target, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvokeLLM } from "@/api/integrations";
import { motion, AnimatePresence } from "framer-motion";

const motivationalQuotes = [
  "Time is precious - make every moment count! ⏰",
  "Focus is your superpower - use it wisely! 🎯", 
  "Small steps, big progress! You've got this! 💪",
  "Every second is a chance to turn it around ✨",
  "Productivity isn't about time, it's about attention 🧠",
  "Rest is part of the work - don't forget to recharge! 🔋"
];

export default function TimeBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Rotate motivational quotes every 10 seconds
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const initializeWelcome = useCallback(() => {
    if (messages.length === 0) {
      setMessages([{
        type: 'ai',
        content: "Hi there! I'm TimeBuddy, your productivity companion! 🤖✨\n\nI'm here to help you optimize your time, suggest perfect timer durations, and keep you motivated. What would you like to work on today?",
        timestamp: new Date()
      }]);
    }
  }, [messages.length]); // messages.length is a stable dependency for this purpose

  useEffect(() => {
    if (isOpen) {
      initializeWelcome();
    }
  }, [isOpen, initializeWelcome]); // initializeWelcome is now a stable dependency

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user', 
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await InvokeLLM({
        prompt: `You are TimeBuddy, a cute and helpful AI assistant for a time management app. You help users with productivity, suggest timer durations, provide motivational quotes, and give time management advice. Keep responses friendly, concise, and helpful. Include relevant emojis.

User's message: ${inputValue}

Provide a helpful response about time management, productivity tips, timer suggestions, or motivation. Keep it under 150 words and be encouraging!`,
        add_context_from_internet: false
      });

      const aiMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'ai',
        content: "Oops! I'm having trouble connecting right now. Try asking me about productivity tips, timer suggestions, or just say hi! 😊",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const quickSuggestions = [
    "Suggest a timer for studying",
    "How to stay focused?",
    "Best break schedule?",
    "Motivate me!"
  ];

  return (
    <>
      {/* Floating Buddy Icon */}
      <motion.div
        className="fixed bottom-20 right-4 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="relative text-2xl">🤖</div>
          {!isOpen && (
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-12 -left-20 bg-black/80 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap backdrop-blur-sm"
            >
              {motivationalQuotes[currentQuote]}
            </motion.div>
          )}
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-40 right-4 w-80 h-96 glass-card rounded-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-foreground">TimeBuddy</h3>
                  <p className="text-xs text-secondary-foreground">Your productivity pal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:scale-110 transition-all"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-card border border-white/10'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass-card border border-white/10 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="p-2 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="ghost"
                      size="sm"
                      onClick={() => setInputValue(suggestion)}
                      className="text-xs hover:scale-105 transition-all"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask TimeBuddy anything..."
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
