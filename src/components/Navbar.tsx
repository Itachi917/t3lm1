import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Globe, Search, ShieldCheck, GraduationCap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { getAllLectures } from '@/data/seed-data';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth(); // Removed isAdmin from here as we don't need it to hide the button anymore
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const isLandingPage = location.pathname === '/';

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return;
    const lectures = getAllLectures();
    const match = lectures.find(l =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      (l as any).summary?.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      navigate(`/level/level-2/subject/${match.subjectId}/lecture/${match.id}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <GraduationCap className="h-6 w-6" />
          <span>{t('app.title')}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          {!isLandingPage && (
             <div className="relative w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder={t('nav.search')}
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && handleSearch(searchQuery)}
               className="pl-9"
             />
           </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1">
          
          {/* Admin Button - ALWAYS VISIBLE NOW */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/admin")}
            className="gap-2 text-destructive border-destructive hover:bg-destructive/10 mr-2"
          >
            <ShieldCheck className="h-4 w-4" />
            {t('nav.admin')}
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link to="/levels">{t('nav.levels')}</Link>
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === 'en' ? 'عربي' : 'EN'}
          </Button>

          {/* Auth Buttons */}
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="ml-2">
              {t("nav.signOut")}
            </Button>
          ) : (
            !isLandingPage && (
              <Button variant="default" size="sm" onClick={() => navigate("/auth")} className="ml-2">
                {t("nav.signIn")}
              </Button>
            )
          )}
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                
                {/* Mobile Admin Button - ALWAYS VISIBLE */}
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/admin")}
                  className="justify-start gap-2 text-destructive border-destructive"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {t('nav.admin')}
                </Button>

                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/levels">{t('nav.levels')}</Link>
                </Button>
                
                <Button variant="ghost" className="justify-start" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? t('theme.dark') : t('theme.light')}
                </Button>
                
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'عربي' : 'English'}
                </Button>

                {user ? (
                  <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                    {t("nav.signOut")}
                  </Button>
                ) : (
                  <Button variant="default" className="justify-start" onClick={() => navigate("/auth")}>
                    {t("nav.signIn")}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {searchOpen && (
        <div className="md:hidden border-t px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('nav.search')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(searchQuery)}
              className="pl-9"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
