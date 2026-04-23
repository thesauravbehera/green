import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_zGsIZo8S6FiKJj22VvjNwmnCjT4YhEQ",
  authDomain: "bloomify-5bcb7.firebaseapp.com",
  projectId: "bloomify-5bcb7",
  storageBucket: "bloomify-5bcb7.firebasestorage.app",
  messagingSenderId: "949820272509",
  appId: "1:949820272509:web:f6d4265973ffecb6efe614"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set persistence to LOCAL (persists even when browser is closed)
// This ensures users stay logged in across sessions
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
