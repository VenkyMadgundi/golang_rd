package main

import (
	"github.com/astaxie/beego"
	//"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	//"myproject/models"
	_ "myproject/routers"
)

func init() {
	/*orm.RegisterDataBase("default", "mysql", "root:root@tcp(127.0.0.1:3306)/wgs_stage")
	orm.RegisterModel(new(models.Events), new(models.Programs))
	orm.RunCommand()*/

}

func main() {
	//orm.Debug = true
	beego.Run()
}
