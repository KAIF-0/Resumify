import Template1 from '@/components/templates/template1';
import Template2 from '@/components/templates/template2';
import Template3 from '@/components/templates/template3';
import { Layout, Palette, Sparkles } from 'lucide-react';

export const templateConstant = {
    1: 'template1',
    2: 'template2',
    3: 'template3'
}

export const templates = [
    { 
      id: 1, 
      name: "Glassmorphism", 
      icon: Sparkles,
      description: "Modern glass effect design"
    },
    { 
      id: 2, 
      name: "Sidebar Pro", 
      icon: Layout,
      description: "Professional sidebar layout"
    },
    { 
      id: 3, 
      name: "Timeline", 
      icon: Palette,
      description: "Creative timeline showcase"
    },
  ];

export const getTemplateComponent = (templateId: number = 1) => {
  switch (templateId) {
    case 1:
      return Template1;
    case 2:
      return Template2;
    case 3:
      return Template3;
    default:
      return Template1;
  }
}