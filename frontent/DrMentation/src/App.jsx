import { useState, React, Fragment } from 'react';
import Header from './components/Header';
import Page from './documents/Page';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeExternalLinks from 'rehype-external-links'


function App() {
    return (
        <Fragment>
        <div className='bg-background'>
            <Header />
            {/*<Page />*/}
            <Homepage />
        </div>
        </Fragment>
    );
}


function Homepage() {
    const [source, setSource] = useState('');
    const options = { code: CodeBlock, pre: Pre };
    const feedElement = (syntax) => {
        return setSource(source + syntax);
    }

    let editMode = true;

    return (
        <>
        <SubHeader feedElement={feedElement} />
        <div className='flex-grow flex justify-center w-full'>
            {editMode ? <Editor source={source} onChange={setSource} /> : <></>} 
            {editMode ? (
            <div className='w-[2px] border-l-2 border-text border-dashed'></div>
          ) : null}
            <MarkdownArea source={source} options={options} />
          </div>
        </>
    );
}

function Editor({ source, onChange}) {
    return (
            <section className='flex-grow w-full pt-5 max-w-4xl'>
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
            <article className='flex-grow w-full pt-5 pl-6 min-h-[50vh] overflow-auto max-w-4xl'>
                <Markdown
                  className='prose prose-invert break-words'
                  components={options}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    rehypeSanitize,
                    [rehypeExternalLinks,
                     { content: { type: 'text', value: '🔗' } }
                    ],
                  ]}>
                    {source}
                </Markdown>
            </article>
    );
}

function CodeBlock ({ ...props }) {
    return (
        <SyntaxHighlighter
        language={props.className?.replace(/(?:lang(?:uage)?-)/, '')}
      style={materialOceanic}
      wrapLines={true}
      className='not-prose rounded-md'
    >
      {props.children}
    </SyntaxHighlighter>
    )
}

function Pre ({ ...props }) {
    return (
        <div className='not-prose'>
            {props.children}
        </div>
    )
}

function SubHeader({feedElement}) {
    const btns = [
        { name: 'B', syntax: '**Bold**' },
        { name: 'I', syntax: '*Italic*' },
        { name: 'S', syntax: '~Strikethrough~' },
        { name: 'H1', syntax: '# ' },
    ]
    const buttonStyle = 'flex text-xl ml-10 mr-10 text-text rounded-md font-primary';

  return (
    <header className='flex items-center h-14 sticky border-t-2'>
        {btns.map(btn => (
          <button
            key={btn.syntax}
            className={buttonStyle}
            onClick={() => feedElement(btn.syntax)}
          >
            {btn.name}
          </button>
        ))}
      <button
        key='save'
        className={buttonStyle}
        onClick={() => console.log('Save and close the editor')}
      >save</button>
      <button
        key='exit'
        className={buttonStyle}
        onClick={() => console.log('Close the editor')}
      >exit</button>
    </header>
  )
}


function feedElement (syntax) {
    return setSource(source+syntax);
}


export default App;

