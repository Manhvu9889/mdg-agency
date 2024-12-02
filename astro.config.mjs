// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import pageInsight from 'astro-page-insight';
// https://astro.build/config
export default defineConfig({
    site: 'https://mdg-agency.com/',
    integrations: [
        tailwind(),
        icon({
            svgoOptions: {},
            include: {
                'fa6-solid': [
                    'arrow-up',
                    'check',
                    'award',
                    'bolt',
                    'dollar-sign',
                    'cubes',
                    'arrow-right',
                    'arrow-left'
                ],
                'fa6-brands': ['telegram']
            }
        }),
        playformCompress({
            Image: {
                sharp: {
                    jpeg: {
                        quality: 65,
                        progressive: true,
                        mozjpeg: true,
                        trellisQuantisation: true,
                        overshootDeringing: true,
                        optimizeScans: true
                    },
                    webp: {
                        smartSubsample: true,
                        quality: 65,
                        lossless: false,
                        effort: 6,
                        nearLossless: true
                    },
                    avif: {
                        quality: 60,
                        effort: 9,
                        chromaSubsampling: '4:2:0'
                    },
                    png: {
                        quality: 65,
                        compressionLevel: 9,
                        palette: true,
                        dither: 1.0
                    },
                    gif: {
                        effort: 10,
                        colors: 128
                    }
                }
            },
            HTML: {
                'html-minifier-terser': {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    sortClassName: true,
                    removeEmptyAttributes: true,
                    removeEmptyElements: false,
                    removeOptionalTags: true,
                    removeTagWhitespace: true,
                    sortAttributes: true
                }
            },
            CSS: {
                csso: {
                    restructure: true,
                    forceMediaMerge: true
                },
                lightningcss: {
                    minify: true,
                    sourceMap: false
                }
            },
            JavaScript: {
                terser: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: [
                            'console.log',
                            'console.info',
                            'console.debug'
                        ],
                        passes: 3
                    },
                    mangle: true,
                    format: {
                        comments: false
                    },
                    keep_classnames: false,
                    keep_fnames: false
                }
            }
        }),
        pageInsight(),
        react(),
        sitemap({
            filter: (page) => page !== 'https://mdg-agency.com/admin'
        }),
        mdx()
    ],
    output: 'static',
    build: {
        assets: '_ovftank',
        inlineStylesheets: 'never'
    },
    vite: {
        build: {
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'framer-motion']
                    }
                }
            }
        },
        resolve: {
            alias: {
                '@': '/src'
            }
        }
    },
    compressHTML: true,
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'load'
    },
    server: {
        port: 5173,
        host: '0.0.0.0'
    },
    devToolbar: {
        enabled: true
    },
    markdown: {
        shikiConfig: {
            theme: 'github-dark',
            wrap: true
        }
    }
});
