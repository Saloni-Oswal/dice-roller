import { useEffect, useState } from "react";

interface DieProps {
  value: number;
  isRolling: boolean;
}

const DOTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [25, 25],
    [75, 75],
  ],
  3: [
    [25, 25],
    [50, 50],
    [75, 75],
  ],
  4: [
    [25, 25],
    [75, 25],
    [25, 75],
    [75, 75],
  ],
  5: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 75],
    [75, 75],
  ],
  6: [
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75],
  ],
};

export function Die({ value, isRolling }: DieProps) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isRolling) {
      setShake(true);
    } else {
      const t = setTimeout(() => setShake(false), 200);
      return () => clearTimeout(t);
    }
  }, [isRolling, value]);

  const dots = DOTS[value] ?? DOTS[1];

  return (
    <div
      role='img'
      aria-label={`Die showing ${value}`}
      className={`die-face relative rounded-2xl shadow-lg transition-transform duration-100 ${
        shake ? "animate-shake" : ""
      }`}
      style={{ width: 120, height: 120 }}
    >
      <svg
        viewBox='0 0 100 100'
        width='120'
        height='120'
        aria-hidden='true'
        className='rounded-2xl'
      >
        <rect
          x='0'
          y='0'
          width='100'
          height='100'
          rx='12'
          ry='12'
          className='die-bg'
        />
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r='8' className='die-dot' />
        ))}
      </svg>
    </div>
  );
}
