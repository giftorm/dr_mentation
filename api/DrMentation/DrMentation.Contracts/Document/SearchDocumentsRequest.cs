namespace DrMentation.Contracts.Document;


public record SearchDocumentsRequest(
    string? Title,
    string? Content
);
