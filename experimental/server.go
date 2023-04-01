package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strings"
)

var (
	rePathUpload = regexp.MustCompile(`^/upload$`)
	rePathFiles  = regexp.MustCompile(`^/files/([^/]+)$`)
)

type Server struct {
	DocumentRoot  string
	MaxUploadSize int64
	Cors          bool
}

func NewServer(root string, maxUploadSize int64, cors bool) Server {
	return Server{
		DocumentRoot:  root,
		MaxUploadSize: maxUploadSize,
	}
}

func (s Server) handlePost(w http.ResponseWriter, r *http.Request) {
	file, info, err := r.FormFile("file")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Error reading file:", err)
		return
	}
	defer file.Close()

	size, err := Size(file)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Error getting file size:", err)
		return
	}

	if size > s.MaxUploadSize {
		w.WriteHeader(http.StatusRequestEntityTooLarge)
		log.Println("File too large:", size)
		return
	}

	content, err := ioutil.ReadAll(file)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Error reading file:", err)
		return
	}

	if err := ioutil.WriteFile(s.DocumentRoot+"/"+info.Filename, content, 0644); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Error writing file:", err)
		return
	}

	// Get the extension of the filename
	extension := strings.Split(info.Filename, ".")[1]
	log.Println(extension)
	if extension == "pgm" {
		ProcessImage(s.DocumentRoot+"/", info.Filename)
	}

	if s.Cors {
		w.Header().Add("Access-Control-Allow-Origin", "*")
	}

	w.WriteHeader(http.StatusOK)
}

func (s Server) handleGet(w http.ResponseWriter, r *http.Request) {
	if !rePathFiles.MatchString(r.URL.Path) {
		http.NotFound(w, r)
		log.Println("Path not found:", r.URL.Path)
		return
	}

	if s.Cors {
		w.Header().Add("Access-Control-Allow-Origin", "*")
	}

	http.StripPrefix("/files/", http.FileServer(http.Dir(s.DocumentRoot))).ServeHTTP(w, r)
}

func (s Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet, http.MethodHead:
		s.handleGet(w, r)
	case http.MethodPost:
		s.handlePost(w, r)
	default:
		w.Header().Add("Allow", "GET,HEAD,POST,PUT")
		w.WriteHeader(http.StatusMethodNotAllowed)
		log.Println("Method: ", r.Method, " not allowed")
	}
}
