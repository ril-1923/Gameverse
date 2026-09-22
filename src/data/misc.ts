import type { Category, LeaderboardPlayer, CommunityPost, Achievement, Review, Genre } from '../types';
import { games } from './games';

function seedImage(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

const categoryInfo: Record<Genre, string> = {
  Action: 'Fast-paced, reflex-driven combat and set pieces.',
  Adventure: 'Story-driven exploration across vast worlds.',
  RPG: 'Deep character progression and branching narratives.',
  Racing: 'High-speed competition across iconic tracks.',
  Sports: 'Authentic simulations of the world\'s favorite sports.',
  Strategy: 'Tactical planning, resource management, and outwitting opponents.',
  Horror: 'Atmospheric dread and survival against the unknown.',
  Simulation: 'Detailed systems that mirror real or imagined life.',
  Puzzle: 'Brain-teasing mechanics and clever level design.',
  Fighting: 'One-on-one combat with deep move sets.',
  Survival: 'Scavenge, craft, and endure hostile worlds.',
  Indie: 'Creative, boundary-pushing titles from independent studios.',
};

export const categories: Category[] = (Object.keys(categoryInfo) as Genre[]).map((name, i) => ({
  id: `cat-${i + 1}`,
  name,
  image: seedImage(`category-${name}`, 700, 500),
  description: categoryInfo[name],
}));

export function gameCountForCategory(genre: Genre): number {
  return games.filter((g) => g.genre === genre).length;
}

const playerNames = ['ShadowByte', 'NovaStriker', 'PixelHunter', 'RiftWalker', 'VortexQueen', 'IronFalcon', 'CrimsonAce', 'FrostByte', 'EchoRunner', 'ZeroGravity', 'BlazeSpectre', 'LunarWolf'];

function makeLeaderboard(seedOffset: number): LeaderboardPlayer[] {
  return playerNames.map((name, i) => ({
    rank: i + 1,
    username: name,
    avatar: seedImage(`avatar-${name}-${seedOffset}`, 100, 100),
    level: 80 - i * 3 - (seedOffset % 4),
    xp: 250000 - i * 14000 + seedOffset * 300,
    gamesPlayed: 400 - i * 15,
    achievements: 60 - i * 2,
  }));
}

export const leaderboards = {
  global: makeLeaderboard(1),
  weekly: makeLeaderboard(2),
  monthly: makeLeaderboard(3),
  friends: makeLeaderboard(4).slice(0, 6),
};

export const discussionCategories = ['General Gaming', 'PC Gaming', 'Console Gaming', 'Game Reviews', 'Tips & Tricks', 'Esports'];

const postSeed = [
  { title: 'What\'s everyone playing this weekend?', desc: 'Looking for recommendations for a co-op session with friends tonight.' },
  { title: 'Neon Rift boss fight tips', desc: 'Stuck on the final boss — any strategies that worked for you?' },
  { title: 'Best budget PC build for 2026', desc: 'Sharing a parts list that hits 1440p 100fps for under a reasonable budget.' },
  { title: 'Velocity X review after 40 hours', desc: 'My honest thoughts on the campaign, multiplayer, and progression systems.' },
  { title: 'Controller vs keyboard for RPGs', desc: 'Curious what the community prefers and why.' },
  { title: 'Esports finals recap', desc: 'That comeback in the third map was incredible — thoughts?' },
  { title: 'Hidden gem indie titles', desc: 'A few smaller releases that deserve way more attention.' },
  { title: 'Speedrun route for Shadow Protocol', desc: 'Shaved two minutes off my personal best, here\'s how.' },
];

export const initialCommunityPosts: CommunityPost[] = postSeed.map((p, i) => ({
  id: `post-${i + 1}`,
  category: discussionCategories[i % discussionCategories.length],
  username: playerNames[i % playerNames.length],
  avatar: seedImage(`avatar-post-${i}`, 100, 100),
  title: p.title,
  description: p.desc,
  likes: 12 + i * 7,
  comments: 2 + i * 3,
  time: `${i + 1}h ago`,
  likedByUser: false,
  savedByUser: false,
}));

const achievementSeed = [
  { name: 'First Game', description: 'Play your very first game on GameVerse.', icon: 'bi-controller', xpReward: 50 },
  { name: 'Explorer', description: 'View details for 10 different games.', icon: 'bi-compass', xpReward: 75 },
  { name: 'Collector', description: 'Add 10 games to your favorites.', icon: 'bi-heart-fill', xpReward: 100 },
  { name: 'Game Master', description: 'Reach level 20 on your profile.', icon: 'bi-award-fill', xpReward: 200 },
  { name: 'Speed Runner', description: 'Complete the Snake mini game with a score over 20.', icon: 'bi-lightning-fill', xpReward: 125 },
  { name: 'Completionist', description: 'Unlock every other achievement.', icon: 'bi-trophy-fill', xpReward: 300 },
  { name: 'Critic', description: 'Submit your first game review.', icon: 'bi-star-fill', xpReward: 60 },
  { name: 'Social Butterfly', description: 'Create a community post.', icon: 'bi-people-fill', xpReward: 80 },
  { name: 'Tactician', description: 'Win a game of Tic Tac Toe.', icon: 'bi-grid-3x3', xpReward: 40 },
  { name: 'Sharp Shooter', description: 'Win 5 rounds of Rock Paper Scissors.', icon: 'bi-bullseye', xpReward: 90 },
  { name: 'Memory Champion', description: 'Complete Memory Match in under 20 moves.', icon: 'bi-brain', xpReward: 110 },
  { name: 'Trivia Master', description: 'Score a perfect round in Quiz Challenge.', icon: 'bi-patch-question-fill', xpReward: 150 },
];

const extraAchievements = Array.from({ length: 18 }, (_, i) => ({
  name: `Milestone ${i + 1}`,
  description: `Reach ${( i + 2) * 5} total hours played across all games.`,
  icon: 'bi-gem',
  xpReward: 25 + i * 5,
}));

export const allAchievements: Achievement[] = [...achievementSeed, ...extraAchievements].map((a, i) => ({
  id: `ach-${i + 1}`,
  ...a,
  unlocked: i < 12,
}));

const reviewTexts = [
  'Absolutely blew me away — the pacing and art direction are top tier.',
  'Solid game overall, though the middle act drags a little.',
  'One of the best releases this year, easy recommendation.',
  'Great mechanics but needs a few more content updates.',
  'The multiplayer is where this game really shines.',
];

export function generateReviewsForGame(gameId: string): Review[] {
  const seedNum = gameId.split('-')[1] ? parseInt(gameId.split('-')[1], 10) : 1;
  return Array.from({ length: 4 }, (_, i) => ({
    id: `${gameId}-review-${i + 1}`,
    gameId,
    username: playerNames[(seedNum + i) % playerNames.length],
    avatar: seedImage(`avatar-review-${gameId}-${i}`, 100, 100),
    rating: 3 + ((seedNum + i) % 3),
    date: `2026-0${1 + (i % 6)}-1${i}`,
    text: reviewTexts[(seedNum + i) % reviewTexts.length],
  }));
}

export const quizQuestions = [
  { question: 'What genre is typically defined by turn-based or real-time tactical combat?', answers: ['Strategy', 'Puzzle', 'Racing', 'Sports'], correct: 0 },
  { question: 'Which term describes downloadable extra content for a game?', answers: ['Patch', 'DLC', 'Beta', 'Mod'], correct: 1 },
  { question: 'In gaming, what does "FPS" most commonly refer to in a technical performance context?', answers: ['Frames Per Second', 'First Person Shooter', 'Final Playable Stage', 'Fast Paced Session'], correct: 0 },
  { question: 'What is a "roguelike" known for?', answers: ['Linear story missions', 'Procedural generation and permadeath', 'Turn-based sports', 'Music rhythm mechanics'], correct: 1 },
  { question: 'Which platform term refers to playing across different consoles together?', answers: ['Cross-play', 'Split-screen', 'Local co-op', 'Sideloading'], correct: 0 },
  { question: 'What does "NPC" stand for?', answers: ['New Player Character', 'Non-Player Character', 'Network Player Client', 'Next Playable Content'], correct: 1 },
  { question: 'A "speedrun" primarily tests what?', answers: ['Graphics fidelity', 'Completion time efficiency', 'Multiplayer ranking', 'Save file size'], correct: 1 },
  { question: 'What is an "Easter egg" in games?', answers: ['A hidden secret or reference', 'A type of loot box', 'A game genre', 'A difficulty setting'], correct: 0 },
];
