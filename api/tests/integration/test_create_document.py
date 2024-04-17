import requests
from pprint import pprint
import json

from .constants import HTTPOk


def test_create_document():
    data = {
        "parent": "root",
        "title" : "Majestic Mountains",
        "description": "A guide to the world's most breathtaking mountains.",
        "content": "Content in text, preferably in markdown syntax to enhance readability and format."
    }
    r = requests.post(
        f'http://127.0.0.1:5045/documents/',
        json=json.dumps(data),
        verify=False,
        allow_redirects=False,
    )
    pprint(r)
    pprint(r.json())
    assert isinstance(r, requests.Response)
    assert r.status_code == HTTPOk
    assert r.text.strip("\"") == str(id)
