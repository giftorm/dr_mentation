namespace DrMentation.Contracts.Document;


public record CreateDocumentRequest(
    string Parent,
    string Title,
    string Description,
    string Content
);

