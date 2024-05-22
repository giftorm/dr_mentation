import { useState, React, Fragment, useRef } from 'react';

import { GetDocument, PostDocument } from './client/document';

import { Document } from './model/Document';

import Header from './components/Header';
import MarkdownRenderer from './components/MarkdownRenderer';
import Editor from './components/Editor';
import SubHeader from './components/SubHeader';


function App() {
  const [editMode, setEditMode] = useState(false);
  const [source, setSource] = useState('');
  const [currentDocument, setCurrentDocument] = useState(undefined);
  const textareaRef = useRef();

  function handleSave() {
    console.log("saved");
    setEditMode(false);
  };

  function handleExit() {
    setEditMode(false);
  };

  function handleNew() {
    let newDoc = Document;
    console.log(newDoc);
    setCurrentDocument(newDoc);
    setEditMode(true);
  };

  function handleEdit() {
    setEditMode(true);
  };

  function feedElement(syntax) {
      setCurrentDocument((prevDocument) => ({
        ...prevDocument,
        content: prevDocument.content + syntax,
      }));
  };

 function updateDocument(content) {
    setCurrentDocument((prevDocument) => ({
      ...prevDocument,
      content: content,
    }));
  }

  return (
    <Fragment>
      <div className='bg-background min-h-screen flex flex-col'>
        <Header />
        <SubHeader
          editMode={editMode}
          onSave={handleSave}
          onExit={handleExit}
          onNew={handleNew}
          onGet={GetDocument}
          onPost={PostDocument}
          onEdit={handleEdit}
          feedElement={feedElement}
          source={source}
          setSource={setSource}
          textareaRef={textareaRef}
        />
        <div className='flex-grow flex justify-center'>
          <div className={`flex ${editMode ? 'flex-grow' : 'justify-center'} max-w-[1794px] w-full`}>
            {editMode && <Editor content={currentDocument.content} onChange={updateDocument} textareaRef={textareaRef}/>}
            {editMode && (
              <div className='w-[2px] border-l-2 border-text border-dashed'></div>
            )}
            <MarkdownRenderer document={currentDocument} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function Editor({ source, onChange, textareaRef }) {
  return (
    <section className='flex-grow w-full pt-5 max-w-4xl'>
      <textarea
        className='p-5 text-text w-full bg-transparent h-full resize-none focus:outline-none placeholder:text-lg placeholder:text-white placeholder:tracking-wider placeholder:opacity-80'
        placeholder='Markdown goes here...'
        onChange={(e) => onChange(e.target.value)}
        value={source}
        autoFocus
        ref={textareaRef}
      />
    </section>
  );
}

function MarkdownArea({ source, options }) {
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

function SubHeader({ editMode, onSave, onExit, onNew, onEdit, feedElement, source, setSource, textareaRef}) {
  const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';
  
  function applyFormat(fix, preOnly) {
    const { selectionStart, selectionEnd } = textareaRef.current;
    let newText;
    if (preOnly) {
      newText = source.slice(0, selectionStart) + fix + source.slice(selectionStart, selectionEnd) + source.slice(selectionEnd);
    } else {
      newText = source.slice(0, selectionStart) + fix + source.slice(selectionStart, selectionEnd) + fix + source.slice(selectionEnd);
    }
    setSource(newText);

    setTimeout(() => {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = selectionStart + fix.length;
      textareaRef.current.selectionEnd = selectionEnd + fix.length;
    }, 0);
  };
  

  if (editMode) {
    const btns = [
      { name: 'B', syntax: '**', preOnly: false},
      { name: 'I', syntax: '*', preOnly: false },
      { name: 'S', syntax: '~', preOnly: false },
      { name: 'H1', syntax: '# ', preOnly: true },
    ];

    return (
      <header className='flex items-center h-14 sticky border-t-2 justify-center'>
        <div className='flex space-x-4'>
          {btns.map((btn) => (
            <button key={btn.syntax} className={buttonStyle} onClick={() => applyFormat(btn.syntax, btn.preOnly)}>
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

