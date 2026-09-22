export type Genre =
  | 'Action' | 'Adventure' | 'RPG' | 'Racing' | 'Sports'
  | 'Strategy' | 'Horror' | 'Simulation' | 'Puzzle' | 'Fighting'
  | 'Survival' | 'Indie';

export type Platform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo Switch' | 'Mobile';

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  genre: Genre;
  tags: string[];
  rating: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  platforms: Platform[];
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  price: number;
  ageRating: string;
  popularity: number;
  systemRequirements: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
}

export interface Review {
  id: string;
  gameId: string;
  username: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  isLocal?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
}

export interface CommunityPost {
  id: string;
  category: string;
  username: string;
  avatar: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  time: string;
  likedByUser: boolean;
  savedByUser: boolean;
}

export interface Category {
  id: string;
  name: Genre;
  image: string;
  description: string;
}

export interface LeaderboardPlayer {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  gamesPlayed: number;
  achievements: number;
  isCurrentUser?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface GameStats {
  totalGames: number;
  totalPlayers: number;
  totalReviews: number;
  totalGenres: number;
}

export interface UserProfile {
  username: string;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  gamesPlayed: number;
  hoursPlayed: number;
  joinDate: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  accent: 'purple' | 'blue' | 'cyan' | 'pink';
  notifyGameUpdates: boolean;
  notifyCommunity: boolean;
  notifyAchievements: boolean;
  publicProfile: boolean;
  showActivity: boolean;
}

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
}
