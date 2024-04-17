namespace DrMentation.Models;


public class Document
{
    public Guid Uuid {get;}
    public string Parent {get;}
    public string Title {get;}
    public string Description {get;}
    public string Content {get;}
    public DateTime Created {get;}
    public DateTime Updated {get;}
    public DateTime Deleted {get;}

    public Document(
        Guid uuid,
        string parent,
        string title,
        string description,
        string content,
        DateTime created,
        DateTime updated,
        DateTime deleted
        )
    {
        // Enforce invariants
        Uuid = uuid;
        Parent = parent;
        Title = title;
        Description = description;
        Content = content;
        Created = created;
        Deleted = deleted;
    }
}
