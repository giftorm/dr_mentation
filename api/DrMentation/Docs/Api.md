# DrMentation API Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [API Overview](#api-overview)
3. [API Endpoints](#api-endpoints)
    - 3.1 [Create Document](#create-document)
    - 3.2 [Get Document](#get-document)
    - 3.3 [Update Document](#update-document)
    - 3.4 [Delete Document](#delete-document)
4. [Examples](#examples)
5. [FAQ](#faq)

## Introduction

(Provide a brief introduction about the DrMentation API, its purpose, and who it's for.)

## API Overview

(A general overview of what the API offers, including its main features and capabilities.)

## API Endpoints

### Create Document

#### Create Document Request

```js
POST /document
```

```json
{
    "parent": "root",
    "title" : "Majestic Mountains",
    "description": "A guide to the world's most breathtaking mountains.",
    "content": "Content in text, preferably in markdown syntax to enhance readability and format."
}
```

#### Create Document Response

```js
201 Created
```

```js
Location: {{host}}/documents/{{id}}
```

```json
{
    "id": 2001011,
    "uuid": "b9b11949-45bc-40dd-ba6d-21d08d2eb006",
    "parent": "root",
    "title" : "Majestic Mountains",
    "description": "A guide to the world's most breathtaking mountains.",
    "content": "Text content, preferably in markdown to enhance readability and format.",
    "created": "ISO-8601 standard",
    "updated": "ISO-8601 standard",
    "deleted": ""
}
```

### Get Document

#### Get Document Request

```js
GET /documents/{{id}}
```

#### Get Document Response

```js
200 OK
```

(Example response remains the same as provided in Create Document Response)

### Update Document

#### Update Document Request

```js
PUT /documents/{{id}}
```

```json
{
    "parent": "root",
    "title" : "Majestic Mountains Revised",
    "description": "An updated guide to exploring the world's most breathtaking mountains.",
    "content": "Updated content in text, preferably in markdown syntax for better format."
}
```

#### Update Document Response

```js
204 No Content
```

or

```js
201 Created
```

(Example Location header remains the same as provided in Create Document Response)

### Delete Document

#### Delete Document Request

```js
DELETE /documents/{{id}}
```

#### Delete Document Response

```json
204 No Content
```
