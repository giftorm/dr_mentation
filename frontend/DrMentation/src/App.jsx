import { useState, React, Fragment, useRef } from 'react';

import { GetDocument, PostDocument } from './client/document';

import { Document } from './model/Document';

import Header from './components/Header';
import MarkdownRenderer from './components/MarkdownRenderer';
import Editor from './components/Editor';
import SubHeader from './components/SubHeader';


function App() {
  const [editMode, setEditMode] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(undefined);
  const [lastSavedDocument, setLastSavedDocument] = useState(undefined);
  const [hidePreview, setHidePreview] = useState(false);
  const textareaRef = useRef();

  function newDocument() {
    return new Document();
  };

  function handleSave() {
    console.log("saved");
    setEditMode(false);
  };

  function handleExit() {
    setCurrentDocument(lastSavedDocument);
    setEditMode(false);
  };

  function handleNew() {
    setCurrentDocument(newDocument());
    setLastSavedDocument(currentDocument);
    setEditMode(true);
  };

  function handleEdit() {
    if (!currentDocument) {
      setCurrentDocument(newDocument());
      setLastSavedDocument(currentDocument);
    }
    setLastSavedDocument(currentDocument);
    setEditMode(true);
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
          source={currentDocument}
          setSource={updateDocument}
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

export default App;
