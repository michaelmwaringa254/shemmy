import React from 'react';
import { ExternalLink, Users, TrendingUp, Globe } from 'lucide-react';

const Ventures = () => {
  const ventures = [
    {
      name: "Acadeemia",
      url: "www.acadeemia.com",
      description: "Educational technology platform connecting students with quality learning resources and expert tutors.",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      features: ["Online Learning", "Expert Tutors", "Interactive Content", "Progress Tracking"]
    },
    {
      name: "WorkCrux",
      url: "www.workcrux.io",
      description: "Professional networking and career development platform for modern professionals.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      features: ["Career Growth", "Professional Network", "Skill Development", "Job Opportunities"]
    },
    {
      name: "WhatsClick",
      url: "www.whatsclick.icu",
      description: "Innovative communication and engagement platform for businesses and communities.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      features: ["Business Communication", "Community Engagement", "Real-time Messaging", "Analytics"]
    },
    {
      name: "TheTechsWay",
      url: "www.thetechsway.com",
      description: "Technology consulting and solutions provider for businesses seeking digital transformation.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      features: ["Tech Consulting", "Digital Solutions", "Business Strategy", "Implementation"]
    }
  ];

  return (
    <section id="ventures" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Ventures</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Successful ventures that demonstrate my ability to build and scale digital products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ventures.map((venture, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow group">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${venture.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    {venture.icon}
                  </div>
                  <a
                    href={`https://${venture.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">{venture.name}</h3>
                <p className="text-orange-600 font-semibold mb-4">{venture.url}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{venture.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {venture.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={`https://${venture.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Next Venture?</h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Let's collaborate to bring your ideas to life. With my experience in building successful ventures, 
              I can help you navigate the digital landscape and achieve your business goals.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Let's Discuss Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventures;