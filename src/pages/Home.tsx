import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import profileImg from '../assets/image.jpg';

const Home: React.FC = () => {
  const { projects, loading } = useProjects({ featured: true, status: 'completed' });

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="text-primary-500">Richard Acheampong</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Full-Stack Developer & AI/ML Engineer specializing in creating 
                innovative web applications, mobile apps, and intelligent software 
                solutions. Passionate about building products that make a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  View My Work
                </Link>
                <Link
                  to="/contact"
                  className="border border-gray-600 hover:border-primary-500 text-gray-300 hover:text-primary-500 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-72 h-72 bg-dark-200 rounded-full overflow-hidden border-4 border-primary-500 shadow-lg">
                    <img
                      src={profileImg}
                      alt="Richard Acheampong"
                      className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold">AI/ML</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold">Web</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies & Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React & React Native', icon: '⚛️' },
              { name: 'Node.js & Express', icon: '🟢' },
              { name: 'Python & AI/ML', icon: '🐍' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Flutter', icon: '📱' },
              { name: 'AWS & Vercel', icon: '☁️' },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="bg-dark-300 p-6 rounded-lg text-center hover:bg-dark-400 transition-colors duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-3">{skill.icon}</div>
                <h3 className="font-semibold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-center mb-12">Some of my recent work</p>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="bg-dark-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-dark-300/50 animate-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Project Image */}
                  <div className="h-40 bg-dark-300 relative overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-purple-600/20">
                        <span className="text-3xl opacity-60">🚀</span>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                          project.status === 'completed'
                            ? 'bg-green-500/90 text-white'
                            : 'bg-yellow-500/90 text-white'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Content - Compact Layout */}
                  <div className="p-5">
                    {/* Title and Meta Row */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold line-clamp-1 flex-1 mr-2">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-dark-300/80 text-gray-300 rounded-md text-xs font-medium backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-dark-300/50 text-gray-400 rounded-md text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    {project.projectUrl && project.status === 'completed' && (
                      <div className="flex items-center justify-between pt-2 border-t border-dark-300/30">
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-500 hover:text-primary-400 font-medium text-sm group/link"
                        >
                          View Project
                          <svg 
                            className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-dark-300/50"
                            title="View Code"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group"
            >
              View All Projects
              <svg 
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;