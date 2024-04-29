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
    }
}

