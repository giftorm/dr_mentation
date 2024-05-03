export default function DocumentDetails({ 
    params 
}: { 
    params: { documentId: string };
    }) {
  return (
    <div>
      <h1>Details about document {params.documentId}</h1>
      <h2>Title</h2>
      <p>Description</p>
      <p>Document Page content in markdown rendered here</p>
    </div>
  );
}
