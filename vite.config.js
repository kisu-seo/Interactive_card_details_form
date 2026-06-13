// --- Vite Configuration / Build Plugins ---
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS (테일윈드 CSS) v4.0 통합 플러그인
  ],
})

