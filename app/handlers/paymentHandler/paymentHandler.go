package paymentHandler

import (
	"gorm.io/gorm"
	"paysee2/layers/services"
)

type PaymentHandler struct {
	PaymentServ services.PaymentService
	DB          *gorm.DB
}

func NewPaymentHandler(paymentServ services.PaymentService, db *gorm.DB) *PaymentHandler {
	return &PaymentHandler{PaymentServ: paymentServ, DB: db}
}
