
export const apiURL = "http://127.0.0.1:5045";

export async function getDocument(uuid: string): Promise<any> {
    try {
        const response = await fetch(`${apiURL}/documents/${uuid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const document = await response.json();
        console.log(document);
        return document; // Return the document data for further processing outside the function
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error if you need to allow further error handling by the caller
    }
}
getDocument("56ad2968-eb90-4920-98b9-2defc8ad8bc9");
