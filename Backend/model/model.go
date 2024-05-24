package model

type MessageSend struct {
	FirstName string
	LastName  string
	Email     string
	Message   string
}

type Product struct {
	ID       string `json:"product_id" db:"product_id"`
	Name     string `json:"name" db:"name"`
	Price    string `json:"price" db:"price"`
	Size     string `json:"size" db:"size"`
	Material string `json:"material" db:"material"`
	Color    string `json:"color" db:"color"`
	Origin   string `json:"origin" db:"origin"`
	Cleaning string `json:"cleaning" db:"cleaning"`
}

type ProductWithImages struct {
	Product
	ImagePaths []string `json:"image_paths"`
}

type UpdateProductRequest struct {
	Product    Product  `json:"product"`
	ImagePaths []string `json:"image_paths"`
}
