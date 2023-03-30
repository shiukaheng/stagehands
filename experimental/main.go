package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	bindAddress := flag.String("ip", "0.0.0.0", "IP address to bind")
	listenPort := flag.Int("port", 25478, "port number to listen on")
	maxUploadSize := flag.Int64("upload_limit", 6400000, "max size of uploaded file (byte)")
	cors := flag.Bool("cors", true, "CORS header to send")

	flag.Parse()
	serverRoot := flag.Arg(0)
	if len(serverRoot) == 0 {
		flag.Usage()
		log.Fatal("Wrong number of arguments")
	}

	server := NewServer(serverRoot, *maxUploadSize, *cors)
	http.Handle("/upload", server)
	http.Handle("/files/", server)

	if err := http.ListenAndServe(fmt.Sprintf("%s:%d", *bindAddress, *listenPort), nil); err != nil {
		log.Fatal(err)
	}
}
