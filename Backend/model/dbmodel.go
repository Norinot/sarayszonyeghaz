package model

import (
	"database/sql"
	"log"
	"szonyeghaz/pkg/db"

	"github.com/segmentio/ksuid"
)

func ListProductsHandler() []Product {

	database, _ := db.CreateConnection()

	results, err := database.Query("SELECT * FROM products")

	if err != nil {
		log.Fatal(err.Error())
		return nil
	}

	products1 := []Product{}

	for results.Next() {
		var prod Product
		err = results.Scan(&prod.ID, &prod.Name, &prod.Price, &prod.Size, &prod.Material, &prod.Color,
			&prod.Origin, &prod.Cleaning, &prod.ImagePath)

		if err != nil {
			log.Fatal(err.Error())
		}
		products1 = append(products1, prod)
		if err != nil {
			log.Fatal(err.Error())
		}
	}

	return products1
}

func GetProductsbyID(db *sql.DB, id string) ([]Product, error) {
	products := []Product{}

	query := "SELECT * FROM products WHERE product_id=?"
	log.Printf("Executing query: %s with id: %s\n", query, id)
	results, err := db.Query(query, id)
	if err != nil {
		return nil, err
	}
	defer results.Close()

	for results.Next() {
		var prod Product
		err := results.Scan(&prod.ID, &prod.Name, &prod.Price, &prod.Size, &prod.Material, &prod.Color,
			&prod.Origin, &prod.Cleaning, &prod.ImagePath)
		if err != nil {
			log.Println("Failed to scan the result:", err)
			continue
		}
		products = append(products, prod)
	}

	if err = results.Err(); err != nil {
		return nil, err
	}

	log.Printf("Found %d products with ID %s\n", len(products), id)

	return products, nil
}

func CreateProductsHandler(products Product, imagePath string) error {
	database, _ := db.CreateConnection()
	//defer database.Close()

	insert, err := database.Query(
		"INSERT INTO products (product_id, name, price,  size, material, color, origin, cleaning, imagePath) VALUES (?,?,?,?,?,?,?,?,?)",
		ksuid.New(),
		products.Name,
		products.Price,
		products.Size,
		products.Material,
		products.Color,
		products.Origin,
		products.Cleaning,
		imagePath)

	if err != nil {
		log.Fatal(err.Error())
	}
	defer insert.Close()
	return nil
}

func DeleteProductByID(db *sql.DB, id string) error {
	query := "DELETE FROM products WHERE product_id=?"
	log.Printf("Executing delete query: %s with id: %s\n", query, id)
	_, err := db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}
