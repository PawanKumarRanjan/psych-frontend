/**
 * Loader Component
 * Displays loading spinner with message
 */
export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 border-r-pink-600 rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-gray-700 text-xl font-semibold">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
}
