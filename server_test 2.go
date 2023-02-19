package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/jensneuse/graphql-go-tools/pkg/graphql"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

var httpClient *http.Client

func TestMainFunc(t *testing.T) {
	go main()

	t.Run("should get all heroes", func(t *testing.T) {
		gqlReqBody := graphql.Request{
			Query: "{ heroes { name ...on Human { hasLightsaber } ...on Droid { primaryFunction } } }",
		}

		heroResponse := executeGraphQLRequest(t, gqlReqBody)
		assert.JSONEq(t, expectedHeroes, string(heroResponse.Data))
	})

	t.Run("should get all type names excluding interfaces", func(t *testing.T) {
		gqlReqBody := graphql.Request{
			Query: "{ types }",
		}

		typesResponse := executeGraphQLRequest(t, gqlReqBody)
		assert.JSONEq(t, expectedTypes, string(typesResponse.Data))
	})
}

func executeGraphQLRequest(t *testing.T, reqBody graphql.Request) GraphQLResponse {
	t.Helper()

	bodyBytes, err := json.Marshal(reqBody)
	require.NoError(t, err)

	req, err := http.NewRequest(http.MethodPost, "http://localhost:8085/query", bytes.NewBuffer(bodyBytes))
	require.NoError(t, err)

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	if httpClient == nil {
		httpClient = &http.Client{}
	}

	resp, err := httpClient.Do(req)
	require.NoError(t, err)
	require.Equalf(t, http.StatusOK, resp.StatusCode, "response status code is not 200")

	respBody, err := ioutil.ReadAll(resp.Body)
	require.NoError(t, err)

	gqlResponse := GraphQLResponse{}
	err = json.Unmarshal(respBody, &gqlResponse)
	require.NoError(t, err)

	return gqlResponse
}

type GraphQLResponse struct {
	Data json.RawMessage `json:"data"`
}

var expectedHeroes = `{
	"heroes": [
		{
			"name": "Luke Skywalker",
			"hasLightsaber": true
		},
		{
			"name": "Han Solo",
			"hasLightsaber": false
		},
		{
			"name": "C-3PO",
			"primaryFunction": "Translator"
		}
	]
}
`

var expectedTypes = `{
	"types": [
		"Query",
		"Human",
		"Droid"
	]
}
`
