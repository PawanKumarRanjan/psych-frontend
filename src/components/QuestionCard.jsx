/**
 * QuestionCard Component
 * Displays a single question with Likert scale options
 */
export default function QuestionCard({ question, currentAnswer, onAnswer, questionNumber, totalQuestions }) {
  const options = [
    { value: 1, label: 'Strongly Disagree', color: 'bg-gradient-to-r from-red-500 to-red-600' },
    { value: 2, label: 'Disagree', color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
    { value: 3, label: 'Neutral', color: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
    { value: 4, label: 'Agree', color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { value: 5, label: 'Strongly Agree', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
  ];

  return (
    <div className="w-full">
      {/* Question Counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-4 py-2 rounded-full">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-600 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Card */}
      <div className="card-elevated gradient-card p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`w-full p-4 rounded-lg font-semibold transition-all transform text-black ${currentAnswer === option.value
                  ? `${option.color} shadow-lg ring-4 ring-offset-2 scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
