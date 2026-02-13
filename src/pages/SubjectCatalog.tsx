import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { levels } from '@/data/seed-data';
import { ArrowLeft, Globe, Shield, ShoppingCart, Palette } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Globe, Shield, ShoppingCart, Palette,
};

const SubjectCatalog = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const level = levels.find(l => l.id === levelId);
  if (!level) return <div className="container py-8">Level not found</div>;

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/levels')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t('back')}
      </Button>

      <h1 className="text-3xl font-bold mb-2">
        {language === 'ar' ? level.nameAr : level.name}
      </h1>
      <p className="text-muted-foreground mb-8">{t('subjects.title')}</p>

      {level.subjects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center text-muted-foreground">
            No subjects available yet for this level.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {level.subjects.map(subject => {
            const Icon = iconMap[subject.icon] || Globe;
            return (
              <Card
                key={subject.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] group overflow-hidden"
                onClick={() => navigate(`/level/${levelId}/subject/${subject.id}`)}
              >
                <div className={`h-2 bg-${subject.color}`} />
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${subject.color}/10 flex items-center justify-center shrink-0`}>
                    <Icon className={`h-6 w-6 text-${subject.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {language === 'ar' ? subject.nameAr : subject.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {subject.lectures.length} {t('subjects.lectures')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubjectCatalog;
