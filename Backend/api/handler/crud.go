package handler

import (
	"encoding/json"
	"net/http"
	"path"
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
	sizeJSON := c.PostForm("size")
	var size []string
	if err := json.Unmarshal([]byte(sizeJSON), &size); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid size format: " + err.Error()})
		return
	}
	material := c.PostForm("material")
	color := c.PostForm("color")
	design := c.PostForm("design")
	origin := c.PostForm("origin")
	cleaning := c.PostForm("cleaning")
	category := c.PostForm("category")

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
		Category: category,
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
		ext := path.Ext(file.Filename)

		imagePath := "assets/" + ksuid.New().String() + ext
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

	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse multipart form: " + err.Error()})
		return
	}

	productID := c.Param("id")

	existingProduct, err := model.GetProductByIDHandler(productID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found: " + err.Error()})
		return
	}

	if name := c.PostForm("name"); name != "" {
		existingProduct.Name = name
	}
	if price := c.PostForm("price"); price != "" {
		existingProduct.Price = price
	}
	if sizeJSON := c.PostForm("size"); sizeJSON != "" {
		var size []string
		if err := json.Unmarshal([]byte(sizeJSON), &size); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid size format: " + err.Error()})
			return
		}
	}
	if material := c.PostForm("material"); material != "" {
		existingProduct.Material = material
	}
	if color := c.PostForm("color"); color != "" {
		existingProduct.Color = color
	}
	if design := c.PostForm("design"); design != "" {
		existingProduct.Design = design
	}
	if origin := c.PostForm("origin"); origin != "" {
		existingProduct.Origin = origin
	}
	if cleaning := c.PostForm("cleaning"); cleaning != "" {
		existingProduct.Cleaning = cleaning
	}
	if category := c.PostForm("category"); category != "" {
		existingProduct.Category = category
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve multipart form: " + err.Error()})
		return
	}

	var imagePaths []string
	files := form.File["files"]
	if len(files) >= 0 {

		if err := model.ClearProductImages(productID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear existing product images: " + err.Error()})
			return
		}

		imagePaths = make([]string, 0, len(files))
		for _, file := range files {
			ext := path.Ext(file.Filename)
			imagePath := "assets/" + ksuid.New().String() + ext
			if err := c.SaveUploadedFile(file, imagePath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file: " + err.Error()})
				return
			}
			imagePaths = append(imagePaths, imagePath)
		}

		if err := model.SaveProductImages(productID, imagePaths); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save product images: " + err.Error()})
			return
		}
	}

	product := model.Product{
		ID:       existingProduct.ID,
		Name:     existingProduct.Name,
		Price:    existingProduct.Price,
		Size:     existingProduct.Size,
		Material: existingProduct.Material,
		Color:    existingProduct.Color,
		Design:   existingProduct.Design,
		Origin:   existingProduct.Origin,
		Cleaning: existingProduct.Cleaning,
		Category: existingProduct.Category,
	}

	if err := model.UpdateProductByIDHandler(productID, product, imagePaths); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update product: " + err.Error()})
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
