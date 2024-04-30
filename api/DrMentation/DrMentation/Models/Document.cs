using ErrorOr;
using DrMentation.ServiceErrors;
using DrMentation.Contracts.Document;
namespace DrMentation.Models;


public class Document
{
    public const int MinTitleLength = 1;
    public const int MaxTitleLength = 100;

    public const int MinDescriptionLength = 0;
    public const int MaxDescriptionLength = 255;

    public Guid Uuid {get;}
    public string Parent {get;}
    public string Title {get;}
    public string Description {get;}
    public string Content {get;}
    public DateTime Created {get; set;}
    public DateTime Updated {get;}
    public DateTime? Deleted {get; set;}

    public Document(
        Guid uuid,
        string parent,
        string title,
        string description,
        string content,
        DateTime created,
        DateTime updated,
        DateTime? deleted = null
        )
    {
        // Enforce invariants
        Uuid = uuid;
        Parent = parent;
        Title = title;
        Description = description;
        Content = content;
        Created = created;
        Updated = updated;
        Deleted = deleted;
    }

    public static ErrorOr<Document> Create(
        string parent,
        string title,
        string description,
        string content,
        Guid? uuid = null
        )
    {

        List<Error> errors = new();

        if (title.Length < MinTitleLength || title.Length > MaxTitleLength)
        {
            errors.Add(Errors.Document.InvalidTitle);
        }

        if (description.Length < MinDescriptionLength || description.Length > MaxDescriptionLength)
        {
            errors.Add(Errors.Document.InvalidDescription);
        }

        if (errors.Count > 0)
        {
            return errors;
        }

        return new Document(
			uuid ?? Guid.NewGuid(),
			parent,
			title,
			description,
			content,
			DateTime.Now,
			DateTime.Now,
			null
        );
    }

    public static ErrorOr<Document> From(CreateDocumentRequest request)
    {
        return Create(
            request.Parent,
            request.Title,
            request.Description,
            request.Content
        );
    }

    public static ErrorOr<Document> From(Guid uuid, PutDocumentRequest request)
    {
        return Create(
            request.Parent,
            request.Title,
            request.Description,
            request.Content,
            uuid
        );
    }
}
