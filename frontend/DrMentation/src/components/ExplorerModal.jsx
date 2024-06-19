import { useState, useEffect } from "react";
import { SearchDocuments } from "../client/document"; // Assuming you have an API function to get documents
import MarkdownRenderer from "./MarkdownRenderer";
import { Document } from "../model/Document";
import { Item } from "./ExplorerModal/Item";

const buttonStyle =
  "flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700";
const mdRendererStyle = "max-h-full overflow-auto p-4";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ExplorerModal({
  onToggle,
  activeDocument,
  setActiveDocument,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    async function listDocuments() {
      if (debouncedSearchQuery.length < 3) {
        setCurrentDocuments([]);
        return;
      }

      setIsFetching(true);
      try {
        const docs = await SearchDocuments(debouncedSearchQuery);
        let asd = docs.map(
          ({ uuid, title, content }) =>
            new Document(content, uuid, undefined, title),
        );
        setCurrentDocuments(asd);
      } catch (error) {
        console.log(error);
        setError({ message: error.message || "Failed to fetch Documents." });
        setCurrentDocuments([]);
      }
      setIsFetching(false);
    }

    listDocuments();
  }, [debouncedSearchQuery]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onToggle}
    >
      <div
        className="bg-background w-full border-[1px] border-text max-w-5xl h-[70vh] p-6 rounded-lg shadow-lg ml-5 mr-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            key={"ToggleExplorer"}
            className={buttonStyle}
            onClick={onToggle}
          >
            close
          </button>
        </div>
        <div className="mt-4 flex flex-col h-full text-background">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files (min. 3 characters)..."
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex-grow flex max-h-[80%]">
            <div className="w-1/3 border-r pr-4 overflow-y-auto bg-background text-background">
              {error && <>Error: {error.message}</>}
              {!error && isFetching ? (
                <>Loading...</>
              ) : (
                currentDocuments.map((doc, index) => (
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
                ))
              )}
            </div>
            <div className="w-2/3 pl-4 overflow-y-auto">
              {hoveredDocument ? (
                <MarkdownRenderer
                  document={hoveredDocument}
                  style={mdRendererStyle}
                />
              ) : (
                <div className="text-gray-500">
                  Hover over a document to preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
