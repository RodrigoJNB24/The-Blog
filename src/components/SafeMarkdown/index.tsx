import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkDownProps = {
  markdown: string;
};

export default function SafeMarkDown({ markdown }: SafeMarkDownProps) {
  return (
    <div
      className={clsx(
        'prose prose-slate w-full max-w-none overflow-hidden',
        'prose-a:transition prose-a:no-underline',
        'prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:hover:underline',
        'prose-img:mx-auto',
        'md:prose-lg',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';
            console.log(node)
            return (
              <div className='overflow-x-auto'>
                <table {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
