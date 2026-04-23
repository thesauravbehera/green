import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendEmailVerification,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: UserCredential['user'];
  error?: string;
}

/**
 * Register a new user with email and password
 * Creates user in Firebase Auth and stores additional data in Firestore
 */
export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
  try {
    const { name, email, password } = data;

    // Validate input - SIMPLIFIED
    if (!name || name.trim().length < 1) {
      return {
        success: false,
        error: "Name is required"
      };
    }

    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: "Please provide a valid email address"
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long"
      };
    }

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, {
      displayName: name
    });

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      displayName: name,
      photoURL: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      emailVerified: false,
      // Bloomify specific fields
      gardenLevel: "Beginner",
      plantsOwned: [],
      favorites: [],
      reminders: [],
      settings: {
        notifications: true,
        theme: "light"
      }
    });

    // Send email verification - OPTIONAL, won't block signup
    try {
      await sendEmailVerification(user);
    } catch (verificationError) {
      console.warn("Email verification failed:", verificationError);
      // Don't fail registration if email verification fails
    }

    return {
      success: true,
      user: user
    };

  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle specific Firebase error codes
    let errorMessage = "Registration failed. Please try again.";

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "This email is already registered. Please login instead.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address format.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password must be at least 6 characters. Please use a stronger password.";
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