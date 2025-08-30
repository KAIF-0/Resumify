

import React from 'react'
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
  ExternalLink,
  Calendar,
  Coffee,
  Gamepad2,
  Music,
  Circle,
  Eye,
  Codesandbox,
  Star,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PortfolioData } from '@/utils/types';
import { TemplateProps } from '@/utils/templateTypes';


const Template3: React.FC<TemplateProps> = ({
  userData,
  portId,
  accessMap,
  isCopied,
  handleCopyUrl,
  setIsPhotoModalOpen,
}) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
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

      <div className="container mx-auto px-6 py-12 max-w-6xl">

        {/* Hero Section with Diagonal Split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl glass-strong p-12 mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
              className="flex justify-center items-center"
            >
              <div className="relative inline-block mb-6">
                {userData?.photo ? (
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    src={userData.photo}
                    alt={userData.name}
                    className="size-72 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  />
                ) : (
                  <div className="w-40 h-40 bg-white/10 rounded-2xl flex items-center justify-center border-4 border-white/20">
                    <Camera className="w-16 h-16 text-white/60" />
                  </div>
                )}
                {accessMap[portId] && (
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="absolute -bottom-4 bg-white/20 -right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.32, ease: "easeOut" }}
                className="text-5xl font-bold text-white mb-4 leading-tight"
              >
                {userData?.name}
              </motion.h1>
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.32, ease: "easeOut" }}
                className="text-2xl text-white/80 mb-6"
              >
                {userData?.title}
              </motion.p>

              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.26, duration: 0.32, ease: "easeOut" }}
                className="space-y-3 mb-8"
              >
                {userData?.email && (
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${userData.email}`} className="hover:text-white transition-colors">
                      {userData.email}
                    </a>
                  </div>
                )}
                {userData?.phone && (
                  <div className="flex items-center gap-3 text-white/70">
                    <Phone className="w-5 h-5" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                {userData?.location && (
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-5 h-5" />
                    <span>{userData.location}</span>
                  </div>
                )}
                {userData?.github && (
                  <div className="flex items-center gap-3 text-white/70">
                    <Github className="w-5 h-5" />
                    <a href={userData.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      GitHub
                    </a>
                  </div>
                )}
                {userData?.linkedIn && (
                  <div className="flex items-center gap-3 text-white/70">
                    <Linkedin className="w-5 h-5" />
                    <a href={userData.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        {userData?.summary && userData.summary.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16"
          >
            <Card className="glass rounded-3xl p-8 border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">About Me</h2>
              <p className="text-lg text-white/90 leading-relaxed relative z-10">{userData.summary}</p>
            </Card>
          </motion.div>
        )}

        {/* Timeline Experience Section */}
        {userData && userData?.Experience && userData.Experience.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/50 to-white/20 rounded-full"></div>

              {userData.Experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-white/60 text-sm">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{exp.role}</h3>
                      <p className="text-lg text-white/80 mb-3">{exp.company}</p>
                      {exp.description && exp.description.trim() && (
                        <div className="text-white/90">
                          {exp.description.split("•").map((desc, descIndex) => (
                            desc.trim() && (
                              <div key={descIndex} className="flex items-start text-white/90 mb-1">
                                <Circle className="size-2 bg-white/90 rounded-full mr-2 mt-2 flex-shrink-0" />
                                <p>{desc.trim()}</p>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white/20 z-10"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Showcase */}
        {userData && userData?.Project && userData.Project.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Projects</h2>
            <div className="space-y-8">
              {userData.Project.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  className="group"
                >
                  <Card className="glass rounded-3xl p-8 border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>

                    <div className="flex-col md:flex-row justify-between gap-8 items-center relative z-10">
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        {project.description && project.description.trim() && (
                          <div className="text-white/90 mb-6">
                            {project.description.split("•").map((desc, descIndex) => (
                              desc.trim() && (
                                <div key={descIndex} className="flex items-start text-white/90 mb-1">
                                  <Circle className="size-2 bg-white/90 rounded-full mr-2 mt-2 flex-shrink-0" />
                                  <p>{desc.trim()}</p>
                                </div>
                              )
                            ))}
                          </div>
                        )}

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech, techIndex) => (
                              tech.trim() && (
                                <motion.span
                                  key={techIndex}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.7 + techIndex * 0.05 }}
                                  className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
                                >
                                  {tech}
                                </motion.span>
                              )
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        {project.link && (
                          <Button
                            asChild
                            className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
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
                            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Source Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Matrix */}
        {userData && userData?.SkillCategory && userData.SkillCategory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {userData.SkillCategory.map((category, index) => (
                category.skills && category.skills.length > 0 && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                    className="group"
                  >
                    <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 0, scale: 1.1 }}
                          transition={{ duration: 0.1 }}
                          className="w-14 h-14 bg-gradient-to-br from-primary/30 to-white/20 rounded-xl flex items-center justify-center"
                        >
                          <Codesandbox className="w-6 h-6 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                      </div>

                      <div className="space-y-1">
                        {category.skills.map((skill, skillIndex) => (
                          skill.trim() && (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + skillIndex * 0.1 }}
                              className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                            >
                              <span className="text-white/90">{skill}</span>
                            </motion.div>
                          )
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}

        {/* Interests Section */}
        {userData && userData?.softSkills && userData.softSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Soft Skills</h2>
            <Card className="glass rounded-3xl p-8 border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {userData.softSkills.map((skill, index) => (
                  skill.trim() && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-white/20 rounded-full flex items-center justify-center group-hover:from-primary/50 transition-colors">
                        {skill === "Gaming" && <Gamepad2 className="w-6 h-6 text-white" />}
                        {skill === "Music Production" && <Music className="w-6 h-6 text-white" />}
                        {skill === "Cooking" && <Coffee className="w-6 h-6 text-white" />}
                        {(skill !== "Gaming" && skill !== "Music Production" && skill !== "Cooking") && <Coffee className="w-6 h-6 text-white" />}
                      </div>
                      <span className="text-white/90 font-medium text-center text-sm">{skill}</span>
                    </motion.div>
                  )
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Education Section */}
        {userData && userData?.Education && userData.Education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Education</h2>
            <div className="space-y-6">
              {userData.Education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                >
                  <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-white/20 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                        <p className="text-lg text-white/80">{edu.institution}</p>
                        {edu.year && (
                          <p className="text-white/60">{edu.year}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements Section */}
        {userData && userData?.achievements && userData.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Achievements</h2>
            <Card className="glass rounded-3xl p-8 border-white/10">
              <div className="space-y-4">
                {userData.achievements.map((achievement, index) => (
                  achievement.trim() && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Circle className="size-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-white/90">{achievement}</p>
                    </motion.div>
                  )
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Template3
