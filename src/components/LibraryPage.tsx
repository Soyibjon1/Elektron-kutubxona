import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ArrowLeft, Search, Download, BookOpen, Filter } from "lucide-react";
import { SignOutButton } from "../SignOutButton";

interface LibraryPageProps {
  onBackToPresentation: () => void;
}

type Language = 'uz' | 'en' | 'ru';

const translations = {
  uz: {
    digitalLibrary: "Raqamli Kutubxona",
    backToPresentation: "Taqdimotga qaytish",
    searchPlaceholder: "Kitoblarni qidiring...",
    filter: "Filtr",
    readOnline: "Onlayn o'qish",
    download: "Yuklab olish",
    noBooks: "Hozircha kitoblar mavjud emas",
    format: "Format",
    language: "Til"
  },
  en: {
    digitalLibrary: "Digital Library",
    backToPresentation: "Back to Presentation",
    searchPlaceholder: "Search books...",
    filter: "Filter",
    readOnline: "Read Online",
    download: "Download",
    noBooks: "No books available yet",
    format: "Format",
    language: "Language"
  },
  ru: {
    digitalLibrary: "Цифровая Библиотека",
    backToPresentation: "Вернуться к презентации",
    searchPlaceholder: "Поиск книг...",
    filter: "Фильтр",
    readOnline: "Читать онлайн",
    download: "Скачать",
    noBooks: "Книги пока недоступны",
    format: "Формат",
    language: "Язык"
  }
};

// Sample books data for demonstration
const sampleBooks = [
  {
    _id: "1",
    title: {
      uz: "Matematika Asoslari",
      en: "Mathematics Fundamentals",
      ru: "Основы математики"
    },
    description: {
      uz: "Oliy matematika asoslarini o'rganish uchun to'liq qo'llanma",
      en: "Complete guide for learning higher mathematics fundamentals",
      ru: "Полное руководство по изучению основ высшей математики"
    },
    format: "PDF" as const,
    language: "UZ",
    category: "Mathematics"
  },
  {
    _id: "2",
    title: {
      uz: "Fizika Qonunlari",
      en: "Physics Laws",
      ru: "Законы физики"
    },
    description: {
      uz: "Fizikaning asosiy qonunlari va formulalari",
      en: "Basic laws and formulas of physics",
      ru: "Основные законы и формулы физики"
    },
    format: "ePub" as const,
    language: "EN",
    category: "Physics"
  },
  {
    _id: "3",
    title: {
      uz: "Kimyo Elementlari",
      en: "Chemistry Elements",
      ru: "Элементы химии"
    },
    description: {
      uz: "Kimyoviy elementlar va ularning xossalari haqida",
      en: "About chemical elements and their properties",
      ru: "О химических элементах и их свойствах"
    },
    format: "PDF" as const,
    language: "RU",
    category: "Chemistry"
  },
  {
    _id: "4",
    title: {
      uz: "Biologiya Asoslari",
      en: "Biology Basics",
      ru: "Основы биологии"
    },
    description: {
      uz: "Tirik organizmlar va ularning hayot faoliyati",
      en: "Living organisms and their life activities",
      ru: "Живые организмы и их жизнедеятельность"
    },
    format: "ePub" as const,
    language: "UZ",
    category: "Biology"
  }
];

export function LibraryPage({ onBackToPresentation }: LibraryPageProps) {
  const [language, setLanguage] = useState<Language>('uz');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'PDF' | 'ePub'>('all');

  const t = translations[language];
  
  // Use sample data for now since we don't have real books in the database
  const books = sampleBooks;

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || book.format === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToPresentation}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">{t.backToPresentation}</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-blue-600">{t.digitalLibrary}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex gap-2 bg-gray-100 rounded-full px-3 py-1">
                {(['uz', 'en', 'ru'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          
          {/* Format Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as 'all' | 'PDF' | 'ePub')}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              <option value="all">{t.format}: All</option>
              <option value="PDF">PDF</option>
              <option value="ePub">ePub</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredBooks.map((book) => (
              <div key={book._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  {/* Book Cover Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <BookOpen size={64} className="text-blue-500" />
                  </div>
                  
                  {/* Book Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                      {book.title[language]}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {book.description[language]}
                    </p>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.format === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {book.format}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {book.language}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors">
                        <BookOpen size={18} />
                        <span className="font-medium">{t.readOnline}</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                        <Download size={18} />
                        <span className="font-medium">{t.download}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">{t.noBooks}</p>
          </div>
        )}
      </div>
    </div>
  );
}
