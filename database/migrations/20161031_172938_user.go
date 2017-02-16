package main

import (
	"github.com/astaxie/beego/migration"
)

// DO NOT MODIFY
type User_20161031_172938 struct {
	migration.Migration
}

// DO NOT MODIFY
func init() {
	m := &User_20161031_172938{}
	m.Created = "20161031_172938"
	migration.Register("User_20161031_172938", m)
}

// Run the migrations
func (m *User_20161031_172938) Up() {
	// use m.SQL("CREATE TABLE ...") to make schema update
	m.SQL("CREATE TABLE venky_user (`id` int(11) NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL,`last_name` varchar(255) NOT NULL,`email` varchar(255) NOT NULL,`active` tinyint(1) DEFAULT '1', PRIMARY KEY (`id`))")
}

// Reverse the migrations
func (m *User_20161031_172938) Down() {
	// use m.SQL("DROP TABLE ...") to reverse schema update
	m.SQL("DROP TABLE venky_user")
}
