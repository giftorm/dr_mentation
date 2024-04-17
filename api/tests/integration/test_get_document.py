import requests
import uuid

from .constants import HTTPOk


def test_get_document_by_uuid_returns_uuid():
    id = uuid.uuid4()
    r = requests.get(f'http://127.0.0.1:5045/documents/{id}', verify=False, allow_redirects=False)
    assert isinstance(r, requests.Response)
    assert r.status_code == HTTPOk
    assert r.text.strip("\"") == str(id)
