import type { RollRecord } from "../pages/DiceRoller";

interface RollHistoryProps {
  history: RollRecord[];
  onClearHistory: () => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function RollHistory({ history, onClearHistory }: RollHistoryProps) {
  return (
    <section aria-label='Roll history' className='mt-2'>
      <div className='flex items-center justify-between mb-2'>
        <h2 className='text-sm font-semibold dice-label'>
          Roll History{" "}
          {history.length > 0 && (
            <span className='dice-muted font-normal'>({history.length})</span>
          )}
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            aria-label='Clear roll history'
            className='text-xs px-2 py-1 rounded-lg transition-all duration-200 clear-btn cursor-pointer'
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className='text-center text-sm dice-muted py-4'>
          No rolls yet. Hit Roll!
        </p>
      ) : (
        <ol
          aria-label='Recent rolls'
          className='flex flex-col gap-1 max-h-52 overflow-y-auto rounded-xl history-list p-2'
        >
          {history.map((record, idx) => (
            <li
              key={record.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                idx === 0 ? "history-item-latest" : "history-item"
              }`}
              aria-label={
                record.dice.length === 1
                  ? `Roll ${history.length - idx}: ${record.dice[0]}`
                  : `Roll ${history.length - idx}: ${record.dice.join(
                      " and "
                    )}, total ${record.total}`
              }
            >
              <span className='dice-muted text-xs tabular-nums'>
                #{history.length - idx}
              </span>
              <span className='font-mono font-semibold tracking-wide'>
                {record.dice.length === 1 ? (
                  <span>{record.dice[0]}</span>
                ) : (
                  <span>
                    {record.dice[0]} + {record.dice[1]} ={" "}
                    <span className='history-total'>{record.total}</span>
                  </span>
                )}
              </span>
              <span className='dice-muted text-xs tabular-nums'>
                {formatTime(record.timestamp)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
