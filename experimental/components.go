package main

type Component struct {
	x, y, width, height uint32
}

func ComponentFromPixels(pixels [][]uint8) []Component {
	components := make([]Component, 0)
	for y, row := range pixels {
		for x, pixel := range row {
			if pixel == 1 {
				components = append(components, Component{uint32(x), uint32(y), 1, 1})
			}
		}
	}
	return components
}
