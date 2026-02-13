import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { levels } from '@/data/seed-data';
import { ArrowLeft } from 'lucide-react';
import FlashcardComponent from '@/components/FlashcardComponent';
import QuizComponent from '@/components/QuizComponent';

const LectureRoom = () => {
  const { levelId, subjectId, lectureId } = useParams<{ levelId: string; subjectId: string; lectureId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const level = levels.find(l => l.id === levelId);
  const subject = level?.subjects.find(s => s.id === subjectId);
  const lecture = subject?.lectures.find(l => l.id === lectureId);

  if (!lecture) return <div className="container py-8">Lecture not found</div>;

  const summary = language === 'ar' ? lecture.summaryAr : lecture.summary;

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/level/${levelId}/subject/${subjectId}`)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t('back')}
      </Button>

      <h1 className="text-2xl font-bold mb-6">
        {language === 'ar' ? lecture.titleAr : lecture.title}
      </h1>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="summary">{t('lecture.summary')}</TabsTrigger>
          <TabsTrigger value="flashcards">{t('lecture.flashcards')}</TabsTrigger>
          <TabsTrigger value="quiz">{t('lecture.quiz')}</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="prose prose-sm dark:prose-invert max-w-none bg-card rounded-xl p-6 border">
            {summary.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.replace('### ', '')}</h3>;
              if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                if (match) return <p key={i} className="mb-1 ml-4">• <strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}</p>;
              }
              if (line.startsWith('- ')) return <p key={i} className="mb-1 ml-4">• {line.replace('- ', '')}</p>;
              if (line.match(/^\d+\./)) return <p key={i} className="mb-1 ml-4">{line}</p>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="mb-2">{line}</p>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="flashcards">
          <FlashcardComponent flashcards={lecture.flashcards} />
        </TabsContent>

        <TabsContent value="quiz">
          <QuizComponent questions={lecture.quiz} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LectureRoom;
