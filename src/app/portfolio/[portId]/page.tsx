"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PortfolioData, PortStatus } from "@/utils/types";
import portfolioService from "@/service/portfolio.service";
import { toast } from "@/hooks/use-toast";
import ErrorState from "@/components/ErrorState";
import ProcessingState from "@/components/ProcessingState";
import { supabase } from "@/configs/supabase.config";
import { getTemplateComponent } from "@/lib/templateConstant";
import PhotoUploadModal from "@/components/PhotoUploadModal";
import { TemplateSelector } from "@/components/TemplateSelector";

// interface portStatus {
//   status: "READY" | "PROCESSING" | "ERROR";
// }

const PortfolioPage = () => {
  const { portId } = useParams();
  const templateId = useSearchParams().get('template') || '1';
  // console.log("Template ID:", templateId);
  // const templateId = searchParams.get('template') ? parseInt(searchParams.get('template') as string) : 1;
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
      if(portId === process.env.NEXT_PUBLIC_DEMO_TEMPLATE_ID){
        setAccessMap({[portId as string]: true});
      }
      const portfolioAccessMap = JSON.parse(localStorage.getItem("portfolioAccess") || "{}");
      setAccessMap(prev => ({ ...prev, ...portfolioAccessMap }));
      // console.log(portfolioAccessMap, accessMap);
      
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
        </div>
      </div>
    );
  }

  switch (portfolioStatus) {
    case PortStatus[PortStatus.READY]:
      const TemplateComponent = getTemplateComponent(parseInt(templateId));
      
      return (
        <div className="min-h-screen bg-gradient-hero">
          <TemplateComponent
            userData={userData}
            portId={portId as string}
            accessMap={accessMap}
            isCopied={isCopied}
            handleCopyUrl={handleCopyUrl}
            setIsPhotoModalOpen={setIsPhotoModalOpen}
          />
          
          {/* Template Selector */}
          <TemplateSelector
            portId={portId as string}
            accessMap={accessMap}
            currentTemplate={parseInt(templateId)}
          />
          
          {/* Photo Upload Modal */}
          {isPhotoModalOpen && (
            <PhotoUploadModal
              setIsPhotoModalOpen={setIsPhotoModalOpen}
              handleChange={handleChange}
              handlePhotoUpload={handlePhotoUpload}
              isImageUploading={isImageUploading}
            />
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
