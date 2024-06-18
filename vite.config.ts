import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
  server: {
    host: true,
    open: true,
    port: 4005,
    strictPort: true,
  },
  resolve: {
    alias: {

      '@/components': `${path.resolve(__dirname, './src/components/')}`,
      '@/axiosInstance': `${path.resolve(__dirname, './src/axiosInstance/')}`,
      '@/assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@/context': `${path.resolve(__dirname, './src/context/')}`,
      '@/hooks': `${path.resolve(__dirname, './src/hooks/')}`,
      '@/lib': `${path.resolve(__dirname, './src/lib/')}`,
      '@/middleware': `${path.resolve(__dirname, './src/middleware/')}`,
      '@/pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@/paths': `${path.resolve(__dirname, './src/paths/')}`,
      '@/store': `${path.resolve(__dirname, './src/store/')}`,
      '@/types': `${path.resolve(__dirname, './src/types/')}`,
      '@/utils': `${path.resolve(__dirname, './src/utils/')}`,
      '@/styles': `${path.resolve(__dirname, './src/styles/')}`,
      '@/socket': `${path.resolve(__dirname, './src/socket/')}`,
      '@/theme': `${path.resolve(__dirname, './src/theme/')}`,
    },
  },
})
