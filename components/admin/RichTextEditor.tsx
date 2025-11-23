'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter content...',
  className = '',
}: RichTextEditorProps) {
  const [isReady, setIsReady] = useState(false)

  // Wait for client-side initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsReady(true)
    }
  }, [])

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'tiptap-link',
          },
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'tiptap-table',
          },
        }),
        TableRow,
        TableHeader,
        TableCell,
      ],
      content: value || '',
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        onChange(html)
      },
      editorProps: {
        attributes: {
          class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
        },
      },
    },
    [isReady]
  )

  // Sync editor content with external value prop
  useEffect(() => {
    if (editor && value !== undefined && isReady) {
      const currentHtml = editor.getHTML()
      if (currentHtml !== value) {
        editor.commands.setContent(value || '', false)
      }
    }
  }, [value, editor, isReady])

  const addTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    }
  }, [editor])

  if (!isReady || !editor) {
    return (
      <div className={`rich-text-editor ${className}`}>
        <div className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl min-h-[200px] flex items-center justify-center">
          <div className="text-[#2B1341]/70">Loading editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className="border-2 border-[#F8C8DC] rounded-xl overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-3 bg-[#FFF1F5] border-b-2 border-[#F8C8DC]">
          {/* Text Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('bold') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('italic') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('underline') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('strike') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>

          <div className="w-px h-6 bg-[#F8C8DC] mx-1" />

          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Heading 3"
          >
            H3
          </button>

          <div className="w-px h-6 bg-[#F8C8DC] mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('bulletList') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('orderedList') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Numbered List"
          >
            1.
          </button>

          <div className="w-px h-6 bg-[#F8C8DC] mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Align Left"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Align Center"
          >
            ⬌
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Align Right"
          >
            ➡
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Justify"
          >
            ⬌
          </button>

          <div className="w-px h-6 bg-[#F8C8DC] mx-1" />

          {/* Table */}
          <button
            type="button"
            onClick={addTable}
            className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
            title="Insert Table"
          >
            Table
          </button>
          {editor.isActive('table') && (
            <>
              <button
                type="button"
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Add Column Before"
              >
                +Col
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Add Column After"
              >
                Col+
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Delete Column"
              >
                -Col
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addRowBefore().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Add Row Before"
              >
                +Row
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Add Row After"
              >
                Row+
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteRow().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Delete Row"
              >
                -Row
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
                title="Delete Table"
              >
                Del Table
              </button>
            </>
          )}

          <div className="w-px h-6 bg-[#F8C8DC] mx-1" />

          {/* Other */}
          <button
            type="button"
            onClick={() => {
              const url = window.prompt('Enter URL:')
              if (url) {
                editor.chain().focus().setLink({ href: url }).run()
              }
            }}
            className={`px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors ${
              editor.isActive('link') ? 'bg-[#F8C8DC] text-[#D91656]' : 'text-[#640D5F]'
            }`}
            title="Add Link"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
            className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F] disabled:opacity-50"
            title="Remove Link"
          >
            Unlink
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="px-3 py-1 rounded hover:bg-[#F8C8DC] transition-colors text-[#640D5F]"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .rich-text-editor .ProseMirror {
          outline: none;
          min-height: 200px;
          padding: 1rem;
          font-size: 14px;
          line-height: 1.6;
        }
        .rich-text-editor .ProseMirror p {
          margin: 0.5rem 0;
        }
        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .rich-text-editor .tiptap-table {
          border-collapse: collapse;
          margin: 1rem 0;
          table-layout: fixed;
          width: 100%;
          overflow: hidden;
        }
        .rich-text-editor .tiptap-table td,
        .rich-text-editor .tiptap-table th {
          min-width: 1em;
          border: 1px solid #ccc;
          padding: 8px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .rich-text-editor .tiptap-table th {
          font-weight: bold;
          text-align: left;
          background-color: #f1f3f5;
        }
        .rich-text-editor .tiptap-table .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: '';
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }
        .rich-text-editor .tiptap-table .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #adf;
          pointer-events: none;
        }
        .rich-text-editor .ProseMirror:focus {
          outline: none;
        }
        .rich-text-editor .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .rich-text-editor .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .rich-text-editor .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .rich-text-editor .ProseMirror ul,
        .rich-text-editor .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .rich-text-editor .ProseMirror a {
          color: #d91656;
          text-decoration: underline;
        }
        .rich-text-editor .ProseMirror a:hover {
          color: #640d5f;
        }
      `}</style>
    </div>
  )
}
