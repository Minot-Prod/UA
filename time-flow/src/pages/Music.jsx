
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

const musicCategories = [
  {
    id: "focus",
    name: "Deep Focus",
    icon: "🎯",
    color: "from-blue-500 to-cyan-600",
    tracks: [
      { name: "Neural Pathways", duration: 3600, url: "https://example.com/focus1.mp3" },
      { name: "Concentration Flow", duration: 2700, url: "https://example.com/focus2.mp3" },
      { name: "Mind Palace", duration: 3300, url: "https://example.com/focus3.mp3" }
    ]
  },
  {
    id: "relax",
    name: "Relaxation",
    icon: "🧘‍♀️",
    color: "from-green-500 to-emerald-600",
    tracks: [
      { name: "Ocean Waves", duration: 2400, url: "https://example.com/relax1.mp3" },
      { name: "Forest Rain", duration: 3000, url: "https://example.com/relax2.mp3" },
      { name: "Mountain Wind", duration: 2700, url: "https://example.com/relax3.mp3" }
    ]
  },
  {
    id: "workout",
    name: "Workout Energy",
    icon: "💪",
    color: "from-red-500 to-orange-600",
    tracks: [
      { name: "Beast Mode", duration: 2100, url: "https://example.com/workout1.mp3" },
      { name: "Power Surge", duration: 2400, url: "https://example.com/workout2.mp3" },
      { name: "Victory Drive", duration: 2700, url: "https://example.com/workout3.mp3" }
    ]
  },
  {
    id: "sleep",
    name: "Sleep Sounds",
    icon: "🌙",
    color: "from-purple-500 to-indigo-600",
    tracks: [
      { name: "Dreamscape", duration: 3600, url: "https://example.com/sleep1.mp3" },
      { name: "Night Whispers", duration: 4200, url: "https://example.com/sleep2.mp3" },
      { name: "Cosmic Drift", duration: 3900, url: "https://example.com/sleep3.mp3" }
    ]
  },
  {
    id: "nature",
    name: "Nature Sounds",
    icon: "🍃",
    color: "from-green-400 to-blue-500",
    tracks: [
      { name: "Birdsong Morning", duration: 2700, url: "https://example.com/nature1.mp3" },
      { name: "Creek Flow", duration: 3300, url: "https://example.com/nature2.mp3" },
      { name: "Thunder Storm", duration: 2400, url: "https://example.com/nature3.mp3" }
    ]
  },
  {
    id: "lofi",
    name: "Lo-Fi Chill",
    icon: "🎵",
    color: "from-pink-500 to-violet-600",
    tracks: [
      { name: "Midnight Study", duration: 2100, url: "https://example.com/lofi1.mp3" },
      { name: "Café Vibes", duration: 2400, url: "https://example.com/lofi2.mp3" },
      { name: "Nostalgic Dreams", duration: 2700, url: "https://example.com/lofi3.mp3" }
    ]
  }
];

export default function Music() {
  const [selectedCategory, setSelectedCategory] = useState("focus");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const category = musicCategories.find(cat => cat.id === selectedCategory);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a real app, you'd load and play the actual audio file
    console.log(`Playing: ${track.name}`);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!currentTrack || !category) return;
    const currentIndex = category.tracks.findIndex(t => t.name === currentTrack.name);
    const nextIndex = (currentIndex + 1) % category.tracks.length;
    playTrack(category.tracks[nextIndex]);
  };

  const prevTrack = () => {
    if (!currentTrack || !category) return;
    const currentIndex = category.tracks.findIndex(t => t.name === currentTrack.name);
    const prevIndex = currentIndex === 0 ? category.tracks.length - 1 : currentIndex - 1;
    playTrack(category.tracks[prevIndex]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
          Ambient Soundscapes
        </h1>
        <p className="text-xl font-medium text-secondary-foreground">
          Enhance your productivity with curated audio experiences
        </p>
      </motion.div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {musicCategories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat.id)}
            className={`glass-card rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
              selectedCategory === cat.id 
                ? 'ring-2 ring-primary shadow-lg shadow-primary/25' 
                : 'hover:shadow-lg'
            }`}
          >
            <div className={`h-20 w-full bg-gradient-to-br ${cat.color} rounded-xl mb-3 flex items-center justify-center text-3xl`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-foreground text-center">{cat.name}</h3>
            <p className="text-sm text-secondary-foreground text-center mt-1">
              {cat.tracks.length} tracks
            </p>
          </motion.div>
        ))}
      </div>

      {/* Track List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            {category.name} Collection
          </h3>
          
          <div className="space-y-3">
            {category.tracks.map((track, index) => (
              <motion.div
                key={track.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => playTrack(track)}
                className={`p-4 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 ${
                  currentTrack?.name === track.name
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'glass-card border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      {currentTrack?.name === track.name && isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{track.name}</p>
                      <p className="text-sm text-secondary-foreground">
                        {formatTime(track.duration)}
                      </p>
                    </div>
                  </div>
                  <Music2 className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Music Player */}
      {currentTrack && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="text-center mb-4">
            <h4 className="font-bold text-lg text-foreground">{currentTrack.name}</h4>
            <p className="text-sm text-secondary-foreground">{category.name}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTrack}
              className="w-12 h-12 rounded-full hover:scale-110 transition-all"
            >
              <SkipBack className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTrack}
              className="w-12 h-12 rounded-full hover:scale-110 transition-all"
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={([value]) => setVolume(value)}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-secondary-foreground w-10 text-right">
              {volume}%
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
