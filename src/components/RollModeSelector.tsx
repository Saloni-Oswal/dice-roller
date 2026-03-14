import type { RollMode } from "../pages/DiceRoller";

interface RollModeSelectorProps {
  rollMode: RollMode;
  onRollModeChange: (mode: RollMode) => void;
}

export function RollModeSelector({
  rollMode,
  onRollModeChange,
}: RollModeSelectorProps) {
  return (
    <fieldset className='border-0 p-0 m-0'>
      <legend className='text-sm font-semibold mb-2 dice-label'>
        Number of dice
      </legend>
      <div className='flex gap-3' role='radiogroup' aria-label='Number of dice'>
        {(["single", "double"] as RollMode[]).map((mode) => (
          <label
            key={mode}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200 border-2 focus-within:ring-2 focus-within:ring-offset-1 ${
              rollMode === mode ? "mode-btn-active" : "mode-btn-inactive"
            }`}
          >
            <input
              type='radio'
              name='rollMode'
              value={mode}
              checked={rollMode === mode}
              onChange={() => onRollModeChange(mode)}
              className='sr-only'
            />
            <span aria-hidden='true'>{mode === "single" ? "🎲" : "🎲🎲"}</span>
            {mode === "single" ? "Single Die" : "Two Dice"}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
