export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  status: 'ongoing' | 'completed';
  tags: string[];
  featured: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  username: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}