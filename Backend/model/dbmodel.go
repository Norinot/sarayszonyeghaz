package model

import (
	"database/sql"
	"errors"
	"os"
	"szonyeghaz/pkg/db"
)

func ListProductsHandler() ([]ProductWithImages, error) {
	database, err := db.CreateConnection()
	if err != nil {
		return nil, err
	}
	defer database.Close()

	query := `
        SELECT p.product_id, p.name, p.price, p.size, p.material, p.color, p.design, p.origin, p.cleaning, pi.image_path
        FROM products p
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
		ORDER BY p.name
    `

	rows, err := database.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	productsMap := make(map[string]*ProductWithImages)

	for rows.Next() {
		var (
			productID string
			name      sql.NullString
			price     sql.NullString
			size      sql.NullString
			material  sql.NullString
			color     sql.NullString
			design    sql.NullString
			origin    sql.NullString
			cleaning  sql.NullString
			imagePath sql.NullString
		)

		err := rows.Scan(&productID, &name, &price, &size, &material, &color, &design, &origin, &cleaning, &imagePath)
		if err != nil {
			return nil, err
		}

		if product, exists := productsMap[productID]; exists {
			if imagePath.Valid {
				product.ImagePaths = append(product.ImagePaths, imagePath.String)
			}
		} else {
			product := &ProductWithImages{
				Product: Product{
					ID:       productID,
					Name:     name.String,
					Price:    price.String,
					Size:     size.String,
					Material: material.String,
					Color:    color.String,
					Design:   design.String,
					Origin:   origin.String,
					Cleaning: cleaning.String,
				},
				ImagePaths: []string{},
			}
			if imagePath.Valid {
				product.ImagePaths = append(product.ImagePaths, imagePath.String)
			}
			productsMap[productID] = product
		}
	}

	products := make([]ProductWithImages, 0, len(productsMap))
	for _, product := range productsMap {
		products = append(products, *product)
	}

	return products, nil
}

func GetProductByIDHandler(productID string) (*ProductWithImages, error) {
	database, err := db.CreateConnection()
	if err != nil {
		return nil, err
	}
	defer database.Close()

	query := `
		SELECT p.product_id, p.name, p.price, p.size, p.material, p.color, p.design, p.origin, p.cleaning, pi.image_path
		FROM products p
		LEFT JOIN product_images pi ON p.product_id = pi.product_id
		WHERE p.product_id = ?
	`

	rows, err := database.Query(query, productID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var product *ProductWithImages

	for rows.Next() {
		var (
			id        string
			name      sql.NullString
			price     sql.NullString
			size      sql.NullString
			material  sql.NullString
			color     sql.NullString
			design    sql.NullString
			origin    sql.NullString
			cleaning  sql.NullString
			imagePath sql.NullString
		)

		err := rows.Scan(&id, &name, &price, &size, &material, &color, &design, &origin, &cleaning, &imagePath)
		if err != nil {
			return nil, err
		}

		if product == nil {

			product = &ProductWithImages{
				Product: Product{
					ID:       productID,
					Name:     name.String,
					Price:    price.String,
					Size:     size.String,
					Material: material.String,
					Color:    color.String,
					Design:   design.String,
					Origin:   origin.String,
					Cleaning: cleaning.String,
				},
				ImagePaths: []string{},
			}
		}

		if imagePath.Valid {
			product.ImagePaths = append(product.ImagePaths, imagePath.String)
		}
	}

	if product == nil {
		return nil, errors.New("product not found")
	}

	return product, nil
}

func CreateProductsHandler(product Product, imagePaths []string) error {
	database, err := db.CreateConnection()
	if err != nil {
		return err
	}
	defer database.Close()

	tx, err := database.Begin()
	if err != nil {
		return err
	}

	_, err = tx.Exec(`
		INSERT INTO products (product_id, name, price, size, material, color, design, origin, cleaning)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, product.ID, product.Name, product.Price, product.Size, product.Material, product.Color, product.Design, product.Origin, product.Cleaning)
	if err != nil {
		tx.Rollback()
		return err
	}

	for _, imagePath := range imagePaths {
		_, err = tx.Exec(`
			INSERT INTO product_images (product_id, image_path)
			VALUES (?, ?)
		`, product.ID, imagePath)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func UpdateProductByIDHandler(productID string, product Product, imagePaths []string) error {
	database, err := db.CreateConnection()
	if err != nil {
		return err
	}
	defer database.Close()

	tx, err := database.Begin()
	if err != nil {
		return err
	}

	_, err = tx.Exec(`
		UPDATE products
		SET name = ?, price = ?, size = ?, material = ?, color = ?, design = ?, origin = ?, cleaning = ?
		WHERE product_id = ?
	`, product.Name, product.Price, product.Size, product.Material, product.Color, product.Design, product.Origin, product.Cleaning, productID)
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec("DELETE FROM product_images WHERE product_id = ?", productID)
	if err != nil {
		tx.Rollback()
		return err
	}

	for _, imagePath := range imagePaths {
		_, err = tx.Exec("INSERT INTO product_images (product_id, image_path) VALUES (?, ?)", productID, imagePath)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func DeleteProductByIDHandler(productID string) error {
	database, err := db.CreateConnection()
	if err != nil {
		return err
	}
	defer database.Close()

	tx, err := database.Begin()
	if err != nil {
		return err
	}

	rows, err := tx.Query("SELECT image_path FROM product_images WHERE product_id = ?", productID)
	if err != nil {
		tx.Rollback()
		return err
	}
	defer rows.Close()

	var imagePaths []string
	for rows.Next() {
		var imagePath string
		if err := rows.Scan(&imagePath); err != nil {
			tx.Rollback()
			return err
		}
		imagePaths = append(imagePaths, imagePath)
	}
	if err := rows.Err(); err != nil {
		tx.Rollback()
		return err
	}

	for _, imagePath := range imagePaths {
		if err := deleteImage(tx, imagePath); err != nil {
			tx.Rollback()
			return err
		}
	}

	_, err = tx.Exec("DELETE FROM products WHERE product_id = ?", productID)
	if err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func deleteImage(tx *sql.Tx, imagePath string) error {
	_, err := tx.Exec("DELETE FROM product_images WHERE image_path = ?", imagePath)
	if err != nil {
		return err
	}
	e := os.Remove(imagePath)
	if e != nil {
		return err
	}
	return nil
}
