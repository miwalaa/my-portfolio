"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RichTextRender from "@/components/RichTextRender";
import Navbar from "@/app/(landing-page)/components/Navbar";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

type Post = {
  id: string;
  title: string;
  content: any;
  createdAt: string;
  publishedAt: string;
  slug: string;
};

function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Invalid post URL");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/posts/${slug}`, {
          headers: { Accept: "application/json" },
        });

        const text = await res.text();
        if (text.trim().startsWith("<!"))
          throw new Error("Invalid API response");

        const data = text ? JSON.parse(text) : null;
        if (!res.ok) throw new Error(data?.message || "Failed to fetch post");

        const postData = data?.post || data;
        if (
          !postData?.id ||
          !postData?.title ||
          !postData?.content ||
          !postData?.slug
        ) {
          throw new Error("Post data is incomplete");
        }

        console.log("Post content:", JSON.stringify(postData.content, null, 2));
        setPost({
          id: postData.id,
          title: postData.title,
          content: postData.content,
          slug: postData.slug,
          createdAt: postData.createdAt || new Date().toISOString(),
          publishedAt:
            postData.publishedAt ||
            postData.createdAt ||
            new Date().toISOString(),
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load post";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner
          className="h-8 md:h-12 w-8 md:w-12 text-white"
          variant="bars"
        />
      </div>
    );
  }

  if (error || !post) {
    return <div className="text-center py-10">{error || "Post not found"}</div>;
  }

  return (
    <article className="prose dark:prose-invert max-w-5xl mx-auto p-5">
      <Navbar />
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-500">
        {post.title}
      </h1>
      {post.createdAt && (
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <RichTextRender content={post.content} />
    </article>
  );
}

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  return (
    <div className="min-h-screen flex flex-col bg-black bg-grid-white/[0.1]">
      <PostContent slug={slug || ""} />
    </div>
  );
}
