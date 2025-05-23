import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
        className="re:-ml-7"
      >
        <ArrowBackIcon/> More on {slug}
      </Link>
      <Suspense fallback={<Loading />}>
        <PostShow postId={postId} />
      </Suspense>

      <div className="flex flex-col gap-10">
        <CommentCreateForm postId={postId} startOpen />
        <CommentList postId={postId} />
      </div>
    </div>
  );
}
