import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ColorCardProps {
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const ColorCard = ({ color, isFlipped, isMatched, onClick }: ColorCardProps) => {
  if (isMatched) {
    return <div className="aspect-square" />;
  }

  return (
    <Card
      onClick={!isFlipped ? onClick : undefined}
      className={cn(
        "relative aspect-square cursor-pointer transition-all duration-500 transform hover:scale-105",
        "flex items-center justify-center text-6xl font-bold"
      )}
      style={{
        backgroundColor: isFlipped ? color : "#ffffff",
        transformStyle: "preserve-3d",
        border: "4px solid #e5e7eb",
        boxShadow: isFlipped ? "0 10px 25px rgba(0,0,0,0.15)" : "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      {!isFlipped && (
        <div className="absolute inset-0 flex items-center justify-center text-7xl">
          ❓
        </div>
      )}
      {isFlipped && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-8xl drop-shadow-lg">
          ●
        </div>
      )}
    </Card>
  );
};