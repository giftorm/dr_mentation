import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

const MarkdownRenderer = ({ markdownFilePath }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(markdownFilePath)
      .then(res => res.text())
      .then(text => setMarkdown(text))
      .catch(err => console.error("Failed to load markdown file", err));
  }, [markdownFilePath]);

  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;

