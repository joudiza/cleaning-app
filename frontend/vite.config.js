import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/static/', // ✅ مهم بزاف فـ الإنتاج باش static files يخدمو مع Django
  build: {
    outDir: '../backend/staticfiles/assets', // ✅ خاص يكون ف نفس المستوى مع backend/templates
    emptyOutDir: true,
    manifest: true, // ✅ ضروري باش Django يعرف فين الملفات
    rollupOptions: {
      input: './index.html', // ✅ نقطة الدخول
    },
  },
  server: {
    port: 3000, // ✅ dev server
  }
})
