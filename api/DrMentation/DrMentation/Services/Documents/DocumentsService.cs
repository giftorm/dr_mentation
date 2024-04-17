using DrMentation.Models;


namespace DrMentation.Services.Documents;


public class DocumentsService : IDocumentsService
{
    private static readonly Dictionary<Guid, Document> _documents = new();

    public void CreateDocument(Document document)
    {
        _documents.Add(document.Uuid, document);
    }

    public Document GetDocument(Guid id)
    {
        return _documents[id];
    }
}
