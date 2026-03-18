import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep React ecosystem together to avoid context errors
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || 
                id.includes('next-themes') || id.includes('@tanstack/react-query')) {
              return 'vendor-react-ecosystem';
            }
            if (id.includes('supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('radix-ui') || id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            return 'vendor-other';
          }

          // App modules
          if (id.includes('src/pages')) {
            return 'pages';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/hooks')) {
            return 'hooks';
          }
          if (id.includes('src/lib')) {
            return 'utils';
          }
        },
      },
    },
  },
}));
