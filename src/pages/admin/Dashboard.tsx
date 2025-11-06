import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';
import ProjectForm from '../../components/Admin/ProjectForm';
import ProjectList from '../../components/Admin/ProjectList';

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAuth();
  const { projects, loading, refetch } = useProjects();
  const [activeTab, setActiveTab] = useState<'projects' | 'add-project'>('projects');
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setActiveTab('add-project');
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  const handleProjectUpdated = () => {
    setEditingProject(null);
    refetch();
    setActiveTab('projects');
  };

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      {/* Header */}
      <header className="bg-dark-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {admin?.username}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-dark-300 mt-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Manage Projects
            </button>
            <button
              onClick={() => {
                setEditingProject(null);
                setActiveTab('add-project');
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'add-project'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="py-8">
          {activeTab === 'projects' && (
            <ProjectList
              projects={projects}
              loading={loading}
              onEdit={handleEdit}
              onDelete={refetch}
            />
          )}

          {activeTab === 'add-project' && (
            <ProjectForm
              project={editingProject}
              onCancel={handleCancelEdit}
              onSuccess={handleProjectUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;