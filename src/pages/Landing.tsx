import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Brain, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    { icon: BookOpen, title: 'Summary Notes', titleAr: 'ملخص الملاحظات', desc: 'Clean, organized lecture notes', descAr: 'ملاحظات محاضرات منظمة ونظيفة' },
    { icon: Brain, title: 'Flashcards & Quizzes', titleAr: 'بطاقات واختبارات', desc: 'Interactive study tools', descAr: 'أدوات دراسة تفاعلية' },
    { icon: Languages, title: 'Bilingual Support', titleAr: 'دعم ثنائي اللغة', desc: 'English & Arabic content', descAr: 'محتوى بالإنجليزية والعربية' },
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/levels');
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t('landing.hero')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            {t('landing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate('/levels')} className="text-base px-8">
              {t('landing.getStarted')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/levels')} className="text-base px-8">
              {t('nav.guest')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-secondary/30 px-4 py-16">
        <div className="container grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <Card key={i} className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
