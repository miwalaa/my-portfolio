import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "createdAt", "status"],
  },
  access: {
    read: () => true, // public read
    create: ({ req: { user } }) => Boolean(user), // only logged in users can create
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        // Revalidate the homepage whenever a project is created, updated, or deleted
        revalidatePath("/", "page");
        console.log(`Project ${operation}: Revalidated homepage`);
        return doc;
      },
    ],
    afterDelete: [
      () => {
        // Revalidate the homepage when a project is deleted
        revalidatePath("/", "page");
        console.log("Project deleted: Revalidated homepage");
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "Short description for project card",
      },
    },
    {
      name: "fullDescription",
      type: "textarea",
      required: true,
      admin: {
        description: "Detailed description for project modal",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Project cover image",
      },
    },
    {
      name: "tags",
      type: "array",
      required: true,
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Technology tags (e.g., React, TypeScript)",
      },
    },
    {
      name: "techStack",
      type: "array",
      required: true,
      fields: [
        {
          name: "technology",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Full technology stack used in the project",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "githubUrl",
      type: "text",
      admin: {
        description: "GitHub repository URL (optional)",
      },
    },
    {
      name: "liveUrl",
      type: "text",
      admin: {
        description: "Live preview/demo URL (optional)",
      },
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Display order (lower numbers appear first)",
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
};
