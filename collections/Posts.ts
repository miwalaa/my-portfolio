import { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor(),
    },
    { name: "publishedAt", type: "date" },
  ],
};

export default Posts;
