package schemaparser

import (
	"github.com/jensneuse/graphql-go-tools/pkg/ast"
	"github.com/jensneuse/graphql-go-tools/pkg/astvisitor"
)

type visitor struct {
	astvisitor.Walker
	typeNames []string
	enumCount int // Fatma: Problem 1.3 - Bonus.
}

func newVisitor() *visitor {
	w := astvisitor.NewWalker(48)
	v := &visitor{
		Walker:    w,
		typeNames: []string{},
	}

	v.RegisterEnterDocumentVisitor(v)
	return v
}

func (v *visitor) EnterDocument(operation, definition *ast.Document) {
	for _, r := range operation.RootNodes {
		switch r.Kind { // Kind := An enum that describes the different kinds of AST nodes.
		/* Fatma: Problem 1.2 - Commented out to avoid appending interface-typed objects
		case ast.NodeKindInterfaceTypeDefinition:
			name := operation.InterfaceTypeDefinitionNameString(r.Ref)
			v.typeNames = append(v.typeNames, name)
		*/

		case ast.NodeKindObjectTypeDefinition:
			name := operation.ObjectTypeDefinitionNameString(r.Ref)
			v.typeNames = append(v.typeNames, name)

		/* Fatma: Problem 1.3 - Bonus := Count the total number of enum values
		 */
		case ast.NodeKindEnumTypeDefinition:
			name := operation.EnumTypeDefinitionNameString(r.Ref)
			v.enumCount += len(name)

		default:
			continue
		}
	}
}
