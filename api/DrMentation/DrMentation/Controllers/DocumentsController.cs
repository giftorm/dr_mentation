using DrMentation.Contracts.Document;
using DrMentation.Services.Documents;
using DrMentation.Models;
using Microsoft.AspNetCore.Mvc;


namespace DrMentation.Controllers;

[ApiController]
[Route("[controller]")]
public class DocumentsController : ControllerBase
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
            default(DateTime)
            );

        // TODO: save doc to db
        // The actual logics to perform on the request
        _documentsService.CreateDocument(document);

        // Convert the data to reponse
        var response = new DocumentResponse(
            document.Uuid,
            document.Parent,
            document.Title,
            document.Description,
            document.Content,
            document.Created,
            document.Updated,
            document.Deleted
        );
        return CreatedAtAction(
            actionName: nameof(GetDocument),
            routeValues: new {id = document.Uuid},
            value: response
        );
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetDocument(Guid id)
    {
        Document document = _documentsService.GetDocument(id);

        var response = new DocumentResponse(
            document.Uuid,
            document.Parent,
            document.Title,
            document.Description,
            document.Content,
            document.Created,
            document.Updated,
            document.Deleted
        );
        return Ok(response);
    }

    [HttpPut("{id:guid}")]
    public IActionResult PutDocument(Guid id, PutDocumentRequest request)
    {
        return Ok(request);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult DeleteDocument(Guid id)
    {
        return Ok(id);
    }

}
