"use client";


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

export { ClientError };
