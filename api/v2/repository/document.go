package repository

import (
	"context"
	"errors"

	"drmentation.io/api/v2/db"
	"drmentation.io/api/v2/model"
	"github.com/gofiber/fiber/v3/log"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func Get(dbh *db.DBH, id string) (*model.Document, error) {
    objectId, err := primitive.ObjectIDFromHex(id)
    if err != nil{
        return nil, err
    }
    log.Info(objectId)

    model := &model.Document{}

    filter := bson.M{"_id": bson.M{"$eq": objectId}}
    if err := dbh.DocumentsCollection.FindOne(dbh.Context, filter).Decode(&model); err != nil {
        return nil, err
    }

    return model, nil
}


func Insert(dbh *db.DBH, model *model.Document) (string, error) {
    res, err := dbh.DocumentsCollection.InsertOne(context.Background(), model)
    if err != nil {
        return "", err
    };

    id := res.InsertedID.(primitive.ObjectID).Hex()
    return id, nil
}


func ListAll(dbh *db.DBH) ([]model.Document, error) {
    cursor, err := dbh.DocumentsCollection.Find(dbh.Context, bson.D{{}})
    if err != nil {
        return nil, err
    }
    var models []model.Document

    if err = cursor.All(dbh.Context, &models); err != nil {
        log.Fatal(err)
        return nil, err
    }
    return models, nil
}

func SearchContent(dbh *db.DBH, textSearch string) ([]model.Document, error) {
    filter := bson.M{"content": bson.M{"$regex": textSearch, "$options": "i"}}

    cursor, err := dbh.DocumentsCollection.Find(dbh.Context, filter)
    if err != nil {
        return nil, err
    }

    var models []model.Document

    if err = cursor.All(dbh.Context, &models); err != nil {
        log.Fatal(err)
        return nil, err
    }
    return models, nil
}

func Delete(dbh *db.DBH, id string) error {
    objectId, err := primitive.ObjectIDFromHex(id)
    if err != nil{
        return err
    }
    log.Info(objectId)

    filter := bson.M{"_id": bson.M{"$eq": objectId}}
    res, err := dbh.DocumentsCollection.DeleteOne(dbh.Context, filter)
    if err != nil {
        return err
    }
    if res.DeletedCount < 1 {
       return errors.New("No resource deleted, aka not found.")
    }

    return nil
}

func Update(dbh *db.DBH, model *model.Document) error {
    objectId, err := primitive.ObjectIDFromHex(model.Id)
    if err != nil{
        return err
    }

    update := bson.D{
        { "$set", bson.D{{Key: "title", Value: model.Title }}},
        { "$set", bson.D{{Key: "content", Value: model.Content }}},
    }

    updRes, err := dbh.DocumentsCollection.UpdateByID(dbh.Context, objectId, update)
    if err != nil {
        return err
    }
    if updRes.MatchedCount < 1 {
        return errors.New("No document updated, db error 500")
    }
    return nil
}
