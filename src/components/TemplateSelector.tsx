import React from "react";
import { motion } from "framer-motion";
import { Palette, Layout, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/templateConstant";

interface TemplateSelectorProps {
  portId: string;
  accessMap: Record<string, boolean>;
  currentTemplate: number;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  portId,
  accessMap,
  currentTemplate,
}) => {
  const router = useRouter();

  if (!accessMap[portId]) return null;

  const handleTemplateChange = (templateId: number) => {
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}?template=${templateId}`;
    router.push(newUrl);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="glass-strong rounded-full px-4 sm:px-6 py-3 border border-white/20 max-w-fit">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-white font-medium text-xs sm:text-sm opacity-80 hidden sm:block">
            Templates
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {templates.map((template) => {
              const Icon = template.icon;
              const isActive = currentTemplate === template.id;
              
              return (
                <button
                  key={template.id}
                  onClick={() => handleTemplateChange(template.id)}
                  className={`relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  title={template.description}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs font-medium hidden md:block">
                    {template.name}
                  </span>
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-white/10 rounded-full border border-white/30" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Template info for larger screens */}
          <div className="hidden lg:block text-xs text-white/60 ml-2">
            {templates.find(t => t.id === currentTemplate)?.description}
          </div>
        </div>
      </div>
    </div>
  );
};