import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// ── Bundle analyzer (run: ANALYZE=true npm run build) ────────
const analyze = process.env.ANALYZE === 'true'
const visualizer = analyze
  ? (await import('rollup-plugin-visualizer')).visualizer({
      open: true,
      gzipSize: true,
      filename: 'dist/stats.html',
    })
  : null

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip pre-compression for GitHub Pages / CDN
    compression({
      algorithm: 'gzip',
      threshold: 1024,     // only compress files > 1 KB
      ext: '.gz',
    }),
    visualizer,
  ].filter(Boolean),
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2020',
    // CSS code-split per async chunk
    cssCodeSplit: true,
    // Increase warning limit (particles is large)
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          particles: ['@tsparticles/react', '@tsparticles/slim'],
          ui: [
            'react-scroll',
            'react-icons',
            'react-type-animation',
            'react-countup',
            'react-intersection-observer',
            'react-vertical-timeline-component',
          ],
          lightbox: ['yet-another-react-lightbox'],
        },
      },
    },
    // Minification
    minify: 'esbuild',
  },
  // ── Image optimisation ──────────────────────────────────────
  // Inline small assets as base64 (< 4 KB)
  assetsInlineLimit: 4096,
})
