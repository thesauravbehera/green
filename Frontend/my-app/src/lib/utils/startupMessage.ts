/**
 * Display a helpful startup message in the console
 * This helps users understand what's normal and what's not
 */

export function displayStartupMessage() {
  // Only show in development (check if env exists first)
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD) return;

  const styles = {
    title: 'color: #10b981; font-size: 20px; font-weight: bold;',
    success: 'color: #22c55e; font-weight: bold;',
    info: 'color: #14b8a6;',
    warning: 'color: #f59e0b;',
    normal: 'color: #94a3b8;',
    bold: 'font-weight: bold;'
  };

  console.log('%c🌱 Bloomify', styles.title);
  console.log('%cCosmic Botanical Garden - Smart Balcony Gardening', styles.normal);
  console.log('─'.repeat(60));
  
  console.log('%c✅ App Status: Running', styles.success);
  console.log('%cℹ️  All core features are working!', styles.info);
  console.log('');
  
  console.log('%c📸 Image Uploads:', styles.bold);
  console.log('%c   ⓘ  If you see "Cloudinary not loaded" - this is NORMAL!', styles.warning);
  console.log('%c   ⓘ  The app works perfectly without Cloudinary', styles.info);
  console.log('%c   ⓘ  To enable image uploads: see QUICK_CLOUDINARY_FIX.md', styles.info);
  console.log('');
  
  console.log('%c📚 Helpful Guides:', styles.bold);
  console.log('%c   • FIRST_TIME_SETUP.md - What to expect', styles.normal);
  console.log('%c   • CONSOLE_MESSAGES_EXPLAINED.md - What each message means', styles.normal);
  console.log('%c   • TROUBLESHOOTING.md - Fix common issues', styles.normal);
  console.log('%c   • QUICK_CLOUDINARY_FIX.md - Enable image uploads (2 min)', styles.normal);
  console.log('');
  
  console.log('─'.repeat(60));
  console.log('%c🚀 Enjoy building your cosmic garden!', 'color: #8b5cf6; font-weight: bold;');
  console.log('');
}
