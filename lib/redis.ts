import { Redis } from "@upstash/redis";

const url = process.env.REDIS_URL;
const token = process.env.REDIS_TOKEN;

let client: Redis | null = null;

export function getRedis(): Redis {
  if (client) return client;
  if (!url || !token) {
    throw new Error("Redis env vars missing");
  }
  client = new Redis({ url, token });
  return client;
}
