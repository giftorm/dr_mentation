package db

import (
    "context"
    "time"

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
