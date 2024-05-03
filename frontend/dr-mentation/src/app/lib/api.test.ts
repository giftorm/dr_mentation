import { getDocument, apiURL } from './api'; // Adjust the import path as necessary

// Mocking fetch globally
global.fetch = jest.fn();

describe("getDocument", () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    it("should fetch and return document data", async () => {
        // Mock fetch to resolve with specific data
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ id: '123', content: 'Document content' }),
            status: 200
        });

        const uuid = "123";
        const result = await getDocument(uuid);

        expect(fetch).toHaveBeenCalledWith(`${apiURL}/documents/${uuid}`);
        expect(result).toEqual({ id: '123', content: 'Document content' });
    });

    it("should handle fetch errors", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

        await expect(getDocument("123")).rejects.toThrow("Failed to fetch");
    });

    it("should handle non-OK responses", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found'
        });

        await expect(getDocument("invalid-uuid")).rejects.toThrow("HTTP error! status: 404");
    });
});

