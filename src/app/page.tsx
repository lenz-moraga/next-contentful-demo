import { getAllPosts } from "@/lib/contentful";
import Link from "next/link";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-2">
        {posts.map((post) => (

          <li key={post.slug} className="text-blue-600 underline">
            <Link
              href={`/blog/${post.slug}`}
              className="block hover:text-blue-600 transition-colors"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main >
  );
}
