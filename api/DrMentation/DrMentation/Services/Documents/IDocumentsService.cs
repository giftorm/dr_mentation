using DrMentation.Models;
using ErrorOr;
using DrMentation.Contracts.Document;

namespace DrMentation.Services.Documents;


public interface IDocumentsService
{
    ErrorOr<Created> CreateDocument(Document document);
    ErrorOr<Document> GetDocument(Guid id);
    ErrorOr<PutDocument> PutDocument(Document document);
    ErrorOr<Deleted> DeleteDocument(Guid id);
    ErrorOr<IEnumerable<Document>> SearchDocuments(SearchDocumentsRequest request);
//    ErrorOr<List<Document>> ListDocuments();
}
