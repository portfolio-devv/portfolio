import React, { useState } from 'react';
import type { Project } from '../../types';
import { projectAPI } from '../../services/api';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, loading, onEdit, onDelete }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await projectAPI.delete(id);
      onDelete();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === 'completed') {
      return `${baseClasses} bg-green-500/20 text-green-300`;
    }
    return `${baseClasses} bg-yellow-500/20 text-yellow-300`;
  };

  const getFeaturedBadge = (featured: boolean) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    if (featured) {
      return `${baseClasses} bg-purple-500/20 text-purple-300`;
    }
    return `${baseClasses} bg-gray-500/20 text-gray-400`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📁</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
        <p className="text-gray-500">Get started by creating your first project!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Projects ({projects.length})</h2>
        <div className="text-sm text-gray-400">
          Showing all projects
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-dark-200 rounded-xl shadow-lg border border-dark-300 overflow-hidden hover:border-dark-400 transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Project Image */}
                <div className="flex-shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg object-cover border border-dark-400"
                  />
                </div>

                {/* Project Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white truncate">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={getStatusBadge(project.status)}>
                        {project.status}
                      </span>
                      <span className={getFeaturedBadge(project.featured)}>
                        {project.featured ? 'Featured' : 'Regular'}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-500/10 text-primary-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 bg-gray-500/10 text-gray-400 rounded text-xs">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                    {project.githubUrl && (
                      <div className="flex items-center gap-1">
                        <span>🐙</span>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-400 transition-colors duration-200"
                        >
                          GitHub
                        </a>
                      </div>
                    )}
                    {project.projectUrl && (
                      <div className="flex items-center gap-1">
                        <span>🌐</span>
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-400 transition-colors duration-200"
                        >
                          Live Demo
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span>🏷️</span>
                      <span>{project.tags.length} tags</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => onEdit(project)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>✏️</span>
                    Edit
                  </button>
                  
                  {deleteConfirm === project._id ? (
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={deletingId === project._id}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        {deletingId === project._id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <span>🗑️</span>
                            Confirm
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(project._id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-200 rounded-xl p-6 max-w-md w-full border border-dark-400">
            <h3 className="text-lg font-semibold text-white mb-2">Confirm Delete</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deletingId === deleteConfirm}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white rounded-lg transition-colors duration-200"
              >
                {deletingId === deleteConfirm ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;