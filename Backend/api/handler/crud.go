package handler

import (
	"net/http"
	"szonyeghaz/model"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/ksuid"
)

func ListproductsHandler(c *gin.Context) {
	products, err := model.ListProductsHandler()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

func Getproductsbyid(c *gin.Context) {
	productID := c.Param("id")

	product, err := model.GetProductByIDHandler(productID)
	if err != nil {
		if err.Error() == "product not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, product)
}

func CreateproductsHandler(c *gin.Context) {

	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse multipart form: " + err.Error()})
		return
	}

	name := c.PostForm("name")
	price := c.PostForm("price")
	size := c.PostForm("size")
	material := c.PostForm("material")
	color := c.PostForm("color")
	design := c.PostForm("design")
	origin := c.PostForm("origin")
	cleaning := c.PostForm("cleaning")

	product := model.Product{
		ID:       ksuid.New().String(),
		Name:     name,
		Price:    price,
		Size:     size,
		Material: material,
		Color:    color,
		Design:   design,
		Origin:   origin,
		Cleaning: cleaning,
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve multipart form: " + err.Error()})
		return
	}

	files := form.File["files"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files found in the request"})
		return
	}

	imagePaths := make([]string, 0, len(files))

	for _, file := range files {
		imagePath := "assets/" + ksuid.New().String() //file.Filename
		if err := c.SaveUploadedFile(file, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file: " + err.Error()})
			return
		}
		imagePaths = append(imagePaths, imagePath)
	}

	if err := model.CreateProductsHandler(product, imagePaths); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Product created successfully"})
}

func UpdateProductByID(c *gin.Context) {
	productID := c.Param("id")

	var request model.UpdateProductRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := model.UpdateProductByIDHandler(productID, request.Product, request.ImagePaths)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product updated successfully"})
}

func Deleteproductsbyid(c *gin.Context) {
	productID := c.Param("id")

	err := model.DeleteProductByIDHandler(productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}
