"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RichTextRender from "@/components/RichTextRender";
import Navbar from "../../components/Navbar";

type Post = {
  id: string;
  title: string;
  content: any;
  createdAt: string;
  slug: string;
};

function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data.post);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
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
        Loading...
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
          {post.createdAt && (
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
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
