import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCareerDomains } from '../services/api';
import Loader from '../components/Loader';

export default function Home() {
  const [careerDomains, setCareerDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCareerDomains = async () => {
      try {
        setLoading(true);
        const response = await getAllCareerDomains();
        if (response.success && response.data) {
          setCareerDomains(response.data);
        } else {
          setError('Failed to load career domains');
        }
      } catch (err) {
        console.log('[v0] Error fetching career domains:', err);
        setError('Error loading career domains');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerDomains();
  }, []);

  if (loading) {
    return <Loader message="Loading career information..." />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-block p-4 mb-6 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-full">
            <div className="text-6xl">🎯</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-6 text-balance">
            Discover Your Ideal Career Path
          </h1>
          <p className="text-xl text-gray-700 mb-10 text-pretty max-w-3xl mx-auto leading-relaxed font-medium">
            Take our scientifically designed psychometric assessment to understand your strengths, 
            interests, and personality traits. Get personalized career recommendations based on 
            your unique profile.
          </p>
          <Link
            to="/assessment"
            className="inline-block bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold py-4 px-10 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg shadow-lg"
          >
            Start Assessment Now →
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="card-elevated gradient-card p-8 border-l-4 border-indigo-600 group hover:border-pink-600">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Quick Assessment</h3>
            <p className="text-gray-700 leading-relaxed">
              Complete our 20-question assessment in just 10 minutes. Each question is carefully 
              designed to evaluate your personality, strengths, and career interests.
            </p>
          </div>

          <div className="card-elevated gradient-card p-8 border-l-4 border-purple-600 group hover:border-indigo-600">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Detailed Analysis</h3>
            <p className="text-gray-700 leading-relaxed">
              Receive a comprehensive breakdown of your scores across four career domains: 
              Analytical, Creative, Social, and Leadership.
            </p>
          </div>

          <div className="card-elevated gradient-card p-8 border-l-4 border-green-600 group hover:border-purple-600">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Recommendations</h3>
            <p className="text-gray-700 leading-relaxed">
              Get three personalized career path recommendations tailored to your dominant 
              personality category and strengths.
            </p>
          </div>

          <div className="card-elevated gradient-card p-8 border-l-4 border-pink-600 group hover:border-green-600">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">💾</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Save Your Results</h3>
            <p className="text-gray-700 leading-relaxed">
              Your assessment results are securely stored and easily retrievable. Track your 
              progress and revisit your recommendations anytime.
            </p>
          </div>
        </section>

        {/* Career Domains Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Career Domains</h2>
          {error ? (
            <div className="text-center text-red-600 py-8">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {careerDomains.length > 0 ? (
                careerDomains.map(domain => (
                  <div key={domain._id} className="card-elevated group cursor-pointer">
                    <div className={`bg-gradient-to-br ${domain.color} p-6 rounded-t-lg text-center transform group-hover:scale-105 transition-transform`}>
                      <div className="text-5xl mb-2">{domain.icon}</div>
                    </div>
                    <div className="gradient-card p-6 text-center rounded-b-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{domain.displayName}</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        {domain.careers.map(career => (
                          <li key={career} className="font-medium">• {career}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-4">No career domains available</p>
              )}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="gradient-primary rounded-2xl shadow-2xl p-16 text-center card-elevated">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Path?</h2>
          <p className="text-white text-opacity-90 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
            Start the assessment now and get instant insights into your career potential. 
            Discover roles that match your unique strengths and personality.
          </p>
          <Link
            to="/assessment"
            className="inline-block bg-white text-indigo-600 font-bold py-4 px-12 rounded-lg hover:bg-gray-50 shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all text-lg"
          >
            Start Assessment →
          </Link>
        </section>
      </div>
    </main>
  );
}
