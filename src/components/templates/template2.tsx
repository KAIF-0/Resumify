import React, { useState } from 'react'
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Eye,
  Circle,
  Calendar,
  Coffee,
  Gamepad2,
  Music,
  Codesandbox,
  User,
  Briefcase,
  FolderOpen,
  Code,
  GraduationCap,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PortfolioData } from '@/utils/types';
import { TemplateProps } from '@/utils/templateTypes';

interface Template2Props {
  userData: PortfolioData | null;
  portId: string;
  accessMap: Record<string, boolean>;
  isCopied: boolean;
  handleCopyUrl: () => Promise<void>;
  setIsPhotoModalOpen: (open: boolean) => void;
}

const Template2: React.FC<TemplateProps> = ({
  userData,
  portId,
  accessMap,
  isCopied,
  handleCopyUrl,
  setIsPhotoModalOpen,
}) => {
  const [activeSection, setActiveSection] = useState('about');

  const sidebarItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen">
      {/* Copy URL Button */}
      {accessMap[portId] && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleCopyUrl}
          className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
          title="Copy Portfolio URL"
        >
          {isCopied ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            <Copy className="w-5 h-5 text-white" />
          )}
        </motion.button>
      )}

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-md border-r border-white/20 p-8 z-10"
        >
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              {userData?.photo ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={userData.photo}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
                  <Camera className="w-8 h-8 text-white/60" />
                </div>
              )}
              {accessMap[portId] && (
                <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="absolute -bottom-2 bg-white/20 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {userData?.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 mb-4"
            >
              {userData?.title}
            </motion.p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-white/70">
              {userData?.email && (
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-3 h-3" />
                  <a href={`mailto:${userData.email}`} className="hover:text-white transition-colors">
                    {userData.email}
                  </a>
                </div>
              )}
              {userData?.phone && (
                <div className="flex items-center gap-2 justify-center">
                  <Phone className="w-3 h-3" />
                  <span>{userData.phone}</span>
                </div>
              )}
              {userData?.location && (
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-3 h-3" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData?.github && (
                <div className="flex items-center gap-2 justify-center">
                  <Github className="w-3 h-3" />
                  <a href={userData.github} target="_blank" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </div>
              )}
              {userData?.linkedIn && (
                <div className="flex items-center gap-2 justify-center">
                  <Linkedin className="w-3 h-3" />
                  <a href={userData.linkedIn} target="_blank" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems
              .filter(item => {
                if (item.id === 'about') return true;
                if (item.id === 'experience') return userData?.Experience && userData.Experience.length > 0;
                if (item.id === 'projects') return userData?.Project && userData.Project.length > 0;
                if (item.id === 'skills') return userData?.SkillCategory && userData.SkillCategory.length > 0;
                if (item.id === 'education') return userData?.Education && userData.Education.length > 0;
                return false;
              })
              .map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="ml-80 flex-1 p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === 'about' && (
              <div className="space-y-8">
                {userData?.summary && userData.summary.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-white/20">
                      <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
                      <p className="text-lg text-white/90 leading-relaxed">
                        {userData.summary}
                      </p>
                    </Card>
                  </motion.div>
                )}

                {userData && userData?.softSkills && userData.softSkills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-white/20">
                      <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userData.softSkills.map((skill, index) => (
                          skill.trim() && (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                {skill === "Gaming" && <Gamepad2 className="w-4 h-4 text-white" />}
                                {skill === "Music Production" && <Music className="w-4 h-4 text-white" />}
                                {skill === "Cooking" && <Coffee className="w-4 h-4 text-white" />}
                                {(skill !== "Gaming" && skill !== "Music Production" && skill !== "Cooking") && <Coffee className="w-4 h-4 text-white" />}
                              </div>
                              <span className="text-white/90 font-medium">{skill}</span>
                            </motion.div>
                          )
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Show achievements if available */}
                {userData && userData?.achievements && userData.achievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-white/20">
                      <h3 className="text-2xl font-bold text-white mb-6">Achievements</h3>
                      <div className="space-y-3">
                        {userData.achievements.map((achievement, index) => (
                          achievement.trim() && (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <Circle className="size-2 bg-white/20 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-white/90">{achievement}</p>
                            </motion.div>
                          )
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}

            {activeSection === 'experience' && userData && userData?.Experience && userData.Experience.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
                {userData.Experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="group"
                  >
                    <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-white/20 hover:border-white/30 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors">{exp.role}</h3>
                          <p className="text-lg text-white/80">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                      </div>
                      {exp.description && exp.description.trim() && (
                        <div className="text-white/90">
                          {exp.description.split("•").map((d, descIndex) => (
                            d.trim() && (
                              <div key={descIndex} className="flex items-start text-white/90 mb-1">
                                <Circle className="size-2 bg-white/90 rounded-full mr-2 mt-2 flex-shrink-0" />
                                <p>{d.trim()}</p>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeSection === 'projects' && userData && userData?.Project && userData.Project.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {userData.Project.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors">{project.name}</h3>
                          <div className="flex gap-2">
                            {project.github && (
                              <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Github className="w-4 h-4" />
                              </motion.a>
                            )}
                          </div>
                        </div>

                        {project.description && project.description.trim() && (
                          <div className="text-white/90 mb-4 flex-grow">
                            {project.description.split("•").map((d, descIndex) => (
                              d.trim() && (
                                <div key={descIndex} className="flex items-start text-white/90 mb-1">
                                  <Circle className="size-2 bg-white/90 rounded-full mr-2 mt-2 flex-shrink-0" />
                                  <p>{d.trim()}</p>
                                </div>
                              )
                            ))}
                          </div>
                        )}

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              tech.trim() && (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white/80 transition-colors"
                                >
                                  {tech}
                                </span>
                              )
                            ))}
                          </div>
                        )}

                        {(project.link || project.github) && (
                          <div className="flex gap-3 mt-auto">
                            {project.link && (
                              <Button
                                asChild
                                size="sm"
                                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
                              >
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
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
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skills' && userData && userData?.SkillCategory && userData.SkillCategory.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-8">Technical Skills</h2>
                <div className="grid gap-6">
                  {userData.SkillCategory.map((category, index) => (
                    category.skills && category.skills.length > 0 && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-white/20 hover:border-white/30 transition-all duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                              <Codesandbox className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, skillIndex) => (
                              skill.trim() && (
                                <motion.span
                                  key={skillIndex}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + skillIndex * 0.05 }}
                                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white/80 hover:scale-105 transition-all duration-200"
                                >
                                  {skill}
                                </motion.span>
                              )
                            ))}
                          </div>
                        </Card>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'education' && userData && userData?.Education && userData.Education.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
                {userData.Education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-white/20 hover:border-white/30 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                          <p className="text-lg">{edu.institution}</p>
                        </div>
                        {edu.year && (
                          <p className="text-white/60">{edu.year}</p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Template2
