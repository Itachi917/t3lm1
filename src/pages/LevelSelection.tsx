import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { levels } from '@/data/seed-data';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LevelSelection = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t('back')}
      </Button>

      <h1 className="text-3xl font-bold mb-8">{t('levels.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {levels.map(level => (
          <Card
            key={level.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] group"
            onClick={() => navigate(`/level/${level.id}`)}
          >
            <CardContent className="p-8 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold">{language === 'ar' ? level.nameAr : level.name}</h2>
              <p className="text-sm text-muted-foreground">
                {level.subjects.length} {t('subjects.title').toLowerCase()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
