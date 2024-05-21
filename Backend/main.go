package main

import (
	"log"
	"net/http"
	"szonyeghaz/api/handler"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	//router.MaxMultipartMemory = 8 << 20
	router.GET("/products", handler.ListproductsHandler)
	router.GET("/products/:id", handler.Getproductsbyid)
	router.POST("/products", handler.CreateproductsHandler)
	router.DELETE("/products/:id", handler.Deleteproductsbyid)

	router.Run("localhost:8085")

	http.HandleFunc("/message-us", handler.MessageUs)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
