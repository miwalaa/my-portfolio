import type { CollectionConfig } from "payload";

// Helper function to trigger revalidation via API
async function triggerRevalidation(path: string = "/", type: string = "page") {
  try {
    const revalidationSecret = process.env.REVALIDATION_SECRET;
    
    if (!revalidationSecret) {
      console.warn("REVALIDATION_SECRET not set - skipping revalidation");
      return;
    }

    // Get the base URL for the API call
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${revalidationSecret}`,
      },
      body: JSON.stringify({ path, type }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✓ Revalidated ${path}:`, data);
    } else {
      console.error(`✗ Revalidation failed for ${path}:`, response.status, await response.text());
    }
  } catch (error) {
    console.error("✗ Revalidation error:", error);
  }
}

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
      async ({ doc, operation }) => {
        // Trigger revalidation via API (works on Vercel)
        await triggerRevalidation("/", "page");
        console.log(`Project ${operation}: Triggered revalidation`);
        return doc;
      },
    ],
    afterDelete: [
      async () => {
        // Trigger revalidation via API (works on Vercel)
        await triggerRevalidation("/", "page");
        console.log("Project deleted: Triggered revalidation");
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
