import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Dashboard = ({ user }) => {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.dashboard}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Welcome to your Dashboard</h1>
                    <button onClick={handleSignOut} style={styles.signOutButton}>
                        Sign Out
                    </button>
                </div>

                <div style={styles.userInfo}>
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        style={styles.profileImage}
                    />
                    <div style={styles.userDetails}>
                        <h2 style={styles.userName}>{user.displayName}</h2>
                        <p style={styles.userEmail}>{user.email}</p>
                        <p style={styles.userId}>User ID: {user.uid}</p>
                    </div>
                </div>

                <div style={styles.content}>
                    <h3>You're successfully authenticated!</h3>
                    <p>This is your protected dashboard area.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
    },
    dashboard: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        backgroundColor: '#4285f4',
        color: 'white',
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
    },
    signOutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
        borderBottom: '1px solid #eee',
    },
    profileImage: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        marginRight: '1.5rem',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        margin: '0 0 0.5rem 0',
        color: '#333',
    },
    userEmail: {
        margin: '0 0 0.5rem 0',
        color: '#666',
    },
    userId: {
        margin: 0,
        color: '#999',
        fontSize: '0.9rem',
    },
    content: {
        padding: '2rem',
        textAlign: 'center',
    },
};

export default Dashboard;