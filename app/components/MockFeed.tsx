'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Interface for a post
interface Post {
  id: number;
  avatar: string;
  username: string;
  content: string;
  timestamp: string;
  likes?: number;
  upvotes?: number;
  category: keyof typeof categoryStyles;
}

// Theme styles with more colors
const categoryStyles = {
  daily: { gradientFrom: 'from-blue-500', gradientTo: 'to-purple-600' },
  work: { gradientFrom: 'from-green-400', gradientTo: 'to-teal-500' },
  leisure: { gradientFrom: 'from-yellow-400', gradientTo: 'to-orange-500' },
  night: { gradientFrom: 'from-indigo-400', gradientTo: 'to-blue-500' },
  social: { gradientFrom: 'from-pink-400', gradientTo: 'to-red-500' },
  travel: { gradientFrom: 'from-cyan-400', gradientTo: 'to-sky-600' },
  food: { gradientFrom: 'from-amber-400', gradientTo: 'to-rose-500' },
  creative: { gradientFrom: 'from-purple-400', gradientTo: 'to-fuchsia-600' },
  fitness: { gradientFrom: 'from-lime-400', gradientTo: 'to-emerald-500' },
  chaos: { gradientFrom: 'from-red-400', gradientTo: 'to-yellow-600' },
};

// Mock data with realistic, multi-sentence Twitter posts and more mental health themes
const mockData: Record<string, Post[]> = {
  twitter: [
    { id: 1, avatar: '👩🏻', username: 'sarah_davis', content: "March deadlines are brutal. Haven’t slept properly in days, just staring at my screen feeling like a failure. #WorkLife", timestamp: '2h ago', likes: 15, category: 'work' }, // Depression
    { id: 2, avatar: '👨🏽', username: 'alex_m', content: "Spring’s here, but I’m a wreck. Heart’s racing, can’t focus, everything’s spinning out of control. Anyone else?", timestamp: '45m ago', likes: 28, category: 'daily' }, // Anxiety
    { id: 3, avatar: '👩🏾', username: 'jasmine_k', content: "Up at 3 AM again. Thoughts won’t stop, chest feels tight, hate this night crap. #SendHelp", timestamp: '3h ago', likes: 19, category: 'night' }, // Anxiety
    { id: 4, avatar: '👨🏻', username: 'mike_p', content: "Work cupcakes were dope today! Now I’m crashed out, mood’s gone dark, what’s even the point? #BipolarStruggles", timestamp: '1d ago', likes: 42, category: 'work' }, // Bipolar
    { id: 5, avatar: '👩🏼', username: 'emma_l', content: "Movie night with friends was loud and fun. Now I’m home, sinking fast, can’t shake this empty vibe.", timestamp: '5h ago', likes: 33, category: 'social' }, // Depression
    { id: 6, avatar: '🧑🏼', username: 'tina_r', content: "Ran 5k this morning, skipped breakfast again. Feeling light is way better than full, ugh food’s overrated. #Fitness", timestamp: '6h ago', likes: 50, category: 'fitness' }, // Anorexia
    { id: 7, avatar: '👨🏾', username: 'chris_v', content: "Boss didn’t call today. I’m pacing, palms sweaty, freaking out over nothing. Why am I like this?", timestamp: '4h ago', likes: 22, category: 'work' }, // Anxiety
    { id: 8, avatar: '👩🏿', username: 'nina_b', content: "March rain’s chill, but I’m numb inside. Smiled for pics, now I’m just done. #FakeIt", timestamp: '12h ago', likes: 38, category: 'leisure' }, // Depression
    { id: 9, avatar: '🧑🏻', username: 'sam_t', content: "Rain hit hard, laughed like a kid, now I’m crying in my car. Wtf is wrong with me? #MoodSwings", timestamp: '7h ago', likes: 17, category: 'daily' }, // Bipolar
    { id: 10, avatar: '👨🏼', username: 'jake_w', content: "Taxes due soon, I’m a mess. Can’t stop pacing, chest’s tight, someone take this stress away!", timestamp: '9h ago', likes: 31, category: 'daily' }, // Anxiety
    { id: 11, avatar: '👩🏽', username: 'priya_singh', content: "Holi was wild, danced all day! Now I’m in bed, too hollow to move, everything’s grey. #PostParty", timestamp: '1h ago', likes: 25, category: 'social' }, // Depression
    { id: 12, avatar: '🧑🏾', username: 'ananya_patel', content: "Saw food pics online, felt sick. Skipped lunch again, empty’s my safe spot now. #NoThanks", timestamp: '5h ago', likes: 47, category: 'food' }, // Anorexia
    { id: 13, avatar: '👨🏿', username: 'rahul_verma', content: "Work’s insane, FY-end chaos. Heart’s pounding, can’t breathe right, I’m losing it. #Help", timestamp: '3h ago', likes: 38, category: 'work' }, // Anxiety
    { id: 14, avatar: '👩🏻', username: 'kavya_m', content: "Gym sesh was killer today. No food after, just water—feeling faint but it’s worth it. #Control", timestamp: '8h ago', likes: 29, category: 'fitness' }, // Anorexia
    { id: 15, avatar: '🧑🏼', username: 'vivek_s', content: "Partied hard last night, was on fire! Crashed now, can’t get up, mood’s flipped. #BipolarLife", timestamp: '10h ago', likes: 35, category: 'social' }, // Bipolar
  ],
  reddit: [
    { id: 16, avatar: '🧑🏻', username: 'u/lazyCoder', content: "FY-end coding’s due, but I’m frozen. Brain’s empty, just sitting here feeling useless again.", timestamp: '4h ago', upvotes: 87, category: 'work' }, // Depression
    { id: 17, avatar: '👨🏿', username: 'u/gaming_dude', content: "Beat a level, felt on top of the world, now I’m down again. Why does every high end like this?", timestamp: '12h ago', upvotes: 154, category: 'leisure' }, // Bipolar
    { id: 18, avatar: '👩🏽', username: 'u/bookworm22', content: "March nights, trying to read, but my head’s a tornado. Can’t sleep, can’t stop worrying about nothing.", timestamp: '1d ago', upvotes: 63, category: 'night' }, // Anxiety
    { id: 19, avatar: '🧑🏾', username: 'u/foodie4life', content: "Made a sandwich, took one bite, now I’m freaking out. Food’s too much, I don’t deserve it anyway.", timestamp: '8h ago', upvotes: 29, category: 'food' }, // Anorexia
    { id: 20, avatar: '👩🏻', username: 'u/art_girl', content: "Doodling again, but it’s all garbage. I’m garbage. Why do I keep doing this to myself?", timestamp: '2d ago', upvotes: 45, category: 'creative' }, // Depression
  ],
  instagram: [
    { id: 21, avatar: '👩🏼', username: 'lily.snaps', content: "Got some spring pics up, flowers everywhere, smiling for the camera. Truth is, I’m barely holding it together, feel like a ghost in my own life.", timestamp: '3h ago', likes: 238, category: 'leisure' }, // Depression
    { id: 22, avatar: '👨🏻', username: 'travel_jay', content: "Hiked in March heat, legs burning, got some dope shots. But my head’s pounding, chest’s tight, can’t shake this dread no matter where I go.", timestamp: '1d ago', likes: 412, category: 'travel' }, // Anxiety
    { id: 23, avatar: '👩🏾', username: 'fit_kay', content: "Hit the gym today, pushed hard, no food after. Been dizzy all day, but it’s fine, rather feel light than full. Keeps me in control.", timestamp: '6h ago', likes: 189, category: 'fitness' }, // Anorexia
    { id: 24, avatar: '🧑🏽', username: 'artsy_vibe', content: "Painted all night, colors everywhere, thought it’d help. It’s trash, I’m trash, mood’s a rollercoaster and I can’t get off.", timestamp: '10h ago', likes: 305, category: 'creative' }, // Bipolar
    { id: 25, avatar: '👨🏼', username: 'dogdad_matt', content: "Pup’s running wild in the park, usually makes me laugh. Today I’m spiraling, can’t breathe right, feel like I’m drowning in chaos.", timestamp: '2d ago', likes: 267, category: 'chaos' }, // Anxiety
  ],
};

// Function to get 6 random posts from a platform
const getRandomPosts = (platform: keyof typeof mockData): Post[] => {
  const posts = [...mockData[platform]];
  for (let i = posts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posts[i], posts[j]] = [posts[j], posts[i]]; // Shuffle array
  }
  return posts.slice(0, 6); // Display 6 posts
};

interface MockFeedProps {
  onSelectPost: (content: string) => void;
}

export default function MockFeed({ onSelectPost }: MockFeedProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [platform, setPlatform] = useState<keyof typeof mockData>('twitter');
  const [posts, setPosts] = useState<Post[]>(getRandomPosts('twitter'));

  useEffect(() => {
    setPosts(getRandomPosts(platform));
  }, [platform]);

  const handlePostClick = (post: Post) => {
    setSelectedId(post.id);
    onSelectPost(post.content);
  };

  const handlePlatformChange = (newPlatform: keyof typeof mockData) => {
    setPlatform(newPlatform);
    setSelectedId(null);
  };

  const handleRefresh = () => {
    setPosts(getRandomPosts(platform));
    setSelectedId(null);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      {/* Platform Selection */}
      <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl shadow-md border border-border/50">
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(mockData).map((plat) => (
            <motion.button
              key={plat}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                platform === plat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
              }`}
              onClick={() => handlePlatformChange(plat as keyof typeof mockData)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {plat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
        {posts.map((post) => {
          const isSelected = selectedId === post.id;
          const isHovered = hoveredId === post.id;
          const interactionCount = post.likes ?? post.upvotes ?? 0;
          const categoryStyle = categoryStyles[post.category];

          return (
            <motion.div
              key={post.id}
              variants={item}
              className={`relative rounded-xl bg-card/95 border border-border/30 p-4 shadow-lg cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-primary scale-[1.02]' : 'hover:shadow-2xl hover:scale-[1.01]'
              }`}
              onClick={() => handlePostClick(post)}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${categoryStyle.gradientFrom} ${categoryStyle.gradientTo}`}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border border-white/10"
                animate={{ opacity: isHovered ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute -right-2 -top-2 bg-primary text-white rounded-full p-1.5 z-10 shadow-xl">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 text-2xl mr-3">{post.avatar}</div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg text-foreground">@{post.username}</p>
                      <span className="text-foreground/50">•</span>
                      <p className="text-sm text-foreground/60">{post.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <p className="text-base text-foreground/90 mb-3 leading-relaxed">{post.content}</p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <motion.button
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryStyle.gradientFrom} ${categoryStyle.gradientTo} shadow-sm`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {platform}
                  </motion.button>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <motion.svg
                      className={`w-5 h-5 ${isHovered ? 'text-primary' : 'text-foreground/60'}`}
                      animate={{ scale: isHovered ? 1.2 : 1 }}
                      transition={{ duration: 0.2 }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </motion.svg>
                    <span>{interactionCount}</span>
                  </div>
                </div>

                {/* Analyze prompt */}
                <motion.div
                  className="mt-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered || isSelected ? 1 : 0, y: isHovered || isSelected ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                    {isSelected ? 'Selected for analysis ✓' : 'Click to analyze'}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <motion.button
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-accent text-white shadow-lg hover:bg-accent/90 flex items-center gap-2"
          onClick={handleRefresh}
          whileHover={{ scale: 1.05, boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9H0m0 11v-5h.582a8.001 8.001 0 0015.356-2H20" />
          </svg>
          Refresh Posts
        </motion.button>
      </div>
    </div>
  );
}