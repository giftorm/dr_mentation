package main

import (
	"drmentation.io/api/v2/controller"
	"github.com/gofiber/fiber/v3"
)


func Router(app *fiber.App) {
    app.Get("/", func(c fiber.Ctx) error {
        return c.SendString("Hello, World 👋!")
    })

    app.Post("/document", func(c fiber.Ctx) error { return controller.Insert(c) })
    app.Post("/document/search", func(c fiber.Ctx) error { return controller.Search(c) })

    app.Delete("/document/:id", func(c fiber.Ctx) error { return controller.Delete(c) })

    app.Put("/document", func(c fiber.Ctx) error { return controller.Update(c) })

    app.Get("/document/:id", func(c fiber.Ctx) error { return controller.Get(c) })
    app.Get("/document", func(c fiber.Ctx) error { return controller.ListAll(c) })
}
