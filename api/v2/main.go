package main

import (
	"log"

	"drmentation.io/api/v2/db/mongo"
	"github.com/gofiber/fiber/v3"
)

func main() {
    // Initialize a new Fiber app
    app := fiber.New()
    dbh, err := mongo.DBHFactory()
    if err != nil {
        panic("Failed to create DBH");
    }

    Router(app, dbh);

    // Start the server on port 3000
    log.Fatal(app.Listen(":3000"))
}
