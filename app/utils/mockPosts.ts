export interface MockPost {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export const mockPosts: MockPost[] = [
  {
    id: '1',
    username: 'SleeplessNights',
    content: 'Another night of tossing and turning. Haven\'t had a full night\'s sleep in weeks. My mind just won\'t shut down. #exhausted',
    timestamp: '2 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
  },
  {
    id: '2',
    username: 'MindfulJourney',
    content: 'Today I practiced meditation for 20 minutes and it really helped calm my racing thoughts. Small wins! #mentalhealth #selfcare',
    timestamp: '5 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '3',
    username: 'OverwhelmedGrad',
    content: 'Deadline after deadline. I feel like I can\'t breathe. The pressure is crushing me and I don\'t know how much more I can take. Everyone expects so much.',
    timestamp: '1 day ago',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
  },
  {
    id: '4',
    username: 'WorkLifeImbalance',
    content: 'Had a productive meeting with my team today! Working on exciting new projects. #motivated #teamwork',
    timestamp: '2 days ago',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: '5',
    username: 'DarkThoughts',
    content: 'Sometimes I wonder if anyone would even notice if I just disappeared. Nothing I do seems to matter anymore.',
    timestamp: '3 days ago',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  {
    id: '6',
    username: 'PanicAttacks',
    content: 'Heart racing, hands shaking, can\'t catch my breath. Third panic attack this week. Just want this feeling to stop.',
    timestamp: '4 days ago',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
  }
]; 