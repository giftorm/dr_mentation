import { useState, useEffect } from 'react';
import { ListDocuments } from '../client/document'; // Assuming you have an API function to get documents
import MarkdownRenderer from './MarkdownRenderer';
import { Document } from '../model/Document';

const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';

export default function ExplorerModal({ onToggle, activeDocument, setActiveDocument }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function listDocuments() {
      setIsFetching(true);
      try {
        const docs = await ListDocuments();
        let asd = docs.map(({ uuid, title, content }) => new Document(content, uuid, undefined, title));
        setCurrentDocuments(asd);
      } catch (error) {
        console.log(error);
        setError({ message: error.message || 'Failed to fetch Documents.' });
      }
      setIsFetching(false);
    }
    listDocuments();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onToggle}
    >
      <div
        className="bg-primary w-full max-w-5xl h-[70vh] p-6 rounded-lg shadow-lg ml-5 mr-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button key={"ToggleExplorer"} className={buttonStyle} onClick={onToggle}>
            close
          </button>
        </div>
        <div className="mt-4 flex flex-col h-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex-grow flex max-h-[80%]">
            <div className="w-1/3 border-r pr-4 overflow-y-auto">
              {error && <>Error: {error.message}</>}
              {!error && isFetching ? <>Loading...</> : currentDocuments.map((doc, index) => (
                <Item
                  key={index}
                  document={doc}
                  isActive={activeDocument && activeDocument.id === doc.id}
                  isHovered={hoveredDocument && hoveredDocument.id === doc.id}
                  onHover={() => setHoveredDocument(doc)}
                  onClick={() => {
                    setActiveDocument(doc);
                    onToggle();
                  }}
                />
              ))}
            </div>
            <div className="w-2/3 pl-4 overflow-y-auto">
              {hoveredDocument ? (
                <MarkdownRenderer document={hoveredDocument} />
              ) : (
                <div className="text-gray-500">Hover over a document to preview</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ document, isActive, isHovered, onHover, onClick }) {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onClick}
      className={`p-2 mb-2 border rounded cursor-pointer ${isHovered ? 'bg-gray-200' : 'bg-white'} ${isActive ? 'bg-gray-300' : ''}`}
    >
      {document.title}
    </div>
  );
}
