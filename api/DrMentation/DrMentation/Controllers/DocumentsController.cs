using DrMentation.Contracts.Document;
using DrMentation.Services.Documents;
using DrMentation.Models;
using Microsoft.AspNetCore.Mvc;
using ErrorOr;


namespace DrMentation.Controllers;

public class DocumentsController : ApiController
{
    private readonly IDocumentsService _documentsService;

    public DocumentsController(IDocumentsService documentsService)
    {
        _documentsService = documentsService;
    }

    [HttpPost]
    public IActionResult CreateDocument(CreateDocumentRequest request)
    {
        // Common pattern
        // Map the data to the request

        Document document = new Document(
            Guid.NewGuid(),
            request.Parent,
            request.Title,
            request.Description,
            request.Content,
            DateTime.UtcNow,
            DateTime.UtcNow,
            null
            );

        // TODO: save doc to db
        // The actual logics to perform on the request
        ErrorOr<Created> createDocumentResult = _documentsService.CreateDocument(document);

        return createDocumentResult.Match(
            created => CreatedAtGetDocument(document),
            errors => Problem(errors));
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetDocument(Guid id)
    {
        ErrorOr<Document> getDocumentResult = _documentsService.GetDocument(id);

        return getDocumentResult.Match(
                document => Ok(MapDocumentResponse(document)),
                errors => Problem(errors));
    }

    [HttpPut("{id:guid}")]
    public IActionResult PutDocument(Guid id, PutDocumentRequest request)
    {
        var document = new Document(
            id,
            request.Parent,
            request.Title,
            request.Description,
            request.Content,
            DateTime.UtcNow,
            DateTime.UtcNow,
            null
        );

        ErrorOr<PutDocument> putDocumentResult = _documentsService.PutDocument(document);
        return putDocumentResult.Match(
            put => put.IsNewlyCreated ? CreatedAtGetDocument(document) : NoContent(),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id:guid}")]
    public IActionResult DeleteDocument(Guid id)
    {
        ErrorOr<Deleted> deleteDocumentResult = _documentsService.DeleteDocument(id);

        return deleteDocumentResult.Match(
            deleted => NoContent(),
            errors => Problem(errors));
    }

   // [HttpGet]
   // public ActionResult<IEnumerable<DocumentResponse>> ListDocument()
   // {
   //     ErrorOr<List<Document>> listResult = _documentsService.ListDocuments();
   //     List<DocumentResponse> documentResponses = new List<DocumentResponse>();

   //     return listResult.Match(
   //         document => Ok(
   //             );
   // }

    private CreatedAtActionResult CreatedAtGetDocument(Document document)
    {
        return CreatedAtAction(
            actionName: nameof(GetDocument),
            routeValues: new {id = document.Uuid},
            value: MapDocumentResponse(document)
        );
    }

    public DocumentResponse MapDocumentResponse(Document document)
    {
            DocumentResponse doc = new DocumentResponse(
            document.Uuid,
            document.Parent,
            document.Title,
            document.Description,
            document.Content,
            document.Created,
            document.Updated,
            document.Deleted
        );
        return doc;
    }
}
