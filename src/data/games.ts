import type { Game, Genre, Platform, SystemRequirements } from '../types';

const genres: Genre[] = ['Action', 'Adventure', 'RPG', 'Racing', 'Sports', 'Strategy', 'Horror', 'Simulation', 'Puzzle', 'Fighting', 'Survival', 'Indie'];

const allPlatforms: Platform[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'];

const titles = [
  'Neon Rift', 'Shadow Protocol', 'Velocity X', 'Kingdoms Beyond', 'Cyber Strike',
  'Nightfall', 'Turbo Legends', 'Galactic Frontier', 'Mystic Realms', 'Iron Dominion',
  'Crimson Horizon', 'Ashen Vale', 'Quantum Break Point', 'Feral Isles', 'Starforge Odyssey',
  'Wraith Hollow', 'Ember Kingdoms', 'Skyline Drift', 'Void Chasers', 'Pixel Legion',
  'Titan\'s Reach', 'Frostbound', 'Rogue Circuit', 'Dune Wanderers', 'Obsidian Path',
  'Solar Vanguard', 'Grim Harvest', 'Chrono Fracture', 'Silent Depths', 'Wild Frontier Racing',
];

const developers = ['Nova Forge Studios', 'Blackout Interactive', 'Pixel Foundry', 'Ironclad Games', 'Lumen Works', 'Redshift Studio'];
const publishers = ['Apex Publishing', 'Starlight Games', 'Vertex Entertainment', 'Northline Media'];
const ageRatings = ['E', 'E10+', 'T', 'M'];

function seedImage(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

function makeSysReq(tier: 'min' | 'rec'): SystemRequirements {
  return tier === 'min'
    ? { os: 'Windows 10 64-bit', processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600', memory: '8 GB RAM', graphics: 'NVIDIA GTX 1060 / AMD RX 580', storage: '45 GB available space' }
    : { os: 'Windows 11 64-bit', processor: 'Intel Core i7-10700K / AMD Ryzen 7 3700X', memory: '16 GB RAM', graphics: 'NVIDIA RTX 3070 / AMD RX 6800', storage: '45 GB SSD available space' };
}

function pick<T>(arr: T[], seedNum: number, count = 1): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(arr[(seedNum + i * 7) % arr.length]);
  }
  return Array.from(new Set(result));
}

export const games: Game[] = titles.map((title, i) => {
  const genre = genres[i % genres.length];
  const platforms = pick(allPlatforms, i, 2 + (i % 3));
  const rating = Math.round((3.5 + ((i * 37) % 15) / 10) * 10) / 10;
  const year = 2022 + (i % 5);
  const month = 1 + (i * 3) % 12;
  const day = 1 + (i * 5) % 28;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: `game-${i + 1}`,
    title,
    slug,
    shortDescription: `An acclaimed ${genre.toLowerCase()} experience blending intense gameplay with a gripping world.`,
    description: `${title} throws players into a richly detailed ${genre.toLowerCase()} adventure. Battle through hostile environments, uncover a deep narrative, and master systems built for hundreds of hours of replayability. Developed with a focus on tight controls, atmospheric world-building, and meaningful player choice, ${title} has become a standout title for fans of the genre.`,
    genre,
    tags: [genre, 'Multiplayer', 'Singleplayer', 'Story Rich'].filter((_, idx) => (i + idx) % 2 === 0),
    rating,
    releaseDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    developer: developers[i % developers.length],
    publisher: publishers[i % publishers.length],
    platforms,
    coverImage: seedImage(`${slug}-cover`, 600, 800),
    bannerImage: seedImage(`${slug}-banner`, 1600, 700),
    screenshots: [1, 2, 3, 4, 5].map((n) => seedImage(`${slug}-shot-${n}`, 1280, 720)),
    price: [0, 19.99, 29.99, 39.99, 49.99, 59.99][i % 6],
    ageRating: ageRatings[i % ageRatings.length],
    popularity: 100 - i * 2 + (i % 7) * 5,
    systemRequirements: {
      minimum: makeSysReq('min'),
      recommended: makeSysReq('rec'),
    },
  };
});

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug || g.id === slug);
}

export function getSimilarGames(game: Game, count = 6): Game[] {
  return games.filter((g) => g.id !== game.id && g.genre === game.genre).slice(0, count).length
    ? games.filter((g) => g.id !== game.id && g.genre === game.genre).slice(0, count)
    : games.filter((g) => g.id !== game.id).slice(0, count);
}
