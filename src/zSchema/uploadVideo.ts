import { z } from 'zod';

export const uploadVideoSchema = z.object({
  title: z.string({
    required_error: 'Title is required.',
    invalid_type_error: 'Title must be in string',
  }),
  description: z.string({
    required_error: 'Description is required.',
    invalid_type_error: 'Description must be in string',
  }),
  thumbnail: z.string({
    required_error: 'Thumbnail is required.',
    invalid_type_error: 'Thumbnail must be in string',
  }),
  videoFile: z.string({
    required_error: 'Video is required.',
    invalid_type_error: 'Video must be in string',
  }),
});

export type UploadVideoSchemaType = z.infer<typeof uploadVideoSchema>;
