import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { levels } from '@/data/seed-data';
import { ArrowLeft, FileText } from 'lucide-react';

const SubjectDashboard = () => {
  const { levelId, subjectId } = useParams<{ levelId: string; subjectId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const level = levels.find(l => l.id === levelId);
  const subject = level?.subjects.find(s => s.id === subjectId);
  if (!subject) return <div className="container py-8">Subject not found</div>;

  // Local progress tracking (will be replaced with Supabase later)
  const opened = JSON.parse(localStorage.getItem('opened_lectures') || '[]') as string[];
  const progress = subject.lectures.length > 0
    ? Math.round((opened.filter(id => subject.lectures.some(l => l.id === id)).length / subject.lectures.length) * 100)
    : 0;

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/level/${levelId}`)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t('back')}
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {language === 'ar' ? subject.nameAr : subject.name}
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm text-muted-foreground">{t('dashboard.progress')}</span>
          <Progress value={progress} className="flex-1 max-w-xs" />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">{t('dashboard.lectures')}</h2>

      {subject.lectures.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center text-muted-foreground">
            No lectures available yet.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {subject.lectures.map(lecture => (
            <Card
              key={lecture.id}
              className="cursor-pointer hover:shadow-md transition-all group"
              onClick={() => {
                const current = JSON.parse(localStorage.getItem('opened_lectures') || '[]');
                if (!current.includes(lecture.id)) {
                  localStorage.setItem('opened_lectures', JSON.stringify([...current, lecture.id]));
                }
                localStorage.setItem('last_read', JSON.stringify({
                  lectureId: lecture.id,
                  subjectId: subject.id,
                  levelId: levelId,
                }));
                navigate(`/level/${levelId}/subject/${subjectId}/lecture/${lecture.id}`);
              }}
            >
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg bg-${subject.color}/10 flex items-center justify-center`}>
                  <FileText className={`h-5 w-5 text-${subject.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">
                    {language === 'ar' ? lecture.titleAr : lecture.title}
                  </h3>
                </div>
                {opened.includes(lecture.id) && (
                  <span className="text-xs bg-subject-ecommerce/10 text-subject-ecommerce px-2 py-1 rounded-full">✓</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectDashboard;
