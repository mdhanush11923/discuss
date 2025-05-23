import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByItsPostId } from "@/db/queries/comments";

interface CommentShowProps {
  commentId: string,
  postId: string,
  showReplies: boolean
}

export default async function CommentShow({ commentId, postId, showReplies }: CommentShowProps) {
  const comments  = await fetchCommentsByItsPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);

  const renderedChildren = showReplies
    ? children.map((child) => (
        <CommentShow key={child.id} commentId={child.id} postId={postId} showReplies={true} />
      ))
    : null;

  return (
    <div className="p-2 sm:p-4 bg-gray-50 border border-l-2 border-l-gray-300 mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
{/*
          <Button>toggle show replies</Button> */}
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
