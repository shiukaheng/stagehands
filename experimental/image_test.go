package main

import "testing"

func TestProcessImage(t *testing.T) {
	ProcessImage("files/", "good_map.pgm")
}
