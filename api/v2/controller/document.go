package controller

import (
	"drmentation.io/api/v2/db"
	"drmentation.io/api/v2/model"
	"drmentation.io/api/v2/repository"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
)


func Get(c fiber.Ctx) error {
    id := c.Params("id")

    dbh := db.Connect()
    defer dbh.CancelFunc()

    m, err := repository.Get(dbh, id)
    if err != nil {
        return err
    }

    return c.JSON(m)
}

func Insert(c fiber.Ctx) error {
    model := new(model.Document)
    if err := c.Bind().Body(model); err != nil {
        return err
    }

    dbh := db.Connect()
    defer dbh.CancelFunc()

    res, err := repository.Insert(dbh, model)
    if err != nil {
        return err
    }
    return c.SendString(res)
}

func ListAll(c fiber.Ctx) error {
    dbh := db.Connect()
    defer dbh.CancelFunc()

    res, err := repository.ListAll(dbh)
    if err != nil {
        return err
    }
    return c.JSON(res)
}

func Search(c fiber.Ctx) error {
    search := new(model.Search)
    if err := c.Bind().Body(search); err != nil {
        return err
    }

    log.Info(search)

    if len(search.Content) < 1 {
        return c.SendString("")
    }

    dbh := db.Connect()
    defer dbh.CancelFunc()

    res, err := repository.SearchContent(dbh, search.Content)
    if err != nil {
        return err
    }
    return c.JSON(res)
}

func Delete(c fiber.Ctx) error {
    id := c.Params("id")

    dbh := db.Connect()
    defer dbh.CancelFunc()

    if err := repository.Delete(dbh, id); err != nil {
        return err
    }

    return c.SendString("Deleted resource with id: " + id)
}

func Update(c fiber.Ctx) error {
    model := new(model.Document)
    if err := c.Bind().Body(model); err != nil {
        return err
    }

    if model.Id == "" {
       return Insert(c)
    }

    dbh := db.Connect()
    defer dbh.CancelFunc()

    if err := repository.Update(dbh, model); err != nil {
        return err
    }
    return c.JSON(model)
}


