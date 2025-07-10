import React from "react";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin, Heart } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kaif-0",
      color: "hover:text-white",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:your.email@example.com",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kaif-khan-47bb19292/",
      color: "hover:text-white",
    },
  ];

  return (
    <footer id="contact" className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6 font-space">
            Let&apos;s Connect
          </h3>

          <div className="flex justify-center gap-8 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 text-white/60 ${link.color} transition-all duration-300 group`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <link.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </motion.a>
            ))}
          </div>

          <div className="text-white/40 text-sm">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400" /> using
              Resumify
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Resumify. Transform your resume into
              a stunning portfolio.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
