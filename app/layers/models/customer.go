package models

import (
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
	"paysee2/constants"
)

// Customer اطلاعات مشتریان را ذخیره می‌کند.
type Customer struct {
	gorm.Model
	SettledStatus   constants.CustomerStatus      `json:"settledStatus"`
	FirstName       string                        `json:"firstName"`
	LastName        string                        `json:"lastName"`
	AccountType     constants.CustomerAccountType `json:"accountType"`
	CustomerType    constants.CustomerType        `json:"customerType"`
	Weight          decimal.Decimal               `json:"weight" gorm:"type:decimal(20,2);"`
	Totality        decimal.Decimal               `json:"totality" gorm:"type:decimal(20,2);"`
	PhoneNumber     string                        `json:"phoneNumber"`
	Payment         []Payment                     `json:"payment"`
	Description     string                        `json:"description" gorm:"type:text"`
	UserID          uint                          `json:"userId"`
	RemainingAmount decimal.Decimal               `json:"remainingAmount" gorm:"-"`
}

type ClaimCustomer struct {
	FirstName    string                        `json:"firstName" binding:"required"`
	LastName     string                        `json:"lastName" binding:"required"`
	PhoneNumber  string                        `json:"phoneNumber" binding:"required"`
	Weight       decimal.Decimal               `json:"weight"`
	Totality     decimal.Decimal               `json:"totality" binding:"required"`
	Description  string                        `json:"description"`
	CustomerType constants.CustomerType        `json:"customerType"`
	Status       constants.CustomerStatus      `json:"status"`
	AccountType  constants.CustomerAccountType `json:"accountType"`
}
