package controller

import (
	"drmentation.io/api/v2/model"
	"drmentation.io/api/v2/repository"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
)


func Get(c fiber.Ctx) error {
    id := c.Params("id")

    repo := repository.New()
    defer repo.DBH.CancelFunc()

    m, err := repo.Get(id)
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

    repo := repository.New()
    defer repo.DBH.CancelFunc()

    res, err := repo.Insert(model)
    if err != nil {
        return err
    }
    return c.SendString(res)
}

func ListAll(c fiber.Ctx) error {
    repo := repository.New()
    defer repo.DBH.CancelFunc()

    res, err := repo.ListAll()
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

    repo := repository.New()
    defer repo.DBH.CancelFunc()

    res, err := repo.SearchContent(search.Content)
    if err != nil {
        return err
    }
    return c.JSON(res)
}

func Delete(c fiber.Ctx) error {
    id := c.Params("id")

    repo := repository.New()
    defer repo.DBH.CancelFunc()

    if err := repo.Delete(id); err != nil {
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

    repo := repository.New()
    defer repo.DBH.CancelFunc()

    if err := repo.Update(model); err != nil {
        return err
    }
    return c.JSON(model)
}


