import { useState, React, Fragment, useRef } from "react";
import { GetDocument, PostDocument, PutDocument } from "./client/document";
import { Document } from "./model/Document";
import Header from "./components/Header";
import MarkdownRenderer from "./components/MarkdownRenderer";
import Editor from "./components/Editor";
import SubHeader from "./components/SubHeader";
import ExplorerModal from "./components/ExplorerModal";
import DocumentForm from "./components/DocumentForm";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [documentsExplorer, setDocumentsExplorer] = useState(false);
  const [activeDocument, setActiveDocument] = useState(undefined);
  const [lastSavedDocument, setLastSavedDocument] = useState(undefined);
  const [hidePreview, setHidePreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const textareaRef = useRef();

  function newDocument() {
    return new Document();
  }

  function handleSave() {
    if (!activeDocument.title || !activeDocument.id) {
      setShowForm(true);
    } else {
      saveDocument(activeDocument);
    }
  }

  async function saveDocument(document) {
    let res;
    if (document.id) {
      res = await PutDocument(document);
    } else {
      res = await PostDocument(document)
        document.id = res
      setActiveDocument(
          document
      );
    }

    setEditMode(false);
    setShowForm(false);
    setLastSavedDocument(document);
  }

  function handleCancel() {
    activateDocument(lastSavedDocument);
    setEditMode(false);
    setShowForm(false);
  }

  function handleNew() {
    const doc = newDocument();
    activateDocument(doc);
    setEditMode(true);
  }

  function handleEdit() {
    if (!activeDocument) {
      ß;
      const doc = newDocument();
      activateDocument(doc);
    }
    setLastSavedDocument(activeDocument);
    setEditMode(true);
  }

  function updateDocument(content) {
    setActiveDocument((prevDocument) => ({
      ...prevDocument,
      content: content,
    }));
  }

  function toggleExplorer() {
    setDocumentsExplorer(!documentsExplorer);
  }

  function handleFormSave(updatedDocument) {
    setActiveDocument(updatedDocument);
    saveDocument(updatedDocument);
  }

  function activateDocument(document) {
    setActiveDocument(document);
  }

  return (
    <Fragment>
      <div className="text-text bg-background min-h-screen flex flex-col">
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
          preview={hidePreview}
          source={activeDocument}
          onToggleExplorer={toggleExplorer}
          explorer={setDocumentsExplorer}
          setSource={updateDocument}
          textareaRef={textareaRef}
        />
        {documentsExplorer ? (
          <ExplorerModal
            onToggle={toggleExplorer}
            activeDocument={activeDocument}
            setActiveDocument={activateDocument}
          />
        ) : null}
        <div className="flex justify-center pt-12 w-full min-h-[1000px]">
          {editMode && (
            <Editor
              content={activeDocument?.content || ""}
              onChange={updateDocument}
              textareaRef={textareaRef}
            />
          )}
          {editMode && hidePreview && (
            <div className="flex flex-none w-[2px] border-l-2 border-text border-dashed"></div>
          )}
          {!editMode || hidePreview ? (
            <MarkdownRenderer
              document={activeDocument}
              style="flex flex-1 w-max max-w-3xl"
            />
          ) : null}
        </div>
      </div>
      {showForm && (
        <DocumentForm
          document={activeDocument}
          onSave={handleFormSave}
          onCancel={handleCancel}
        />
      )}
    </Fragment>
  );
}

export default App;
