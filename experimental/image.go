package main

import (
	"encoding/json"
	"log"
	"os"

	pnm "github.com/jbuchbinder/gopnm"
)

type PixelFile struct {
	name string
	data [][]uint8
}

func ProcessImage(root string, fname string) {
	file, err := os.Open(root + fname)
	defer file.Close()

	if err != nil {
		log.Println("Error reading pgm file")
		log.Println(err)
		return
	}

	img, err := pnm.Decode(file)
	if err != nil {
		log.Println("Could not decode image")
		log.Println(err)
		return
	}

	// fmt.Println(img)
	bounds := img.Bounds()
	width, height := bounds.Max.X, bounds.Max.Y

	var pixels [][]uint8

	for i := 0; i < width; i++ {
		var row []uint8
		for j := 0; j < height; j++ {
			row = append(row, checkRgba(img.At(i, j).RGBA()))
		}
		pixels = append(pixels, row)
	}

	components := ComponentFromPixels(pixels)
	jsonResult, err := json.Marshal(components)

	if err != nil {
		log.Println("Could not marshal json")
		log.Println(err)
		return
	}

	//array := strings.Join(strings.Fields(fmt.Sprintf("%d", pixels)), ",")
	//jsonResult := fmt.Sprintf(`{"Name":%q,"Array":%s}`, fname, array)
	// fmt.Println(jsonResult)

	err = os.WriteFile(root+fname+".json", []byte(jsonResult), 0644)
	if err != nil {
		log.Println("Could not write json to file")
		log.Println(err)
	}
}

func checkRgba(r, b, g, a uint32) uint8 {
	if r == 0 && b == 0 && g == 0 {
		return 1
	}
	return 0
}
