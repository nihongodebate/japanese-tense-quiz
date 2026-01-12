import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercelでのビルドを安定させるための設定ファイル
export default defineConfig({
  plugins: [react()],
  build: {
    // ビルドしたファイルの出力先ディレクトリを指定します
    outDir: 'dist',
  }
})