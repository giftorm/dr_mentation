package collection

import (
	"context"

	"drmentation.io/api/v2/model"
    "drmentation.io/api/v2/db/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const Database = "drmentation"
const Collection = "documents"

func Insert(dbh *mongo.Dbh, document *model.Document) (string, error) {
    collection := dbh.Client.Database(Database).Collection(Collection);
    res, err := collection.InsertOne(context.Background(), document)
    if err != nil {
        return "", err
    };

    insertedID := res.InsertedID.(primitive.ObjectID).Hex()
    return insertedID, nil
}
