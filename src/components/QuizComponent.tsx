import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { QuizQuestion } from '@/data/seed-data';
import { cn } from '@/lib/utils';

interface Props {
  questions: QuizQuestion[];
}

const QuizComponent = ({ questions }: Props) => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentIndex];

  const handleCheck = () => {
    if (selectedOption === null) return;
    setChecked(true);
    if (selectedOption === q.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setChecked(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <CheckCircle className="h-16 w-16 text-subject-ecommerce" />
        <h3 className="text-2xl font-bold">{t('quiz.complete')}</h3>
        <p className="text-lg text-muted-foreground">
          {t('quiz.score')}: {score} / {questions.length}
        </p>
        <Button onClick={restart} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          {t('quiz.restart')}
        </Button>
      </div>
    );
  }

  const options = language === 'ar' ? q.optionsAr : q.options;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('lecture.question')} {currentIndex + 1} {t('lecture.of')} {questions.length}
        </p>
        <p className="text-sm font-medium">
          {t('quiz.score')}: {score}
        </p>
      </div>

      <h3 className="text-lg font-semibold">
        {language === 'ar' ? q.questionAr : q.question}
      </h3>

      <div className="flex flex-col gap-3">
        {options.map((option, idx) => (
          <Card
            key={idx}
            className={cn(
              'cursor-pointer transition-all hover:shadow-md',
              selectedOption === idx && !checked && 'ring-2 ring-primary',
              checked && idx === q.correctIndex && 'ring-2 ring-subject-ecommerce bg-subject-ecommerce/10',
              checked && selectedOption === idx && idx !== q.correctIndex && 'ring-2 ring-destructive bg-destructive/10'
            )}
            onClick={() => !checked && setSelectedOption(idx)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
              {checked && idx === q.correctIndex && <CheckCircle className="h-5 w-5 text-subject-ecommerce" />}
              {checked && selectedOption === idx && idx !== q.correctIndex && <XCircle className="h-5 w-5 text-destructive" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {checked && (
        <p className={cn(
          'text-sm font-medium',
          selectedOption === q.correctIndex ? 'text-subject-ecommerce' : 'text-destructive'
        )}>
          {selectedOption === q.correctIndex ? t('quiz.correct') : t('quiz.incorrect')}
        </p>
      )}

      <div className="flex gap-3">
        {!checked ? (
          <Button onClick={handleCheck} disabled={selectedOption === null}>
            {t('quiz.check')}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentIndex < questions.length - 1 ? t('quiz.next') : t('quiz.complete')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
