package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"net/smtp"
	"szonyeghaz/api/middleware"
	"szonyeghaz/model"
)

func MessageUs(w http.ResponseWriter, r *http.Request) {
	middleware.SetupCORS(&w, r)
	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var m model.MessageSend
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
