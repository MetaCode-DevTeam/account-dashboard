package userHandlers

import (
	"gorm.io/gorm"
	"paysee2/layers/services"
)

type UserHandlers struct {
	userServ services.UserService
	db       *gorm.DB
}

func NewUserHandlers(userServ services.UserService, db *gorm.DB) *UserHandlers {
	return &UserHandlers{userServ: userServ, db: db}
}
