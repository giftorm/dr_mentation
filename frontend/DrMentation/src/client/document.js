let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export async function GetDocument({ id }) {
  const response = await fetch(`http://127.0.0.1:5045/documents/${id}`, {
    method: "GET",
    headers: headers,
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get Document");
  }

  return resData;
}

export async function ListDocuments() {
  const res = await fetch("http://127.0.0.1:5045/documents/", {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Failed to get Documents");
  }
  const resData = await res.json();
  return resData;
}

export async function SearchDocuments(query) {
  const res = await fetch("http://127.0.0.1:5045/documents/search", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      content: query,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to search Documents");
  }
  const resData = await res.json();
  return resData;
}

export async function PostDocument({ parent, title, description, content }) {
  const response = await fetch("http://127.0.0.1:5045/documents", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      parent: parent,
      title: title,
      description: description,
      content: content,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create Document");
  }

  return await response.json();
}

export async function PutDocument({ title, id, content }) {
  console.log(title);
  console.log(id);
  console.log(content);
  const response = await fetch(`http://127.0.0.1:5045/documents/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      parent: "root",
      title: title,
      description: "template description",
      content: content,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create Document");
  }
}
