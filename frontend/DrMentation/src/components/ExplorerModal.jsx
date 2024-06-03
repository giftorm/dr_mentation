import { useState, useEffect } from 'react';
import { GetDocument } from '../client/document'; // Assuming you have an API function to get documents
import MarkdownRenderer from './MarkdownRenderer';

const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';

export default function ExplorerModal({ onToggle, setCurrentDocument }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [hoveredDocument, setHoveredDocument] = useState(null);

  useEffect(() => {
    // Fetch documents based on search query
    GetDocument().then(setDocuments);
  }, [searchQuery]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onToggle}
    >
      <div
        className="bg-primary w-full max-w-3xl h-[70vh] p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button key={"ToggleExplorer"} className={buttonStyle} onClick={onToggle}>
            close
          </button>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex">
            <div className="w-1/3 border-r pr-4">
              {documents.map((doc, index) => (
                <Item
                  key={index}
                  document={doc}
                  isActive={activeDocument && activeDocument.id === doc.id}
                  isHovered={hoveredDocument && hoveredDocument.id === doc.id}
                  onHover={() => setHoveredDocument(doc)}
                  onClick={() => {
                    setCurrentDocument(doc);
                    onToggle();
                  }}
                />
              ))}
            </div>
            <div className="w-2/3 pl-4">
              {hoveredDocument ? (
                <div className="markdown-preview">
                  <MarkdownRenderer document={hoveredDocument} />
                </div>
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
      {document.name}
    </div>
  );
}
