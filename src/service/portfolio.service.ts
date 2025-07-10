import { supabase } from "@/configs/supabase.config";
import { env } from "@/env";
import { PortStatus } from "@/utils/types";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class PortfolioService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  handleProcessResume = async (resume: File) => {
    try {
      if (resume.type !== "application/pdf")
        throw Error("File type should be PDF only!");
      const resumeUrl = await this.handleResumeUpload(resume);

      //database ops
      const portfolioId = await this.handleDatabaseOps();

      //add job api request
      await axios
        .post("/api/addJob", {
          portfolioId,
          resumeUrl,
        })
        .catch((error) => {
          throw new Error(error.message);
        });

      return portfolioId;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw Error("Failed to Process resume!");
    }
  };

  handleResumeUpload = async (resume: File) => {
    try {
      const { data, error } = await this.supabase.storage
        .from("resume")
        .upload(`${resume.name}-${new Date().getTime()}`, resume, {
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      console.log(data);

      const resumeUrl = `${env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

      return resumeUrl;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw Error("Failed to upload resume!");
    }
  };

  handleDatabaseOps = async () => {
    try {
      const portfolioId = uuidv4();
      const { error } = await this.supabase
        .from("Portfolio")
        .insert({ id: portfolioId, status: PortStatus[PortStatus.PROCESSING] });

      if (error) {
        throw new Error(error.message);
      }

      return portfolioId;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw Error("Failed to handle databaseOps!");
    }
  };

  handleUpdateProfileImage = async (image: File, portfolioId: string) => {
    try {
      const imageUrl = await this.handleProfileUpload(image);

      //find the profile data from db for id
      const { data, error } = await this.supabase
        .from("Portfolio")
        .select("portfolioId")
        .eq("id", portfolioId);

      if (error || data.length == 0) {
        throw new Error(
          error?.message || "Could not find the respective Portfolio Data!"
        );
      }

      //update the url in db
      const { error: err } = await this.supabase
        .from("PortfolioData")
        .update({ photo: imageUrl })
        .eq("id", data[0]?.portfolioId);

      if (err) {
        throw new Error(err.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) throw new Error(error.message);
      throw Error("Failed to update Profile Image!");
    }
  };

  handleProfileUpload = async (image: File) => {
    try {
      const { data, error } = await this.supabase.storage
        .from("profile")
        .upload(`${image.name}-${new Date().getTime()}`, image, {
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      console.log(data);

      const profileUrl = `${env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

      return profileUrl;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw Error("Failed to upload Profile Image!");
    }
  };

  handleFetchPortfolioData = async (portfolioId: string) => {
    try {
      const { data, error } = await this.supabase
        .from("Portfolio")
        .select(
          `
            *,
            PortfolioData (
              *,
              Experience (*),
              Project (*),
              SkillCategory (*),
              Education (*)
            )
          `
        )
        .eq("id", portfolioId)
        .limit(1);

      if (error || data.length == 0) {
        throw new Error(error?.message || "Could not find the Portfolio Data!");
      }

      console.log(data);

      return {
        portfolioStatus: data[0]?.status,
        // portfolioStatus: "ERROR",
        portfolioData: data[0]?.PortfolioData,
      };
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw Error("Failed to fetch Portfolio Data!");
    }
  };
}

const portfolioService = new PortfolioService(supabase);

export default portfolioService;
