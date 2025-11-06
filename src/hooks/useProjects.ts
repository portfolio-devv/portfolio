import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { projectAPI } from '../services/api';

interface UseProjectsProps {
  featured?: boolean;
  status?: 'ongoing' | 'completed';
}

export const useProjects = (props?: UseProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      let filteredProjects = response.data;

      if (props?.featured !== undefined) {
        filteredProjects = filteredProjects.filter(
          (project: Project) => project.featured === props.featured
        );
      }

      if (props?.status) {
        filteredProjects = filteredProjects.filter(
          (project: Project) => project.status === props.status
        );
      }

      setProjects(filteredProjects);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [props?.featured, props?.status]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};
