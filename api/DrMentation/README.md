# DrMentation Backend API

Built based on this YouTube video:

* https://www.youtube.com/watch?v=PmDJIooZjBE&t=3241s


## Manual Testing

### GET

```bash
curl --verbose --request GET --header "Content-Type: application/json" http://127.0.0.1:5045/documents/56ad2968-eb90-4920-98b9-2defc8ad8bc9 | jq .
```

### PUT

```bash
curl --verbose --request PUT --header "Content-Type: application/json" --data '{"parent": "kalle", "title": "Turborocs", "description": "A guide to the worlds most breathtaking mountains.", "content": "Content and format."}' http://127.0.0.1:5045/documents/56ad2968-eb90-4920-98b9-2defc8ad8bc9 | jq .

```

### DELETE

```bash
curl --verbose --request DELETE --header "Content-Type: application/json" http://127.0.0.1:5045/documents/56ad2968-eb90-4920-98b9-2defc8ad8bc9 | jq .

```

### POST

```bash
curl --verbose --request POST --header "Content-Type: application/json" --data '{"parent": "root", "title": "Kalles Ankan", "description": "A guide to the worlds most breathtaking mountains.", "content": "Content in text, preferably in markdown syntax to enhance readability and format."}' http://127.0.0.1:5045/documents/ | jq .
```

