import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'
dns.setDefaultResultOrder('ipv4first')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: true,
      strictPort: true,
      port: Number(env.VITE_APP_PORT),
    },
    build: {
      target: 'esnext'
    },
    plugins: [react()],
  }
});
