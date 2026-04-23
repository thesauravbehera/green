import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const samplePosts = [
  {
    userName: 'Sarah Green',
    userLevel: 'Expert',
    caption: 'My balcony tomato harvest this week! 🍅 Started from seeds 3 months ago. The secret is consistent watering and afternoon sun. #UrbanGardening #Tomatoes #BalconyGarden',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800',
    plantType: 'Tomato',
    likes: 342,
    comments: 28,
    shares: 15,
    tags: ['#urbangardening', '#tomatoes', '#balconygarden']
  },
  {
    userName: 'Mike Chen',
    userLevel: 'Intermediate',
    caption: 'Just repotted my monstera and she\'s loving her new home! 🌿 Swipe to see the root system - it was so root bound! #Monstera #PlantParent #Repotting',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800',
    plantType: 'Monstera Deliciosa',
    likes: 567,
    comments: 45,
    shares: 23,
    tags: ['#monstera', '#plantparent', '#repotting']
  },
  {
    userName: 'Emma Watson',
    userLevel: 'Beginner',
    caption: 'First time growing basil from seeds and I\'m so proud! 🌱 Any tips for keeping them bushy? #HerbGarden #Basil #FirstTimeGardener',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    plantType: 'Basil',
    likes: 234,
    comments: 52,
    shares: 12,
    tags: ['#herbgarden', '#basil', '#firsttimegardener']
  },
  {
    userName: 'David Park',
    userLevel: 'Expert',
    caption: 'My balcony vertical garden wall is complete! 40+ plants in just 2 square meters. Urban gardening at its finest! 🌿🪴 #VerticalGarden #SpaceSaving #UrbanJungle',
    imageUrl: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800',
    plantType: 'Mixed',
    likes: 892,
    comments: 67,
    shares: 45,
    tags: ['#verticalgarden', '#spacesaving', '#urbanjungle']
  },
  {
    userName: 'Lisa Rodriguez',
    userLevel: 'Intermediate',
    caption: 'These strawberries taste 100x better than store bought! 🍓 Growing your own food hits different. Who else is growing berries? #StrawberryPlant #OrganicGardening #Homegrown',
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800',
    plantType: 'Strawberry',
    likes: 445,
    comments: 38,
    shares: 19,
    tags: ['#strawberryplant', '#organicgardening', '#homegrown']
  },
  {
    userName: 'James Miller',
    userLevel: 'Beginner',
    caption: 'My first succulent collection! Can\'t believe how easy these are to care for. Perfect for beginners like me 🌵 #Succulents #PlantNewbie #LowMaintenance',
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800',
    plantType: 'Succulents',
    likes: 189,
    comments: 24,
    shares: 8,
    tags: ['#succulents', '#plantnewbie', '#lowmaintenance']
  },
  {
    userName: 'Rachel Kim',
    userLevel: 'Expert',
    caption: 'Propagated over 30 pothos cuttings this month! Started giving them to friends and family. The gift that keeps on giving 🌿💚 #Pothos #Propagation #PlantGifts',
    imageUrl: 'https://images.unsplash.com/photo-1572688484839-0c4f2f6d1c2e?w=800',
    plantType: 'Pothos',
    likes: 723,
    comments: 56,
    shares: 34,
    tags: ['#pothos', '#propagation', '#plantgifts']
  },
  {
    userName: 'Tom Anderson',
    userLevel: 'Intermediate',
    caption: 'My chili pepper plant is producing like crazy! 🌶️ Made hot sauce with last week\'s harvest. Balcony gardening is the best! #ChiliPepper #HotSauce #SelfSufficient',
    imageUrl: 'https://images.unsplash.com/photo-1583119912267-646f866baf47?w=800',
    plantType: 'Chili Pepper',
    likes: 398,
    comments: 41,
    shares: 22,
    tags: ['#chilipepper', '#hotsauce', '#selfsufficient']
  },
  {
    userName: 'Sophia Martinez',
    userLevel: 'Expert',
    caption: 'My orchid bloomed after 8 months of care! The patience paid off 🌸 Never give up on your plants! #Orchid #Bloom #PatientGardener',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    plantType: 'Orchid',
    likes: 612,
    comments: 49,
    shares: 27,
    tags: ['#orchid', '#bloom', '#patientgardener']
  },
  {
    userName: 'Chris Taylor',
    userLevel: 'Beginner',
    caption: 'Started my balcony herb garden today! Mint, rosemary, thyme, and parsley. Fresh herbs for cooking 🌿👨‍🍳 #HerbGarden #CookingWithHerbs #BeginnerGardener',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800',
    plantType: 'Mixed Herbs',
    likes: 276,
    comments: 33,
    shares: 14,
    tags: ['#herbgarden', '#cookingwithherbs', '#beginnergardener']
  },
  {
    userName: 'Nina Patel',
    userLevel: 'Intermediate',
    caption: 'My peace lily has been purifying my balcony air for 2 years now. Such a low-maintenance beauty! 🕊️🌿 #PeaceLily #AirPurifying #IndoorPlants',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800',
    plantType: 'Peace Lily',
    likes: 445,
    comments: 29,
    shares: 18,
    tags: ['#peacelily', '#airpurifying', '#indoorplants']
  },
  {
    userName: 'Alex Wong',
    userLevel: 'Expert',
    caption: 'My lettuce tower is producing 50+ heads per month! Vertical growing is a game changer for small spaces 🥬 #Lettuce #VerticalGardening #FreshSalad',
    imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=800',
    plantType: 'Lettuce',
    likes: 834,
    comments: 71,
    shares: 52,
    tags: ['#lettuce', '#verticalgardening', '#freshsalad']
  },
  {
    userName: 'Olivia Brown',
    userLevel: 'Beginner',
    caption: 'My snake plant survived my 2-week vacation! They weren\'t kidding when they said it\'s indestructible 🐍🌿 #SnakePlant #LowMaintenance #SurvivorPlant',
    imageUrl: 'https://images.unsplash.com/photo-1593482892540-72b3746d1877?w=800',
    plantType: 'Snake Plant',
    likes: 321,
    comments: 36,
    shares: 11,
    tags: ['#snakeplant', '#lowmaintenance', '#survivorplant']
  },
  {
    userName: 'Marcus Johnson',
    userLevel: 'Intermediate',
    caption: 'Built this DIY self-watering system for my balcony. Now my plants stay hydrated even when I travel! 💧🌱 #DIY #SelfWatering #SmartGardening',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    plantType: 'System',
    likes: 567,
    comments: 88,
    shares: 93,
    tags: ['#diy', '#selfwatering', '#smartgardening']
  },
  {
    userName: 'Isabella Garcia',
    userLevel: 'Expert',
    caption: 'My butterfly garden is attracting so many pollinators! Balcony biodiversity at work 🦋🌸 #ButterflyGarden #Pollinators #EcoFriendly',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    plantType: 'Wildflowers',
    likes: 698,
    comments: 54,
    shares: 31,
    tags: ['#butterflygarden', '#pollinators', '#ecofriendly']
  }
];

export async function seedCommunityPosts() {
  try {
    console.log('🌱 Seeding community posts...');
    
    const promises = samplePosts.map(async (post) => {
      // Create a random user ID
      const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      
      return await addDoc(collection(db, 'community_posts'), {
        userId,
        userName: post.userName,
        userAvatar: '',
        userLevel: post.userLevel,
        caption: post.caption,
        imageUrl: post.imageUrl,
        imagePublicId: '',
        plantType: post.plantType,
        tags: post.tags,
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        likedBy: [],
        createdAt: serverTimestamp()
      });
    });

    await Promise.all(promises);
    console.log('✅ Successfully seeded community posts!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error seeding posts:', error);
    return { success: false, error };
  }
}
