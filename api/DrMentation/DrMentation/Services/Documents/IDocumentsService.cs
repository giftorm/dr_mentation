using DrMentation.Models;
using ErrorOr;

namespace DrMentation.Services.Documents;


public interface IDocumentsService
{
    ErrorOr<Created> CreateDocument(Document document);
    ErrorOr<Document> GetDocument(Guid id);
    ErrorOr<PutDocument> PutDocument(Document document);
    ErrorOr<Deleted> DeleteDocument(Guid id);
//    ErrorOr<List<Document>> ListDocuments();
}
