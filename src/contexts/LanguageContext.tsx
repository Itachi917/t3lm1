import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<string, Record<Language, string>> = {
  'app.title': { en: 'UniLearn', ar: 'يوني ليرن' },
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.levels': { en: 'Levels', ar: 'المستويات' },
  'nav.profile': { en: 'Profile', ar: 'الملف الشخصي' },
  'nav.search': { en: 'Search lectures...', ar: 'ابحث في المحاضرات...' },
  'nav.login': { en: 'Login', ar: 'تسجيل الدخول' },
  'nav.logout': { en: 'Logout', ar: 'تسجيل الخروج' },
  'nav.guest': { en: 'Continue as Guest', ar: 'متابعة كضيف' },
  'landing.hero': { en: 'Your University Study Companion', ar: 'رفيقك الدراسي الجامعي' },
  'landing.subtitle': { en: 'Study smarter with interactive flashcards, quizzes, and bilingual notes.', ar: 'ادرس بذكاء مع البطاقات التعليمية التفاعلية والاختبارات والملاحظات ثنائية اللغة.' },
  'landing.getStarted': { en: 'Get Started', ar: 'ابدأ الآن' },
  'landing.signIn': { en: 'Sign In', ar: 'تسجيل الدخول' },
  'landing.signUp': { en: 'Sign Up', ar: 'إنشاء حساب' },
  'landing.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'landing.password': { en: 'Password', ar: 'كلمة المرور' },
  'landing.googleSignIn': { en: 'Sign in with Google', ar: 'الدخول بحساب جوجل' },
  'levels.title': { en: 'Select Your Level', ar: 'اختر مستواك' },
  'levels.level': { en: 'Level', ar: 'المستوى' },
  'subjects.title': { en: 'Subjects', ar: 'المواد الدراسية' },
  'subjects.lectures': { en: 'lectures', ar: 'محاضرات' },
  'dashboard.progress': { en: 'Progress', ar: 'التقدم' },
  'dashboard.lectures': { en: 'Lectures', ar: 'المحاضرات' },
  'lecture.summary': { en: 'Summary Notes', ar: 'ملخص الملاحظات' },
  'lecture.flashcards': { en: 'Flashcards', ar: 'البطاقات التعليمية' },
  'lecture.quiz': { en: 'Quiz', ar: 'اختبار' },
  'lecture.clickToFlip': { en: 'Click to flip', ar: 'انقر للقلب' },
  'lecture.question': { en: 'Question', ar: 'سؤال' },
  'lecture.answer': { en: 'Answer', ar: 'إجابة' },
  'lecture.next': { en: 'Next', ar: 'التالي' },
  'lecture.prev': { en: 'Previous', ar: 'السابق' },
  'lecture.of': { en: 'of', ar: 'من' },
  'quiz.check': { en: 'Check Answer', ar: 'تحقق من الإجابة' },
  'quiz.next': { en: 'Next Question', ar: 'السؤال التالي' },
  'quiz.score': { en: 'Score', ar: 'النتيجة' },
  'quiz.restart': { en: 'Restart Quiz', ar: 'إعادة الاختبار' },
  'quiz.complete': { en: 'Quiz Complete!', ar: 'اكتمل الاختبار!' },
  'quiz.correct': { en: 'Correct!', ar: 'صحيح!' },
  'quiz.incorrect': { en: 'Incorrect', ar: 'خطأ' },
  'profile.title': { en: 'My Profile', ar: 'ملفي الشخصي' },
  'profile.progress': { en: 'My Progress', ar: 'تقدمي' },
  'profile.lastRead': { en: 'Last Read', ar: 'آخر قراءة' },
  'profile.noProgress': { en: 'No progress yet. Start studying!', ar: 'لا يوجد تقدم بعد. ابدأ الدراسة!' },
  'theme.light': { en: 'Light', ar: 'فاتح' },
  'theme.dark': { en: 'Dark', ar: 'داكن' },
  'back': { en: 'Back', ar: 'رجوع' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
