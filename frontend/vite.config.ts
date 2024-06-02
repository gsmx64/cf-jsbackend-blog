import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: Number(env.VITE_APP_PORT),
    },
    build: {
      target: 'esnext'
    },
    plugins: [react()],
  }
});
