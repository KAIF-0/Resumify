"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Github,
  Eye,
  Coffee,
  Gamepad2,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";

interface SkillCategory {
  name: string;
  skills: string[];
}

interface UserData {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  photo?: string;
  experience: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  softSkills: string[];
  education: Education[];
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
  github?: string;
  demo?: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
}

const Portfolio = () => {
  const { portId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage or API
    const storedData = localStorage.getItem(`portfolio-${portId}`);
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // Fallback demo data
      setUserData({
        name: "Alex Johnson",
        title: "Full Stack Developer",
        summary:
          "Passionate software developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        experience: [
          {
            company: "TechCorp Inc.",
            role: "Senior Full Stack Developer",
            startDate: "2022",
            endDate: "Present",
            description:
              "Lead development of enterprise web applications serving 100k+ users. Implemented microservices architecture reducing system latency by 40%.",
          },
          {
            company: "StartupXYZ",
            role: "Software Engineer",
            startDate: "2020",
            endDate: "2022",
            description:
              "Built scalable React applications and REST APIs. Collaborated with cross-functional teams to deliver high-quality software solutions.",
          },
        ],
        projects: [
          {
            name: "E-commerce Platform",
            description:
              "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include payment processing, inventory management, and admin dashboard.",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            link: "https://github.com/alexjohnson/ecommerce",
            github: "https://github.com/alexjohnson/ecommerce",
            demo: "https://ecommerce-demo.vercel.app",
          },
          {
            name: "Task Management App",
            description:
              "Real-time collaborative task management application with drag-and-drop functionality and team collaboration features.",
            technologies: ["React", "Socket.io", "MongoDB"],
            link: "https://taskapp-demo.com",
            github: "https://github.com/alexjohnson/taskapp",
            demo: "https://taskapp-demo.com",
          },
          {
            name: "Weather Dashboard",
            description:
              "Real-time weather tracking application with beautiful UI and location-based forecasts.",
            technologies: ["Vue.js", "Node.js", "OpenWeather API"],
            github: "https://github.com/alexjohnson/weather",
            demo: "https://weather-dashboard-demo.com",
          },
        ],
        skillCategories: [
          {
            name: "Frontend",
            skills: [
              "React",
              "Vue.js",
              "TypeScript",
              "JavaScript",
              "HTML/CSS",
              "Tailwind CSS",
            ],
          },
          {
            name: "Backend",
            skills: ["Node.js", "Python", "Express.js", "REST APIs", "GraphQL"],
          },
          {
            name: "DevOps & Cloud",
            skills: [
              "AWS",
              "Docker",
              "Kubernetes",
              "CI/CD",
              "MongoDB",
              "PostgreSQL",
            ],
          },
        ],
        softSkills: [
          "Gaming",
          "Music Production",
          "Photography",
          "Cooking",
          "Traveling",
          "Reading",
        ],
        education: [
          {
            institution: "University of California, Berkeley",
            degree: "Bachelor of Science in Computer Science",
            year: "2019",
          },
        ],
      });
    }
  }, [portId]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setUserData((prev) => (prev ? { ...prev, photo: photoUrl } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
            {userData.photo ? (
              <img
                src={userData.photo}
                alt={userData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
                <Camera className="w-12 h-12 text-white/60" />
              </div>
            )}
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold font-space mb-4"
          >
            {userData.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-white/80 mb-6"
          >
            {userData.title}
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-white/70"
          >
            {userData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{userData.email}</span>
              </div>
            )}
            {userData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{userData.phone}</span>
              </div>
            )}
            {userData.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{userData.location}</span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass rounded-2xl p-8 border-white/10">
            <h2 className="text-3xl font-bold font-space mb-6 text-white">
              About Me
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              {userData.summary}
            </p>
          </Card>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-space mb-8 text-white">
            Experience
          </h2>
          <div className="space-y-6">
            {userData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-white/80">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/90">{exp.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-space mb-8 text-white">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Live Demo"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.a>
                      )}
                      {!project.github && !project.demo && project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactive Action Buttons */}
                  <div className="flex gap-3 mt-auto pt-4">
                    {project.demo && (
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-space mb-8 text-white">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {userData.skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      {/* <category.icon className="w-5 h-5 text-white" /> */}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + skillIndex * 0.05 }}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-space mb-8 text-white">
            Interests & Hobbies
          </h2>
          <Card className="glass rounded-2xl p-8 border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userData.softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    {skill === "Gaming" && (
                      <Gamepad2 className="w-4 h-4 text-white" />
                    )}
                    {skill === "Music Production" && (
                      <Music className="w-4 h-4 text-white" />
                    )}
                    {skill === "Cooking" && (
                      <Coffee className="w-4 h-4 text-white" />
                    )}
                    {skill !== "Gaming" &&
                      skill !== "Music Production" &&
                      skill !== "Cooking" && (
                        <Coffee className="w-4 h-4 text-white" />
                      )}
                  </div>
                  <span className="text-white/90 font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Education Section */}
        {userData.education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold font-space mb-8 text-white">
              Education
            </h2>
            <div className="space-y-6">
              {userData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card className="glass rounded-2xl p-6 border-white/10">
                    <h3 className="text-xl font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-white/80">{edu.institution}</p>
                    <p className="text-white/60">{edu.year}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Update Profile Photo
            </h3>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-3 bg-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/20 file:text-white hover:file:bg-white/30"
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsPhotoModalOpen(false)}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="flex-1"
                >
                  Save
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
