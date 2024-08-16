let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export async function GetDocument({ id }) {
  const response = await fetch(`http://127.0.0.1:5045/document/${id}`, {
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
  const res = await fetch("http://127.0.0.1:5045/document/", {
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
  const res = await fetch("http://127.0.0.1:5045/document/search", {
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

export async function PostDocument({content, title}) {
  const response = await fetch("http://127.0.0.1:5045/document", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create Document");
  }

  return await response.text();
}

export async function PutDocument({ title, id, content }) {
  const response = await fetch(`http://127.0.0.1:5045/document`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
        id: id,
      title: title,
      content: content,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create Document");
  }
}
