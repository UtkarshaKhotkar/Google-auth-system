# Quick Setup Guide

## Step 1: Get Your Web App Configuration

You provided a service account key, but for frontend authentication we need the **web app config**. Here's how to get it:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **auth-system-a00e3**
3. Click the gear icon (⚙️) → **Project Settings**
4. Scroll down to **"Your apps"** section
5. If you see a web app (</> icon), click on it
6. If no web app exists, click **"Add app"** → **Web** (</> icon)
7. Register with any nickname (e.g., "Auth Frontend")
8. **Copy the `firebaseConfig` object** - it should look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Starts with AIzaSy
  authDomain: "auth-system-a00e3.firebaseapp.com",
  projectId: "auth-system-a00e3",
  storageBucket: "auth-system-a00e3.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. **Enable** it
4. Add your email as an authorized user
5. **Save**

## Step 3: Update Configuration

Replace the placeholder values in `src/config/firebase.js` with your actual web app config.

## Step 4: Test the App

```bash
cd firebase-auth-app
npm start
```

## Important Notes

- ❌ **Don't use** the service account key for frontend auth
- ✅ **Use** the web app config from Firebase Console
- The web `apiKey` is safe to expose in frontend code
- The service account key should be kept secret and used only for server-side operations

## Need Help?

If you're having trouble finding the web app config, share a screenshot of your Firebase Console project settings page.