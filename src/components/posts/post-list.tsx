import Link from "next/link";
import paths from "@/paths";
import { PostWithData } from "@/db/queries/posts";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}
export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  // const posts = await db.post.findMany({
  //   select: {
  //     topic: {
  //       select: {
  //         slug: true,
  //       },
  //     },
  //     user: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     title: true,
  //     id: true,
  //     _count: {
  //       select: {
  //         comments: true,
  //       },
  //     },
  //   },
  // });

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div key={post.id} className="border-2 rounded-md p-4 hover:bg-gray-50">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="truncate text-lg mb-2 font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">{topicSlug}</p>
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
