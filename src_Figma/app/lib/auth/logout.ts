import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export interface LogoutResponse {
  success: boolean;
  error?: string;
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<LogoutResponse> {
  try {
    await signOut(auth);
    return {
      success: true
    };
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: error.message || "Logout failed. Please try again."
    };
  }
}
