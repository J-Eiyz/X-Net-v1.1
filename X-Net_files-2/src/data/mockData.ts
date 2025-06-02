import  { BeybladeCombo, Post } from '../types';

export const mockCombos: BeybladeCombo[] = [
  {
    id: '1',
    userId: '1',
    name: 'Dragon Striker',
    blade: 'Dransword',
    ratchet: '5:80',
    bit: 'F',
    tags: ['Attack'],
    wins: 12,
    losses: 3,
    createdAt: '2023-07-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    name: 'Fortress Shield',
    blade: 'Dragoon',
    ratchet: 'S-2',
    bit: '70B',
    tags: ['Defense', 'Stamina'],
    wins: 8,
    losses: 5,
    createdAt: '2023-07-20T14:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    name: 'Rapid Assault',
    blade: 'Driger',
    ratchet: 'R-5',
    bit: '40C',
    tags: ['Attack', 'Balance'],
    wins: 15,
    losses: 2,
    createdAt: '2023-07-25T09:45:00Z'
  },
  {
    id: '4',
    userId: '1',
    name: 'Endurance King',
    blade: 'Draciel',
    ratchet: 'D-4',
    bit: '90D',
    tags: ['Stamina', 'Defense'],
    wins: 10,
    losses: 7,
    createdAt: '2023-07-30T16:20:00Z'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    username: 'BeyMaster99',
    content: 'Just won the regional tournament with my new Dragon Striker combo! 🏆',
    imageUrl: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=1000&auto=format&fit=crop',
    likes: 45,
    comments: 12,
    createdAt: '2023-08-01T13:20:00Z'
  },
  {
    id: '2',
    userId: '3',
    username: 'SpinExpert',
    content: 'Anyone else think the new X-series ratchets are game-changing? My defense build is almost unbeatable now.',
    likes: 32,
    comments: 8,
    createdAt: '2023-08-02T10:15:00Z'
  },
  {
    id: '3',
    userId: '4',
    username: 'BladeChampion',
    content: 'Check out this epic battle from yesterday\'s meetup! The burst finish at 0:45 is insane.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    likes: 78,
    comments: 24,
    createdAt: '2023-08-03T18:30:00Z'
  },
  {
    id: '4',
    userId: '5',
    username: 'StadiumKing',
    content: 'Just got the new limited edition stadium. Perfect for high-speed battles!',
    imageUrl: 'https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?q=80&w=1000&auto=format&fit=crop',
    likes: 56,
    comments: 15,
    createdAt: '2023-08-04T09:45:00Z'
  }
];
 