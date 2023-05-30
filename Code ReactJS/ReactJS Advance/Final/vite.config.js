import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linaria from '@linaria/vite';

// # Dùng vite / Dùng vite.config.js
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), linaria()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components", // Dùng "components/..."; là tự hiểu đổ từ thư mục này
    }
  },
  build: {
    outDir: 'build', // Thư mục build ra
  },
  server: {
    open: true, // Tự động chạy browser khi chạy server
    port: 4000,
  },
})
