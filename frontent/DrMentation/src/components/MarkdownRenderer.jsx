import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeExternalLinks from 'rehype-external-links';
import CodeBlock from './CodeBlock';


function Pre({ ...props }) {
  return <div className='not-prose'>{props.children}</div>;
}

function MarkdownRenderer({ source }) {
  const options = { code: CodeBlock, pre: Pre };

  return (
    <article className='flex-grow w-full p-5 overflow-auto max-w-4xl'>
      <Markdown
        className='prose prose-invert break-words max-w-full'
        components={options}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSanitize,
          [rehypeExternalLinks, { content: { type: 'text', value: '🔗' } }],
        ]}
      >
        {source}
      </Markdown>
    </article>
  );
}

export default MarkdownRenderer;
