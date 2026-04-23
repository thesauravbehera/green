# Firebase Authentication Setup for Bloomify

This guide will help you set up Firebase Authentication for your Bloomify application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a Project"
3. Enter project name: `bloomify` (or your preferred name)
4. Enable/disable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Bloomify Web App`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **Copy the Firebase configuration object** - you'll need this!

## Step 3: Enable Authentication Methods

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get Started" if it's your first time
3. Go to the **Sign-in method** tab
4. Enable the following providers:

### Email/Password Authentication
1. Click on "Email/Password"
2. Toggle "Enable"
3. Click "Save"

### Google Authentication (Optional)
1. Click on "Google"
2. Toggle "Enable"
3. Enter your project support email
4. Click "Save"

### GitHub Authentication (Optional)
1. First, create a GitHub OAuth App:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in the details:
     - Application name: `Bloomify`
     - Homepage URL: `http://localhost:5173` (or your domain)
     - Authorization callback URL: Get this from Firebase (shown in step 2)
   - Click "Register application"
   - Copy the **Client ID** and generate a **Client Secret**

2. Back in Firebase Console:
   - Click on "GitHub"
   - Toggle "Enable"
   - Paste your GitHub Client ID and Client Secret
   - Copy the callback URL and add it to your GitHub OAuth App settings
   - Click "Save"

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose "Start in **test mode**" (for development)
   - **Important**: Remember to update security rules before production!
4. Select your Cloud Firestore location (choose closest to your users)
5. Click "Enable"

### Add Security Rules (Important!)

Go to the **Rules** tab and update with these production-ready rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more collections as needed
    match /plants/{plantId} {
      allow read: if true; // Anyone can read plants
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

## Step 5: Configure Your Application

1. Open `/lib/firebase.ts` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
  measurementId: "G-XXXXXXXXXX" // Optional
};
```

### Where to Find Each Value:

- **apiKey**: Firebase Console → Project Settings → General → Web API Key
- **authDomain**: Usually `your-project-id.firebaseapp.com`
- **projectId**: Your Firebase project ID
- **storageBucket**: Usually `your-project-id.appspot.com`
- **messagingSenderId**: Firebase Console → Project Settings → Cloud Messaging
- **appId**: Firebase Console → Project Settings → Your Apps section
- **measurementId**: Firebase Console → Project Settings → Google Analytics (if enabled)

## Step 6: Test Your Setup

1. Start your development server
2. Click the profile icon in the top right
3. Try signing up with email/password
4. Check Firebase Console → Authentication → Users to see your new user
5. Check Firestore Database → users collection to see user data

## Authentication Features Implemented

✅ **Email/Password Authentication**
- User registration with name, email, and password
- Email verification
- Password validation (minimum 8 characters)
- User profile creation in Firestore

✅ **Social Authentication**
- Google Sign-In
- GitHub Sign-In
- Automatic user profile creation

✅ **User Management**
- Persistent login state
- User profile with avatar
- Display name support
- Logout functionality

✅ **Security**
- Password strength validation
- Email verification
- Secure authentication tokens
- Protected user data in Firestore

## File Structure

```
lib/
├── firebase.ts                 # Firebase configuration
└── auth/
    ├── register.ts            # Registration logic
    ├── login.ts               # Login logic (email & social)
    └── logout.ts              # Logout logic

contexts/
└── AuthContext.tsx            # React context for auth state

components/
├── AuthModal.tsx              # Login/Signup modal UI
└── navigation.tsx             # Navigation with user menu
```

## User Data Structure

Each user in Firestore has the following structure:

```typescript
{
  uid: string,
  name: string,
  email: string,
  displayName: string,
  photoURL: string | null,
  createdAt: timestamp,
  updatedAt: timestamp,
  lastLoginAt: timestamp,
  emailVerified: boolean,
  provider?: "google" | "github",
  // Bloomify-specific fields
  gardenLevel: "Beginner" | "Intermediate" | "Advanced",
  plantsOwned: [],
  favorites: [],
  reminders: [],
  settings: {
    notifications: boolean,
    theme: "light" | "dark"
  }
}
```

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env` file in your project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

2. Update `/lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've replaced the placeholder config in `/lib/firebase.ts`

### "Firebase: Error (auth/operation-not-allowed)"
- Enable Email/Password authentication in Firebase Console

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to authorized domains in Firebase Console → Authentication → Settings

### Social login popup closes immediately
- Check that you've correctly configured OAuth apps
- Verify callback URLs match exactly

## Next Steps

1. ✅ Replace placeholder Firebase config with your actual config
2. ✅ Enable desired authentication methods
3. ✅ Set up Firestore security rules
4. 🔲 Add password reset functionality
5. 🔲 Add profile editing features
6. 🔲 Add email verification reminders
7. 🔲 Implement role-based access control

## Support

For more information, visit:
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Web SDK Docs](https://firebase.google.com/docs/web/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
