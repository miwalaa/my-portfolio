// "use client";

// import Link from "next/link";
// import { motion, Variants } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Spinner } from "@/components/ui/shadcn-io/spinner";

// interface Post {
//   id: string;
//   title: string;
//   publishedAt: string;
//   slug: string;
// }

// function formatDate(timestamp: string) {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// export default function PostsSection() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("/api/posts");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         if (data && Array.isArray(data)) {
//           setPosts(data);
//         } else {
//           console.error("Unexpected response format:", data);
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch posts:", error);
//         setPosts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Animation variants
//   const container: Variants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const item: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeInOut" as const,
//       },
//     },
//   };

//   if (isLoading) {
//     return (
//       <section className="mx-auto max-w-7xl mt-6 md:mt-20 py-6 md:py-10 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-center items-center h-32 md:h-64">
//           <Spinner
//             className="h-8 md:h-12 w-8 md:w-12 text-white"
//             variant="bars"
//           />
//         </div>
//       </section>
//     );
//   }

//   return (
//     <motion.section
//       id="blog"
//       className="mx-auto max-w-7xl mt-6 md:mt-20 py-6 md:py-10 px-4 sm:px-6 lg:px-8"
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.2 }}
//       variants={container}
//     >
//       <motion.div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12 lg:gap-24">
//         <motion.div className="w-full md:w-60 flex-shrink-0" variants={item}>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light">
//             Latest from <br />
//             the blog
//           </h2>
//         </motion.div>
//         <motion.div
//           className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12"
//           variants={container}
//         >
//           {posts.map((post) => (
//             <motion.div
//               key={post.id}
//               variants={item}
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.2 }}
//               className="group"
//             >
//               <Link
//                 href={`/posts/${post.slug}`}
//                 className="block hover:opacity-90 transition-opacity"
//               >
//                 <article className="space-y-2 sm:space-y-3 md:space-y-4">
//                   <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-light group-hover:text-green-500 transition-colors leading-tight">
//                     {post.title}
//                   </h3>
//                   <time
//                     dateTime={post.publishedAt}
//                     className="text-slate-300 text-xs sm:text-sm md:text-base block"
//                   >
//                     {formatDate(post.publishedAt)}
//                   </time>
//                 </article>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// }
