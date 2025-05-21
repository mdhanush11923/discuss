'use client'
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

export default () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, BulletList, OrderedList, ListItem],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content: `
        <p>
          I like lists. Let’s add one:
        </p>
        <ul>
          <li>This is a bullet list.</li>
          <li>And it has three list items.</li>
          <li>Here is the third one.</li>
        </ul>
        <p>
          Do you want to see one more? I bet! Here is another one:
        </p>
        <ol>
          <li>That’s a different list, actually it’s an ordered list.</li>
          <li>It also has three list items.</li>
          <li>And all of them are numbered.</li>
        </ol>
        <p>
          Lists would be nothing without list items.
        </p>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="flex flex-wrap gap-3 mb-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-4 py-2 rounded border text-sm font-medium ${
              editor.isActive("bulletList")
                ? "bg-black text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
            }`}
          >
            • Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-4 py-2 rounded border text-sm font-medium ${
              editor.isActive("orderedList")
                ? "bg-black text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
            }`}
          >
            1. Ordered List
          </button>
          <button
            onClick={() =>
              editor.chain().focus().splitListItem("listItem").run()
            }
            disabled={!editor.can().splitListItem("listItem")}
            className="px-4 py-2 rounded border text-sm font-medium bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↵ Split
          </button>
          <button
            onClick={() =>
              editor.chain().focus().sinkListItem("listItem").run()
            }
            disabled={!editor.can().sinkListItem("listItem")}
            className="px-4 py-2 rounded border text-sm font-medium bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            → Indent
          </button>
          <button
            onClick={() =>
              editor.chain().focus().liftListItem("listItem").run()
            }
            disabled={!editor.can().liftListItem("listItem")}
            className="px-4 py-2 rounded border text-sm font-medium bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Outdent
          </button>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="border-2 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 leading-loose"
      />
    </>
  );
};

