import { useNavigate } from 'react-router-dom';

const levels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];

export default function LevelTabs({ activeLevel, onLevelChange }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-primary">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-1">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              activeLevel === level
                ? 'bg-white text-primary shadow-md'
                : 'bg-transparent text-white/80 hover:text-white border border-white/30'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Order Records History Button */}
      <button
        onClick={() => navigate('/history')}
        title="Transaction & Order History"
        className="flex-shrink-0 w-9 h-9 rounded-lg border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </button>
    </div>
  );
}
