import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Loader from '../components/Loader';
import { submitAssessment, getAllQuestions } from '../services/api';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(20).fill(null));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestions();
        if (response.success && response.data) {
          setQuestions(response.data);
          setAnswers(new Array(response.data.length).fill(null));
          setQuestionsLoaded(true);
        } else {
          setError('Failed to load questions. Please refresh the page.');
        }
      } catch (err) {
        setError('Error loading questions. Please check your connection and try again.');
        console.log('[v0] Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNameChange = e => setName(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);

  const handleStartAssessment = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setShowForm(false);
  };

  const handleAnswer = value => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      setError('Please answer all questions before submitting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await submitAssessment({
        name,
        email,
        answers,
      });

      if (response.success) {
        // Store result ID in session storage for result page
        sessionStorage.setItem('assessmentResult', JSON.stringify(response.data));
        navigate('/result');
      } else {
        setError(response.message || 'Failed to submit assessment');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !questionsLoaded) {
    return <Loader message="Loading assessment questions..." />;
  }

  if (!questionsLoaded || questions.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Unable to load questions. Please try again.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload Page
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return <Loader message="Processing your assessment..." />;
  }

  if (showForm) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="card-elevated gradient-card p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gradient mb-3">
                Career Assessment
              </h1>
              <p className="text-gray-600 text-lg">
                Discover your ideal career path
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>

              <button
                onClick={handleStartAssessment}
                className="btn-primary w-full py-3 text-lg mt-6 shadow-lg hover:shadow-xl"
              >
                Start Assessment →
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Takes approximately 5-10 minutes to complete
            </p>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== null;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAnswered = !answers.includes(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <ProgressBar current={currentQuestion + 1} total={questions.length} />

        <QuestionCard
          question={question}
          currentAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <div className="flex gap-4 justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition transform hover:scale-105 hover:shadow-md"
          >
            ← Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Submit Assessment ✓
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
