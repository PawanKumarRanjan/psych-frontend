/**
 * ResultCard Component
 * Displays category scores with visual representation
 */
export default function ResultCard({ categoryScores, dominantCategory }) {
  const categories = [
    { key: 'analytical', label: 'Analytical', gradient: 'from-blue-500 to-indigo-600', icon: '🔬', color: 'bg-blue-500' },
    { key: 'creative', label: 'Creative', gradient: 'from-pink-500 to-rose-600', icon: '🎨', color: 'bg-pink-500' },
    { key: 'social', label: 'Social', gradient: 'from-green-500 to-emerald-600', icon: '👥', color: 'bg-green-500' },
    { key: 'leadership', label: 'Leadership', gradient: 'from-purple-500 to-indigo-600', icon: '👑', color: 'bg-purple-500' },
  ];

  const maxScore = 25; // 5 questions × 5 max score

  return (
    <div className="space-y-5">
      {categories.map(category => {
        const score = categoryScores[category.key];
        const percentage = (score / maxScore) * 100;
        const isDominant = category.key === dominantCategory;

        return (
          <div
            key={category.key}
            className={`rounded-xl p-6 transition-all transform card-elevated ${
              isDominant
                ? `bg-gradient-to-r ${category.gradient} text-white shadow-xl scale-105`
                : 'gradient-card text-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`${isDominant ? 'text-4xl' : 'text-3xl'}`}>{category.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{category.label}</h3>
                  {isDominant && <span className="text-sm font-semibold opacity-90">⭐ Dominant</span>}
                </div>
              </div>
              <span className="text-3xl font-bold">{score.toFixed(1)}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-sm">
              <div
                className={`bg-gradient-to-r ${category.gradient} h-full rounded-full transition-all duration-700`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm font-semibold opacity-75">
                {percentage.toFixed(0)}% Complete
              </span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${isDominant ? 'bg-white bg-opacity-20' : 'bg-gray-100'}`}>
                {Math.round(score)} / 25
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
