/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'astro:content' {
    interface CollectionConfig {
        'bai-viet': {
            type: 'content';
            schema: import('astro:content').SchemaContext & {
                data: {
                    title: string;
                    description: string;
                    thumbnail: ImageMetadata;
                    category:
                        | 'facebook'
                        | 'tiktok'
                        | 'youtube'
                        | 'instagram'
                        | 'content-writer'
                        | 'other';
                    readTime: string;
                    date: Date;
                };
            };
        };
    }
}

// Netlify types
type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals;

declare namespace App {
    interface Locals extends NetlifyLocals {
    }
}
