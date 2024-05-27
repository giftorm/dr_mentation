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