import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { db } from "@/db";
import { fetchPostByTopicSlug } from "@/db/queries/posts";
import { Divider } from "@heroui/react";
import React from "react";

export default async function TopicShowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = await db.topic.findFirst({ where: { slug } });

  return (
    <div className="min-h-full grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
      <div className="flex flex-col col-span-3">
        <h1 className="capitalize text-2xl font-bold mb-6">{slug}</h1>
        <p className="">{topic?.description}</p>
        <Divider className="my-5 invisible" />
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>

      <div className="my-5 justify-self-center">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
