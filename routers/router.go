package routers

import (
	"myproject/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
    beego.Router("/programs/load_dashboard_data", &controllers.ProgramController{}, "get:LoadDashboard")
    beego.Router("/programs/:id/get_gva_data_ajax", &controllers.ProgramController{}, "get:LoadGVA")
    beego.Router("/accounts/load_supported_accounts_data", &controllers.ProgramController{}, "get:LoadSupportedAccount")
}


/*
func init() {
	ns := beego.NewNamespace("/v1",
		beego.NSNamespace("/",
			beego.NSInclude(
				&controllers.MainController{},
			),
		),
		beego.NSNamespace("/programs/load_dashboard_data",
			beego.NSInclude(
				&controllers.ProgramController{},
			),
		),
	)
	beego.AddNamespace(ns)
}*/

