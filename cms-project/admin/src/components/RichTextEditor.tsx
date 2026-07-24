'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-4 focus:outline-none'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2 rounded-xl border border-slate-700 bg-slate-900 p-2">
        <button type="button" className="rounded px-2 py-1" onClick={() => editor?.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button type="button" className="rounded px-2 py-1" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button type="button" className="rounded px-2 py-1" onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
