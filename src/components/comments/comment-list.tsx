import CommentShow from "@/components/comments/comment-show";
import { fetchCommentsByItsPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByItsPostId(postId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        postId= {postId}
        showReplies={true}
      />
    );
  });

  const commentCount = comments.length;

  const heading =
    commentCount === 0
      ? "Be the first to comment!"
      : commentCount === 1
      ? "1 comment"
      : `All ${commentCount} comments`;


  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">{heading}</h1>
      {renderedComments}
    </div>
  );
}
