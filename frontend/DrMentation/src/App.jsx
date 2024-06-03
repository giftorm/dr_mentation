import { useState, React, Fragment, useRef } from 'react';

import { GetDocument, PostDocument } from './client/document';
import { Document } from './model/Document';
import Header from './components/Header';
import MarkdownRenderer from './components/MarkdownRenderer';
import Editor from './components/Editor';
import SubHeader from './components/SubHeader';
import ExplorerModal from './components/ExplorerModal';
import DocumentForm from './components/DocumentForm'; // Import the new form component

function App() {
  const [editMode, setEditMode] = useState(false);
  const [documentsExplorer, setDocumentsExplorer] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(undefined);
  const [lastSavedDocument, setLastSavedDocument] = useState(undefined);
  const [hidePreview, setHidePreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const textareaRef = useRef();

  function newDocument() {
    return new Document();
  };

  function handleSave() {
    if (!currentDocument.title || !currentDocument.id) {
      setShowForm(true);
    } else {
      saveDocument(currentDocument);
    }
  };

  function saveDocument(document) {
    PostDocument(document);
    setEditMode(false);
    setShowForm(false);
    setLastSavedDocument(document);
  }

  function handleCancel() {
    setCurrentDocument(lastSavedDocument);
    setEditMode(false);
    setShowForm(false);
  };

  function handleNew() {
    const doc = newDocument();
    setCurrentDocument(doc);
    setEditMode(true);
  };

  function handleEdit() {
    if (!currentDocument) {
      const doc = newDocument();
      setCurrentDocument(doc);
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

  function toggleExplorer() {
    setDocumentsExplorer(!documentsExplorer);
  }

  function handleFormSave(updatedDocument) {
    saveDocument(updatedDocument);
  }

  return (
    <Fragment>
      <div className='bg-background min-h-screen flex flex-col'>
        <Header />
        <SubHeader
          editMode={editMode}
          onSave={handleSave}
          onCancel={handleCancel}
          onNew={handleNew}
          onGet={GetDocument}
          onPost={PostDocument}
          onEdit={handleEdit}
          onHide={setHidePreview}
          source={currentDocument}
          onToggleExplorer={toggleExplorer}
          explorer={setDocumentsExplorer}
          setSource={updateDocument}
          textareaRef={textareaRef}
        />
        {documentsExplorer ? <ExplorerModal onToggle={toggleExplorer} setCurrentDocument={setCurrentDocument} /> : null}
        <div className='flex-grow flex justify-center'>
          <div className={`flex ${editMode && hidePreview ? 'flex-grow' : 'justify-center'} max-w-[1794px] w-full`}>
            {editMode && <Editor content={currentDocument?.content || ''} onChange={updateDocument} textareaRef={textareaRef} />}
            {editMode && hidePreview && (
              <div className='w-[2px] border-l-2 border-text border-dashed'></div>
            )}
            {!editMode || hidePreview ? <MarkdownRenderer document={currentDocument} /> : null}
          </div>
        </div>
      </div>
      {showForm && (
        <DocumentForm
          document={currentDocument}
          onSave={handleFormSave}
          onCancel={handleCancel}
        />
      )}
    </Fragment>
  );
}

export default App;
