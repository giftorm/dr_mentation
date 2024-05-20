import { useState, React, Fragment } from 'react';
import Header from './components/Header';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeExternalLinks from 'rehype-external-links';

function App() {
  const [editMode, setEditMode] = useState(false);
  const [source, setSource] = useState('');
  const options = { code: CodeBlock, pre: Pre };


  const handleSave = () => {
    console.log("saved");
    setEditMode(false);
  };

  const handleExit = () => {
    setEditMode(false);
  };

  const handleNew = () => {
    setSource('');
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Fragment>
      <div className='bg-background min-h-screen flex flex-col'>
        <Header />
        <SubHeader
          editMode={editMode}
          onSave={handleSave}
          onExit={handleExit}
          onNew={handleNew}
          onEdit={handleEdit}
          onChange={setSource}
        />
        <div className='flex-grow flex justify-center'>
          <div className='flex flex-grow max-w-[896px] w-full'>
            {editMode && <Editor source={source} onChange={setSource} />}
            {editMode && (
              <div className='w-[2px] border-l-2 border-text border-dashed'></div>
            )}
            <MarkdownArea source={source} options={options} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function Editor({ source, onChange }) {
  return (
    <section className='flex-grow w-full pt-5'>
      <textarea
        className='p-5 text-text w-full bg-transparent h-full resize-none focus:outline-none placeholder:text-lg placeholder:text-white placeholder:tracking-wider placeholder:opacity-80'
        placeholder='Markdown goes here...'
        onChange={(e) => onChange(e.target.value)}
        value={source}
        autoFocus
      />
    </section>
  );
}

function MarkdownArea({ source, options }) {
  return (
    <article className='flex-grow w-full p-5 overflow-auto'>
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

function CodeBlock({ ...props }) {
  return (
    <SyntaxHighlighter
      language={props.className?.replace(/(?:lang(?:uage)?-)/, '')}
      style={materialOceanic}
      wrapLines={true}
      className='not-prose rounded-md'
    >
      {props.children}
    </SyntaxHighlighter>
  );
}

function Pre({ ...props }) {
  return <div className='not-prose'>{props.children}</div>;
}

function SubHeader({ editMode, onSave, onExit, onNew, onEdit, onChange }) {
  const buttonStyle = 'flex text-xl mx-4 text-text rounded-md font-primary';

  if (editMode) {
    const btns = [
      { name: 'B', syntax: '**Bold**' },
      { name: 'I', syntax: '*Italic*' },
      { name: 'S', syntax: '~Strikethrough~' },
      { name: 'H1', syntax: '# ' },
    ];

    return (
      <header className='flex items-center h-14 sticky border-t-2 justify-center'>
        <div className='flex space-x-4'>
        {btns.map((btn) => (
          <button key={btn.syntax} className={buttonStyle} onClick={() => {onChange(btn.syntax)}}>
            {btn.name}
          </button>
        ))}
        <button key='save' className={buttonStyle} onClick={onSave}>
          save
        </button>
        <button key='exit' className={buttonStyle} onClick={onExit}>
          exit
        </button>
        </div>
      </header>
    );
  }

  return (
      <header className='flex items-center h-14 sticky border-t-2 justify-center'>
            <div className='flex space-x-4'>
          <button key='new' className={buttonStyle} onClick={onNew}>
            new
          </button>
          <button key='edit' className={buttonStyle} onClick={onEdit}>
            edit
          </button>
      </div>
        </header>
      );
}

export default App;

