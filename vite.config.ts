import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: [
        { find: /^@\//, replacement: path.resolve(__dirname, './src') + '/' },  // Handles all @/xxx → src/xxx
      // Or more explicitly regex: { find: /^@\/(.*)/, replacement: path.resolve(__dirname, './src') + '/$1' }
      ],
    },
    optimizeDeps: {
      include: ['buffer', 'long'],
    },
    define: {
      'global.process': {
        env: {
          NODE_ENV: JSON.stringify(mode),
          API_KEY: JSON.stringify(env.API_KEY || process.env.API_KEY),
        },
      },
    },
  };
});