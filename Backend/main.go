package main

import (
	"szonyeghaz/api/handler"
	"szonyeghaz/api/middleware"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	//Public routes
	router.GET("/products", handler.ListproductsHandler)
	router.GET("/products/:id", handler.Getproductsbyid)
	router.POST("/message-us", handler.MessageUs)

	//Get the JWT middleware
	authMiddleware, err := middleware.AuthMiddleware()
	if err != nil {
		panic("JWT Error:" + err.Error())
	}

	//Login
	router.POST("/login", authMiddleware.LoginHandler)

	//Authenticated routes
	authRoutes := router.Group("")
	authRoutes.Use(authMiddleware.MiddlewareFunc())
	{
		authRoutes.POST("/products", handler.CreateproductsHandler)
		authRoutes.PUT("/products/:id", handler.UpdateProductByID)
		authRoutes.DELETE("/products/:id", handler.Deleteproductsbyid)
	}

	router.Static("/assets", "./assets")
	router.StaticFile("/favicon.ico", "./resources/favicon.ico")

	router.Run("localhost:8085")

}
