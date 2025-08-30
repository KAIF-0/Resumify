import React from 'react'
import { Button } from './ui/button'
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface PhotoUploadModalProps {
  setIsPhotoModalOpen: (open: boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handlePhotoUpload: () => Promise<void>;
  isImageUploading: boolean;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  setIsPhotoModalOpen,
  handleChange,
  handlePhotoUpload,
  isImageUploading,
}) => {
  return (
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
  )
}

export default PhotoUploadModal