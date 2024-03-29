import { z } from 'zod';

export const fileSchema = z.object({
  userId: z.string(),
  name: z.string(),
  fileUrl: z.string(),
  publicId: z.string(),
  signature: z.string(),
});

export type FileSchemaT = z.infer<typeof fileSchema>;
