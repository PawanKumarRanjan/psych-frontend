/**
 * ProgressBar Component
 * Displays assessment progress as a visual bar
 */
export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-md">
        <div
          className="bg-gradient-to-r from-indigo-600 to-pink-600 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm font-semibold text-gray-700">
          {current} of {total} questions
        </span>
        <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
