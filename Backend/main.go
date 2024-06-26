package main

import (
	"szonyeghaz/api/handler"
	"szonyeghaz/api/middleware"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	router.GET("/products", handler.ListproductsHandler)
	router.GET("/products/:id", handler.Getproductsbyid)
	router.POST("/message-us", handler.MessageUs)

	authMiddleware, err := middleware.AuthMiddleware()
	if err != nil {
		panic("JWT Error:" + err.Error())
	}

	router.POST("/login", authMiddleware.LoginHandler)

	authRoutes := router.Group("")
	authRoutes.Use(authMiddleware.MiddlewareFunc())
	{
		authRoutes.GET("/checkToken", middleware.CheckToken)
		authRoutes.POST("/products", handler.CreateproductsHandler)
		authRoutes.PUT("/products/:id", handler.UpdateProductByID)
		authRoutes.DELETE("/products/:id", handler.Deleteproductsbyid)
	}

	router.Static("/assets", "./assets")
	router.StaticFile("/favicon.ico", "./resources/favicon.ico")

	router.Run("localhost:8085")
}
