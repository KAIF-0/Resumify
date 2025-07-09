import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumeUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing?: boolean;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUpload, isProcessing }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        {...getRootProps()}
        className={`
          glass rounded-2xl p-12 border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="text-center space-y-6">
          <motion.div
            animate={{ 
              scale: isDragActive ? 1.1 : 1,
              rotate: isDragActive ? 5 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="flex justify-center"
          >
            {isProcessing ? (
              <Loader className="w-16 h-16 text-primary animate-spin" />
            ) : (
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary-foreground" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileText className="w-4 h-4 text-accent-foreground" />
                </motion.div>
              </div>
            )}
          </motion.div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">
              {isProcessing ? 'Processing your resume...' : 'Upload Your Resume'}
            </h3>
            <p className="text-muted-foreground text-lg">
              {isProcessing 
                ? 'Our AI is extracting your professional information'
                : isDragActive 
                  ? 'Drop your PDF resume here'
                  : 'Drag & drop your PDF resume or click to browse'
              }
            </p>
          </div>

          {!isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-xl font-medium"
                variant="default"
              >
                Choose File
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {!isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Supported format: PDF • Max size: 10MB
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};