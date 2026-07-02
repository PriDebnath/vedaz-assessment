import { z } from "zod";

const envSchema = z.object({
    VITE_SOCKET_STATUS_EVENT_NAME: z.string().min(1, "VITE_SOCKET_STATUS_EVENT_NAME is required"),
    VITE_SOCKET_MESSAGE_EVENT_NAME: z.string().min(1, "VITE_SOCKET_STATUS_EVENT_NAME is required"),});
let VITE_ENV = import.meta.env; // this only addes keys that has prifix of  "VITE_"

export const env = envSchema.parse(VITE_ENV);
console.log({env});
