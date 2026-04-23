import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Get user initials from display name or email
 */
export function getUserInitials(user: User | null): string {
  if (!user) return "U";
  
  if (user.displayName) {
    return user.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  
  return user.email?.charAt(0).toUpperCase() || "U";
}

/**
 * Get full user data from Firestore
 */
export async function getUserData(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

/**
 * Check if user email is verified
 */
export function isEmailVerified(user: User | null): boolean {
  return user?.emailVerified || false;
}

/**
 * Get user provider (email, google, github, etc.)
 */
export function getUserProvider(user: User | null): string {
  if (!user) return "none";
  return user.providerData[0]?.providerId || "email";
}

/**
 * Format timestamp for display
 */
export function formatAuthDate(timestamp: any): string {
  if (!timestamp) return "Never";
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid date";
  }
}
