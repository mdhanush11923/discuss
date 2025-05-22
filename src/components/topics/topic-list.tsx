import { db } from "@/db";
import paths from "@/paths";
import { Button } from "@heroui/button";
import Link from "next/link";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-wrap gap-2 pb-4">
      {topics.map((topic) => {
        return (
          <div key={topic.id}>
            <Link href={paths.topicShow(topic.slug)}>
              <Button
                className="p-4"
                radius="sm"
                variant="flat"
                size="sm"
              >
                {topic.slug}
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
