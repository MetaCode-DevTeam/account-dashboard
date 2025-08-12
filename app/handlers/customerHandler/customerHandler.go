package customerHandler

import (
	"gorm.io/gorm"
	"paysee2/layers/services"
)

type CustomerHandlers struct {
	CustomerServ services.CustomerService
	db           *gorm.DB
}

func NewCustomerHandlers(customerServ services.CustomerService, db *gorm.DB) *CustomerHandlers {
	return &CustomerHandlers{CustomerServ: customerServ, db: db}
}
