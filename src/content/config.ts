import { defineCollection, type SchemaContext, z } from 'astro:content';

const baiVietCollection = defineCollection({
    type: 'content',
    schema: ({ image }: SchemaContext) =>
        z.object({
            title: z.string(),
            description: z.string(),
            thumbnail: image().refine((img) => img, {
                message: 'Thumbnail is required'
            }),
            category: z.enum([
                'facebook',
                'tiktok',
                'youtube',
                'instagram',
                'content-writer',
                'other'
            ]),
            readTime: z.string()
        })
});
export const collections = {
    'bai-viet': baiVietCollection
} as const;
