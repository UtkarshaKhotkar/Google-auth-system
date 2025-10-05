# Firebase Google Authentication App

A React frontend application with Google authentication using Firebase.

## Features

- Google Sign-In with Firebase Authentication
- Protected dashboard area
- User profile display
- Clean, responsive UI
- Automatic authentication state management

## Setup Instructions

### 1. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider
   - Add your domain to authorized domains
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon
   - Copy the Firebase configuration object

### 2. Configure the App

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Google sign-in component
│   └── Dashboard.js      # Protected user dashboard
├── config/
│   └── firebase.js       # Firebase configuration
├── App.js               # Main app component
├── App.css              # App styles
└── index.js             # App entry point
```

## How It Works

1. **Authentication State**: The app uses Firebase's `onAuthStateChanged` to monitor authentication state
2. **Google Sign-In**: Users click the Google sign-in button to authenticate via popup
3. **Protected Routes**: Authenticated users see the dashboard, unauthenticated users see the login screen
4. **User Data**: The dashboard displays user information from Google (name, email, profile picture)
5. **Sign Out**: Users can sign out, which returns them to the login screen

## Security Notes

- Never commit your actual Firebase configuration to version control
- Consider using environment variables for sensitive configuration
- The current setup is for development - additional security measures needed for production

## Troubleshooting

- **"Firebase: Error (auth/popup-blocked)"**: Allow popups for your domain
- **"Firebase: Error (auth/unauthorized-domain)"**: Add your domain to Firebase authorized domains
- **Configuration errors**: Double-check your Firebase config values