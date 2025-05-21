"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import HardBreak from "@tiptap/extension-hard-break";
import Bold from "@tiptap/extension-bold";

type ReadOnlyTiptapProps = {
  htmlContent: string;
};

const ReadOnlyTiptap: React.FC<ReadOnlyTiptapProps> = ({ htmlContent }) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, HardBreak, HorizontalRule, BulletList, OrderedList, ListItem],
    content: htmlContent,
    editable: false,
    editorProps: {
      attributes: {
        class:
          "text-base m-5 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className="border-2 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6  leading-relaxed"
    />
  );
};

export default ReadOnlyTiptap;
