import { db } from "@/db";
import { notFound } from "next/navigation";
import ReadOnlyTiptap from "../readonly-tiptap";

interface PostShowProps {
  postId: string
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: {
      id: postId
    }
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mt-10 text-center">{post.title}</h1>
      <ReadOnlyTiptap htmlContent={post.content} />
    </div>
  );
}