import { z } from "zod";

const envSchema = z.object({
  VITE_SOCKET_EVENT_NAME: z.string(),
});
let VITE_ENV = import.meta.env; // this only addes keys that has prifix of  "VITE_"

export const env = envSchema.parse(VITE_ENV);
console.log({env});
