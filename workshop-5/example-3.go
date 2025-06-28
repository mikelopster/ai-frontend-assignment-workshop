package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

var results map[string]string // Global map shared between goroutines without a mutex

func processRequestHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("id")
	if query == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	time.Sleep(2 * time.Second)
	result := fmt.Sprintf("Processed data for ID %s", query)

	results[query] = result

	log.Printf("Finished processing for %s", query)
	fmt.Fprintf(w, "Successfully processed: %s\n", query)
}

func main() {
	results = make(map[string]string)

	http.HandleFunc("/process", processRequestHandler)

	log.Println("Server starting on :8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
