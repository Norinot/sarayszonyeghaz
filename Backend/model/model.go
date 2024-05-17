package model

type MessageSend struct {
	FirstName string
	LastName  string
	Email     string
	Message   string
}

type Product struct {
	ID        string `json:"product_id"`
	Name      string `json:"name"`
	Price     int    `json:"price"`
	Size      string `json:"size"`
	Material  string `json:"material"`
	Color     string `json:"color"`
	Origin    string `json:"origin"`
	Cleaning  string `json:"cleaning"`
	ImagePath string `json:"imagePath"`
}
