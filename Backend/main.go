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
	router.POST("/products", handler.CreateproductsHandler)
	router.POST("/message-us", handler.MessageUs)
	router.PUT("/products/:id", handler.UpdateProductByID)
	router.DELETE("/products/:id", handler.Deleteproductsbyid)

	router.Run("localhost:8085")

}
