import React from 'react';
import profileImg from '../assets/image.jpg'; // ✅ import your image

const About: React.FC = () => {
  const skills = [
    {
      category: 'Frontend Development',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js']
    },
    {
      category: 'Backend Development',
      technologies: ['Node.js & Express', 'PHP Laravel', 'Python', 'Django', 'FastAPI']
    },
    {
      category: 'Mobile Development',
      technologies: ['React Native', 'Flutter', 'Expo', 'iOS', 'Android']
    },
    {
      category: 'AI/ML & Data Science',
      technologies: ['TensorFlow', 'PyTorch','ML Algorithms', 'Scikit-learn', 'Pandas', 'OpenCV']
    },
    {
      category: 'Database & Cloud',
      technologies: ['MongoDB', 'PostgreSQL', 'AWS', 'Vercel', 'Docker']
    },
    {
      category: 'Tools & Others',
      technologies: ['Git', 'GitHub', 'Jest', 'Figma', 'Agile/Scrum']
    }
  ];

  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'GD IT Solutions',
      period: '2022 - Present',
      description: 'Developing scalable web applications using React, Node.js, and cloud technologies.'
    },
    {
      role: 'Mobile App Developer',
      company: 'Startup Inc',
      period: '2024 - 2025',
      description: 'Built cross-platform mobile applications using React Native and Flutter.'
    },
    {
      role: 'AI Research Intern',
      company: 'KAF Research Consult',
      period: '2025',
      description: 'Worked on machine learning models for computer vision and natural language processing.'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Koforidua Technical University',
      period: '2021 - 2025',
      details: 'Specialized in Software Engineering and Artificial Intelligence'
    },
    {
      degree: 'Machine Learning Specialization',
      school: 'Koforidua Technical University',
      period: '2025',
      details: 'Advanced coursework in deep learning and neural networks'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-100 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate full-stack developer and AI enthusiast with a strong background in 
            creating innovative digital solutions. I love turning complex problems into 
            simple, beautiful, and intuitive solutions.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="bg-dark-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              
              {/* Circular Image with Gradient Border */}
              <div className="relative w-52 h-52 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1 shadow-[0_0_25px_rgba(147,51,234,0.4)]">
                <div className="w-full h-full bg-dark-300 rounded-full overflow-hidden">
                  <img
                    src={profileImg}
                    alt="Richard Acheampong"
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h2 className="text-2xl font-bold mb-1">Richard Acheampong</h2>
              <p className="text-primary-500 mb-4 font-medium">
                Full Stack Developer & AI Engineer
              </p>

              {/* Short Bio */}
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Passionate about building innovative solutions that make a difference.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center justify-center">
                  <span className="mr-3">📧</span>
                  richardacheampong249@gmail.com
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-3">📱</span>
                  +233 257100607
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-3">📍</span>
                  Greater Accra, Ghana
                </div>
              </div>
            </div>
          </div>

          {/* Experience + Education */}
          <div className="lg:col-span-2">
            {/* Experience */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Experience</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-dark-200 p-6 rounded-lg hover:bg-dark-300 transition-colors duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <span className="text-primary-500 font-medium mt-1 sm:mt-0">{exp.period}</span>
                    </div>
                    <p className="text-gray-400 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-dark-200 p-6 rounded-lg hover:bg-dark-300 transition-colors duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <span className="text-primary-500 font-medium mt-1 sm:mt-0">{edu.period}</span>
                    </div>
                    <p className="text-gray-400 font-medium mb-2">{edu.school}</p>
                    <p className="text-gray-300">{edu.details}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillCategory, categoryIndex) => (
              <div
                key={skillCategory.category}
                className="bg-dark-200 p-6 rounded-lg animate-fade-in hover:bg-dark-300 transition-colors duration-300"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-primary-500">
                  {skillCategory.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-2 bg-dark-300 text-gray-300 rounded-lg text-sm hover:bg-dark-400 transition-all duration-200"
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (techIndex * 0.05)}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
<section className="text-center">
  <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-12 shadow-[0_0_25px_rgba(147,51,234,0.3)]">
    <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      I'm always interested in new opportunities and challenging projects.
    </p>
    <a
      href="/contact"
      className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 inline-block"
    >
      Get In Touch
    </a>
  </div>
</section>
      </div>
    </div>
  );
};

export default About;
