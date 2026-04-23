import { useState, useEffect } from 'react';

/**
 * Custom hook to check if Cloudinary script is loaded
 * @returns object with isLoaded status and error if any
 */
export function useCloudinary() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout | null = null;
    let attempts = 0;
    const maxAttempts = 10; // 5 seconds total (10 * 500ms) - shorter wait time
    
    const checkCloudinary = () => {
      attempts++;
      
      // @ts-ignore - Cloudinary global object
      if (typeof window !== 'undefined' && window.cloudinary) {
        setIsLoaded(true);
        setIsChecking(false);
        if (checkInterval) clearInterval(checkInterval);
        console.log('✅ Cloudinary loaded successfully');
        return;
      }
      
      if (attempts >= maxAttempts) {
        if (checkInterval) clearInterval(checkInterval);
        setIsChecking(false);
        // Don't set error, just quietly disable
        console.log('ℹ️ Cloudinary not loaded. Image uploads disabled. See QUICK_CLOUDINARY_FIX.md to enable.');
      }
    };

    // Initial check
    checkCloudinary();
    
    // Continue checking if not loaded and no error
    if (!isLoaded && isChecking) {
      checkInterval = setInterval(checkCloudinary, 500);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isLoaded, isChecking]);

  return { isLoaded, error, isChecking };
}
