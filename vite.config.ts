import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ENV_PREFIX = ['VITE_']

export default defineConfig({
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

  optimizeDeps: {
    include: ['bs58'],
  },
  build: {
    // commonjsOptions zabezpečí správne bundlovanie CJS modulov ako bs58
    commonjsOptions: {
      include: [/bs58/, /node_modules/],
    },
  },

  plugins: [
    react({ jsxRuntime: 'classic' }),
  ],
})
