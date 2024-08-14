package mongo

import (
    "context"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)


type Dbh struct {
    Client *mongo.Client
    Context context.Context
    CancelFunc context.CancelFunc
}


func DBHFactory() (*Dbh, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second);
    client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://127.0.0.1:27017"))
    if err != nil {
        cancel()
        return nil, err
    };
    return &Dbh{
        Client: client,
        Context: ctx,
        CancelFunc: cancel,
    }, nil;
}
