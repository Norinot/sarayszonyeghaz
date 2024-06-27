package handler

import (
	"log"
	"net/http"
	"net/smtp"
	"szonyeghaz/model"

	"github.com/gin-gonic/gin"
)

func MessageUs(c *gin.Context) {

	var m model.MessageSend

	if err := c.ShouldBindJSON(&m); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if m.FirstName == "" || m.LastName == "" || m.Email == "" || m.Message == "" || m.PhoneNumber == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	auth := smtp.PlainAuth(
		"",
		"",               //your email from which you want to send email
		"",               //The App password you generated for the email in case of gmail
		"smtp.gmail.com", //smtp server address
	)

	to := []string{"info@sarayszonyeghaz.hu"}
	msg := []byte("To: " + m.Email + "\r\n" +
		"Subject: Új üzenet érkezett: " + m.FirstName + " " + m.LastName + "\r\n" +
		"\r\n" +
		"Feladó: " + m.Email + "\r\n" +
		"Üzenet: " + m.Message + "\r\n" +
		"Telefonszám: " + m.PhoneNumber + "\r\n")

	err := smtp.SendMail("smtp.gmail.com:587", auth, "sender@email", to, msg)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Received a message from: %v\n", m)

	c.JSON(http.StatusOK, gin.H{"message": "Your message has been sent"})
}
