import { useState, useEffect } from "react";
import { ColorCard } from "@/components/ColorCard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Card {
  id: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const COLORS = [
  "#F97316",
  "#0EA5E9", 
  "#D946EF",
  "#8B5CF6",
  "#10B981",
  "#F59E0B"
];

const Index = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = () => {
    const colorPairs = [...COLORS, ...COLORS];
    const shuffled = colorPairs
      .map((color, index) => ({
        id: index,
        color,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.color === secondCard.color) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          
          const allMatched = cards.every(
            (card, idx) =>
              card.isMatched || idx === first || idx === second
          );
          
          if (allMatched) {
            setTimeout(() => {
              setIsWon(true);
              toast.success("🎉 Поздравляю! Ты нашёл все пары!", {
                duration: 5000,
              });
            }, 500);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isMatched) return;

    setCards(prev =>
      prev.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards(prev => {
      const newFlipped = [...prev, index];
      if (newFlipped.length === 2) {
        setMoves(m => m + 1);
      }
      return newFlipped;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4">
            Цветная Память 🎨
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-semibold">
            Найди все одинаковые цвета!
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              Ходов: <span className="text-accent">{moves}</span>
            </div>
            <Button
              onClick={initializeGame}
              size="lg"
              className="text-lg md:text-xl font-bold rounded-2xl px-6 py-6 hover:scale-110 transition-transform"
            >
              <Icon name="RefreshCw" size={28} className="mr-2" />
              Новая игра
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {cards.map((card, index) => (
              <ColorCard
                key={card.id}
                color={card.color}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>

        {isWon && (
          <div className="text-center animate-scale-in">
            <div className="bg-gradient-to-r from-primary to-accent text-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
                🎉 Победа! 🎉
              </h2>
              <p className="text-xl md:text-2xl font-semibold mb-6">
                Ты справился за {moves} {moves === 1 ? "ход" : moves < 5 ? "хода" : "ходов"}!
              </p>
              <Button
                onClick={initializeGame}
                size="lg"
                variant="secondary"
                className="text-xl font-bold rounded-2xl px-8 py-6 hover:scale-110 transition-transform"
              >
                Играть ещё раз
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
