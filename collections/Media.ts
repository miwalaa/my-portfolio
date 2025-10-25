import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    // S3 storage is configured in payload.config.ts
    // Fallback to local storage if S3 is not configured
    ...(process.env.S3_ENDPOINT ? {} : { staticDir: "media" }),
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
