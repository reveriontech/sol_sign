import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server :{
		port: 4000,
    host: true,
		watch: {
		usePolling: true,
		interval: 30,
		},
    allowedHosts: 'all'
	}
})