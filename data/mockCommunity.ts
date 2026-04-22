
export interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
}

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: 'User' | 'Agent' | 'Admin';
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  tags: string[];
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Jenkins',
      role: 'User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    content: 'Just put together my first "Zero Waste Kit" for medicine disposal! 🌿 Keeping separate bins for syrups and tablets made the pickup process so much faster today. Thanks to Agent Vikram for the tips!',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=800&auto=format&fit=crop',
    likes: 124,
    comments: [
      { id: 'c1', user: 'Vikram Singh', avatar: '', content: 'Happy to help, Sarah! Great job segregating.' }
    ],
    timestamp: '2 hours ago',
    tags: ['#ZeroWaste', '#EcoWarrior']
  },
  {
    id: '2',
    user: {
      name: 'Rahul Sharma',
      role: 'Agent',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
    },
    content: 'Route Completed! ✅ 45kg of pharmaceutical waste collected from Sector 4 today. It’s amazing to see so many households participating. Together we are keeping our water safe! 💧',
    image: 'https://images.unsplash.com/photo-1617727553252-65863c156eb0?q=80&w=800&auto=format&fit=crop',
    likes: 342,
    comments: [],
    timestamp: '5 hours ago',
    tags: ['#AgentLife', '#CleanWater']
  },
  {
    id: '3',
    user: {
      name: 'Planet Admin',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin'
    },
    content: '🚨 SAFETY TIP: Never flush antibiotics down the toilet! This contributes to superbug resistance in our water systems. Always use the Planet Prescription app to schedule a secure pickup.',
    likes: 856,
    comments: [],
    timestamp: '1 day ago',
    tags: ['#SafetyFirst', '#DidYouKnow']
  },
  {
    id: '4',
    user: {
      name: 'David Chen',
      role: 'User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    content: 'Used the new AI scanner today. It correctly identified my expired insulin pens immediately. Technology for good! 🤖✨',
    likes: 89,
    comments: [],
    timestamp: '1 day ago',
    tags: ['#TechForGood', '#AI']
  },
  {
    id: '5',
    user: {
      name: 'Priya Malik',
      role: 'Agent',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    },
    content: 'Traffic was tough today, but the smile on Mrs. Deshmukh’s face when I collected her 2-year backlog of meds was worth it. We are making a difference, one stop at a time.',
    likes: 210,
    comments: [],
    timestamp: '2 days ago',
    tags: ['#Motivation', '#Community']
  }
];
