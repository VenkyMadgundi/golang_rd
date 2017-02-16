package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	//"github.com/jinzhu/gorm"
	"database/sql"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"time"
	//"myproject/models"
)

type MainController struct {
	beego.Controller
}

type Event struct {
	ID                   int
	ProgramID            int
	AccountId            int
	ManagerId            int
	StartAt              time.Time
	EndAt                time.Time
	Notes                string
	Active               int8
	CreatorId            int
	UpdaterId            int
	CreatedAt            time.Time
	UpdatedAt            time.Time
	AdHocName            string
	BudgetId             int
	Location             string
	MarketId             int
	TimeZoneId           int
	DeactivateComment    string
	CreatedYear          uint
	Allocation           int
	ConsumerSampled      float64
	ConsumerInfluenced   float64
	TotalSpend           float64
	SponsorshipId        int
	CompanyId            int
	BarSpend             float64
	LaborSpend           float64
	MiscSpend            float64
	MarketType           string
	IsGroupEvent         int8
	ParentEventId        int
	IsParentMbAdhocEvent int8
	//Program              Program
}

type Program struct {
	ID            int
	Name          string
	BrandId       int
	Active        int8
	CreatorId     int
	UpdaterId     int
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Color         string
	ProgramTypeId int
	ParentId      int
	CompanyId     int
	CreatedYear   uint
	MiscSpend     float64
	LaborSpend    float64
	PerEvent      float64
	PerMarket     float64
	Events        []Event `gorm:"ForeignKey:ProgramID"`
}

func (c *MainController) Get() {
	c.Data["Website"] = "WGS Openbar"
	c.Data["Email"] = "vyankatesh.madgundi@synechron.com"
	c.Data["Result"] = false

	db, err := sql.Open("mysql", "root:root@/wgs")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	//todays_events      = Events.active.for_date(Date.today).order("timezone_start_at").limit(10).page(1).per(10)

	rows, _ := db.Query("SELECT events.*, (SELECT name FROM accounts WHERE id = events.account_id) as account_name, (SELECT name FROM programs WHERE id = events.program_id) as program_name, (CASE events.market_type WHEN 'Division' THEN (SELECT name FROM divisions WHERE id = events.market_id) WHEN 'State' THEN (SELECT name FROM states WHERE id = events.market_id) WHEN 'Region' THEN (SELECT name FROM regions WHERE id = events.market_id) WHEN 'Neighborhood' THEN (SELECT name FROM neighborhoods WHERE id = events.market_id) ELSE (SELECT name FROM markets WHERE id = events.market_id) END) AS market_name, (SELECT street_address FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS street_address, (SELECT  latitude FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS latitude, (SELECT longitude FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS longitude FROM events WHERE CAST(start_at AS DATE) = CURDATE() ORDER BY start_at LIMIT 10")
	tData := getData(rows)
	jsonData, _ := json.Marshal(tData)
	fmt.Println(string(jsonData))
	c.Data["Events"] = tData
	c.TplName = "index.tpl"
}

func getData(data *sql.Rows) []map[string]interface{} {
	columns, err := data.Columns()
	if err != nil {
		fmt.Println("Errror----", err)
	}
	count := len(columns)
	tableData := make([]map[string]interface{}, 0)
	values := make([]interface{}, count)
	valuePtrs := make([]interface{}, count)
	for data.Next() {
		for i := 0; i < count; i++ {
			valuePtrs[i] = &values[i]
		}
		data.Scan(valuePtrs...)
		entry := make(map[string]interface{})
		for i, col := range columns {
			var v interface{}
			val := values[i]
			b, ok := val.([]byte)
			if ok {
				v = string(b)
			} else {
				v = val
			}
			entry[col] = v
		}
		tableData = append(tableData, entry)
	}
	return tableData
}
