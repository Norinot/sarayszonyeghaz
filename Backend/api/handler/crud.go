package handler

import (
	"log"
	"net/http"
	"szonyeghaz/model"
	"szonyeghaz/pkg/db"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/ksuid"
)

func ListproductsHandler(c *gin.Context) {
	products1 := model.ListProductsHandler()
	if products1 == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.IndentedJSON(http.StatusOK, products1)
	}
}

func Getproductsbyid(c *gin.Context) {
	id := c.Param("id")

	log.Printf("Received ID: %s\n", id)

	_, err := ksuid.Parse(id)
	if err != nil {
		log.Printf("Invalid KSUID: %s\n", id)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	db, err := db.CreateConnection()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer db.Close()

	products, err := model.GetProductsbyID(db, id)
	if err != nil {
		log.Fatal("Query execution error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve products"})
		return
	}

	if len(products) == 0 {
		log.Println("No products found")
		c.JSON(http.StatusNotFound, gin.H{"message": "No products found"})
		return
	}

	c.JSON(http.StatusOK, products)
}

func CreateproductsHandler(c *gin.Context) {
	var product model.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	imagePath := "assets/" + file.Filename
	if err := c.SaveUploadedFile(file, imagePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := model.CreateProductsHandler(product, imagePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product created successfully"})
}

func Deleteproductsbyid(c *gin.Context) {
	id := c.Param("id")

	log.Printf("Received ID: %s\n", id)

	_, err := ksuid.Parse(id)
	if err != nil {
		log.Printf("Invalid KSUID: %s\n", id)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	db, err := db.CreateConnection()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer db.Close()

	err = model.DeleteProductByID(db, id)
	if err != nil {
		log.Fatal("Failed to delete product:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete product"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}
