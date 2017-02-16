package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Event struct {
	gorm.Model
	ProgramId            int
	AccountId            int
	ManagerId            int
	StartAt              time.Time
	EndAt                time.Time
	Notes                string
	Active               int8
	CreatorId            int
	UpdaterId            int
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
}

type Program struct {
	gorm.Model
	Name          string
	BrandId       int
	Active        int8
	CreatorId     int
	UpdaterId     int
	Color         string
	ProgramTypeId int
	ParentId      int
	CompanyId     int
	CreatedYear   uint
	MiscSpend     float64
	LaborSpend    float64
	PerEvent      float64
	PerMarket     float64
	Events        []Event
}
