
export const TRENDING_TOPICS = [
  '#ZeroWasteLiving',
  '#SafeDisposal',
  '#EcoWarrior',
  '#MumbaiCleanUp',
  '#AgentHeroes',
  '#CircularEconomy'
];

export const TOP_CONTRIBUTORS = [
  { id: '1', name: 'Vikram Singh', role: 'Agent', points: 1250, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
  { id: '2', name: 'Sarah Jenkins', role: 'User', points: 980, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '3', name: 'David Chen', role: 'User', points: 850, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { id: '4', name: 'Priya Malik', role: 'Agent', points: 720, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' }
];

export const COMMUNITY_POSTS = [
  {
    id: 'p1',
    author: {
      name: 'Planet Admin',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin',
      isVerified: true
    },
    content: '🚨 **Important Update:** We have successfully partnered with 3 new recycling facilities in Mumbai! This means faster pickups and 100% trace-free disposal for all scheduled requests starting Monday.',
    timestamp: '2 hours ago',
    likes: 342,
    comments: 45,
    isPinned: true,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'p2',
    author: {
      name: 'Rahul Sharma',
      role: 'Agent',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      isVerified: true
    },
    content: 'Just completed a bulk collection drive at Sunshine Apartments. 🏢 Over 15kg of expired medicines collected! Thank you to the residents for segregating everything so neatly. It makes our job much safer. 🚛💨',
    timestamp: '4 hours ago',
    likes: 189,
    comments: 23,
    isPinned: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'p3',
    author: {
      name: 'Anjali Desai',
      role: 'User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      isVerified: false
    },
    content: 'Does anyone know if I can hand over insulin pens in the same bag as tablet strips? Or do they need to be separated for the pickup agent?',
    timestamp: '5 hours ago',
    likes: 12,
    comments: 8,
    isPinned: false,
    type: 'question'
  },
  {
    id: 'p4',
    author: {
      name: 'Vikram Singh',
      role: 'Agent',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
      isVerified: true
    },
    content: 'Morning route started! ☀️ Covering Sector 4 and 5 today. If you have a scheduled pickup, please keep your QR codes ready for a quick scan.',
    timestamp: '8 hours ago',
    likes: 56,
    comments: 4,
    isPinned: false
  },
  {
    id: 'p5',
    author: {
      name: 'Tech for Good',
      role: 'Partner',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Tech',
      isVerified: true
    },
    content: 'Did you know? Flushing antibiotics down the toilet contributes to superbug resistance. Our latest study shows a 40% reduction in local water contamination thanks to responsible disposal networks like Planet Prescription. 🌍',
    timestamp: '1 day ago',
    likes: 210,
    comments: 15,
    isPinned: false,
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1000&auto=format&fit=crop'
  }
];
