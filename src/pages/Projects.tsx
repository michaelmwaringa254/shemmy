import React from 'react';
import { ExternalLink, Calendar, Code, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    navigate('/contact');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const completedProjects = [
    {
      name: "Acadeemia",
      url: "https://acadeemia.com",
      description: "A comprehensive school management system that streamlines educational operations, student management, and administrative processes for educational institutions.",
      screenshot: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["School Management", "Student Portal", "Administrative Tools", "Academic Tracking"],
      category: "Education Technology",
      year: "2024"
    },
    {
      name: "THE BLEC",
      url: "https://theblec.com/",
      description: "Business and leadership excellence consultancy platform providing strategic consulting services, leadership development, and business transformation solutions.",
      screenshot: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Business Consulting", "Leadership Development", "Strategic Planning", "Corporate Training"],
      category: "Business Consulting",
      year: "2024"
    },
    {
      name: "PrimeLandMetrix",
      url: "https://primelandmetrix.com/",
      description: "Advanced land measurement and property analytics platform providing precise land surveying, property valuation, and real estate metrics for professionals.",
      screenshot: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Land Surveying", "Property Analytics", "GIS Mapping", "Real Estate Tools"],
      category: "Real Estate Technology",
      year: "2024"
    },
    {
      name: "AdoNasi",
      url: "https://odanasi.com/",
      description: "Digital marketing and advertising solutions platform offering comprehensive marketing automation, campaign management, and performance analytics.",
      screenshot: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Digital Marketing", "Campaign Management", "Analytics", "Automation"],
      category: "Marketing Technology",
      year: "2024"
    },
    {
      name: "WhatsClick",
      url: "https://whatsclick.icu/",
      description: "Innovative communication and engagement platform designed for businesses to enhance customer interaction and streamline communication workflows.",
      screenshot: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Business Communication", "Customer Engagement", "Workflow Automation", "Real-time Messaging"],
      category: "Communication Platform",
      year: "2024"
    },
    {
      name: "CRMSyncer",
      url: "https://crmsyncer.com/",
      description: "Advanced CRM synchronization and integration platform that connects multiple CRM systems, ensuring seamless data flow and unified customer management.",
      screenshot: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["CRM Integration", "Data Synchronization", "API Management", "Customer Analytics"],
      category: "Business Software",
      year: "2024"
    },
    {
      name: "WorkCrux",
      url: "https://workcrux.io/",
      description: "Professional networking and career development platform connecting professionals with opportunities, skill development resources, and industry insights.",
      screenshot: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Professional Networking", "Career Development", "Job Matching", "Skill Assessment"],
      category: "Professional Development",
      year: "2024"
    },
    {
      name: "TechStackMatch",
      url: "https://techstackmatch.com/",
      description: "Technology stack recommendation and matching platform helping businesses choose the right technology solutions for their specific needs and requirements.",
      screenshot: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Technology Consulting", "Stack Recommendations", "Tech Matching", "Solution Architecture"],
      category: "Technology Consulting",
      year: "2024"
    },
    {
      name: "TECHPILOTAGENCY",
      url: "https://techpilotagency.com/",
      description: "Full-service technology agency providing end-to-end digital solutions, from concept to deployment, specializing in custom software development and digital transformation.",
      screenshot: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Custom Development", "Digital Transformation", "Software Solutions", "Tech Consulting"],
      category: "Technology Agency",
      year: "2024"
    },
    {
      name: "QUICKPROPOSE",
      url: "https://quickpropose.com/",
      description: "Streamlined proposal generation and management platform that helps businesses create professional proposals quickly and track their progress through the sales cycle.",
      screenshot: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Proposal Management", "Document Generation", "Sales Tracking", "Client Management"],
      category: "Business Tools",
      year: "2024"
    },
    {
      name: "AdoptTech",
      url: "https://adopttechsolutions.com/",
      description: "Technology adoption and implementation consultancy helping organizations successfully integrate new technologies and optimize their digital infrastructure.",
      screenshot: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Technology Adoption", "Implementation Services", "Digital Infrastructure", "Change Management"],
      category: "Technology Consulting",
      year: "2024"
    }
  ];

  const ongoingProjects = [
    {
      name: "TECHRESTOREKE",
      url: "https://techrestore.shemmymae.space",
      description: "Technology restoration and repair services platform connecting customers with certified technicians for device repairs, data recovery, and technical support services.",
      screenshot: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Device Repair", "Data Recovery", "Technical Support", "Service Booking"],
      category: "Technology Services",
      status: "In Development",
      progress: 75
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A showcase of successful projects I've developed and contributed to across various industries, 
                demonstrating expertise in modern web technologies and business solutions
              </p>
            </div>

            {/* Completed Projects Section */}
            <div className="mb-20">
              <div className="flex items-center mb-12">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                <div className="px-6">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                    <Code className="w-8 h-8 text-orange-500" />
                    <span>Completed Projects</span>
                  </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedProjects.map((project, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    {/* Screenshot Banner */}
                    <div className="h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${project.screenshot})` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {project.year}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold mb-1">{project.name}</h3>
                        <p className="text-orange-200 text-sm font-medium">{project.url.replace('https://', '')}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm">{project.description}</p>
                      
                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-gray-800 text-sm">Key Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Visit Website Button */}
                      <div className="text-center pt-4 border-t border-gray-100">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group-hover:from-orange-600 group-hover:to-orange-700"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Projects Section */}
            <div className="mb-16">
              <div className="flex items-center mb-12">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                <div className="px-6">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                    <Zap className="w-8 h-8 text-blue-500" />
                    <span>Ongoing Projects</span>
                  </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ongoingProjects.map((project, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border-2 border-blue-100">
                    {/* Screenshot Banner with Progress Indicator */}
                    <div className="h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${project.screenshot})` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>{project.status}</span>
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white text-xl font-bold">{project.name}</h3>
                          <span className="text-blue-200 text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm">{project.description}</p>
                      
                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-gray-800 text-sm">Technologies & Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Preview Website Button */}
                      <div className="text-center pt-4 border-t border-gray-100">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group-hover:from-blue-600 group-hover:to-blue-700"
                        >
                          <span>Preview Project</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Statistics */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Project Portfolio Overview</h3>
                <p className="text-gray-600">A summary of my development work and expertise</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{completedProjects.length}</div>
                  <p className="text-gray-600 text-sm">Completed Projects</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{ongoingProjects.length}</div>
                  <p className="text-gray-600 text-sm">Ongoing Projects</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">8</div>
                  <p className="text-gray-600 text-sm">Industry Sectors</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">2024</div>
                  <p className="text-gray-600 text-sm">Active Year</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Next Project?</h2>
              <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
                Let's collaborate to bring your ideas to life. With my experience across multiple industries and technologies, 
                I can help you build innovative solutions that drive real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleContactNavigation} 
                  className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Discuss Your Project</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
                <a
                  href="mailto:info@shemmymae.space"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <span>Email Me Directly</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;