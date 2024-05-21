import { useState, React, Fragment } from 'react';

import { GetDocument, PostDocument } from './client/document';

import Header from './components/Header';
import MarkdownRenderer from './components/MarkdownRenderer';
import Editor from './components/Editor';
import SubHeader from './components/SubHeader';


function App() {
  function Document(parent=undefined, title=undefined, description=undefined, content = "") {
      this.parent = parent;
      this.title = title;
      this.description = description;
      this.content = content;
  };

  const [editMode, setEditMode] = useState(false);
  const [source, setSource] = useState(new Document());

  function handleSave() {
    console.log("saved");
    setEditMode(false);
  };

  function handleExit() {
    setEditMode(false);
  };

  function handleNew() {
    setSource(source.content);
    setEditMode(true);
  };

  function handleEdit() {
    setEditMode(true);
  };

  function feedElement(syntax) {
    setSource((prevSource) => prevSource.content +  syntax);
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
          onGet={GetDocument}
          onPost={PostDocument}
          onEdit={handleEdit}
          feedElement={feedElement}
        />
        <div className='flex-grow flex justify-center'>
          <div className={`flex ${editMode ? 'flex-grow' : 'justify-center'} max-w-[1794px] w-full`}>
            {editMode && <Editor source={source.content} onChange={setSource} />}
            {editMode && (
              <div className='w-[2px] border-l-2 border-text border-dashed'></div>
            )}
            <MarkdownRenderer source={source.content} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

