import { processQueue } from "@/configs/bullmq.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { portfolioId, resumeUrl } = await req.json();

    const key: string = `JobId:${portfolioId}`;

    // console.log(key, portfolioId);

    const job = await processQueue.getJob(key);
    if (!job) {
      await processQueue.add(
        "processResumeJob",
        { portfolioId, key, resumeUrl },
        {
          jobId: key,
          removeOnComplete: true,
          removeOnFail: true,
          attempts: 2,
          backoff: 5000,
        }
      );
      console.log("Job added successfully!");
    } else {
      console.log("Job already exists!");
    }
    return NextResponse.json({
      status: true,
      message: "Job added successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to add job!",
      },
      {
        status: 500,
      }
    );
  }
}
