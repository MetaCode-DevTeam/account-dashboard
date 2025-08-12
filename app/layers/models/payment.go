package models

import (
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

// Payment یک قسط یا پرداخت برای یک تراکنش خاص را ثبت می‌کند.
type Payment struct {
	gorm.Model
	// مبلغ این قسط.
	Amount     decimal.Decimal `json:"amount" gorm:"type:decimal(20,2);"`
	CustomerId uint            `json:"customerId"`
}
