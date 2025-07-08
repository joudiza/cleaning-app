

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ هادي هي المهمة
export default defineConfig({
  plugins: [react()],
  base: '/static/', // ⬅️ ضروري هادي باش مايديرش /assets/ مباشرة
  build: {
    outDir: '../frontend/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: './index.html',
    },
  },
   server: {
    port: 3000, // ✅ هنا صحيح
  }
})
