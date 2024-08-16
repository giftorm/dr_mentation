package repository

import (
	"drmentation.io/api/v2/db"
	"drmentation.io/api/v2/model"
)


type IDocumentRepository interface {
    Get(*db.DBH, string) (*model.Document, error)
    Insert(*db.DBH, *model.Document) (*model.Document, error)
    ListAll(*db.DBH) ([]model.Document, error)
    SearchContent(*db.DBH, string) ([]model.Document, error)
    Delete(*db.DBH, string) error
    Update(*db.DBH, *model.Document) error
}

