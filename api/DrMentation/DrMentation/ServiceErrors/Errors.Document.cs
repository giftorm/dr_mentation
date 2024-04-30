using ErrorOr;

namespace DrMentation.ServiceErrors;



public static class Errors
{
    public static class Document
    {
        public static Error NotFound => Error.NotFound(
                code :"Document.NotFound",
                description: "The requested document was not found."
        );

        public static Error Forbidden => Error.Forbidden(
                code: "MyErrorTypes.Forbidden",
                description: "The requested operation is not allowed."
        );

        public static Error InvalidTitle => Error.Validation(
                code: "Document.InvalidTitle",
                description: $"The title must be between " +
                    $"{Models.Document.MinTitleLength} and " +
                    $"{Models.Document.MaxTitleLength} characters."
        );

        public static Error InvalidDescription => Error.Validation(
                code: "Document.InvalidDescription",
                description: $"The description must be between " +
                    $"{Models.Document.MinDescriptionLength} and " +
                    $"{Models.Document.MaxDescriptionLength} characters."
        );
    }
}

