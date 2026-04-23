import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'kn' | 'ta';

interface Translation {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translation = {
  // Navigation
  nav_overview: { en: 'Overview', hi: 'अवलोकन', kn: 'ಅವಲೋಕನ', ta: 'மேಲೋட்டம்' },
  nav_dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', ta: 'டாஷ்பೋರ್்டு' },
  nav_garden: { en: 'Garden', hi: 'बगीचा', kn: 'ತೋಟ', ta: 'தோட்டம்' },
  nav_community: { en: 'Community', hi: 'समुदाय', kn: 'ಸಮುದಾಯ', ta: 'ಸಮೂಹ' },
  nav_market: { en: 'Market', hi: 'बाज़ार', kn: 'ಮಾರುಕಟ್ಟೆ', ta: 'சந்தை' },
  
  // Hero
  hero_title: { en: 'CULTIVATE INTELLIGENTLY', hi: 'बुद्धिमानी से खेती करें', kn: 'ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಕೃಷಿ ಮಾಡಿ', ta: 'புத்திசாலித்தனமாக வளர்க்கவும்' },
  hero_subtitle: { en: 'The definitive ecosystem for high-performance urban gardening in India.', hi: 'भारत में शहरी बागवानी के लिए निश्चित पारिस्थितिकी तंत्र।', kn: 'ಭಾರತದಲ್ಲಿ ನಗರ ತೋಟಗಾರಿಕೆಗಾಗಿ ಅತ್ಯುತ್ತ ಪರಿಸರ ವ್ಯವಸ್ಥೆ.', ta: 'இந்தியாவில் நகர்ப்புற தோட்டக்கலைக்கான உறுதியான சூழல் அமைப்பு.' },
  hero_cta: { en: 'Start Your Journey', hi: 'यात्रा शुरू करें', kn: 'ಪ್ರಯಾಣ ಆರಂಭಿಸಿ', ta: 'பயணத்தைத் தொடங்குங்கள்' },
  
  // Features
  feat_monsoon: { en: 'Monsoon Ready', hi: 'मानसून के लिए तैयार', kn: 'ಮುಂಗಾರು ಸಿದ್ಧ', ta: 'பருவமழை தயார்' },
  feat_monsoon_desc: { en: 'Advanced drainage alerts for the Indian monsoon season.', hi: 'भारतीय मानसून सीजन के लिए उन्नत जल निकासी अलर्ट।', kn: 'ಭಾರತೀಯ ಮುಂಗಾರು ಹಂಗಾಮಿಗೆ ಸುಧಾರಿತ ನೀರು ಹರಿಸುವ ಎಚ್ಚರಿಕೆಗಳು.', ta: 'இந்திய பருவமழைக்காலத்திற்கான மேம்பட்ட வடிகால் எச்சரிக்கைகள்.' },
  
  // Dashboard
  welcome: { en: 'SALUTATIONS', hi: 'नमस्कार', kn: 'ನಮಸ್ಕಾರ', ta: 'வணக்கம்' },
  bio_units: { en: 'BIO-UNITS', hi: 'जैव-इकाइयां', kn: 'ಜೈವಿಕ ಘಟಕಗಳು', ta: 'உயிரியல் அலகுகள்' },
  streak: { en: 'STREAK', hi: 'लगातार दिन', kn: 'ಸತತ ದಿನಗಳು', ta: 'தொடர் நாட்கள்' },
  
  // Marketplace
  price_prefix: { en: '₹', hi: '₹', kn: '₹', ta: '₹' },
  acquire: { en: 'ACQUIRE ASSET', hi: 'संपत्ति प्राप्त करें', kn: 'ಆಸ್ತಿಯನ್ನು ಪಡೆದುಕೊಳ್ಳಿ', ta: 'சொத்தைப் பெறுங்கள்' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
