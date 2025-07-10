"use client";

export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  REDIS_INSTANCE_URL: process.env.REDIS_INSTANCE_URL,
  WORKER_NODE_URL: process.env.NEXT_PUBLIC_WORKER_NODE_URL,
};

// console.log(env);
