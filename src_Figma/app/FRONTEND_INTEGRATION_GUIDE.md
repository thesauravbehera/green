/**
 * BLOOMIFY FRONTEND INTEGRATION GUIDE
 * 
 * This file shows how to integrate the new backend with your existing UI
 * WITHOUT changing any design or components - only API calls
 */

// ============================================
// 1. API CLIENT CONFIGURATION
// ============================================

// lib/api/client.ts
import { auth } from '../firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) {
    // Check for demo accounts
    const demoUser = localStorage.getItem('bloomify_demo_user');
    if (demoUser) {
      const parsed = JSON.parse(demoUser);
      if (parsed.email === 'admin@bloomify.io') {
        return 'DEMO_ADMIN_TOKEN';
      }
      return 'DEMO_GUEST_TOKEN';
    }
    return null;
  }
  
  return await user.getIdToken();
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data.data;
}

// ============================================
// 2. AUTHENTICATION INTEGRATION
// ============================================

// Update AuthContext.tsx - Keep existing UI, change only the API calls

// In handleLogin function:
async function handleLogin(email: string, password: string) {
  try {
    // Existing Firebase login
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // NEW: Sync with backend
    await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ uid: result.user.uid })
    });
    
    // Existing navigation
    navigate('/dashboard');
  } catch (error) {
    console.error(error);
  }
}

// In handleRegister function:
async function handleRegister(email: string, password: string, name: string) {
  try {
    // Existing Firebase register
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    
    // NEW: Create user in backend
    await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        uid: result.user.uid,
        email: email,
        displayName: name,
        photoURL: null
      })
    });
    
    navigate('/dashboard');
  } catch (error) {
    console.error(error);
  }
}

// ============================================
// 3. DASHBOARD INTEGRATION
// ============================================

// Update Dashboard.tsx - Keep exact same UI, just change data source

// Replace static data with API calls:
import { useState, useEffect } from 'react';
import { apiRequest } from '../lib/api/client';

export function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [gardenData, setGardenData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  async function loadDashboardData() {
    try {
      // Load user data
      const user = await apiRequest('/auth/me');
      setUserData(user.user);
      
      // Load garden
      const garden = await apiRequest('/garden');
      setGardenData(garden.garden);
      
      // Load tasks
      const todayTasks = await apiRequest('/tasks/today');
      setTasks(todayTasks.tasks);
      
      // Load weather
      const currentWeather = await apiRequest('/weather/current');
      setWeather(currentWeather.weather);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  }
  
  // KEEP ALL EXISTING JSX - just use new data
  return (
    <div className="dashboard">
      {/* Existing dashboard UI */}
      <StatCard 
        label="LEVEL" 
        value={userData?.level || 1} 
      />
      <StatCard 
        label="XP" 
        value={userData?.xp || 0} 
      />
      <StatCard 
        label="STREAK" 
        value={userData?.streak || 0} 
      />
      {/* ... rest of existing UI */}
    </div>
  );
}

// ============================================
// 4. GARDEN (MY PLANTS) INTEGRATION
// ============================================

// Update MyGarden.tsx

export function MyGarden() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadGarden();
  }, []);
  
  async function loadGarden() {
    try {
      setLoading(true);
      const data = await apiRequest('/garden');
      setPlants(data.garden);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleWaterPlant(plantId: string) {
    try {
      await apiRequest(`/garden/${plantId}/water`, { method: 'POST' });
      
      // Show success notification (use existing toast system)
      toast.success('+50 XP - Plant watered!');
      
      // Reload garden
      await loadGarden();
    } catch (error) {
      toast.error('Failed to water plant');
    }
  }
  
  async function handleFertilizePlant(plantId: string) {
    try {
      await apiRequest(`/garden/${plantId}/fertilize`, { method: 'POST' });
      toast.success('+75 XP - Plant fertilized!');
      await loadGarden();
    } catch (error) {
      toast.error('Failed to fertilize plant');
    }
  }
  
  async function handlePrunePlant(plantId: string) {
    try {
      await apiRequest(`/garden/${plantId}/prune`, { method: 'POST' });
      toast.success('+35 XP - Plant pruned!');
      await loadGarden();
    } catch (error) {
      toast.error('Failed to prune plant');
    }
  }
  
  // KEEP ALL EXISTING JSX - just connect buttons to new functions
  return (
    <div className="my-garden">
      {plants.map(plant => (
        <PlantCard 
          key={plant._id}
          plant={plant}
          onWater={() => handleWaterPlant(plant._id)}
          onFertilize={() => handleFertilizePlant(plant._id)}
          onPrune={() => handlePrunePlant(plant._id)}
        />
      ))}
    </div>
  );
}

// ============================================
// 5. PLANT DATABASE INTEGRATION
// ============================================

// Update PlantDatabase.tsx

export function PlantDatabase() {
  const [plants, setPlants] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: ''
  });
  
  useEffect(() => {
    loadPlants();
  }, [page, filters]);
  
  async function loadPlants() {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(filters.category && { category: filters.category }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.search && { search: filters.search })
      });
      
      const data = await apiRequest(`/plants/catalog?${query}`);
      setPlants(data.plants);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleAddToGarden(plantId: string) {
    try {
      await apiRequest('/garden/add', {
        method: 'POST',
        body: JSON.stringify({
          plantId,
          location: {
            balconyDirection: 'south',
            floorLevel: 3,
            potSize: 'medium'
          }
        })
      });
      
      toast.success('+100 XP - Plant added to your garden!');
    } catch (error) {
      toast.error('Failed to add plant');
    }
  }
  
  // KEEP ALL EXISTING UI
}

// ============================================
// 6. MARKETPLACE INTEGRATION
// ============================================

// Update Marketplace.tsx

export function Marketplace() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  async function loadProducts() {
    try {
      const data = await apiRequest('/marketplace/products');
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleAddToCart(productId: string) {
    try {
      await apiRequest('/marketplace/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 })
      });
      
      // Update local cart state
      setCart([...cart, productId]);
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  }
  
  async function handleCheckout() {
    try {
      const data = await apiRequest('/marketplace/checkout', {
        method: 'POST',
        body: JSON.stringify({ items: cart })
      });
      
      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl;
    } catch (error) {
      toast.error('Checkout failed');
    }
  }
  
  // KEEP ALL EXISTING UI
}

// ============================================
// 7. COMMUNITY FEED INTEGRATION
// ============================================

// Update Community.tsx

export function Community() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    loadPosts();
  }, [page]);
  
  async function loadPosts() {
    try {
      const data = await apiRequest(`/community/feed?page=${page}&limit=20`);
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleLikePost(postId: string) {
    try {
      await apiRequest(`/community/${postId}/like`, { method: 'POST' });
      await loadPosts(); // Refresh
    } catch (error) {
      toast.error('Failed to like post');
    }
  }
  
  async function handleCreatePost(content: string, media: File[]) {
    try {
      // Upload media first
      const mediaUrls = await uploadMedia(media);
      
      // Create post
      await apiRequest('/community/post', {
        method: 'POST',
        body: JSON.stringify({
          content,
          media: mediaUrls
        })
      });
      
      toast.success('Post created!');
      await loadPosts();
    } catch (error) {
      toast.error('Failed to create post');
    }
  }
  
  // KEEP ALL EXISTING UI
}

// ============================================
// 8. PROFILE INTEGRATION
// ============================================

// Update Profile.tsx

export function Profile() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  
  useEffect(() => {
    loadProfile();
  }, []);
  
  async function loadProfile() {
    try {
      const user = auth.currentUser;
      if (!user) return;
      
      const [profileData, statsData, achievementsData] = await Promise.all([
        apiRequest(`/users/${user.uid}`),
        apiRequest(`/users/${user.uid}/stats`),
        apiRequest(`/users/${user.uid}/achievements`)
      ]);
      
      setProfile(profileData.user);
      setStats(statsData.stats);
      setAchievements(achievementsData.achievements);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleUpdateProfile(updates: any) {
    try {
      const user = auth.currentUser;
      await apiRequest(`/users/${user.uid}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      
      toast.success('Profile updated!');
      await loadProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  }
  
  // KEEP ALL EXISTING UI
  return (
    <div className="profile">
      <div className="stats">
        <StatCard label="LEVEL" value={profile?.level} />
        <StatCard label="XP" value={profile?.xp} />
        <StatCard label="STREAK" value={profile?.streak} />
        <StatCard label="PLANTS" value={stats?.plantsOwned} />
      </div>
      
      <div className="achievements">
        {achievements.map(achievement => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// 9. REAL-TIME NOTIFICATIONS (SOCKET.IO)
// ============================================

// lib/socket.ts
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function initializeSocket(userId: string) {
  const socket = io(SOCKET_URL, {
    auth: { userId }
  });
  
  // Listen for events
  socket.on('plant_watered', (data) => {
    toast.success(`+${data.xpAwarded} XP - Plant watered!`);
  });
  
  socket.on('level_up', (data) => {
    toast.success(`🎉 Level ${data.newLevel} Achieved!`, {
      duration: 5000
    });
  });
  
  socket.on('task_due', (data) => {
    toast.info(`⏰ Task due: ${data.title}`);
  });
  
  socket.on('community_like', (data) => {
    toast.info(`❤️ ${data.userName} liked your post`);
  });
  
  return socket;
}

// Use in App.tsx:
useEffect(() => {
  const user = auth.currentUser;
  if (user) {
    const socket = initializeSocket(user.uid);
    
    return () => {
      socket.disconnect();
    };
  }
}, []);

// ============================================
// 10. ENVIRONMENT VARIABLES
// ============================================

// .env file (frontend)
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000

// Production:
VITE_API_URL=https://your-backend.onrender.com/api/v1
VITE_SOCKET_URL=https://your-backend.onrender.com

// ============================================
// SUMMARY OF CHANGES
// ============================================

/**
 * FILES TO UPDATE (No UI changes, only API integration):
 * 
 * 1. src/lib/api/client.ts - NEW FILE (API client)
 * 2. src/lib/socket.ts - NEW FILE (Socket.IO)
 * 3. src/contexts/AuthContext.tsx - Update login/register functions
 * 4. src/screens/dashboard/DashboardScreen.tsx - Update data loading
 * 5. src/screens/garden/MyGarden.tsx - Update garden operations
 * 6. src/screens/plants/PlantDatabase.tsx - Update plant fetching
 * 7. src/screens/marketplace/Marketplace.tsx - Update product loading
 * 8. src/screens/community/Community.tsx - Update post operations
 * 9. src/screens/profile/Profile.tsx - Update profile data
 * 10. src/App.tsx - Initialize Socket.IO
 * 
 * ALL UI COMPONENTS REMAIN EXACTLY THE SAME!
 * Only the data source changes from static/Firebase to new backend API.
 */

export {};
