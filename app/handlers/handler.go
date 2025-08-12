package handlers

import (
	"gorm.io/gorm"
	"paysee2/handlers/customerHandler"
	"paysee2/handlers/paymentHandler"
	"paysee2/handlers/userHandlers"
)

type Handlers struct {
	CustomerHandler *customerHandler.CustomerHandlers
	UserHandler     *userHandlers.UserHandlers
	PaymentHandler  *paymentHandler.PaymentHandler
	DB              *gorm.DB
}

func NewHandlers(userHandler *userHandlers.UserHandlers, customHandler *customerHandler.CustomerHandlers, payHandler *paymentHandler.PaymentHandler, db *gorm.DB) *Handlers {
	return &Handlers{UserHandler: userHandler, CustomerHandler: customHandler, PaymentHandler: payHandler, DB: db}
}
