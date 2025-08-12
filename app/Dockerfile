FROM golang:alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest
RUN apk add --no-cache tzdata
WORKDIR /root/
COPY --from=builder /app/app .
EXPOSE 3000
CMD ["./app"]