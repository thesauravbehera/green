# 🔧 Troubleshooting Guide for Bloomify

This guide helps you solve common issues with Bloomify's setup and functionality.

---

## 🚨 Common Errors and Solutions

### 1. "Cloudinary failed to load" or "Cloudinary widget not loaded" Error

**Problem:** The Cloudinary upload widget isn't loading when you try to upload images in the Community Hub.

**Causes:**
- Cloudinary credentials not configured (most common!)
- Slow internet connection
- Cloudinary script blocked by ad blocker
- Script hasn't finished loading yet

**Solutions:**

#### Solution 1: Configure Cloudinary Credentials (MOST IMPORTANT!)
The app won't work without proper Cloudinary setup:

1. Open `/lib/cloudinary.ts`
2. Replace `YOUR_CLOUD_NAME` with your actual cloud name from [Cloudinary Console](https://cloudinary.com/console)
3. Create an upload preset (see CLOUDINARY_SETUP.md)
4. Save and refresh the page

**The app will show you a helpful setup guide if credentials aren't configured!**

#### Solution 2: Wait and Refresh
If configured, the app automatically waits up to 20 seconds for Cloudinary to load. Just wait and the upload area should become clickable.

#### Solution 2: Check Internet Connection
```bash
# Test if you can reach Cloudinary
ping upload-widget.cloudinary.com
```

#### Solution 3: Disable Ad Blocker
Some ad blockers block Cloudinary scripts:
1. Temporarily disable your ad blocker
2. Refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Try uploading again

#### Solution 4: Manual Script Check
1. Open browser console (F12)
2. Type: `window.cloudinary`
3. If it returns `undefined`, the script didn't load
4. Check `/index.html` has this line:
   ```html
   <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
   ```

#### Solution 5: Hard Refresh
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

---

### 2. "Firebase auth initialization timeout" Warning

**Problem:** You see a warning about Firebase taking too long to initialize.

**This is usually harmless!** The app will still work. But here's how to fix it:

**Causes:**
- Slow internet connection
- Firebase servers temporarily slow
- Too many Firebase requests

**Solutions:**

#### Solution 1: Wait Patiently
The timeout is now 5 seconds. The app will load even if Firebase is slow.

#### Solution 2: Check Firebase Status
Visit [Firebase Status Dashboard](https://status.firebase.google.com/)

#### Solution 3: Clear Browser Cache
```
Chrome: Settings → Privacy and security → Clear browsing data
Firefox: Settings → Privacy & Security → Clear Data
Safari: Preferences → Privacy → Manage Website Data → Remove All
```

#### Solution 4: Check Internet
```bash
# Test Firebase connection
ping firebaseapp.com
```

#### Solution 5: Restart Development Server
```bash
# Stop server (Ctrl+C)
# Then restart
npm run dev
```

---

### 3. Login/Signup Not Working

**Problem:** Can't log in or create an account.

**Solutions:**

#### Check Email Format
- Must be valid email: `user@example.com`
- No spaces
- No special characters except @ and .

#### Check Password Requirements
- Minimum 8 characters
- Mix of letters and numbers recommended
- No maximum length

#### Check Firebase Rules
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Sign-in method**
4. Make sure **Email/Password** is **Enabled**

#### Clear Cookies
```
Chrome: Settings → Privacy → Cookies → See all cookies → Remove all
```

#### Check Console Errors
1. Open browser console (F12)
2. Look for red error messages
3. Search the error message online or in this guide

---

### 4. Community Posts Not Loading

**Problem:** The Community Hub shows "No posts yet" even though you created posts.

**Solutions:**

#### Check Firestore Rules
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Go to **Firestore Database** → **Rules**
3. Make sure you have these rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /community_posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

#### Check Browser Console
1. Press F12
2. Look for errors about Firestore
3. If you see permission errors, update the rules above

#### Verify Firestore Database Exists
1. Firebase Console → Firestore Database
2. Should see "Cloud Firestore" not "Realtime Database"
3. If not created, click "Create database"
4. Choose "Start in test mode"
5. Select closest region

---

### 5. Images Not Uploading to Cloudinary

**Problem:** Upload dialog opens but images won't upload.

**Solutions:**

#### Check Cloudinary Configuration
Open `/lib/cloudinary.ts` and verify:
```typescript
export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: "YOUR_ACTUAL_CLOUD_NAME", // NOT "YOUR_CLOUD_NAME"
  uploadPreset: "bloomify_community",
};
```

#### Verify Upload Preset
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Settings → Upload
3. Look for preset named `bloomify_community`
4. Make sure **Signing Mode** is "Unsigned"

#### Check Image Requirements
- **Max size:** 5MB
- **Formats:** JPG, PNG, GIF, WebP only
- **Dimensions:** Max 2000x2000 pixels

#### Test with Smaller Image
Try uploading a smaller test image (< 1MB)

---

### 6. Dark/Unreadable Text

**Problem:** Can't read text on login form or other components.

**Solution:** The cosmic theme with botanical colors is now fixed! If you still see issues:

1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R`)
2. Check `/styles/globals.css` has the updated color variables
3. Clear browser cache

---

### 7. "Module not found" Errors

**Problem:** Console shows errors about missing modules.

**Solutions:**

#### Install Dependencies
```bash
npm install
```

#### Clear node_modules
```bash
# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

#### Check package.json
Make sure you have all required dependencies.

---

### 8. Page Won't Load / White Screen

**Problem:** App shows blank white screen.

**Solutions:**

#### Check Console
1. Press F12
2. Look for JavaScript errors
3. Fix the first error shown

#### Verify Development Server
```bash
# Should see this:
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

#### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

#### Clear Vite Cache
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 🔍 Debugging Tips

### Enable Detailed Logging

**AuthContext:** Already has detailed logging
- Look for 🔐 emoji in console
- Shows login/logout events

**Cloudinary:** Check browser console
- Look for ✅ "Cloudinary loaded successfully"
- Or ❌ error messages

**Firebase:** Enable debug mode
```typescript
// In /lib/firebase.ts, add:
import { getAuth, connectAuthEmulator } from 'firebase/auth';
// For local testing
```

### Browser Developer Tools

**Console Tab:**
- See all errors and logs
- Filter by type (Errors, Warnings, Info)

**Network Tab:**
- See all HTTP requests
- Check if Firebase/Cloudinary calls are working
- Look for failed requests (red)

**Application Tab:**
- Check Local Storage (should have Firebase auth)
- Check Cookies
- Clear storage if needed

---

## 📱 Mobile Issues

### Touch Not Working
- Make sure you're clicking the actual upload area
- Try tapping and holding
- Refresh the page

### Images Too Large on Mobile
- The app automatically optimizes images
- Try taking photos in lower resolution

---

## 🌐 Browser Compatibility

**Fully Supported:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Limited Support:**
- ⚠️ IE 11 (Not recommended)
- ⚠️ Opera Mini

**Recommended:** Use latest Chrome or Firefox for best experience.

---

## 🆘 Still Having Issues?

### Check These Resources

1. **Firebase Documentation:**
   - [Authentication Guide](https://firebase.google.com/docs/auth)
   - [Firestore Guide](https://firebase.google.com/docs/firestore)

2. **Cloudinary Documentation:**
   - [Upload Widget](https://cloudinary.com/documentation/upload_widget)
   - [Troubleshooting](https://support.cloudinary.com/)

3. **Project Guides:**
   - See `FIREBASE_SETUP.md`
   - See `CLOUDINARY_SETUP.md`
   - See `README.md`

### Create a Bug Report

If nothing works, create a detailed bug report with:

1. **Error Message:** Exact text from console
2. **Steps to Reproduce:** What did you do?
3. **Environment:**
   - Browser and version
   - Operating system
   - Node.js version (`node --version`)
4. **Screenshots:** Console and error screens
5. **What You've Tried:** Solutions attempted

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] Node.js 16+ installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] Firebase config updated in `/lib/firebase.ts`
- [ ] Cloudinary config updated in `/lib/cloudinary.ts`
- [ ] Firestore database created
- [ ] Authentication enabled in Firebase
- [ ] Firestore rules updated
- [ ] Cloudinary upload preset created
- [ ] Development server running (`npm run dev`)
- [ ] No ad blocker interfering
- [ ] Internet connection working
- [ ] Browser cache cleared
- [ ] Using supported browser

---

## 🎯 Quick Fixes Summary

| Problem | Quick Fix |
|---------|-----------|
| Cloudinary not loading | Wait 5-10 seconds, or hard refresh |
| Firebase timeout | Ignore warning, app still works |
| Can't login | Check email format and password length |
| No posts showing | Update Firestore rules |
| Upload fails | Verify Cloudinary config |
| White screen | Check console, restart dev server |
| Dark text | Hard refresh browser |

---

## 💡 Pro Tips

1. **Always check browser console first** (F12)
2. **Hard refresh solves 80% of issues** (Ctrl+Shift+R)
3. **Clear cache when in doubt**
4. **Read error messages carefully**
5. **Search error messages online**
6. **Update dependencies regularly** (`npm update`)

---

**Remember:** Most issues are configuration-related and can be solved in under 5 minutes! 🌱
