 import { z } from "zod";
 import path from 'path';
import dotenv from "dotenv";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import routerPlugin, { tanstackRouter } from '@tanstack/router-plugin/vite'

const envSchema = z.object({
    VITE_SOCKET_EVENT_NAME: z.string().min(1, "SOCKET_EVENT_NAME is required"),
});

export default defineConfig(({ mode , }) => {
  const isGithub = mode === 'github'
  const env = loadEnv(mode, "../", "");
  // const envSanitized = envSchema.parse(env);
// console.log({env});

  console.log(env.VITE_SOCKET_EVENT_NAME);

  return {
    envDir: "../",
    // 🔑 BASE URL
    // Android → "./"
    // GitHub Pages → "/repo-name/"
    base: isGithub ? '/gridaan-assessment/' : './',
    plugins: [
      react({
        // babel: {
          // plugins: [['babel-plugin-react-compiler']],
        // },
      }),
      tailwindcss(),
      routerPlugin(),
      // tanstackRouter({
      //   // Configure for test environment
      //   routesDirectory: './src/routes',
      //   generatedRouteTree: './src/routeTree.gen.ts',
      //   // disableLogging: true,
      // }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
