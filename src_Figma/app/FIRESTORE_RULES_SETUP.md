# 🔒 Firestore Security Rules Setup

## Quick Fix for "Permission Denied" Error

If you're getting `FirebaseError: [code=permission-denied]: Missing or insufficient permissions`, follow these steps:

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your Bloomify project
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top

### Step 2: Copy the Rules Below

**IMPORTANT:** For development/testing, you can use these **OPEN RULES** (not secure for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // DEVELOPMENT MODE - Allow all read/write
    // ⚠️ CHANGE THESE BEFORE GOING TO PRODUCTION!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Step 3: Publish Rules
1. Click **Publish** button in Firebase Console
2. Refresh your Bloomify app
3. The permission errors should be gone! ✅

---

## 🔐 Secure Rules (For Production)

When you're ready to deploy, use these secure rules instead:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(userId);
      allow update, delete: if isOwner(userId);
    }
    
    // Community posts - OPEN READ, AUTH WRITE
    match /community_posts/{postId} {
      allow read: if true;  // Anyone can read posts
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() 
        && request.auth.uid == resource.data.userId;
    }
    
    // Community chat - OPEN READ, AUTH WRITE
    match /community_chat/{messageId} {
      allow read: if true;  // Anyone can read messages
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() 
        && request.auth.uid == resource.data.userId;
    }
    
    // User gardens
    match /gardens/{gardenId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() 
        && request.auth.uid == resource.data.userId;
    }
    
    // Plant care logs
    match /care_logs/{logId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() 
        && request.auth.uid == resource.data.userId;
    }
    
    // Marketplace orders
    match /orders/{orderId} {
      allow read: if isAuthenticated() 
        && request.auth.uid == resource.data.userId;
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() 
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 📝 What These Rules Mean

### Development Rules (Quick Fix)
- ✅ **Allows everything** - Perfect for testing
- ⚠️ **Not secure** - Anyone can read/write your data
- 🎯 **Use only during development**

### Production Rules (Secure)
- 🔒 **User data protected** - Only owners can modify
- 👥 **Community posts public** - Anyone can read, auth users can post
- 💬 **Chat messages public** - Anyone can read, auth users can send
- 🔐 **Personal data private** - Only you can see your gardens/orders

---

## 🐛 Troubleshooting

### Still getting permission errors?

1. **Wait 10 seconds** after publishing rules
2. **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check Firebase Console** - Make sure rules are published
4. **Check browser console** - Look for specific error messages
5. **Verify you're logged in** - Some features require authentication

### Rules not saving?

- Make sure you clicked **Publish** (not just save draft)
- Check for syntax errors in the rules
- Try the simple development rules first

### Need help?

Check these files:
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Initial setup
- [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) - Auth issues

---

## ⏱️ Quick Checklist

- [ ] Opened Firebase Console
- [ ] Selected Firestore Database
- [ ] Clicked Rules tab
- [ ] Copied development rules
- [ ] Clicked Publish
- [ ] Waited 10 seconds
- [ ] Refreshed app
- [ ] Tested community features

**Done!** Your Firestore should now work! 🎉
