export class Document {
    constructor(content='', id, parent, title, description) {
        this.content = content;
        this.id = id;
        this.parent = parent;
        this.title = title;
        this.description = description;
    }
};
