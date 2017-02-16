package main

import (
	"github.com/astaxie/beego/migration"
)

// DO NOT MODIFY
type VenkyUser_20161031_173605 struct {
	migration.Migration
}

// DO NOT MODIFY
func init() {
	m := &VenkyUser_20161031_173605{}
	m.Created = "20161031_173605"
	migration.Register("VenkyUser_20161031_173605", m)
}

// Run the migrations
func (m *VenkyUser_20161031_173605) Up() {
	// use m.SQL("CREATE TABLE ...") to make schema update

}

// Reverse the migrations
func (m *VenkyUser_20161031_173605) Down() {
	// use m.SQL("DROP TABLE ...") to reverse schema update

}
