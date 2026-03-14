import { useState, useRef, useCallback, useEffect } from "react";
import { Die } from "../components/Die";
import { ThemeSelector } from "../components/ThemeSelector";
import { RollModeSelector } from "../components/RollModeSelector";
import { RollHistory } from "../components/RollHistory";
import { Button } from "../components/ui/button";

export type Theme = "light" | "dark" | "tavern";
export type RollMode = "single" | "double";
export interface RollRecord {
  id: number;
  dice: number[];
  total: number;
  timestamp: Date;
}

function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export default function DiceRoller() {
  const [theme, setTheme] = useState<Theme>("light");
  const [rollMode, setRollMode] = useState<RollMode>("single");
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDiceValues(Array.from({ length: rollMode === "single" ? 1 : 2 }));
  }, [rollMode]);

  const announce = useCallback((message: string) => {
    if (announcerRef.current) {
      announcerRef.current.textContent = "";
      requestAnimationFrame(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      });
    }
  }, []);

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    const count = rollMode === "single" ? 1 : 2;
    announce("Rolling...");
    let ticks = 0;
    const maxTicks = 12;
    const interval = setInterval(() => {
      setDiceValues(Array.from({ length: count }, rollDie));
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        const finalValues = Array.from({ length: count }, rollDie);
        setDiceValues(finalValues);
        const total = finalValues.reduce((a, b) => a + b, 0);
        const resultMsg =
          count === 1
            ? `Rolled value is ${finalValues[0]}`
            : `Rolled values are ${finalValues[0]} and ${finalValues[1]}, total is ${total}`;
        announce(resultMsg);
        setHistory((prev) => [
          { id: idCounter, dice: finalValues, total, timestamp: new Date() },
          ...prev.slice(0, 19),
        ]);
        setIdCounter((c) => c + 1);
        setIsRolling(false);
      }
    }, 80);
  }, [isRolling, rollMode, announce, idCounter]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    announce("Roll history cleared");
  }, [announce]);

  const themeClass =
    theme === "dark"
      ? "dark-theme"
      : theme === "tavern"
      ? "tavern-theme"
      : "light-theme";

  return (
    <div className='bg-gray-200 flex items-center min-h-screen transition-colors duration-300'>
      {/* Hidden live region — announces to screen readers */}
      <div
        ref={announcerRef}
        role='status'
        aria-live='assertive'
        aria-atomic='true'
        className='sr-only'
      />
      <div
        className={`${themeClass} dice-app rounded-xl max-w-lg mx-auto px-4 py-8 flex flex-col gap-6 w-full`}
      >
        <header className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight dice-title'>
            🎲 Dice Roller
          </h1>
          <ThemeSelector theme={theme} onThemeChange={setTheme} />
        </header>
        <RollModeSelector rollMode={rollMode} onRollModeChange={setRollMode} />
        <section
          aria-label='Dice display'
          className='flex justify-center items-center gap-6 py-6'
        >
          {diceValues.slice(0, rollMode === "single" ? 1 : 2).map((val, i) => (
            <Die key={i} value={val} isRolling={isRolling} />
          ))}
        </section>
        <Button
          onClick={handleRoll}
          disabled={isRolling}
          aria-label={isRolling ? "Rolling dice..." : "Roll dice"}
          className='roll-button w-full py-4 text-lg font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer'
          size='lg'
        >
          {isRolling ? "Rolling..." : "Roll!"}
        </Button>
        <RollHistory history={history} onClearHistory={handleClearHistory} />
      </div>
    </div>
  );
}
