package controller

import (
	"drmentation.io/api/v2/db/mongo"
	"drmentation.io/api/v2/db/mongo/collection"
	"drmentation.io/api/v2/model"
)

func Get(id string) *model.Document {
	return &model.Document{
		Id:      id,
		Title:   "Title",
		Content: "Content",
	}
}

func Insert(dbh *mongo.Dbh) string {
    id, err := collection.Insert(dbh, &model.Document{
        Title: "New Title!",
        Content: "New Content!",
    })
    if err != nil {
        return "rip didnt work"
    }
    return id
}
