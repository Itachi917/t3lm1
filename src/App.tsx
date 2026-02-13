import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Landing from "./pages/Landing";
import LevelSelection from "./pages/LevelSelection";
import SubjectCatalog from "./pages/SubjectCatalog";
import SubjectDashboard from "./pages/SubjectDashboard";
import LectureRoom from "./pages/LectureRoom";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { AuthProvider } from "@/contexts/AuthContext";
import Auth from "@/pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/levels" element={<LevelSelection />} />
              <Route path="/level/:levelId" element={<SubjectCatalog />} />
              <Route path="/level/:levelId/subject/:subjectId" element={<SubjectDashboard />} />
              <Route path="/level/:levelId/subject/:subjectId/lecture/:lectureId" element={<LectureRoom />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
