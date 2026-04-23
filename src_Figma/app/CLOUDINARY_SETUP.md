# 🖼️ Cloudinary Setup Guide for Bloomify Community

This guide will help you set up Cloudinary for the Community Hub feature, allowing users to upload and share plant images.

---

## Why Cloudinary?

Cloudinary is a cloud-based image and video management service that provides:
- **Easy image uploads** directly from the browser
- **Automatic optimization** for faster loading
- **Image transformations** (resize, crop, quality adjustment)
- **CDN delivery** for global performance
- **Free tier** with generous limits (25GB storage, 25GB bandwidth/month)

---

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a **FREE** account using:
   - Email and password, OR
   - Google account, OR
   - GitHub account
3. Verify your email address (check your inbox)
4. You'll be taken to your Cloudinary dashboard

---

## Step 2: Get Your Credentials

Once logged in to your Cloudinary dashboard:

1. You'll see your **Account Details** on the dashboard homepage
2. Note down these three values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (keep this private!)

**Screenshot location:** Top of the dashboard under "Account Details"

---

## Step 3: Create an Upload Preset

Upload presets allow unsigned uploads from the browser (secure and easy).

### 3.1 Navigate to Upload Presets

1. Click **Settings** (gear icon) in the top-right corner
2. In the left sidebar, click **Upload**
3. Scroll down to **Upload presets**
4. Click **Add upload preset**

### 3.2 Configure the Preset

**Basic Settings:**
- **Preset name:** `bloomify_community`
- **Signing mode:** Select **Unsigned** (important!)
- **Folder:** `bloomify/community`

**Upload Manipulations (optional but recommended):**
- **Format:** Auto
- **Quality:** Auto
- **Max width:** 2000
- **Max height:** 2000
- **Allowed formats:** jpg, png, gif, webp

**Incoming transformations (optional):**
- **Cropping mode:** Fill
- **Aspect ratio:** 1:1 (for square images)

### 3.3 Save the Preset

- Click **Save** at the top-right
- Your preset is now created and ready to use!

---

## Step 4: Update Your Bloomify Configuration

### 4.1 Open the Configuration File

In VS Code, open `/lib/cloudinary.ts`

### 4.2 Replace the Placeholder Values

Find this section:
```typescript
export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: "YOUR_CLOUD_NAME", // Replace with your cloud name
  uploadPreset: "bloomify_community", // This should match your preset name
  apiKey: "YOUR_API_KEY" // Optional: only needed for server-side operations
};
```

Replace with your actual values:
```typescript
export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: "dxyz123abc", // Your actual cloud name
  uploadPreset: "bloomify_community", // Keep this as is (or use your custom name)
  apiKey: "123456789012345" // Your actual API key (optional)
};
```

### 4.3 Save the File

Press `Ctrl+S` (or `Cmd+S` on Mac) to save

---

## Step 5: Test the Upload Feature

1. **Start your development server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open your app** in the browser:
   ```
   http://localhost:5173/
   ```

3. **Navigate to Community Hub**:
   - Click "Community" in the navigation menu
   - Or scroll down to the Community section

4. **Create a test post**:
   - Click "Create Post" button (you must be logged in)
   - Click the upload area
   - The Cloudinary upload widget should appear
   - Select an image from your computer
   - Fill in the caption
   - Click "Publish Post"

5. **Verify the upload**:
   - Your post should appear in the Community feed
   - The image should load from Cloudinary
   - Go to your Cloudinary dashboard → Media Library
   - You should see your uploaded image in the `bloomify/community` folder

---

## Step 6: Configure Firestore Security Rules (Important!)

To save community posts to Firestore, you need to update your security rules.

### 6.1 Go to Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your **Bloomify** project
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab

### 6.2 Update the Rules

Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all community posts
    match /community_posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && 
                       resource.data.userId == request.auth.uid;
    }
    
    // User documents
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6.3 Publish the Rules

- Click **Publish** button
- Your rules are now active!

**What these rules do:**
- ✅ Anyone can read community posts (even logged-out users)
- ✅ Only logged-in users can create posts
- ✅ Only post creators can delete their own posts
- ✅ Anyone logged in can update posts (for likes/comments)

---

## Troubleshooting

### Problem: Upload widget doesn't appear

**Solutions:**
1. **Check browser console** for errors (Press F12)
2. **Verify Cloudinary script is loaded**:
   - Open `/index.html`
   - Make sure this line exists:
     ```html
     <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
     ```
3. **Hard refresh** the page: `Ctrl+Shift+R` (or `Cmd+Shift+R`)

---

### Problem: "Upload preset not found" error

**Solutions:**
1. **Check preset name** in `/lib/cloudinary.ts`
2. **Verify in Cloudinary dashboard**:
   - Settings → Upload → Upload presets
   - Make sure `bloomify_community` exists
   - Make sure signing mode is "Unsigned"
3. **Wait a few minutes** - sometimes takes time to activate

---

### Problem: Images upload but don't display

**Solutions:**
1. **Check image URL** in browser console
2. **Verify cloud name** in `/lib/cloudinary.ts` matches your account
3. **Check Cloudinary Media Library**:
   - Dashboard → Media Library
   - Look for your uploaded images
   - Click on an image to see its public URL

---

### Problem: "Access denied" when creating post

**Solutions:**
1. **Make sure you're logged in**
2. **Check Firestore rules** are updated (Step 6.2)
3. **Check browser console** for specific error messages
4. **Verify Firestore is in test mode** (for development):
   - Firebase Console → Firestore Database
   - Should say "Test mode" or show your custom rules

---

## Cloudinary Free Tier Limits

The free plan includes:
- ✅ **25 GB** storage
- ✅ **25 GB** bandwidth per month
- ✅ **25,000** transformations per month
- ✅ Unlimited number of images
- ✅ Image optimization and CDN

**For most small to medium projects, this is plenty!**

To monitor usage:
1. Go to Cloudinary Dashboard
2. Click **Reports** in the left sidebar
3. View your current usage

---

## Advanced Features (Optional)

### Image Transformations

You can generate different versions of uploaded images:

```typescript
import { getThumbnailUrl, getOptimizedImageUrl } from "../lib/cloudinary";

// Thumbnail (400x400, cropped)
const thumbUrl = getThumbnailUrl(publicId);

// Optimized full size (max 1200px wide)
const fullUrl = getOptimizedImageUrl(publicId, 1200);

// Custom transformation
const customUrl = getCloudinaryImageUrl(publicId, {
  width: 800,
  height: 600,
  crop: "fill",
  quality: "auto",
  format: "webp"
});
```

### Upload Widget Customization

Edit `/lib/cloudinary.ts` to customize the upload experience:

```typescript
// In createUploadWidget function
const widget = window.cloudinary.createUploadWidget({
  cloudName: cloudinaryConfig.cloudName,
  uploadPreset: cloudinaryConfig.uploadPreset,
  
  // Customization options:
  sources: ['local', 'camera', 'url', 'instagram'], // Add more sources
  multiple: true, // Allow multiple uploads
  maxFiles: 5, // Limit number of files
  maxFileSize: 10000000, // 10MB
  clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
  
  // Cropping
  cropping: true,
  croppingAspectRatio: 1, // Square
  showSkipCropButton: true,
  
  // Advanced
  resourceType: 'image',
  folder: 'bloomify/community',
  tags: ['community', 'user-upload'],
  
  // Theme (already customized for Bloomify cosmic theme!)
  styles: {
    palette: {
      window: "#0a0e27",
      windowBorder: "#6366f1",
      // ... etc
    }
  }
}, callback);
```

---

## Security Best Practices

### ✅ DO:
- Use **unsigned upload presets** for browser uploads
- Set **max file size limits** (5-10MB recommended)
- Specify **allowed formats** (jpg, png, webp only)
- Use **folder structure** to organize uploads
- Enable **moderation** if needed (Cloudinary add-on)

### ❌ DON'T:
- Don't expose your API Secret in frontend code
- Don't allow uploads without file size limits
- Don't skip Firestore security rules
- Don't store sensitive user data in image metadata

---

## Next Steps

Once Cloudinary is set up:

1. ✅ Test creating posts with images
2. ✅ Verify images load in the Community feed
3. ✅ Check that likes and comments work
4. ✅ Test on mobile devices
5. ✅ Share with friends and get feedback!

---

## Need Help?

- **Cloudinary Documentation:** [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Upload Widget Guide:** [https://cloudinary.com/documentation/upload_widget](https://cloudinary.com/documentation/upload_widget)
- **Community Support:** [https://support.cloudinary.com/](https://support.cloudinary.com/)

---

**Congratulations!** 🎉 Your Bloomify Community Hub is now powered by Cloudinary! Users can share their gardening journey with beautiful, optimized images. 🌱📸
