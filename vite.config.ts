import react from '@vitejs/plugin-react'
import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'

export default {
  resolve: {
    alias: {
      web3: 'web3/dist/web3.min.js',
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  plugins: [
    react(),
  ]
}
