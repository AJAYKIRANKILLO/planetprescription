
export interface FeedbackItem {
  id: string;
  type: 'user' | 'agent';
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

const STORAGE_KEY = 'planet_feedback';

const DEFAULT_FEEDBACKS: FeedbackItem[] = [
  {
    id: '1',
    type: 'user',
    name: 'Sarah Jenkins',
    role: 'Mother of two',
    content: 'Saved my kids from accidental poisoning! The AI identification feature is a lifesaver for checking old meds.',
    rating: 5,
    date: new Date().toISOString()
  },
  {
    id: '2',
    type: 'agent',
    name: 'Vikram Singh',
    role: 'Fleet Owner',
    content: 'Best logistics platform for medical waste. The route optimization helps me save fuel and time every day.',
    rating: 5,
    date: new Date().toISOString()
  },
  {
    id: '3',
    type: 'user',
    name: 'David Chen',
    role: 'Environmentalist',
    content: 'Finally, a way to dispose of medicines without polluting our water systems. The credit system is a great bonus!',
    rating: 4,
    date: new Date().toISOString()
  },
  {
    id: '4',
    type: 'agent',
    name: 'Rahul Sharma',
    role: 'Planet Prescription Agent',
    content: 'Verified pickups mean safer work conditions for us. The dedicated app makes the job professional and easy.',
    rating: 5,
    date: new Date().toISOString()
  }
];

export const getFeedbacks = (): FeedbackItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with defaults if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FEEDBACKS));
      return DEFAULT_FEEDBACKS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load feedbacks", error);
    return DEFAULT_FEEDBACKS;
  }
};

export const saveFeedback = (
  name: string, 
  role: string, 
  message: string, 
  type: 'user' | 'agent'
) => {
  try {
    const currentFeedbacks = getFeedbacks();
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      name,
      role,
      content: message,
      type,
      rating: 5, // Default to 5 stars for positive sentiment
      date: new Date().toISOString()
    };
    
    // Add to beginning of list
    const updated = [newFeedback, ...currentFeedbacks];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error("Failed to save feedback", error);
    return false;
  }
};
