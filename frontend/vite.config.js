import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [react(),
     VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Hotel Room Tracker',
        short_name: 'DEL_SITJAR_ROOMS',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: '/static/', // ✅ مهم بزاف فـ الإنتاج باش static files يخدمو مع Django
  build: {
    outDir: '../backend/static', // ✅ خاص يكون ف نفس المستوى مع backend/templates
    emptyOutDir: true,
    manifest: true, // ✅ ضروري باش Django يعرف فين الملفات
    rollupOptions: {
      input: './index.html', // ✅ نقطة الدخول
    },
  },
  server: {
      host: '0.0.0.0',
    port: 3000, // ✅ dev server
  }
})
