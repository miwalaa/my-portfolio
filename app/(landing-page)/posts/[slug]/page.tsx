"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RichTextRender from "@/components/RichTextRender";
import Navbar from "../../components/Navbar";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

type Post = {
  id: string;
  title: string;
  content: any;
  publishedAt: string;
  slug: string;
};

function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching post with slug: ${slug}`);
        const response = await fetch(`/api/posts/${slug}`);

        // First try to parse the response as JSON
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError);
          throw new Error("Invalid response from server");
        }

        if (!response.ok) {
          console.error("API Error Response:", {
            status: response.status,
            statusText: response.statusText,
            data,
          });
          throw new Error(
            data?.error ||
              data?.message ||
              `Failed to fetch post (${response.status} ${response.statusText})`
          );
        }

        if (!data?.post) {
          console.error("No post data in response:", data);
          throw new Error("Post data is missing from response");
        }

        console.log("Received post data:", data.post);
        setPost({
          id: data.post.id,
          title: data.post.title,
          content: data.post.content,
          publishedAt: data.post.publishedAt || new Date().toISOString(),
          slug: data.post.slug,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load post";
        console.error("Error in PostContent:", {
          error: errorMessage,
          errorObject: err,
          slug,
          timestamp: new Date().toISOString(),
        });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setError("Invalid post URL");
      setLoading(false);
    }
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
    <div className="flex-1 w-full">
      <div className="mx-auto p-5 h-full">
        <article className="prose dark:prose-invert max-w-none h-full">
          <h1 className="text-4xl text-green-500 md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose-lg">
            <RichTextRender content={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto p-5 w-full">
        <Navbar />
        <PostContent slug={slug || ""} />
      </div>
    </div>
  );
}
