package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	//"github.com/jinzhu/gorm"
	"database/sql"
	//"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"strconv"
	"strings"
	"time"
	"html/template"
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

type Market struct {
	ID    int
	Name  string
	Class string
}

func (c *MainController) Get() {
	c.Data["Website"] = "WGS Openbar"
	c.Data["Email"] = "vyankatesh.madgundi@synechron.com"
	c.Data["Result"] = false

	db, err := sql.Open("mysql", "root:root@/wgs_test")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	//todays_events      = Events.active.for_date(Date.today).order("timezone_start_at").limit(10).page(1).per(10)

	todays_events, _ := db.Query("SELECT events.*, (SELECT name FROM accounts WHERE id = events.account_id) as account_name, (SELECT name FROM programs WHERE id = events.program_id) as program_name, (CASE events.market_type WHEN 'Division' THEN (SELECT name FROM divisions WHERE id = events.market_id) WHEN 'State' THEN (SELECT name FROM states WHERE id = events.market_id) WHEN 'Region' THEN (SELECT name FROM regions WHERE id = events.market_id) WHEN 'Neighborhood' THEN (SELECT name FROM neighborhoods WHERE id = events.market_id) ELSE (SELECT name FROM markets WHERE id = events.market_id) END) AS market_name, (SELECT street_address FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS street_address, (SELECT  latitude FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS latitude, (SELECT longitude FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS longitude FROM events WHERE CAST(start_at AS DATE) = CURDATE() ORDER BY start_at LIMIT 10")

	upcomming_events, _ := db.Query("SELECT events.*, (SELECT name FROM accounts WHERE id = events.account_id) as account_name, (SELECT name FROM programs WHERE id = events.program_id) as program_name, (CASE events.market_type WHEN 'Division' THEN (SELECT name FROM divisions WHERE id = events.market_id) WHEN 'State' THEN (SELECT name FROM states WHERE id = events.market_id) WHEN 'Region' THEN (SELECT name FROM regions WHERE id = events.market_id) WHEN 'Neighborhood' THEN (SELECT name FROM neighborhoods WHERE id = events.market_id) ELSE (SELECT name FROM markets WHERE id = events.market_id) END) AS market_name, (SELECT street_address FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS street_address, (SELECT  latitude FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS latitude, (SELECT longitude FROM addresses WHERE addressable_id = events.account_id AND addressable_type = 'Account') AS longitude FROM events WHERE CAST(start_at AS DATE) > CURDATE() ORDER BY start_at LIMIT 10")

	allMarkets := []Market{}
  markets, _ := db.Query("SELECT id, name, hierarchy_type FROM all_markets WHERE active = true AND market_type IS NULL")
  for markets.Next() {
  	var m Market
		err = markets.Scan(&m.ID, &m.Name, &m.Class)
		allMarkets = append(allMarkets, m)
  }
	all_market_options := hierarchy_collection(allMarkets, 0, "")

  pending_recaps, _ :=  db.Query("SELECT distinct events.id, events.start_at, events.end_at, (SELECT name FROM accounts WHERE id = events.account_id) as account_name, (SELECT name FROM programs WHERE id = events.program_id) as program_name, ( SELECT name FROM program_types WHERE id = (SELECT program_type_id FROM programs WHERE id = events.program_id) ) as program_type, (CASE events.market_type WHEN 'Division' THEN (SELECT name FROM divisions WHERE id = events.market_id) WHEN 'State' THEN (SELECT name FROM states WHERE id = events.market_id) WHEN 'Region' THEN (SELECT name FROM regions WHERE id = events.market_id) WHEN 'Neighborhood' THEN (SELECT name FROM neighborhoods WHERE id = events.market_id) ELSE (SELECT name FROM markets WHERE id = events.market_id) END) AS market_name  FROM events INNER JOIN programs ON programs.id = events.program_id INNER JOIN event_recaps ON event_recaps.event_id = events.id WHERE events.active = 1 AND (start_at != '' and end_at != '' and events.active = true) AND (start_at <= now() and program_type_id != 5 and event_recaps.state in ('new', 'rejected', 'saved')) AND (events.created_year = 2016) ORDER BY start_at desc")


	c.Data["TodaysEvents"] = getData(todays_events)
	c.Data["UpcommingEvents"] = getData(upcomming_events)
	c.Data["PendingRecaps"] = getData(pending_recaps)
	
	//t := template.New("html")
	//te, err := t.Parse("<select name='program_overview[market]' id='program_overview_market' class='select'>" + all_market_options + "</select>")
	c.Data["ProgramMarkets"] = template.HTML(all_market_options)
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
	defer data.Close()
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

func hierarchy_collection(collection []Market, selected_id int, selected_type string) string {
	var tableData []string
	tableData = append(tableData, "<option value=''>Please Select</option>")
	for _, market := range collection {
		var optionData []string
		optionData = append(optionData, "<option")
		if market.ID == selected_id && selected_type == market.Class {
			optionData = append(optionData, "'selected=selected'")
		}
		optionData = append(optionData, "value='"+strconv.Itoa(market.ID)+"' data-type='"+market.Class+"'>"+market.Name+"</option>")
		tableData = append(tableData, strings.Join(optionData[:], " "))
	}

	//tableData = append(tableData, "</select>")
	return strings.Join(tableData[:], "\n")
}