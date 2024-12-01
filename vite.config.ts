import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Create a plugin to handle placeholder images
function placeholderPlugin(): Plugin {
  return {
    name: 'placeholder-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/placeholder/')) {
          const [width, height] = req.url
            .split('/')
            .slice(-2)
            .map(n => parseInt(n))

          // Create SVG placeholder
          const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f0f0f0"/>
              <text 
                x="50%" 
                y="50%" 
                font-family="Arial" 
                font-size="12" 
                fill="#666" 
                text-anchor="middle" 
                dy=".3em"
              >${width}x${height}</text>
            </svg>
          `

          res.setHeader('Content-Type', 'image/svg+xml')
          res.end(svg)
          return
        }
        next()
      })
    }
  }
}

// PWA Configuration
const pwaConfiguration: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'BizDateup',
    short_name: 'BizDateup',
    description: 'Startup Investment Platform',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon'
      }
    ],
    categories: ['business', 'finance', 'productivity']
  },
  workbox: {
    // Don't fallback on document based (e.g. `/some-page`) requests
    // This removes the "All" from the default network-first strategy
    navigationPreload: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.bizdateup\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 // 24 hours
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets'
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
          }
        }
      }
    ]
  },
  devOptions: {
    enabled: true,
    type: 'module'
  }
}

// Vite Configuration
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      VitePWA(pwaConfiguration),
      placeholderPlugin(), 
      visualizer({
        template: 'treemap', // or 'sunburst' | 'network'
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'analyze.html' // will be saved in project's root
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      devSourcemap: true
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
            'ui-vendor': ['@headlessui/react', 'lucide-react'],
            'motion-vendor': ['framer-motion'],
            'query-vendor': ['@tanstack/react-query']
          }
        }
      },
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true,
      minify: 'esbuild'
    },
    preview: {
      port: 4000,
      strictPort: true,
      host: true,
      open: true
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux',
        'framer-motion',
        '@headlessui/react',
        'lucide-react'
      ]
    }
  }
})