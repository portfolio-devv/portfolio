import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const { projects, loading } = useProjects();

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.status === activeFilter;
  });

  const completedProjects = projects.filter(p => p.status === 'completed');
  const ongoingProjects = projects.filter(p => p.status === 'ongoing');

  return (
    <div className="min-h-screen bg-dark-100 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of my work in web development, mobile apps, and AI/ML projects
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-200 p-6 rounded-lg text-center border border-dark-300/50">
            <div className="text-3xl font-bold text-primary-500 mb-2">{projects.length}</div>
            <div className="text-gray-400">Total Projects</div>
          </div>
          <div className="bg-dark-200 p-6 rounded-lg text-center border border-dark-300/50">
            <div className="text-3xl font-bold text-green-500 mb-2">{completedProjects.length}</div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="bg-dark-200 p-6 rounded-lg text-center border border-dark-300/50">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{ongoingProjects.length}</div>
            <div className="text-gray-400">In Progress</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: 'all' as const, label: 'All Projects', count: projects.length },
            { key: 'completed' as const, label: 'Completed', count: completedProjects.length },
            { key: 'ongoing' as const, label: 'In Progress', count: ongoingProjects.length },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 border ${
                activeFilter === filter.key
                  ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-200 border-dark-300 text-gray-400 hover:bg-dark-300 hover:border-primary-500/50'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className="bg-dark-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-dark-300/50 group animate-fade-in"
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
                  
                  {/* Status & Featured Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        project.status === 'completed'
                          ? 'bg-green-500/90 text-white'
                          : 'bg-yellow-500/90 text-white'
                      }`}
                    >
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                    
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-500/90 text-white backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content - Compact Layout */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-dark-300/80 text-gray-300 rounded-md text-xs font-medium backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-dark-300/50 text-gray-400 rounded-md text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded text-xs border border-primary-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-primary-500/10 text-primary-400/70 rounded text-xs">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer with Dates and Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-dark-300/30">
                    {/* Dates */}
                    <div className="text-xs text-gray-500 space-y-0.5">
                      <div>Start: {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                      {project.endDate && (
                        <div>End: {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-dark-300/50"
                          title="View Code"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.projectUrl && project.status === 'completed' && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-60">📭</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-300">No projects found</h3>
            <p className="text-gray-500">No projects match the current filter criteria.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 text-primary-500 hover:text-primary-400 font-medium"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;