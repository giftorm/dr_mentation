package main

import (
	"drmentation.io/api/v2/controller"
	"drmentation.io/api/v2/db/mongo"
	"github.com/gofiber/fiber/v3"
)


func Router(app *fiber.App, dbh *mongo.Dbh) {
    app.Get("/", func(c fiber.Ctx) error {
        return c.SendString("Hello, World 👋!")
    })

    app.Get("/documents/test", func(c fiber.Ctx) error {
        return c.SendString(controller.Insert(dbh))
    })

    app.Get("/documents/:id", func(c fiber.Ctx) error {
        return c.JSON(controller.Get(c.Params("id")))
    })
}
