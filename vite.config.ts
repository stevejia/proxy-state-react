import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from "vite-plugin-dts";
// import ts from '@vitejs/plugin'
import path, { dirname, format } from 'path';
const outDir = path.resolve(__dirname, 'dist');
const entryDir = path.resolve(__dirname, 'src/lib/index.ts');
export default defineConfig({
    plugins:[dts({
        outputDir: outDir,
    }), react()],
    build: {
        outDir,
        lib: {
            entry: entryDir,
            fileName: (format) => {
                if(format === 'cjs') {
                    return `${format}/[name].js`
                }
                return `index.js`
            },
            formats: ['cjs', 'es']
        },
        manifest: false,
        emptyOutDir: true,
        chunkSizeWarningLimit: 500,
        minify: true,
        rollupOptions: {
            output: {
                globals: {
                    react: 'React'
                }
            },
            external: ['react']
        }
    },
})