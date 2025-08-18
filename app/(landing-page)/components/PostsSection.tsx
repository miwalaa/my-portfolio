import { getPayloadClient } from "@/lib/payload";
import Link from "next/link";

function formatDate(timestamp: Date) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PostsSection() {
  const payload = await getPayloadClient();

  const posts = await payload.find({
    collection: "posts",
    limit: 2,
    sort: "-createdAt",
  });

  console.log(posts);
  return (
    <section
      id="blog"
      className="mx-auto max-w-7xl mt-10 md:mt-20 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24">
        <div className="w-full md:w-72 flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-light">
            Latest from <br />
            the blog
          </h2>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 md:gap-8 lg:gap-12">
          {posts.docs.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="group block hover:opacity-90 transition-opacity"
            >
              <article className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-light group-hover:text-green-500 transition-colors">
                  {post.title}
                </h3>
                <time
                  dateTime={post.createdAt}
                  className="text-slate-300 text-sm sm:text-base"
                >
                  {formatDate(post.createdAt)}
                </time>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
