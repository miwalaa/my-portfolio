"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface Post {
  id: string;
  title: string;
  createdAt: string;
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl mt-10 md:mt-20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-12 w-12 text-white" variant="bars" />
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="blog"
      className="mx-auto max-w-7xl mt-10 md:mt-20 py-10 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <motion.div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24">
        <motion.div className="w-full md:w-72 flex-shrink-0" variants={item}>
          <h2 className="text-3xl sm:text-4xl font-bold text-light">
            Latest from <br />
            the blog
          </h2>
        </motion.div>
        <motion.div
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 md:gap-8 lg:gap-12"
          variants={container}
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <Link
                href={`/posts/${post.id}`}
                className="block hover:opacity-90 transition-opacity"
              >
                <article className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-light group-hover:text-green-500 transition-colors">
                    {post.title}
                  </h3>
                  <time
                    dateTime={post.createdAt}
                    className="text-slate-300 text-sm sm:text-base block"
                  >
                    {formatDate(post.createdAt)}
                  </time>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
