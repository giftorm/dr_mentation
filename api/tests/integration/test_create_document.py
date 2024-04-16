import enum
import requests
import uuid


class HTTPCode(enum.Enum):
    OK = 200

    def __eq__(self, other: int):
        if not isinstance(other, int):
            raise ValueError(f"You try to compare an int with an: {type(other)}")
        return self.value == other


def test_get_document_by_uuid_returns_uuid():
    id = uuid.uuid4()
    r = requests.get(f'http://127.0.0.1:5045/documents/{id}', verify=False, allow_redirects=False)
    assert isinstance(r, requests.Response)
    assert r.status_code == HTTPCode.OK
    assert r.text.strip("\"") == str(id)

