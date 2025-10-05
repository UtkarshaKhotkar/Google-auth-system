import React, { useState } from "react";
import { signInWithGooglePopup, logout } from "./firebase";
require('./serviceAccountKey.json')
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
export default function App() {
  const [user, setUser] = useState(null);
  const [serverResp, setServerResp] = useState(null);
  async function handleSignIn() {
    try {
      const { user: fbUser, idToken } = await signInWithGooglePopup();
      setUser({ displayName: fbUser.displayName, email: fbUser.email, photoURL: fbUser.photoURL });
      const res = await fetch(`${BACKEND_URL}/sessionLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      const data = await res.json();
      setServerResp(data);
    } catch (err) {
      console.error("Sign in error", err);
      setServerResp({ error: err.message });
    }
  }
  async function handleLogout() {
    await logout();
    setUser(null);
    setServerResp(null);
  }
  return (
    <div style={{ padding: 20 }}>
      <h2>Firebase Google sign-in (React)</h2>
      <div>
        {!user ? (
          <button onClick={handleSignIn}>Sign in with Google</button>
        ) : (
          <div>
            <img src={user.photoURL} alt="" width={40} style={{ borderRadius: 20 }} />
            <div>{user.displayName} ({user.email})</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Server response</h3>
        <pre>{JSON.stringify(serverResp, null, 2)}</pre>
      </div>
    </div>
  );
}
