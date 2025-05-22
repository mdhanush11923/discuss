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
  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const handleFocusTextarea = () => {
    textareaRef.current?.focus();
  };

  const form = (
    <form action={action} ref={formRef}>
      <div
        className="border rounded-md p-5 bg-gray-100 hover:border-gray-400 transition cursor-text space-y-3"
        onClick={handleFocusTextarea}
      >
        <Textarea
          ref={textareaRef}
          name="content"
          placeholder="Add a comment..."
          isInvalid={!!formState.errors.content}
          radius="sm"
          errorMessage={formState.errors.content?.join(", ")}
          classNames={{
            inputWrapper:
              "p-0 shadow-none",
            base: "bg-gray-100",
            innerWrapper: "bg-gray-100",
            mainWrapper: "hover:bg-gray-100"
          }}
        />

        <div className="flex justify-end m-[-10px]">
          <FormButton isPending={isPending}>Create Comment</FormButton>
        </div>

        {formState.errors._form ? (
          <div className="p-2 bg-red-100 border rounded border-red-400 text-sm text-red-700">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
      </div>
    </form>
  );

  return (
    <div>
      <Button
        radius="sm"
        size="sm"
        variant="light"
        onPress={() => setOpen(!open)}
      >
        Reply
      </Button>
      {open && form}
    </div>
  );
}
