package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/fiber/v3/middleware/requestid"
)

func main() {
    app := fiber.New()

    // Initialize default config
    app.Use(logger.New())

    // Or extend your config for customization
    // Logging remote IP and Port
    app.Use(logger.New(logger.Config{
        Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
    }))

    // Logging Request ID
    app.Use(requestid.New())
    app.Use(logger.New(logger.Config{
        // For more options, see the Config section
        Format: "${pid} ${locals:requestid} ${status} - ${method} ${path}​\n",
    }))

    // Initialize default config
    app.Use(cors.New())

    // Or extend your config for customization
    app.Use(cors.New(cors.Config{
        AllowOrigins: []string{"http://127.0.0.1", "http://localhost"},
        AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
    }))

    Router(app);

    // Start the server on port 3000
    log.Fatal(app.Listen(":5045"))
}
