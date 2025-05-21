import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { Divider } from "@heroui/react";
interface PostShowPageProps {
  params: Promise<{ slug: string; postId: string }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="min-h-screen space-y-3">
      <Link
        as={NextLink}
        isBlock
        color="foreground"
        href={paths.topicShow(slug)}
        size="sm"
        underline="always"
      >
        {"< "}More on {slug}
      </Link>
      <Suspense fallback={<Loading />}>
        <PostShow postId={postId} />
      </Suspense>

      <CommentCreateForm postId={postId} startOpen />
      <Divider className="my-10 " />
      <CommentList postId={postId} />
    </div>
  );
}
