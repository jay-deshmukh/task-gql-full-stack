package schemaparser

import (
	"github.com/jensneuse/graphql-go-tools/pkg/astparser"
	"log"
)

func ParseTypes(schema []byte) ([]string, error) {
	// this function below in the schema a schema and changes it to a document format so we can work with it.
	document, report := astparser.ParseGraphqlDocumentBytes(schema)
	if report.HasErrors() {
		return nil, report
	}

	visitor := newVisitor()
	visitor.Walk(&document, nil, &report)
	if report.HasErrors() {
		return nil, report
	}

	return visitor.typeNames, nil
}

func CountEnumValues(schema []byte) (int, error) {
	document, report := astparser.ParseGraphqlDocumentBytes(schema)
	if report.HasErrors() {
		return 0, report
	}

	visitor := newVisitor()
	visitor.Walk(&document, nil, &report)
	if report.HasErrors() {
		return 0, report
	}

	log.Println(visitor.count)
	return visitor.count, nil
}
