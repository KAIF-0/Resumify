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
  Loader,
  Loader2,
  Circle,
  Codesandbox,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { PortfolioData, PortStatus } from "@/utils/types";
import portfolioService from "@/service/portfolio.service";
import { toast } from "@/hooks/use-toast";
import ErrorState from "@/components/ErrorState";
import ProcessingState from "@/components/ProcessingState";
import { supabase } from "@/configs/supabase.config";

// interface portStatus {
//   status: "READY" | "PROCESSING" | "ERROR";
// }

const PortfolioPage = () => {
  const { portId } = useParams();
  const [portfolioStatus, setPortfolioStatus] = useState<
    "READY" | "PROCESSING" | "ERROR"
  >("PROCESSING");
  const router = useRouter();
  const [userData, setUserData] = useState<PortfolioData | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [accessMap, setAccessMap] = useState<Record<string, boolean>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  //accessmap from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const portfolioAccessMap = JSON.parse(localStorage.getItem("portfolioAccess") || "{}");
      setAccessMap(portfolioAccessMap);
      // console.log(portfolioAccessMap, portfolioAccessMap[portId as string]);
    }
  }, [portId]);

  useEffect(() => {
    const channel = supabase
      .channel("PortfolioChannel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Portfolio" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            if (payload.new.id === portId) {
              window.location.reload();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [portId]);

  useEffect(() => {
    // Get user data from localStorage or API
    portfolioService
      .handleFetchPortfolioData(portId as string)
      .then((data) => {
        if (data) {
          console.log(data);
          setPortfolioStatus(
            data.portfolioStatus as "READY" | "PROCESSING" | "ERROR"
          );
          setUserData(data.portfolioData);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setPortfolioStatus("ERROR");
      })
      .finally(() => setIsLoading(false));
  }, [portId]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setUserData((prev) => (prev ? { ...prev, photo: photoUrl } : null));
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handlePhotoUpload = async () => {
    try {
      if (!image || !portId) {
        return;
      }
      setIsImageUploading(true);
      await portfolioService.handleUpdateProfileImage(image, portId as string);
      setIsImageUploading(false);
      setIsPhotoModalOpen(false);

      toast({
        title: "Update Succes",
        description: "Profile Image updated succesfully!",
      });
    } catch (error) {
      console.log(error);
      setIsImageUploading(false);
      setIsPhotoModalOpen(false);
      toast({
        title: "Upload Failed",
        description: "Failed to upload Profile Image!",
      });
    }
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);

    //halt
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">
            Loading your amazing and interactive portfolio...
          </p>
          <div className="mt-4 text-white opacity-50">
            Sit back and enjoy the magic happening!
          </div>
        </div>
      </div>
    );
  }

  switch (portfolioStatus) {
    case PortStatus[PortStatus.READY]:
      return (
        <div className="min-h-screen text-white max-w-7xl mx-auto">
          <div className="container mx-auto px-6 py-12 relative">
            {/* Copy URL Button */}
            {accessMap[portId as string] && <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleCopyUrl}
              className="fixed top-6 right-6 z-40 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
              title="Copy Portfolio URL"
            >
              {isCopied ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Copy className="w-5 h-5 text-white" />
              )}
            </motion.button>}

            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="relative inline-block mb-6">
                {userData?.photo ? (
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
                {accessMap[portId as string] && <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>}
              </div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-bold font-space mb-4"
              >
                {userData?.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-white/80 mb-6"
              >
                {userData?.title}
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-6 text-white/70"
              >
                {userData?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${userData?.email}`} target="_blank">
                      {userData.email}
                    </a>
                  </div>
                )}
                {userData?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                {userData?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.location}</span>
                  </div>
                )}
                {userData?.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <a href={userData.github} target="_blank">
                      {userData.github}
                    </a>
                  </div>
                )}
                {userData?.linkedIn && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <a href={userData.linkedIn} target="_blank">
                      {userData.linkedIn}
                    </a>
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
                  {userData?.summary
                    ? userData?.summary
                    : "Passionate individual with a diverse skill set and a strong work ethic, dedicated to achieving goals and delivering high-quality results."}
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
              {userData && userData?.Experience.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold font-space mb-8 text-white">
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {userData?.Experience.map((exp, index) => (
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
                              <p className="text-lg text-white/80">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-white/60">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                          </div>
                          {exp.description.split("•").map((d, index) => (
                            <div
                              key={index}
                              className="flex items-center text-white/90"
                            >
                              <span>
                                <Circle className="size-2 bg-white/90 rounded full mr-2" />
                              </span>
                              <p>{d}</p>
                            </div>
                          ))}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              {userData && userData?.Project?.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold font-space mb-8 text-white">
                    Projects
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {userData?.Project.map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Card className="glass rounded-2xl p-6 flex flex-col justify-stretch border-white/10 hover:border-white/20 transition-all duration-300 h-full">
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
                              {!project.github && project.link && (
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
                          <div className="text-white/90 mb-4">
                            {project.description.split("•").map((d, index) => (
                              <div
                                key={index}
                                className="flex items-center text-white/90"
                              >
                                <span>
                                  <Circle className="size-2 bg-white/90 rounded full mr-2" />
                                </span>
                                <p>{d}</p>
                              </div>
                            ))}
                          </div>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies?.length > 0 &&
                                project.technologies.map((tech, techIndex) => (
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
                            {project.link && (
                              <Button
                                asChild
                                size="sm"
                                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
                              >
                                <a
                                  href={project.link}
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
                </>
              )}
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-16"
            >
              {userData && userData?.SkillCategory?.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold font-space mb-8 text-white">
                    Skills
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {userData?.SkillCategory.map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                              <Codesandbox className="size-5" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                              {category.name}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.skills?.length > 0 &&
                              category.skills.map((skill, skillIndex) => (
                                <motion.span
                                  key={skillIndex}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: 0.7 + skillIndex * 0.05,
                                  }}
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
                </>
              )}
            </motion.div>

            {/* Soft Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              {userData && userData?.softSkills?.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold font-space mb-8 text-white">
                    Interests & Hobbies
                  </h2>
                  <Card className="glass rounded-2xl p-8 border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {userData?.softSkills.map((skill, index) => (
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
                          <span className="text-white/90 font-medium">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </>
              )}
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              {userData && userData?.achievements?.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold font-space mb-8 text-white">
                    Achievements
                  </h2>
                  <div className="space-y-6">
                    <Card className="glass rounded-2xl p-6 flex flex-col gap-2 justify-between border-white/10">
                      {userData?.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <div
                            key={index}
                            className="flex items-center text-white/90"
                          >
                            <span>
                              <Circle className="size-2 bg-white/90 rounded full mr-2" />
                            </span>
                            <p>{achievement}</p>
                          </div>
                        </motion.div>
                      ))}
                    </Card>
                  </div>
                </>
              )}
            </motion.div>

            {/* Education Section */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              {userData && userData?.Education?.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold font-space mb-8 text-white">
                    Education
                  </h2>
                  <div className="space-y-6">
                    {userData?.Education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Card className="glass rounded-2xl p-6 flex justify-between border-white/10">
                          <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-white">
                              {edu.degree}
                            </h3>
                            <p className="text-lg text-white/80">
                              {edu.institution}
                            </p>
                          </div>

                          <p className="text-white/60">{edu.year}</p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
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
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/20 file:text-white hover:file:bg-white/30"
                  />
                  <div className="flex gap-4">
                    <Button
                      disabled={isImageUploading}
                      onClick={() => setIsPhotoModalOpen(false)}
                      variant="outline"
                      className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isImageUploading}
                      onClick={handlePhotoUpload}
                      className="flex-1 border-white/20 text-white hover:bg-white/20"
                    >
                      {isImageUploading ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      );

    case PortStatus[PortStatus.PROCESSING]:
      return <ProcessingState />;

    default:
      return <ErrorState onGoHome={() => router.push("/")} />;
  }
};

export default PortfolioPage;
