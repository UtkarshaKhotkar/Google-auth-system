import React, { useState, useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const Login = ({ onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check for redirect result on component mount
    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    console.log('User signed in via redirect:', result.user.displayName);
                    if (onLoginSuccess) {
                        onLoginSuccess(result.user);
                    }
                }
            } catch (error) {
                console.error('Redirect result error:', error);
                setError('Authentication failed after redirect. Please try again.');
            }
        };

        checkRedirectResult();
    }, [onLoginSuccess]);

    const signInWithGoogle = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Try popup first
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('User signed in successfully:', user.displayName);
            if (onLoginSuccess) {
                onLoginSuccess(user);
            }
        } catch (error) {
            console.error('Authentication error:', error);

            // Handle specific CORS/popup errors
            if (error.code === 'auth/popup-blocked' ||
                error.code === 'auth/popup-closed-by-user' ||
                error.message.includes('Cross-Origin-Opener-Policy') ||
                error.message.includes('window.closed')) {

                try {
                    // Fallback to redirect method for CORS issues
                    console.log('Popup blocked, using redirect method...');
                    await signInWithRedirect(auth, googleProvider);
                    // Don't set loading to false here as redirect will reload the page
                    return;
                } catch (redirectError) {
                    console.error('Redirect sign-in failed:', redirectError);
                    setError('Authentication failed. Please check your browser settings and try again.');
                }
            } else {
                // Handle other authentication errors
                let errorMessage = 'Failed to sign in with Google. ';

                switch (error.code) {
                    case 'auth/account-exists-with-different-credential':
                        errorMessage += 'An account already exists with this email using a different sign-in method.';
                        break;
                    case 'auth/cancelled-popup-request':
                        errorMessage += 'Sign-in was cancelled.';
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage += 'Google sign-in is not enabled for this project.';
                        break;
                    case 'auth/unauthorized-domain':
                        errorMessage += 'This domain is not authorized for sign-in.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage += 'Network error. Please check your connection.';
                        break;
                    default:
                        errorMessage += `Please try again. (${error.code})`;
                }

                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>Welcome</h2>
                <p style={styles.subtitle}>Sign in to continue</p>

                {error && (
                    <div style={styles.errorMessage}>
                        <p style={styles.errorText}>{error}</p>
                        <button
                            onClick={() => setError(null)}
                            style={styles.dismissButton}
                        >
                            ×
                        </button>
                    </div>
                )}

                <button
                    onClick={signInWithGoogle}
                    disabled={isLoading}
                    style={{
                        ...styles.googleButton,
                        ...(isLoading ? styles.googleButtonDisabled : {}),
                    }}
                >
                    {isLoading ? (
                        <>
                            <div style={styles.spinner}></div>
                            Signing in...
                        </>
                    ) : (
                        <>
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google logo"
                                style={styles.googleLogo}
                            />
                            Sign in with Google
                        </>
                    )}
                </button>

                {isLoading && (
                    <p style={styles.loadingText}>
                        If popup is blocked, you'll be redirected automatically
                    </p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    loginBox: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        minWidth: '300px',
        maxWidth: '400px',
    },
    title: {
        color: '#333',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: '#666',
        marginBottom: '2rem',
    },
    errorMessage: {
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        padding: '12px',
        marginBottom: '1rem',
        position: 'relative',
        textAlign: 'left',
    },
    errorText: {
        color: '#c33',
        margin: 0,
        fontSize: '14px',
        paddingRight: '20px',
    },
    dismissButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'none',
        border: 'none',
        color: '#c33',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '0',
        width: '20px',
        height: '20px',
    },
    googleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        transition: 'background-color 0.3s',
        minHeight: '48px',
    },
    googleButtonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    googleLogo: {
        width: '20px',
        height: '20px',
        backgroundColor: 'white',
        padding: '2px',
        borderRadius: '2px',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid transparent',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: '#666',
        fontSize: '12px',
        marginTop: '1rem',
        fontStyle: 'italic',
    },
};

export default Login;