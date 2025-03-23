import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Divider } from "@heroui/divider";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";

export default function HomePage() {
  return (
    <div className="grid re:grid-cols-4 grid-cols-1 gap-4">
      <div className="re:col-span-3">
        <h1 className="text-xl m-2 mb-5">
          <StarsRoundedIcon /> Top Posts
        </h1>
        <PostList fetchData={() => fetchTopPosts()} />
      </div>
      <div className="flex flex-col border m-2 px-5 py-3 shadow">
        <div className="flex w-full">
          <TopicCreateForm />
        </div>
        <Divider className="my-3" />
        <h3 className="text-lg my-3">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
