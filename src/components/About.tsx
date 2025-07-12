import React from 'react';
import { Award, Target, Users, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation",
      description: "Constantly exploring new technologies and methodologies to deliver cutting-edge solutions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Working closely with clients to understand their needs and exceed expectations."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "Committed to delivering high-quality work that drives real business results."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Efficiency",
      description: "Streamlining processes and leveraging technology to deliver fast, effective solutions."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-xl text-gray-600">
              Passionate entrepreneur and digital solutions expert
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">My Story</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                I'm Shemmy Mae, a passionate entrepreneur and digital solutions expert with a proven track record 
                of building successful ventures and helping businesses thrive in the digital landscape. My journey 
                spans across website development, digital marketing, and business innovation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                With four active ventures under my belt and expertise in multiple domains, I bring a unique 
                perspective to every project. I believe in creating solutions that not only meet technical 
                requirements but also drive real business growth and success.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you need a stunning website, effective digital marketing campaigns, or comprehensive 
                business solutions, I'm here to help transform your ideas into digital success stories.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">SM</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Shemmy Mae</h4>
                <p className="text-orange-600 font-semibold mb-4">Digital Solutions Expert</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📧 info@shemmymae.space</p>
                  <p>📱 +254745259845</p>
                  <p>📱 +254111313818</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;