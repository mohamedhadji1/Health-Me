export interface ProgramOption {
  key: string;
  emoji: string;
  name: string;
  tagline: string;
  calories: number;
  protein: number;
  color: string;
  gradient: string;
  features: string[];
  badge?: string;
}

export const PROGRAMS: ProgramOption[] = [
  {
    key: 'muscle_gain',
    emoji: '💪',
    name: 'Muscle Gain',
    tagline: 'Build lean mass with high-protein meals',
    calories: 2800,
    protein: 200,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
    features: ['4 meals per day', '200g protein goal', 'High calorie surplus', 'Power-focused foods'],
    badge: 'Most Popular',
  },
  {
    key: 'weight_loss',
    emoji: '🏃',
    name: 'Fat Loss',
    tagline: 'Lean out while preserving muscle',
    calories: 1600,
    protein: 140,
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
    features: ['Calorie deficit plan', '140g protein goal', 'High-volume meals', 'Low-carb evenings'],
  },
  {
    key: 'endurance',
    emoji: '🚴',
    name: 'Endurance',
    tagline: 'Fuel long workouts with complex carbs',
    calories: 2200,
    protein: 155,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    features: ['Carb-loading strategy', '155g protein goal', 'Pre/post workout meals', 'Anti-fatigue focus'],
  },
  {
    key: 'flexibility',
    emoji: '🧘',
    name: 'Flexibility & Wellness',
    tagline: 'Anti-inflammatory, balanced nutrition',
    calories: 2000,
    protein: 130,
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    features: ['Anti-inflammatory foods', 'Plant-rich meals', 'Mindful eating plan', 'Gut-health focused'],
  },
  {
    key: 'general',
    emoji: '🌿',
    name: 'General Wellness',
    tagline: 'Balanced nutrition for everyday health',
    calories: 2000,
    protein: 140,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    features: ['Balanced macros', 'Variety of whole foods', 'Easy meal prep', 'Sustainable habits'],
  },
];
