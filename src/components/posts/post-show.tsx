import { db } from "@/db";
import { notFound } from "next/navigation";
import ReadOnlyTiptap from "../readonly-tiptap";

interface PostShowProps {
  postId: string
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    include: {
      user: { select: { name: true } },
    },
    where: {
      id: postId,
    }
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mt-10">{post.title}</h1>
      <div className="flex gap-5 text-gray-500 text-sm">
        <p className="">{post.user.name}</p>
        <p className="">{post.createdAt.toDateString()}</p>
      </div>
      <ReadOnlyTiptap htmlContent={post.content} />
    </div>
  );
}