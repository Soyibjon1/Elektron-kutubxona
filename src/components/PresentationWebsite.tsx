import { useState, useEffect } from "react";
import { ChevronDown, Search, Download, User, BookOpen, Leaf, DollarSign, Clock, RefreshCw } from "lucide-react";

interface PresentationWebsiteProps {
  onEnterLibrary: () => void;
}

type Language = 'uz' | 'en' | 'ru';

const translations = {
  uz: {
    title: "Raqamli Kutubxona",
    subtitle: "Elektron Darsliklar Bazasi",
    slogan: "Bilim, bir bosish bilan",
    enterLibrary: "Kutubxonaga kirish",
    projectGoal: "Loyiha maqsadi",
    projectGoalText: "Darsliklar, uslubiy qo'llanmalar va ta'lim resurslarini saqlash va oson kirish imkonini beruvchi platforma yaratish.",
    mainStages: "Asosiy bosqichlar",
    collectingMaterials: "Materiallar yig'ish",
    digitization: "Raqamlashtirish",
    platformDevelopment: "Platforma ishlab chiqish",
    updating: "Yangilash",
    digitizationTitle: "Raqamlashtirish jarayoni",
    pdfFormat: "PDF format",
    epubFormat: "ePub format",
    qualityControl: "Sifat nazorati",
    platformFeatures: "Platforma imkoniyatlari",
    fastSearch: "Tez qidiruv",
    onlineReading: "Onlayn o'qish",
    download: "Yuklab olish",
    userProfile: "Foydalanuvchi profili",
    benefits: "Afzalliklar",
    easyAccess: "Oson kirish",
    costSaving: "Xarajatni tejash",
    convenience: "Qulaylik",
    ecoFriendly: "Ekologik toza",
    development: "Rivojlantirish",
    developmentText: "Yangi kitoblar qo'shish, foydalanuvchi fikr-mulohazalari va texnik yaxshilanishlar.",
    finalTitle: "Raqamli Kutubxona – Ta'limning kelajagini qurish",
    getStarted: "Boshlash",
    languageSwitcher: "Til"
  },
  en: {
    title: "Digital Library",
    subtitle: "Electronic Textbook Database",
    slogan: "Knowledge, one click away",
    enterLibrary: "Enter Library",
    projectGoal: "Project Goal",
    projectGoalText: "Creating a platform for storing textbooks, methodical guides, and educational resources with easy access.",
    mainStages: "Main Stages",
    collectingMaterials: "Collecting Materials",
    digitization: "Digitization",
    platformDevelopment: "Platform Development",
    updating: "Updating",
    digitizationTitle: "Digitization Process",
    pdfFormat: "PDF Format",
    epubFormat: "ePub Format",
    qualityControl: "Quality Control",
    platformFeatures: "Platform Features",
    fastSearch: "Fast Search",
    onlineReading: "Online Reading",
    download: "Download",
    userProfile: "User Profile",
    benefits: "Benefits",
    easyAccess: "Easy Access",
    costSaving: "Cost Saving",
    convenience: "Convenience",
    ecoFriendly: "Eco-Friendly",
    development: "Development",
    developmentText: "Adding new books, user feedback, and technical improvements.",
    finalTitle: "Digital Library – Building the Future of Education",
    getStarted: "Get Started",
    languageSwitcher: "Language"
  },
  ru: {
    title: "Цифровая Библиотека",
    subtitle: "База Электронных Учебников",
    slogan: "Знания в одном клике",
    enterLibrary: "Войти в библиотеку",
    projectGoal: "Цель проекта",
    projectGoalText: "Создание платформы для хранения учебников, методических пособий и образовательных ресурсов с легким доступом.",
    mainStages: "Основные этапы",
    collectingMaterials: "Сбор материалов",
    digitization: "Оцифровка",
    platformDevelopment: "Разработка платформы",
    updating: "Обновление",
    digitizationTitle: "Процесс оцифровки",
    pdfFormat: "PDF формат",
    epubFormat: "ePub формат",
    qualityControl: "Контроль качества",
    platformFeatures: "Возможности платформы",
    fastSearch: "Быстрый поиск",
    onlineReading: "Онлайн чтение",
    download: "Скачивание",
    userProfile: "Профиль пользователя",
    benefits: "Преимущества",
    easyAccess: "Легкий доступ",
    costSaving: "Экономия средств",
    convenience: "Удобство",
    ecoFriendly: "Экологичность",
    development: "Развитие",
    developmentText: "Добавление новых книг, отзывы пользователей и технические улучшения.",
    finalTitle: "Цифровая Библиотека – Строим будущее образования",
    getStarted: "Начать",
    languageSwitcher: "Язык"
  }
};

export function PresentationWebsite({ onEnterLibrary }: PresentationWebsiteProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState<Language>('uz');
  const [isAnimating, setIsAnimating] = useState(false);

  const t = translations[language];
  const totalSlides = 8;

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);

      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentSlide, isAnimating]);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  const slideVariants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        {(['uz', 'en', 'ru'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              language === lang
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Slide Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Slides Container */}
      <div 
        className="h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
      >
        {/* Slide 1: Hero */}
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center max-w-4xl mx-auto px-8">
            <div className="animate-fade-in-up">
              <h1 className="text-7xl font-bold text-blue-600 mb-4 animate-pulse">
                {t.title}
              </h1>
              <h2 className="text-3xl text-purple-600 mb-6 font-light">
                {t.subtitle}
              </h2>
              <p className="text-xl text-gray-600 mb-12 italic">
                {t.slogan}
              </p>
              <button
                onClick={onEnterLibrary}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {t.enterLibrary}
              </button>
            </div>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce" size={32} />
        </div>

        {/* Slide 2: Project Goal */}
        <div className="h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-blue-600 mb-8">{t.projectGoal}</h2>
            <p className="text-2xl text-gray-700 leading-relaxed">
              {t.projectGoalText}
            </p>
          </div>
        </div>

        {/* Slide 3: Main Stages */}
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-blue-600 mb-12 text-center">{t.mainStages}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: t.collectingMaterials, icon: "📚" },
                { title: t.digitization, icon: "💻" },
                { title: t.platformDevelopment, icon: "🔧" },
                { title: t.updating, icon: "🔄" }
              ].map((stage, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-6xl mb-4 text-center">{stage.icon}</div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{stage.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 4: Digitization */}
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-blue-600 mb-12 text-center">{t.digitizationTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: t.pdfFormat, icon: "📄", color: "from-red-400 to-red-600" },
                { title: t.epubFormat, icon: "📖", color: "from-green-400 to-green-600" },
                { title: t.qualityControl, icon: "✅", color: "from-blue-400 to-blue-600" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl mb-4 mx-auto`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 5: Platform Features */}
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-blue-600 mb-12 text-center">{t.platformFeatures}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: t.fastSearch, icon: Search, color: "bg-yellow-500" },
                { title: t.onlineReading, icon: BookOpen, color: "bg-green-500" },
                { title: t.download, icon: Download, color: "bg-blue-500" },
                { title: t.userProfile, icon: User, color: "bg-purple-500" }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 6: Benefits */}
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-blue-600 mb-12 text-center">{t.benefits}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: t.easyAccess, icon: Clock, color: "bg-indigo-500" },
                { title: t.costSaving, icon: DollarSign, color: "bg-green-500" },
                { title: t.convenience, icon: BookOpen, color: "bg-blue-500" },
                { title: t.ecoFriendly, icon: Leaf, color: "bg-emerald-500" }
              ].map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full ${benefit.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                    <benefit.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{benefit.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 7: Development */}
        <div className="h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-8">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <RefreshCw size={48} className="text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-blue-600 mb-8">{t.development}</h2>
            <p className="text-2xl text-gray-700 leading-relaxed">
              {t.developmentText}
            </p>
          </div>
        </div>

        {/* Slide 8: Final */}
        <div className="h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-blue-600 mb-8">
              {t.finalTitle}
            </h2>
            <button
              onClick={onEnterLibrary}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
