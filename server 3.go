package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"

	"github.com/rs/cors"

	"github.com/pvormste/task-gql-full-stack/graph"
	"github.com/pvormste/task-gql-full-stack/graph/generated"
)

func main() {
	gqlHandler := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	gqlHandler.AddTransport(transport.POST{})
	gqlHandler.Use(extension.Introspection{})

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	http.Handle("/query", c.Handler(gqlHandler))
	log.Println("Send operations to: http://localhost:8085/query")
	log.Fatal(http.ListenAndServe(":8085", nil))
}
