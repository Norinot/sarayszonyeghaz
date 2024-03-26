package main

import (
	"log"
	"net/http"
	"szonyeghaz/api/handler"
)

func main() {

	http.HandleFunc("/message-us", handler.MessageUs)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
