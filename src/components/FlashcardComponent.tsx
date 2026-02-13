import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Flashcard } from '@/data/seed-data';

interface Props {
  flashcards: Flashcard[];
}

const FlashcardComponent = ({ flashcards }: Props) => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = flashcards[currentIndex];
  if (!card) return null;

  const goNext = () => {
    setFlipped(false);
    setCurrentIndex(prev => Math.min(prev + 1, flashcards.length - 1));
  };
  const goPrev = () => {
    setFlipped(false);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-muted-foreground">
        {currentIndex + 1} {t('lecture.of')} {flashcards.length}
      </p>

      <div
        className="flip-card w-full max-w-lg h-64 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flip-card-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front absolute inset-0 rounded-xl border-2 border-primary/20 bg-card p-8 flex flex-col items-center justify-center shadow-lg">
            <span className="text-xs font-medium text-primary mb-2">{t('lecture.question')}</span>
            <p className="text-lg font-semibold text-center">
              {language === 'ar' ? card.questionAr : card.question}
            </p>
            <span className="text-xs text-muted-foreground mt-4">{t('lecture.clickToFlip')}</span>
          </div>
          <div className="flip-card-back absolute inset-0 rounded-xl border-2 border-primary/20 bg-primary/5 p-8 flex flex-col items-center justify-center shadow-lg">
            <span className="text-xs font-medium text-primary mb-2">{t('lecture.answer')}</span>
            <p className="text-lg text-center">
              {language === 'ar' ? card.answerAr : card.answer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={goPrev} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={goNext} disabled={currentIndex === flashcards.length - 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlashcardComponent;
