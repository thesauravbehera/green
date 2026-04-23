import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: UserCredential['user'];
  error?: string;
}

/**
 * Login user with email and password
 */
export async function loginUser(data: LoginData): Promise<LoginResponse> {
  try {
    const { email, password } = data;

    // Validate input
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: "Please provide a valid email address"
      };
    }

    if (!password) {
      return {
        success: false,
        error: "Please provide your password"
      };
    }

    // Sign in user
    console.log("🔐 Attempting login for:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("✅ Login successful:", user.uid);

    // Update last login time in Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await setDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      console.log("✅ User document updated in Firestore");
    } else {
      console.warn("⚠️ User document doesn't exist in Firestore");
    }

    return {
      success: true,
      user: user
    };

  } catch (error: any) {
    console.error("Login error:", error);

    // Handle specific Firebase error codes
    let errorMessage = "Login failed. Please try again.";

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = "Invalid email address format.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled. Please contact support.";
        break;
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please sign up.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-credential':
        errorMessage = "Invalid email or password. Please try again.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your connection and try again.";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * Login with Google
 */
export async function loginWithGoogle(): Promise<LoginResponse> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Create or update user document in Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // New user - create document
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        emailVerified: user.emailVerified,
        provider: "google",
        gardenLevel: "Beginner",
        plantsOwned: [],
        favorites: [],
        reminders: [],
        settings: {
          notifications: true,
          theme: "light"
        }
      });
    } else {
      // Existing user - update last login
      await setDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName
      }, { merge: true });
    }

    return {
      success: true,
      user: user
    };

  } catch (error: any) {
    console.error("Google login error:", error);

    let errorMessage = "Google login failed. Please try again.";

    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = "Login cancelled. Please try again.";
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = "Network error. Please check your connection and try again.";
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * Login with GitHub
 */
export async function loginWithGithub(): Promise<LoginResponse> {
  try {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Create or update user document in Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // New user - create document
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        emailVerified: user.emailVerified,
        provider: "github",
        gardenLevel: "Beginner",
        plantsOwned: [],
        favorites: [],
        reminders: [],
        settings: {
          notifications: true,
          theme: "light"
        }
      });
    } else {
      // Existing user - update last login
      await setDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName
      }, { merge: true });
    }

    return {
      success: true,
      user: user
    };

  } catch (error: any) {
    console.error("GitHub login error:", error);

    let errorMessage = "GitHub login failed. Please try again.";

    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = "Login cancelled. Please try again.";
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      errorMessage = "An account already exists with the same email address.";
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = "Network error. Please check your connection and try again.";
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}
