namespace DrMentation.Contracts.Document;


public record DocumentResponse(
    Int32 id,
    Guid uuid,
    string Parent,
    string Title,
    string Description,
    string Content,
    DateTime Created,
    DateTime Updated,
    DateTime Deleted
);

