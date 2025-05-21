"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };

  inputs?: {
    title?: string;
    content?: string;
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const rawData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const result = createPostSchema.safeParse(rawData);

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const topic = await db.topic.findFirst({
    where: {slug}
  })

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"]
      }
    }
  }

  let post: Post;

  try {
    let content = result.data.content.trim();
    if (!/<[a-z][\s\S]*>/i.test(content)) {
      content = `<p>${content}</p>`;
    }

    post = await db.post.create({
      data: {
        title: result.data.title,
        content,
        userId: session.user.id as string,
        topicId: topic.id
      }
    })
  }
  catch (e: unknown) {
    if(e instanceof Error) {
      return {
        errors: {
          _form: [e.message]
        }
      }
    }
    else {
      return {
        errors: {
          _form: ["Failed to create post"]
        }
      }
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id))
}
