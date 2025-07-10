"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle, Zap, Star } from "lucide-react";
import { ResumeUpload } from "@/components/ResumeUpload";
import { FloatingNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import portfolioService from "@/service/portfolio.service";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setUploadedFile(file);
      setIsProcessing(true);

      const portfolioId = await portfolioService.handleProcessResume(file);
      setUploadedFile(null);

      router.push(`/portfolio/${portfolioId}`);
    } catch (error) {
      setUploadedFile(null);
      setIsProcessing(false);
      console.log(error);
      toast({
        title: "Resume Upload Failed",
        description: "Failed to create your Portfolio! Please Try again...",
      });
    }
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Extraction",
      description:
        "Advanced AI analyzes your resume and extracts key information automatically",
    },
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description:
        "Transform your data into a stunning, modern portfolio with glassmorphism effects",
    },
    {
      icon: Star,
      title: "Instant Generation",
      description:
        "Get your professional portfolio ready in seconds, not hours",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero font-inter">
      <FloatingNavbar />

      {/* Hero Section */}
      <div id="home" className="container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-white to-white/60 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-black" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold font-space text-white mb-8 leading-tight"
          >
            Turn Your Resume into a
            <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Portfolio Instantly
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Upload your PDF resume and watch as our AI transforms it into a
            stunning, professional portfolio website in seconds.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className=" rounded-2xl p-6 text-center border border-white/20 bg-white/15 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Upload Section */}
        <ResumeUpload
          onFileUpload={handleFileUpload}
          isProcessing={isProcessing}
        />

        {uploadedFile && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="glass rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-white font-medium">
                  File uploaded successfully!
                </span>
              </div>
              <p className="text-white/70 mb-4">{uploadedFile.name}</p>
              <Button
                onClick={() => handleFileUpload(uploadedFile)}
                size="lg"
                className="w-full text-lg font-medium"
                disabled={isProcessing}
              >
                Generate My Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-20"
        >
          <p className="text-white/60 mb-6">
            Want to see it in action? Try our demo portfolio
          </p>
          <Button
            onClick={() => router.push("/portfolio/demo-alex-johnson-123")}
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            View Demo Portfolio
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* About Section */}
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-space">
            Why Choose Resumify?
          </h2>
          <p className="text-xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed">
            Traditional resumes are outdated. Stand out with a modern,
            interactive portfolio that showcases your skills and projects in the
            best possible way.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "10K+", label: "Portfolios Created", icon: Star },
              { number: "95%", label: "Success Rate", icon: CheckCircle },
              { number: "3 Sec", label: "Generation Time", icon: Zap },
              { number: "100%", label: "Free to Use", icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/20 bg-white/15 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 font-space">
                  {stat.number}
                </div>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
