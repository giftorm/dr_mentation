namespace DrMentation.Contracts.Document;


public record PutDocumentRequest(
    string Parent,
    string Title,
    string Description,
    string Content
);
