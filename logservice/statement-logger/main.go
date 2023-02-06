package main

import (
	"io"
	"log"
	"net/http"
)

func main() {

	logHandler := func(w http.ResponseWriter, req *http.Request) {

		if req.Method != "POST" {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Only Post Suppored"))
		} else {
			bodyBytes, _ := io.ReadAll(req.Body)
			bodyString := string(bodyBytes)
			log.Println("Got Magic8 Question: " + bodyString)
			w.WriteHeader(http.StatusOK)
		}
	}
	http.HandleFunc("/log", logHandler)
	log.Println("Listing for requests on ports  8080/log ")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
