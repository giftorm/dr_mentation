using DrMentation.Models;
using DrMentation.ServiceErrors;
using DrMentation.Contracts.Document;
using ErrorOr;


namespace DrMentation.Services.Documents;


public class DocumentsService : IDocumentsService
{
    private static readonly Dictionary<Guid, Document> _documents = new();

    public ErrorOr<Created> CreateDocument(Document document)
    {
        _documents.Add(document.Uuid, document);
        return Result.Created;
    }

    public ErrorOr<Deleted> DeleteDocument(Guid id)
    {
        _documents[id].Deleted = DateTime.UtcNow;
        return Result.Deleted;
    }

    public ErrorOr<Document> GetDocument(Guid id)
    {
        if (_documents.TryGetValue(id, out var document))
        {
            if (document.Deleted.HasValue)
            {
                return Errors.Document.NotFound;
            }
            return document;
        }

        return Errors.Document.NotFound;
    }

    public ErrorOr<PutDocument> PutDocument(Document document)
    {
        if (document.Uuid == default(Guid))
        {
            return Errors.Document.NotFound;
        }
        var isNewlyCreated = !_documents.ContainsKey(document.Uuid);
        if (!isNewlyCreated)
        {
            if (_documents[document.Uuid].Deleted != null)
            {
                return Errors.Document.Forbidden;
            }
            // Keep the created date the same
            document.Created = _documents[document.Uuid].Created;
        }
        _documents[document.Uuid] = document;
        return new PutDocument(isNewlyCreated);
    }

    public ErrorOr<IEnumerable<Document>> SearchDocuments(SearchDocumentsRequest request)
    {
        var result = _documents.Values.Where(document =>
            (string.IsNullOrEmpty(request.Title) || document.Title.Contains(request.Title, StringComparison.OrdinalIgnoreCase)) &&
            (string.IsNullOrEmpty(request.Content) || document.Content.Contains(request.Content, StringComparison.OrdinalIgnoreCase)) &&
            !document.Deleted.HasValue
        ).ToList();

        return result.Any() ? result : Errors.Document.NotFound;
    }

}
