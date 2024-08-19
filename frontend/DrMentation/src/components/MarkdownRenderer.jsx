import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import CodeBlock from "./CodeBlock";

function Pre({ ...props }) {
  return <div className="not-prose">{props.children}</div>;
}

function MarkdownRenderer({ document, style }) {
  const options = { code: CodeBlock, pre: Pre };

  return (
    <div className={style}>
      {document ? (
        <Markdown
          className="prose prose-invert break-words p-5 mr-5 ml-5 bg-backgroundtint rounded-3xl w-full max-w-full"
          components={options}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSanitize,
            [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
          ]}
        >
          {document.content}
        </Markdown>
      ) : (
        <div />
      )}
    </div>
  );
}

export default MarkdownRenderer;
