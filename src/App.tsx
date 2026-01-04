import { useState } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { PresentationWebsite } from "./components/PresentationWebsite";
import { LibraryPage } from "./components/LibraryPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'presentation' | 'library'>('presentation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Authenticated>
        {currentPage === 'presentation' ? (
          <PresentationWebsite onEnterLibrary={() => setCurrentPage('library')} />
        ) : (
          <LibraryPage onBackToPresentation={() => setCurrentPage('presentation')} />
        )}
      </Authenticated>
      
      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-600 mb-4">Digital Library</h1>
              <p className="text-gray-600">Sign in to access the electronic textbook platform</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
      
      <Toaster />
    </div>
  );
}
