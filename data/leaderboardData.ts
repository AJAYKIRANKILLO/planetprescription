
export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  type: 'User' | 'Agent';
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  points: number;
  medicinesDisposed: number; // Count of items
  wasteWeight: number; // in kg
  co2Saved: number; // in kg
  change: 'up' | 'down' | 'same';
}

export const LEADERBOARD_USERS: LeaderboardEntry[] = [
  { rank: 1, id: 'u1', name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', type: 'User', tier: 'Platinum', points: 2450, medicinesDisposed: 142, wasteWeight: 12.5, co2Saved: 45.2, change: 'same' },
  { rank: 2, id: 'u2', name: 'David Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', type: 'User', tier: 'Platinum', points: 2180, medicinesDisposed: 110, wasteWeight: 9.8, co2Saved: 38.1, change: 'up' },
  { rank: 3, id: 'u3', name: 'Anjali Desai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali', type: 'User', tier: 'Gold', points: 1950, medicinesDisposed: 95, wasteWeight: 8.2, co2Saved: 31.5, change: 'down' },
  { rank: 4, id: 'u4', name: 'Michael Ross', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', type: 'User', tier: 'Gold', points: 1820, medicinesDisposed: 88, wasteWeight: 7.5, co2Saved: 28.0, change: 'up' },
  { rank: 5, id: 'u5', name: 'Priya Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', type: 'User', tier: 'Silver', points: 1650, medicinesDisposed: 72, wasteWeight: 6.1, co2Saved: 22.4, change: 'same' },
  { rank: 6, id: 'u6', name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', type: 'User', tier: 'Silver', points: 1400, medicinesDisposed: 65, wasteWeight: 5.5, co2Saved: 19.8, change: 'down' },
  { rank: 7, id: 'u7', name: 'Fatima Khan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', type: 'User', tier: 'Silver', points: 1250, medicinesDisposed: 50, wasteWeight: 4.2, co2Saved: 15.1, change: 'up' },
  { rank: 8, id: 'u8', name: 'Robert Fox', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', type: 'User', tier: 'Bronze', points: 980, medicinesDisposed: 35, wasteWeight: 3.0, co2Saved: 11.2, change: 'same' },
  { rank: 9, id: 'u9', name: 'Anita Roy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita', type: 'User', tier: 'Bronze', points: 850, medicinesDisposed: 28, wasteWeight: 2.5, co2Saved: 9.5, change: 'down' },
  { rank: 10, id: 'u10', name: 'Kenji Sato', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji', type: 'User', tier: 'Bronze', points: 720, medicinesDisposed: 20, wasteWeight: 1.8, co2Saved: 6.7, change: 'up' },
];

export const LEADERBOARD_AGENTS: LeaderboardEntry[] = [
  { rank: 1, id: 'a1', name: 'Vikram Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram', type: 'Agent', tier: 'Platinum', points: 15400, medicinesDisposed: 1250, wasteWeight: 450.5, co2Saved: 1200, change: 'same' },
  { rank: 2, id: 'a2', name: 'Rahul Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', type: 'Agent', tier: 'Platinum', points: 14200, medicinesDisposed: 1100, wasteWeight: 380.2, co2Saved: 980, change: 'up' },
  { rank: 3, id: 'a3', name: 'Sneha Reddy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', type: 'Agent', tier: 'Gold', points: 11500, medicinesDisposed: 850, wasteWeight: 290.0, co2Saved: 750, change: 'up' },
  { rank: 4, id: 'a4', name: 'Amit Verma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', type: 'Agent', tier: 'Gold', points: 9800, medicinesDisposed: 720, wasteWeight: 210.5, co2Saved: 620, change: 'down' },
  { rank: 5, id: 'a5', name: 'Priya Malik', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', type: 'Agent', tier: 'Silver', points: 7600, medicinesDisposed: 540, wasteWeight: 150.0, co2Saved: 410, change: 'same' },
  { rank: 6, id: 'a6', name: 'Rajesh Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh', type: 'Agent', tier: 'Silver', points: 6200, medicinesDisposed: 410, wasteWeight: 120.2, co2Saved: 300, change: 'down' },
  { rank: 7, id: 'a7', name: 'Suresh Raina', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh', type: 'Agent', tier: 'Bronze', points: 4500, medicinesDisposed: 280, wasteWeight: 80.5, co2Saved: 180, change: 'up' },
  { rank: 8, id: 'a8', name: 'Karan Johar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karan', type: 'Agent', tier: 'Bronze', points: 3200, medicinesDisposed: 150, wasteWeight: 45.0, co2Saved: 90, change: 'same' },
];
