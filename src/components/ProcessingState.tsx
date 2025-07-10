import React from "react";
import { motion } from "framer-motion";
import { Loader2, FileText, Zap, RefreshCw } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const ProcessingState = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <Card className="glass rounded-2xl p-8 border-white/80 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6"
              >
                <Loader2 className="w-full h-full text-white" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-white font-space">
              Creating Your Portfolio
            </h2>

            <p className="text-white/80 text-lg leading-relaxed">
              We&apos;re analyzing your resume and crafting a beautiful
              portfolio just for you. This usually takes a few moments.
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 0.5,
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-1 bg-white/20 rounded-full overflow-hidden mx-auto max-w-xs"
            >
              <div className="h-full bg-gradient-to-r from-primary to-white/60 rounded-full" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-5 flex items-center justify-center gap-3 text-white/60"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm">Parsing resume content...</span>
          </motion.div>

          <Button
            onClick={() => window.location.reload()}
            variant="ghost"
            className="mt-5 w-full text-white/70 bg-white/10 hover:text-white hover:bg-white/20"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Refreshing Page
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProcessingState;
