let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };


async function GetDocument({id}) {
    try {
        const response = await fetch(`http://127.0.0.1:5045/documents/${id}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching markdown:', error);
    }
};

async function PostDocument ({parent, title, description, content}) {
    try {
        const response = await fetch('http://127.0.0.1:5045/documents', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                parent: parent,
                title: title,
                description: description,
                content: content,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating new document:', error);
    }
};

export { GetDocument, PostDocument };

export async function GetDocuments(query) {
    // Replace with your actual API call
    return [
      { id: 1, name: 'Document 1', content: '# Document 1 content' },
      { id: 2, name: 'Document 2', content: '# Document 2 content' },
      // ... more documents
    ];
  }