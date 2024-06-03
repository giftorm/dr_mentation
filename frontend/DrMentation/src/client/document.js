import { Document } from "../model/Document";

let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };


export async function GetDocument({id}) {
    const response = await fetch(`http://127.0.0.1:5045/documents/${id}`, {
        method: 'GET',
        headers: headers,
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to get Document');
    }

    return resData;
};

export async function ListDocuments() {
    const res = await fetch('http://127.0.0.1:5045/documents/', {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error('Failed to get Documents');
    }
    const resData = await res.json();
    return resData;
};

export async function PostDocument ({parent, title, description, content}) {
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
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to create Document');
    }

    return resData;
};
