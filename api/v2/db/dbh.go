package db

import (
	"context"
	"errors"
	"time"

	"drmentation.io/api/v2/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


const Database = "drmentation"
const Collection = "documents"


type DBH struct {
    Client *mongo.Client
    Context context.Context
    CancelFunc context.CancelFunc
    DocumentsCollection *mongo.Collection
}


func Connect() *DBH {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second);
    client, _ := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://mongo:27017"))
    documentsCollection := client.Database(Database).Collection(Collection)
    return &DBH{
        Client: client,
        Context: ctx,
        CancelFunc: cancel,
        DocumentsCollection: documentsCollection,
    }
}


func (d *DBH) Get(id [12]byte, model *model.Document) error {
    filter := bson.M{"_id": bson.M{"$eq": id}}
    if err := d.DocumentsCollection.FindOne(d.Context, filter).Decode(model); err != nil {
        return nil
    }

    return nil
}

func (d *DBH) Insert(model *model.Document) (string, error) {
    res, err := d.DocumentsCollection.InsertOne(context.Background(), model)
    if err != nil {
        return "", err
    };

    id := res.InsertedID.(primitive.ObjectID).Hex()
    return id, nil
}

func (d *DBH) All() ([]model.Document, error) {
    cursor, err := d.DocumentsCollection.Find(d.Context, bson.D{{}})
    if err != nil {
        return nil, err
    }
    var models []model.Document

    if err = cursor.All(d.Context, &models); err != nil {
        return nil, err
    }
    return models, nil
}

func (d *DBH) Search(text string) ([]model.Document, error) {
    filter := bson.M{"content": bson.M{"$regex": text, "$options": "i"}}

    cursor, err := d.DocumentsCollection.Find(d.Context, filter)
    if err != nil {
        return nil, err
    }

    var models []model.Document

    if err = cursor.All(d.Context, &models); err != nil {
        return nil, err
    }
    return models, nil
}

func (d *DBH) Delete(id string) error {
    objectId, err := primitive.ObjectIDFromHex(id)
    if err != nil{
        return err
    }

    filter := bson.M{"_id": bson.M{"$eq": objectId}}
    res, err := d.DocumentsCollection.DeleteOne(d.Context, filter)
    if err != nil {
        return err
    }
    if res.DeletedCount < 1 {
       return errors.New("No resource deleted, aka not found.")
    }

    return nil
}

func (d *DBH) Update(model *model.Document) error {
    objectId, err := primitive.ObjectIDFromHex(model.Id)

    update := bson.D{
        { "$set", bson.D{{Key: "title", Value: model.Title }}},
        { "$set", bson.D{{Key: "content", Value: model.Content }}},
    }

    updRes, err := d.DocumentsCollection.UpdateByID(d.Context, objectId, update)
    if err != nil {
        return err
    }
    if updRes.MatchedCount < 1 {
        return errors.New("No document updated, db error 500")
    }
    return nil
}

