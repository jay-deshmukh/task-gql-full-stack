// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Character interface {
	IsCharacter()
}

type Droid struct {
	Name            string `json:"name"`
	PrimaryFunction string `json:"primaryFunction"`
}

func (Droid) IsCharacter() {}

type Human struct {
	Name          string `json:"name"`
	HasLightsaver bool   `json:"hasLightsaver"`
}

func (Human) IsCharacter() {}
