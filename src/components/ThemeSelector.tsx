import type { Theme } from "../pages/DiceRoller";

interface ThemeSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const THEMES = [
  { value: "light" as Theme, label: "Light", icon: "☀️" },
  { value: "dark" as Theme, label: "Dark", icon: "🌙" },
  { value: "tavern" as Theme, label: "Tavern", icon: "🍺" },
];

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div
      role='group'
      aria-label='Choose theme'
      className='flex gap-1 rounded-xl p-1 theme-selector'
    >
      {THEMES.map((t) => (
        <button
          key={t.value}
          onClick={() => onThemeChange(t.value)}
          aria-pressed={theme === t.value}
          aria-label={`${t.label} theme`}
          title={`${t.label} theme`}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none cursor-pointer ${
            theme === t.value ? "theme-btn-active" : "theme-btn-inactive"
          }`}
        >
          <span aria-hidden='true'>{t.icon}</span>
          <span className='hidden sm:inline'>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
