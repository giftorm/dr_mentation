namespace DrMentation.Services.Documents;

using DrMentation.Models;


public interface IDocumentsService
{
    void CreateDocument(Document request);
    Document GetDocument(Guid id);
}
