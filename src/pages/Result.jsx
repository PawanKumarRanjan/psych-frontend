import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';
import { getAllCareerDomains } from '../services/api';

export default function Result() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [careerDomains, setCareerDomains] = useState([]);

  useEffect(() => {
    // Retrieve result from session storage
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // If no result found, redirect to assessment
      window.location.href = '/assessment';
      return;
    }

    // Fetch career domains
    const fetchCareerDomains = async () => {
      try {
        const response = await getAllCareerDomains();
        if (response.success && response.data) {
          setCareerDomains(response.data);
        }
      } catch (err) {
        console.log('[v0] Error fetching career domains:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerDomains();
  }, []);

  if (loading) {
    return <Loader message="Loading your results..." />;
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">📋</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">No Results Found</h1>
          <p className="text-gray-600 mb-8 text-lg">Please complete the assessment first.</p>
          <Link
            to="/assessment"
            className="inline-block btn-primary shadow-lg hover:shadow-xl"
          >
            Start Assessment
          </Link>
        </div>
      </main>
    );
  }

  // Prepare chart data
  const chartData = [
    {
      name: 'Analytical',
      value: result.categoryScores.analytical,
      fill: '#3b82f6',
    },
    {
      name: 'Creative',
      value: result.categoryScores.creative,
      fill: '#a855f7',
    },
    {
      name: 'Social',
      value: result.categoryScores.social,
      fill: '#10b981',
    },
    {
      name: 'Leadership',
      value: result.categoryScores.leadership,
      fill: '#f97316',
    },
  ];

  const categoryDescriptions = {
    analytical: 'You excel at problem-solving and analytical thinking. Consider careers that involve research, data analysis, and technical expertise.',
    creative: 'You have strong creative abilities and innovative thinking. Explore careers in design, arts, and creative industries.',
    social: 'You have excellent interpersonal skills. Consider careers focused on helping others and team collaboration.',
    leadership: 'You are a natural leader with vision and decisiveness. Explore management and entrepreneurial roles.',
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Your Assessment Results
          </h1>
          <p className="text-2xl text-gray-700 font-medium">
            Hi, <span className="font-bold text-indigo-600">{result.name}</span> 👋
          </p>
        </div>

        {/* Dominant Category */}
        <div className="card-elevated gradient-card p-10 mb-8 border-l-4 border-indigo-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Dominant Category</h2>
          <div className="text-center py-8">
            <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl mb-6">
              <div className="text-7xl">
                {result.dominantCategory === 'analytical' && '🔬'}
                {result.dominantCategory === 'creative' && '🎨'}
                {result.dominantCategory === 'social' && '👥'}
                {result.dominantCategory === 'leadership' && '👑'}
              </div>
            </div>
            <h3 className="text-5xl font-bold text-gradient mb-6 capitalize">
              {result.dominantCategory}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto font-medium">
              {categoryDescriptions[result.dominantCategory]}
            </p>
          </div>
        </div>

        {/* Category Scores */}
        <div className="card-elevated gradient-card p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Category Scores</h2>
          <ResultCard
            categoryScores={result.categoryScores}
            dominantCategory={result.dominantCategory}
          />
        </div>

        {/* Chart */}
        <div className="card-elevated gradient-card p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Score Visualization</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis domain={[0, 25]} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#f3f4f6', border: '2px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value) => `${value.toFixed(1)}`}
              />
              <Bar dataKey="value" name="Score" radius={[12, 12, 0, 0]} animationDuration={1000}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommended Careers */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended Career Paths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {result.recommendedCareers.map((career, index) => (
              <div
                key={index}
                className="card-elevated group cursor-pointer transform hover:scale-105"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-8 text-center text-white rounded-t-lg">
                  <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                  </div>
                </div>
                <div className="gradient-card p-6 text-center rounded-b-lg">
                  <h3 className="text-xl font-bold text-gray-900">{career}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="gradient-primary rounded-2xl shadow-2xl p-12 text-center card-elevated">
          <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
          <p className="text-white text-opacity-90 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
            Your assessment results have been saved. Use these insights to explore careers that 
            align with your strengths and interests. Feel free to retake the assessment anytime 
            to track your progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="bg-white text-indigo-600 font-bold py-3 px-10 rounded-lg hover:bg-gray-50 transition transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Retake Assessment
            </Link>
            <Link
              to="/"
              className="bg-indigo-700 text-white font-bold py-3 px-10 rounded-lg hover:bg-indigo-800 transition transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600 text-sm border-t border-gray-200 pt-8">
          <p className="mb-2 font-medium">Assessment submitted on {new Date(result.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-500">Email: <span className="font-medium text-gray-600">{result.email}</span></p>
        </div>
      </div>
    </main>
  );
}
