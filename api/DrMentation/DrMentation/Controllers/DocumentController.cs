using DrMentation.Contracts.Document;
using Microsoft.AspNetCore.Mvc;


namespace DrMentation.Controllers;

[ApiController]
public class DocumentController : ControllerBase
{
    [HttpPost("/documents")]
    public IActionResult CreateDocument(CreateDocumentRequest request)
    {
        return Ok(request);
    }

    [HttpGet("/documents/{id:guid}")]
    public IActionResult GetDocument(Guid id)
    {
        return Ok(id);
    }

    [HttpPut("/documents/{id:guid}")]
    public IActionResult PutDocument(Guid id, PutDocumentRequest request)
    {
        return Ok(request);
    }

    [HttpDelete("/documents/{id:guid}")]
    public IActionResult DeleteDocument(Guid id)
    {
        return Ok(id);
    }

}
