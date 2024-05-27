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
        ErrorOr<Document> requestToDocumentResult = Document.From(request);

        if (requestToDocumentResult.IsError)
        {
            return Problem(requestToDocumentResult.Errors);
        }

        Document document = requestToDocumentResult.Value;
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

    [HttpGet]
    public IActionResult GetAllDocuments()
    {
        ErrorOr<IEnumerable<Document>> getAllDocumentsResult = _documentsService.GetAllDocuments() ;

        return getAllDocumentsResult.Match(
            documents => Ok(documents.Select(MapDocumentResponse)),
            errors => Problem(errors)
        );
    }

    [HttpPut("{uuid:guid}")]
    public IActionResult PutDocument(Guid uuid, PutDocumentRequest request)
    {
        ErrorOr<Document> requestToDocumentResult = Document.From(uuid, request);

        if (requestToDocumentResult.IsError)
        {
            return Problem(requestToDocumentResult.Errors);
        }

        Document document = requestToDocumentResult.Value;

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

    [HttpPost("search")]
    public IActionResult SearchDocuments([FromBody] SearchDocumentsRequest request)
    {
        ErrorOr<IEnumerable<Document>> searchDocumentsResult = _documentsService.SearchDocuments(request);

        return searchDocumentsResult.Match(
            documents => Ok(documents.Select(MapDocumentResponse)),
            errors => Problem(errors)
        );
    }

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
            return new DocumentResponse(
            document.Uuid,
            document.Parent,
            document.Title,
            document.Description,
            document.Content,
            document.Created,
            document.Updated,
            document.Deleted
        );
    }
}
