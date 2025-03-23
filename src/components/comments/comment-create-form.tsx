"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@heroui/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          placeholder="Add a comment..."
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton isPending={isPending}>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button radius="none" size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
