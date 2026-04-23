import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export interface PasswordResetResponse {
  success: boolean;
  error?: string;
}

/**
 * Send password reset email to user
 */
export async function sendPasswordReset(email: string): Promise<PasswordResetResponse> {
  try {
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: "Please provide a valid email address"
      };
    }

    await sendPasswordResetEmail(auth, email);

    return {
      success: true
    };

  } catch (error: any) {
    console.error("Password reset error:", error);

    let errorMessage = "Failed to send password reset email. Please try again.";

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = "Invalid email address format.";
        break;
      case 'auth/user-not-found':
        // Don't reveal if user exists for security
        return { success: true };
      case 'auth/too-many-requests':
        errorMessage = "Too many requests. Please try again later.";
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
