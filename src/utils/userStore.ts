/**
 * userStore.ts
 * Pure-JS user persistence using localStorage.
 * No backend required – perfect for demo videos.
 */

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // simple base64 "hash" for demo only
  goal: string;
  joinedAt: string;
  /** Mock progression data */
  progress: WeightEntry[];
  /** Daily nutrition logs */
  nutritionLogs: NutritionLog[];
}

export interface WeightEntry {
  date: string; // ISO date string
  weight: number; // kg
}

export interface NutritionLog {
  date: string;
  caloriesConsumed: number;
  meals: MealLog[];
}

export interface MealLog {
  name: string;
  calories: number;
  logged: boolean;
}

// ── simple "hash" (base64 encode) for demo purposes only ──────
const hashPassword = (pw: string) => btoa(unescape(encodeURIComponent(pw)));

// ── Seed mock users ───────────────────────────────────────────
const MOCK_USERS: StoredUser[] = [
  {
    id: 'u1',
    username: 'Alex Johnson',
    email: 'alex@demo.com',
    passwordHash: hashPassword('password123'),
    goal: 'muscle_gain',
    joinedAt: '2026-01-10',
    progress: generateWeightHistory(82, 8),
    nutritionLogs: generateRecentLogs(2800, 7),
  },
  {
    id: 'u2',
    username: 'Sara Williams',
    email: 'sara@demo.com',
    passwordHash: hashPassword('password123'),
    goal: 'weight_loss',
    joinedAt: '2026-01-15',
    progress: generateWeightHistory(70, 8, -0.4),
    nutritionLogs: generateRecentLogs(1600, 7),
  },
];

function generateWeightHistory(
  startWeight: number,
  weeks: number,
  weeklyDelta = 0.2,
): WeightEntry[] {
  const entries: WeightEntry[] = [];
  const today = new Date();
  for (let i = weeks; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i * 7);
    entries.push({
      date: d.toISOString().split('T')[0],
      weight: parseFloat((startWeight + (weeks - i) * weeklyDelta).toFixed(1)),
    });
  }
  return entries;
}

function generateRecentLogs(targetCal: number, days: number): NutritionLog[] {
  const logs: NutritionLog[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const variance = Math.floor(Math.random() * 200) - 100;
    logs.push({
      date: d.toISOString().split('T')[0],
      caloriesConsumed: targetCal + variance,
      meals: [],
    });
  }
  return logs;
}

// ── Storage helpers ───────────────────────────────────────────
const STORE_KEY = 'health_app_users';

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(users));
}

function getAllUsers(): StoredUser[] {
  const stored = loadUsers();
  // Merge mock users only if they don't exist yet
  const ids = stored.map(u => u.id);
  const merged = [...stored];
  for (const mock of MOCK_USERS) {
    if (!ids.includes(mock.id)) merged.push(mock);
  }
  if (merged.length !== stored.length) saveUsers(merged);
  return merged;
}

// ── Public API ────────────────────────────────────────────────
export function findUserByEmail(email: string): StoredUser | undefined {
  return getAllUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserByUsername(username: string): StoredUser | undefined {
  return getAllUsers().find(
    u => u.username.toLowerCase() === username.toLowerCase(),
  );
}

export function authenticateUser(
  emailOrUsername: string,
  password: string,
): StoredUser | null {
  const users = getAllUsers();
  const user = users.find(
    u =>
      u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
      u.username.toLowerCase() === emailOrUsername.toLowerCase(),
  );
  if (!user) return null;
  if (user.passwordHash !== hashPassword(password)) return null;
  return user;
}

export function registerUser(params: {
  username: string;
  email: string;
  password: string;
  goal: string;
}): StoredUser | { error: string } {
  const users = getAllUsers();
  if (users.find(u => u.email.toLowerCase() === params.email.toLowerCase())) {
    return { error: 'An account with this email already exists.' };
  }
  if (users.find(u => u.username.toLowerCase() === params.username.toLowerCase())) {
    return { error: 'This username is already taken.' };
  }
  const target = params.goal === 'muscle_gain' ? 2800 : params.goal === 'weight_loss' ? 1600 : 2000;
  const newUser: StoredUser = {
    id: `u_${Date.now()}`,
    username: params.username,
    email: params.email,
    passwordHash: hashPassword(params.password),
    goal: params.goal,
    joinedAt: new Date().toISOString().split('T')[0],
    progress: generateWeightHistory(75, 0),
    nutritionLogs: generateRecentLogs(target, 3),
  };
  saveUsers([...users, newUser]);
  return newUser;
}

export function updateUser(user: StoredUser): void {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }
}
