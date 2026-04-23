/**
 * Cloudinary Configuration for Bloomify Community
 * 
 * This file handles image uploads and management for the community feature
 * using Cloudinary's Upload Widget and SDK
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
}

// Cloudinary configuration
// TODO: Replace with your actual Cloudinary credentials
export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: "YOUR_CLOUD_NAME", // Replace with your cloud name
  uploadPreset: "bloomify_community", // Create this preset in Cloudinary dashboard
  apiKey: "YOUR_API_KEY" // Optional: only needed for server-side operations
};

/**
 * Check if Cloudinary script is loaded
 */
export const isCloudinaryLoaded = (): boolean => {
  // @ts-ignore
  return typeof window !== 'undefined' && window.cloudinary !== undefined;
};

/**
 * Check if Cloudinary is configured
 */
export const isCloudinaryConfigured = (): boolean => {
  return cloudinaryConfig.cloudName !== 'YOUR_CLOUD_NAME' && 
         cloudinaryConfig.cloudName.length > 0;
};

/**
 * Initialize Cloudinary Upload Widget
 * This creates a widget for uploading images directly from the browser
 */
export const createUploadWidget = (
  onSuccess: (result: any) => void,
  onError?: (error: any) => void
) => {
  if (!isCloudinaryLoaded()) {
    console.error('Cloudinary widget not loaded. Make sure to include the script tag in index.html');
    if (onError) {
      onError(new Error('Cloudinary script not loaded. Please refresh the page or check your internet connection.'));
    }
    return null;
  }

  if (!isCloudinaryConfigured()) {
    console.error('Cloudinary not configured. Please update cloudName in /lib/cloudinary.ts');
    if (onError) {
      onError(new Error('Cloudinary credentials not configured. Please check CLOUDINARY_SETUP.md'));
    }
    return null;
  }

  try {
    // @ts-ignore - Cloudinary widget is loaded via script tag
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        sources: ['local', 'camera', 'url'],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        cropping: true,
        croppingAspectRatio: 1,
        croppingShowDimensions: true,
        croppingCoordinatesMode: 'custom',
        showSkipCropButton: true,
        folder: 'bloomify/community',
        tags: ['community', 'user-upload'],
        context: {
          app: 'bloomify',
          feature: 'community'
        },
        styles: {
          palette: {
            window: "#0a0e1f",
            windowBorder: "#10b981",
            tabIcon: "#10b981",
            menuIcons: "#a3b8cc",
            textDark: "#e8f5ed",
            textLight: "#ffffff",
            link: "#14b8a6",
            action: "#10b981",
            inactiveTabIcon: "#64748b",
            error: "#f87171",
            inProgress: "#14b8a6",
            complete: "#22c55e",
            sourceBg: "#131b29"
          },
          fonts: {
            default: null,
            "'Inter', sans-serif": {
              url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
              active: true
            }
          }
        }
      },
      (error: any, result: any) => {
        if (error && onError) {
          console.error('Cloudinary upload error:', error);
          onError(error);
          return;
        }

        if (result && result.event === 'success') {
          console.log('Upload successful:', result.info);
          onSuccess(result.info);
        }
      }
    );

    return widget;
  } catch (error) {
    console.error('Error creating Cloudinary widget:', error);
    if (onError) {
      onError(error);
    }
    return null;
  }
};

/**
 * Generate Cloudinary image URL with transformations
 */
export const getCloudinaryImageUrl = (
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  }
): string => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  
  if (!transformations) {
    return `${baseUrl}/${publicId}`;
  }

  const transforms: string[] = [];
  
  if (transformations.width) transforms.push(`w_${transformations.width}`);
  if (transformations.height) transforms.push(`h_${transformations.height}`);
  if (transformations.crop) transforms.push(`c_${transformations.crop}`);
  if (transformations.quality) transforms.push(`q_${transformations.quality}`);
  if (transformations.format) transforms.push(`f_${transformations.format}`);
  
  const transformString = transforms.join(',');
  return `${baseUrl}/${transformString}/${publicId}`;
};

/**
 * Generate thumbnail URL
 */
export const getThumbnailUrl = (publicId: string): string => {
  return getCloudinaryImageUrl(publicId, {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  });
};

/**
 * Generate optimized image URL
 */
export const getOptimizedImageUrl = (publicId: string, width?: number): string => {
  return getCloudinaryImageUrl(publicId, {
    width: width || 1200,
    crop: 'limit',
    quality: 'auto',
    format: 'auto'
  });
};

/**
 * Helper to extract public ID from Cloudinary URL
 */
export const extractPublicId = (url: string): string | null => {
  const regex = /upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
