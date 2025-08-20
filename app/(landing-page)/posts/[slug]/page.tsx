import { getPayloadClient } from "@/lib/payload";
import RichTextRender from "@/components/RichTextRender";
import Navbar from "../../components/Navbar";

// @ts-nocheck
// This is a workaround for Next.js 15 type issues with dynamic routes
async function PostContent({ slug }: { slug: string }) {
  const payload = await getPayloadClient();
  const post = await payload.find({
    collection: "posts",
    where: {
      id: {
        equals: slug,
      },
    },
  });

  if (!post || !post.docs.length) {
    return <div>Post not found</div>;
  }

  const data = post.docs[0];

  return (
    <div className="flex-1 w-full">
      <div className="mx-auto p-5 h-full">
        <article className="prose dark:prose-invert max-w-none h-full">
          <h1 className="text-4xl text-green-500 md:text-5xl font-bold mb-6">
            {data.title}
          </h1>
          {data.createdAt && (
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <div className="prose-lg">
            <RichTextRender content={data.content} />
          </div>
        </article>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto p-5 w-full">
        <Navbar />
        <PostContent slug={slug} />
      </div>
    </div>
  );
}
