package model

type MessageSend struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
	PhoneNumber string `json: phone_numer`
	Message     string `json:"message"`
}

type Product struct {
	ID       string   `json:"product_id" db:"product_id"`
	Name     string   `json:"name" db:"name"`
	Price    string   `json:"price" db:"price"`
	Size     []string `json:"size" db:"size"`
	Material string   `json:"material" db:"material"`
	Color    string   `json:"color" db:"color"`
	Design   string   `json:"design" db:"design"`
	Origin   string   `json:"origin" db:"origin"`
	Cleaning string   `json:"cleaning" db:"cleaning"`
	Category string   `json:"category" db:"category"`
}

type ProductWithImages struct {
	Product
	ImagePaths []string `json:"image_paths"`
}

type UpdateProductRequest struct {
	Product    Product  `json:"product"`
	ImagePaths []string `json:"image_paths"`
}

type User struct {
	ID       float64 `json:"id" db:"id"`
	Username string  `json:"username" db:"username"`
	Password string  `json:"password"`
}

type AuthInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
