"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";

export default function MyEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      HardBreak.configure({
        keepMarks: true,
      }),
    ],
    content: "",
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter") {
          event.preventDefault();
          view.dispatch(
            view.state.tr.replaceSelectionWith(
              view.state.schema.nodes.hardBreak.create()
            )
          );
          return true;
        }
        return false;
      },
      attributes: {
        class:
          "w-full min-h-[150px] p-4 text-lg leading-relaxed text-gray-800 focus:outline-gray-400 bg-gray-100 rounded-xl border-2 shadow-sm border-gray-300",
      },
    },
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
