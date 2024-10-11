package repository

import (
	"drmentation.io/api/v2/db"
	"drmentation.io/api/v2/model"
	"github.com/gofiber/fiber/v3/log"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type DocumentRepo struct {
    DBH db.DBH
}


func New() *DocumentRepo {
    return &DocumentRepo{
        DBH: *db.Connect(),
    }
}

func (r *DocumentRepo) Get(id string) (*model.Document, error) {
    objectId, err := primitive.ObjectIDFromHex(id)
    if err != nil{
        return nil, err
    }
    log.Info(objectId)

    model := &model.Document{}
    if err = r.DBH.Get(objectId, model); err != nil {
        return nil, err
    }
    return model, nil
}


func (r *DocumentRepo) Insert(model *model.Document) (string, error) {
    return r.DBH.Insert(model)
}


func (r *DocumentRepo) ListAll() ([]model.Document, error) {
    models, err := r.DBH.All()
    if err != nil {
        log.Fatal(err)
        return nil, err
    }
    return models, nil
}

func (r *DocumentRepo) SearchContent(textSearch string) ([]model.Document, error) {
    models, err := r.DBH.Search(textSearch)
    if err != nil {
        log.Fatal(err)
        return nil, err
    }
    return models, err
}

func (r *DocumentRepo)  Delete(id string) error {
    return r.DBH.Delete(id)
}

func (r *DocumentRepo) Update(model *model.Document) error {
    err := r.DBH.Update(model)
    if err != nil{
        return err
    }
    return nil
}
