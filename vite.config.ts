import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ENV_PREFIX = ['VITE_']

export default defineConfig(() => ({
  envPrefix: ENV_PREFIX,
  server: { port: 4001, host: false },
  assetsInclude: ["**/*.glb"],
  define: {
    'process.env.ANCHOR_BROWSER': true,
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },

  // <-- TU DOPLŇ tieto sekcie:
  optimizeDeps: {
    include: ['bs58'],
  },
  build: {
    rollupOptions: {
      external: ['bs58'],
    },
  },

  plugins: [
    react({ jsxRuntime: 'classic' }),
  ],
}))
