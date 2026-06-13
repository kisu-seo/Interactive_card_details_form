// --- Vite Configuration / Build Plugins (바이트 설정 및 빌드 플러그인) ---
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Interactive_card_details_form/', // GitHub Pages 배포를 위한 서브디렉토리 경로 (Base URL) 설정
  build: {
    outDir: 'docs', // 빌드 출력 디렉토리를 docs로 설정하여 GitHub Pages 연동 활성화
  },
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS (테일윈드 CSS) v4.0 통합 플러그인
  ],
})

