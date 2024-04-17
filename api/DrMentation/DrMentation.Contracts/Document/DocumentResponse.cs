namespace DrMentation.Contracts.Document;


public record DocumentResponse(
    Guid Uuid,
    string Parent,
    string Title,
    string Description,
    string Content,
    DateTime Created,
    DateTime Updated,
    DateTime Deleted
);

