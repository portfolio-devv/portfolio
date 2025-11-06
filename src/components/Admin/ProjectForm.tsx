import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import { projectAPI } from '../../services/api';

interface ProjectFormProps {
  project?: Project | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    status: 'ongoing' as 'ongoing' | 'completed',
    tags: [] as string[],
    featured: false,
    startDate: '',
    endDate: ''
  });
  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        status: project.status,
        tags: project.tags,
        featured: project.featured,
        startDate: project.startDate.split('T')[0],
        endDate: project.endDate ? project.endDate.split('T')[0] : ''
      });
    }
  }, [project]);

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (project) {
        await projectAPI.update(project._id, formData);
      } else {
        await projectAPI.create(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'tech' | 'tag') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'tech') handleAddTech();
      else handleAddTag();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-dark-200 rounded-xl shadow-2xl border border-dark-300 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'ongoing' | 'completed' }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-vertical"
              placeholder="Describe your project..."
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project URL
              </label>
              <input
                type="url"
                value={formData.projectUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'tech')}
                className="flex-1 px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter technology and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="hover:text-red-400 transition-colors duration-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'tag')}
                className="flex-1 px-4 py-3 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter tag and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 transition-colors duration-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Featured Project
              </label>
              <p className="text-sm text-gray-400">
                Mark this project as featured to display it prominently
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-dark-400">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {project ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                project ? 'Update Project' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;