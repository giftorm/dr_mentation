import { PostDocument } from "../client/document";

// Define a set of test documents with valid markdown content
const documents = [
  {
    content: "# Title 1\n## Subtitle 1\n**Bold Text** and *Italic Text*",
    parent: "root",
    title: "Document 1",
    description: "Description for Document 1",
  },
  {
    content: "- Item 1\n- Item 2\n  - Subitem 1\n  - Subitem 2",
    parent: "root",
    title: "Document 2",
    description: "Description for Document 2",
  },
  {
    content: "[OpenAI](https://www.openai.com)",
    parent: "root",
    title: "Document 3",
    description: "Description for Document 3",
  },
  {
    content: "```javascript\nconsole.log('Hello, World!');\n```",
    parent: "root",
    title: "Document 4",
    description: "Description for Document 4",
  },
  {
    content: "> This is a blockquote.",
    parent: "root",
    title: "Document 5",
    description: "Description for Document 5",
  },
  {
    content: "![Alt text](https://via.placeholder.com/150 \"Title\")",
    parent: "root",
    title: "Document 6",
    description: "Description for Document 6",
  },
  {
    content: "---",
    parent: "root",
    title: "Document 7",
    description: "Description for Document 7",
  },
  {
    content: "| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |",
    parent: "root",
    title: "Document 8",
    description: "Description for Document 8",
  },
  {
    content: "Use the `printf` function.",
    parent: "root",
    title: "Document 9",
    description: "Description for Document 9",
  },
  {
    content: "> Blockquote\n> - List item 1\n> - List item 2",
    parent: "root",
    title: "Document 10",
    description: "Description for Document 10",
  },
];

// Function to create test documents
export default async function CreateTestDocuments() {
  for (const doc of documents) {
    try {
      const response = await PostDocument(doc);
      console.log("Created document:", response);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  }
}
