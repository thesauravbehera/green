# 🚀 Quick Fix: Cloudinary "Failed to Load" Error

## ❌ The Problem
You're seeing: **"Cloudinary failed to load after 10 seconds"** or similar errors.

## ✅ The Solution (2 Minutes!)

### Step 1: Get Your Cloudinary Cloud Name
1. Go to [https://cloudinary.com/console](https://cloudinary.com/console)
2. Sign up or log in (it's free!)
3. Copy your **Cloud Name** (shown at the top of the dashboard)
   - Example: `democloud123`

### Step 2: Update the Code
1. Open `/lib/cloudinary.ts` in your code editor
2. Find this line (around line 17):
   ```typescript
   cloudName: "YOUR_CLOUD_NAME",
   ```
3. Replace `YOUR_CLOUD_NAME` with your actual cloud name:
   ```typescript
   cloudName: "democloud123", // Your cloud name here
   ```
4. Save the file

### Step 3: Create Upload Preset
1. In Cloudinary Console, go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Set:
   - **Preset name:** `bloomify_community`
   - **Signing Mode:** `Unsigned`
   - **Folder:** `bloomify/community` (optional)
5. Click **Save**

### Step 4: Refresh
1. Go back to your app
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Try uploading an image again!

---

## ✨ That's It!
Your Cloudinary should now work perfectly. The error should disappear and you'll see:
- ✅ "Cloudinary loaded successfully" in the console
- ✅ Green checkmarks in the setup helper
- ✅ Working image upload button

---

## 🆘 Still Not Working?

### Check These:
- [ ] Cloud name has no quotes or spaces
- [ ] Upload preset is named exactly `bloomify_community`
- [ ] Signing mode is set to "Unsigned"
- [ ] You saved the file and refreshed the page
- [ ] No ad blocker is running
- [ ] Internet connection is stable

### Test Connection:
Open browser console (F12) and type:
```javascript
window.cloudinary
```
Should return an object, not `undefined`.

### Need More Help?
1. See full guide: `CLOUDINARY_SETUP.md`
2. See troubleshooting: `TROUBLESHOOTING.md`
3. Check [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 💡 Pro Tip
The app will now show you a helpful setup card if Cloudinary isn't configured. Just follow the instructions in that card!

---

**Remember:** Without Cloudinary setup, image uploads won't work, but the rest of the app will work fine! 🌱
