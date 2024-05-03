import { getDocument } from '../../lib/api'; // Adjust the import path as necessary


export default async function DocumentDetails({ 
    params
}: {
    params: { documentId: string };
    }) {
   var doc = await getDocument("56ad2968-eb90-4920-98b9-2defc8ad8bc9");
   console.log(doc);
  return (
    <div>
      <h1>Details about document {params.documentId}</h1>
      <h2>Title</h2>
      <p>Description</p>
      <p>Document Page content in markdown rendered here</p>
    </div>
  );
}
