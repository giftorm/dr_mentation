const apiURL = "http://127.0.0.1:5045";


class ClientError extends Error {
    status: number;
    error?: Error;

    constructor(message: string, status_code: number, error?: Error | undefined) {
        super(message);
        this.name = "ClientError";
        this.status = status_code;
        this.error = error;
    }
}


class DocumentsClient {
    endpoint: string;

    constructor(api_url: string) {
        this.endpoint = `${api_url}/documents`;
    }

    async getDocument(uuid: string): Promise<any> {
        const response = await fetch(`${this.endpoint}/${uuid}`);
        if (!response.ok) {
            throw new ClientError(`HTTP error!`, response.status, new Error(await response.text()));
        }
        return await response.json()
        .then((data) => {
            console.log(`Got document with id: ${uuid}.\nData:`);
            console.log(data);
            return data;
        }, (error) => {
            console.log(error);
            throw new ClientError("Error getting document", response.status, error);
        });
    }

    async putDocument(
        uuid: string,
        title: string,
        description: string,
        content: string,
        parent: string = "root"
    ): Promise<any> {
        const response = await fetch(
            `${this.endpoint}/${uuid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    content: content,
                    parent: parent,
                })
            }
        );
        if (!response.ok) {
            throw new ClientError(`HTTP error!`, response.status, new Error(await response.text()));
        }
        if (response.status === 204) {
            var res = {message: "Document updated", status: response.status, body: null};
            console.log(`Updated existing document with id: ${uuid}.`);
            return res;
        }
        return response.json()
        .then((data) => {
            console.log(data);
            return {message: "Document created", status: response.status, body: data};
        }, (error) => {
            console.log(error);
            throw new ClientError("Error updating document", response.status, error);
        });
    }

    async createDocument(
        title: string,
        description: string,
        content: string,
        parent: string = "root"
    ): Promise<any> {
        const response = await fetch(
            this.endpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    content: content,
                    parent: parent,
                })
            }
        );
        if (!response.ok) {
            throw new ClientError(`HTTP error!`, response.status, new Error(await response.text()));
        }
        return response.json()
        .then((data) => {
            console.log(`Created new document with id: ${data.uuid}.\nData:`);
            console.log(data);
            return data;
        }, (error) => {
            console.log(error);
            throw new ClientError("Error creating document", response.status, error);
        });
    }
}

// var client = new DocumentsClient(apiURL);
// client.createDocument("title", "description", "content", "root");
// client.putDocument("56ad2968-eb90-4920-98b9-2defc8ad8bc9", "Harry B portter", "VEry good", "Kalles Ankan Ge mig din baskagg", "root");
// client.getDocument("56ad2968-eb90-4920-98b9-2defc8ad8bc9");
