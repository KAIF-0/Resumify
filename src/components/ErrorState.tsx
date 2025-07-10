import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  onGoHome?: () => void;
  errorMessage?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  onGoHome,
  errorMessage = "Something went wrong while processing your resume.",
}) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="glass rounded-2xl p-8 border-white/10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-2xl font-bold text-white font-space">
              Oops! Something Went Wrong
            </h2>

            <p className="text-white/80 leading-relaxed">{errorMessage}</p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-white/60">This could be due to:</p>
              <ul className="text-sm text-white/70 mt-2 space-y-1 text-left">
                <li>• Unsupported file format</li>
                <li>• Corrupted PDF file</li>
                <li>• Portfolio does not exist</li>
                <li>• Server processing error</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {/* {onRetry && (
              <Button
                onClick={onRetry}
                className="w-full bg-primary hover:bg-primary/80"
                size="lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
             )}

            {onUploadNew && (
              <Button
                onClick={onUploadNew}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                size="lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Resume
              </Button>
             )} */}

            <Button
              onClick={onGoHome}
              variant="ghost"
              className="w-full text-white/70 bg-white/10 hover:text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ErrorState;
