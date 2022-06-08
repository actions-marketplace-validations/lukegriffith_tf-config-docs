# golang build
FROM golang:alpine AS go-builder
RUN apk add --no-cache git
WORKDIR /go/src/app
COPY . .
RUN go get -d -v .
RUN go build -o /go/bin/tf-config-docs -v .

# node js build 
FROM node:18.3.0-alpine as npm-builder
COPY ./app /app
WORKDIR /app
RUN npm install
RUN npm run build


# final container

FROM alpine:3.16.0
RUN apk --no-cache add ca-certificates
COPY --from=go-builder /go/bin/tf-config-docs /tf-config-docs
COPY --from=npm-builder /app/build /build
COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["sh", "/entrypoint.sh"]
LABEL Name=tfconfigdocs Version=0.0.5