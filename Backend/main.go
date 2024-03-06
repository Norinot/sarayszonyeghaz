package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"net/smtp"

	_ "github.com/go-sql-driver/mysql"

)

func createConnection() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/")
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err != nil {
		return nil, err
	}
	return db, nil
}

func setupCORS(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func messageUs(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var m MessageSend
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	auth := smtp.PlainAuth(
		"",
		"",               //your email from which you want to send email
		"",               //The App password you generated for the email in case of gmail
		"smtp.gmail.com", //smtp server address
	)

	to := []string{"sendToThisEmail@email.com"}
	msg := []byte("To: " + m.Email + "\r\n" +
		"Subject: New message from " + m.FirstName + " " + m.LastName + "\r\n" +
		"\r\n" +
		"From: " + m.Email + "\r\n" +
		"Message: " + m.Message + "\r\n")

	err = smtp.SendMail("smtp.gmail.com:587", auth, "sender@email", to, msg)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Received a message from: %v\n", m)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}

type MessageSend struct {
	FirstName string
	LastName  string
	Email     string
	Message   string
}

func main() {

	http.HandleFunc("/message-us", messageUs)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
