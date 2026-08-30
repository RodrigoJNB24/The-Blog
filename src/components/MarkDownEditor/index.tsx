import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useId, useState } from 'react';
import { unorderedListCommand } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type MarkDownEditorProps = {
  labelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled?: boolean;
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export function MarkDownEditor({
  labelText = '',
  value,
  setValue,
  textAreaName,
  disabled = false,
}: MarkDownEditorProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}

      <MDEditor
        className='whitespace-pre-wrap'
        value={value}
        onChange={value => {
          if (value === undefined) return;
          setValue(value);
        }}
        height={400}
        extraCommands={[]}
        textareaProps={{
          id,
          name: textAreaName,
          disabled,
        }}
        hideToolbar={disabled}
        preview='edit'
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
      />
    </div>
  );
}
