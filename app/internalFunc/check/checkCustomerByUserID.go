package check

import (
	"errors"
	"gorm.io/gorm"
	"paysee2/layers/models"
)

func CheckCustomerByUserID(db *gorm.DB, customerId uint, uID int) (*models.Customer, error) {
	var customer models.Customer
	if db.First(&customer, customerId).Error != nil {
		return nil, errors.New("not found")
	}
	if customer.UserID != uint(uID) {
		return nil, errors.New("can't access to this customer")
	}
	return &customer, nil
}
