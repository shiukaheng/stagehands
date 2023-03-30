# Stagehands map server

## Dependencies

- [npm](https://www.npmjs.com/)
- [go](https://golang.org/doc/install)

## Getting started 

To run the test typescript server, run the following snippet. Note that this will be intergrated with the [stagehands monorepo](https://github.com/shiukaheng/stagehands)

```sh
git clone https://github.com/ramsaycarslaw/mapserver.git
npm install
npm run dev
```

Next to run the Go file server you can run:

```sh
cd services
go run main.go /PATH/TO/DIRECTORY/TO/SERVE -ip IPADRESS -port PORT -upload_limit UPLOAD_LIMIT_BYTES
```
> The default IP is `localhost` port is `8080` and upload limit is `6400000`

For example to serve a directory called files which is two directories up from `main.go` on localhost with port 8080 and a maximum upload size of 64KB.

```
go run main.go ../../files -ip 0.0.0.0 -port 8080 -upload_limit 640000
```

> Note the default is `8080

## Building the server 

To build the server you can run:

```sh
cd services
go build main.go
```

This will create an executable for your *current platform*.

## Running the server

To run the server you can run:

```sh
cd services
./mapserver ../../files
```

## Integration Guide

You can integrate the executable with other npm projects by listing go as a dependency and then using the following in `package.json`

```json
"scripts": {
  "mapserver": "cd {MAPSERVER_DIR} && go build && ./mapserver {PATH} -ip {IP} -port {PORT}"
}
```

> Idea: Once the file is complete upload to the server along with a Topic on WebTopics, the topic will contain the filename. When this changes we redownload the JSON file from the server using that name and use it to update the stage.

## Downloading files 

Assuming the server is already running

### Curl

```
curl 'http://localhost:8080/files/filename'
```
## Uploading 

Assuming the server is already running 

### Curl

```
curl -Ffile=@filename 'http://localhost:8080/upload'
```
### Python

```py
import requests

with open('filename', 'r') as f:
    r = requests.post('http://localhost:25478/upload', files={'/files/filename_on_server': f})
```
