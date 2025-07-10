// import { env } from "@/env";
import { Queue } from "bullmq";

// console.log(process.env.REDIS_INSTANCE_URL);

export const processQueue = new Queue("processQueue", {
  connection: {
    url: process.env.REDIS_INSTANCE_URL,
  },
});
