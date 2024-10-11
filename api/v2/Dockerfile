# Choose whatever you want, version >= 1.16
FROM golang:1.23-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@v1.61.0

COPY go.mod go.sum ./
RUN go mod download

CMD ["air", "-d", "-c", ".air.toml"]
