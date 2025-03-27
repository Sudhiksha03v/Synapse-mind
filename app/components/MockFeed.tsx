'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for social media posts with different mental health concerns
const mockPosts = [
  {
    id: 1,
    avatar: '👩🏻',
    username: 'sarah_davis',
    content: "Feeling so overwhelmed lately. Can't seem to get out of bed most days and everything feels pointless. Does it ever get better?",
    timestamp: '2 hours ago',
    likes: 12,
    category: 'depression',
  },
  {
    id: 2,
    avatar: '👨🏽',
    username: 'alex_m',
    content: "My heart is racing and I can't breathe. This is the third panic attack this week. I'm scared to leave my apartment now.",
    timestamp: '5 hours ago',
    likes: 24,
    category: 'anxiety',
  },
  {
    id: 3,
    avatar: '👩🏾',
    username: 'jasmine_k',
    content: "Haven't slept properly in days. My mind just won't shut off. I keep worrying about every little thing and it's exhausting.",
    timestamp: '1 day ago',
    likes: 18,
    category: 'insomnia',
  },
  {
    id: 4,
    avatar: '👨🏻',
    username: 'mike_p',
    content: "Sometimes I feel like everyone else has their life together and I'm just pretending to be okay. Anyone else feel this imposter syndrome?",
    timestamp: '2 days ago',
    likes: 56,
    category: 'self-doubt',
  },
  {
    id: 5,
    avatar: '👩🏼',
    username: 'emma_l',
    content: "I've been feeling so alone lately even when I'm with friends. It's like there's this disconnect between me and everyone else.",
    timestamp: '3 days ago',
    likes: 32,
    category: 'loneliness',
  },
];

// Category icons and colors
const categoryStyles = {
  depression: {
    icon: '😔',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-purple-600',
  },
  anxiety: {
    icon: '😰',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-orange-500',
  },
  insomnia: {
    icon: '😴',
    gradientFrom: 'from-indigo-400',
    gradientTo: 'to-blue-500',
  },
  'self-doubt': {
    icon: '🤔',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-teal-500',
  },
  loneliness: {
    icon: '🫂',
    gradientFrom: 'from-pink-400',
    gradientTo: 'to-red-500',
  },
};

interface MockFeedProps {
  onSelectPost: (content: string) => void;
}

export default function MockFeed({ onSelectPost }: MockFeedProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handlePostClick = (post: typeof mockPosts[0]) => {
    setSelectedId(post.id);
    onSelectPost(post.content);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {mockPosts.map((post) => {
        const categoryStyle = categoryStyles[post.category as keyof typeof categoryStyles];
        const isSelected = selectedId === post.id;
        const isHovered = hoveredId === post.id;
        
        return (
          <motion.div
            key={post.id}
            variants={item}
            className={`relative rounded-xl glass p-4 shadow-md cursor-pointer transition-all
              ${isSelected ? 'ring-2 ring-primary scale-[1.02]' : 'hover:shadow-lg hover:scale-[1.01]'}`}
            onClick={() => handlePostClick(post)}
            onMouseEnter={() => setHoveredId(post.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Subtle gradient background based on category */}
            <div 
              className={`absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${categoryStyle.gradientFrom} ${categoryStyle.gradientTo}`}
            ></div>
            
            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute -right-1 -top-1 bg-primary text-white rounded-full p-1 z-10 shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <div className="relative z-10">
              {/* Header with username and avatar */}
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 text-lg mr-2">{post.avatar}</div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <p className="font-semibold text-sm">@{post.username}</p>
                    <span className="mx-1 text-foreground/50">•</span>
                    <p className="text-xs text-foreground/50">{post.timestamp}</p>
                  </div>
                </div>
              </div>
              
              {/* Post content */}
              <p className="text-sm mb-3">{post.content}</p>
              
              {/* Footer with category and likes */}
              <div className="flex items-center justify-between text-xs">
                <div className={`flex items-center px-2 py-1 rounded-full bg-gradient-to-r ${categoryStyle.gradientFrom} ${categoryStyle.gradientTo} bg-opacity-10`}>
                  <span className="mr-1">{categoryStyle.icon}</span>
                  <span className="capitalize text-foreground/80">{post.category}</span>
                </div>
                
                <div className="flex items-center text-foreground/60">
                  <motion.svg 
                    className={`w-4 h-4 mr-1 ${isHovered ? 'text-primary' : ''}`}
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </motion.svg>
                  <span>{post.likes}</span>
                </div>
              </div>
              
              {/* Analyze prompt - only shows on hover */}
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isHovered || isSelected ? 1 : 0,
                  height: isHovered || isSelected ? 'auto' : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs text-primary font-medium">
                  {isSelected ? 'Selected for analysis ✓' : 'Click to analyze this post'}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
} 