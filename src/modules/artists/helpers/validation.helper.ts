import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const artistSchema = zValidator(
  'query',
  z
    .object({
      id: z.string().optional(),
      link: z
        .string()
        .url()
        .optional()
        .transform((value) => value?.match(/jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/)?.[1]),
      page: z.string().default('0'),
      sortBy: z.enum(['alphabetical', 'popularity', 'latest']).default('popularity'),
      sortOrder: z.enum(['asc', 'desc']).default('asc'),
      songCount: z.string().default('10'),
      albumCount: z.string().default('10')
    })
    .refine((data) => !(data.id && data.link), {
      message: 'either id or link must be provided, but not both.',
      path: ['id']
    })
    .refine((data) => data.id || data.link, {
      message: 'either id or link must be provided.',
      path: ['id']
    })
)

export const artistSongsAndAlbumsSchema = zValidator(
  'query',
  z.object({
    page: z.string().default('0'),
    sortBy: z.enum(['alphabetical', 'popularity', 'latest']).default('popularity'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    songCount: z.string().default('10'),
    albumCount: z.string().default('10')
  })
)

export const artistSongsSchema = zValidator(
  'query',
  z.object({
    page: z.string().default('0'),
    sortBy: z.enum(['alphabetical', 'popularity', 'latest']).default('popularity'),
    sortOrder: z.enum(['asc', 'desc']).default('asc')
  })
)

export const artistAlbumsSchema = zValidator(
  'query',
  z.object({
    page: z.string().default('0'),
    sortBy: z.enum(['alphabetical', 'popularity', 'latest']).default('popularity'),
    sortOrder: z.enum(['asc', 'desc']).default('asc')
  })
)
