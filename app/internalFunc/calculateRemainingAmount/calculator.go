package calculateRemainingAmount

import (
	"errors"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
	"paysee2/constants"
	"paysee2/layers/models"
)

func CalculatorAmount(db *gorm.DB, idCustomer int, accountType constants.CustomerAccountType) ([]models.Payment, decimal.Decimal, error) {
	var customer models.Customer
	err := db.Preload("Payment").First(&customer, idCustomer).Error
	if err != nil {
		return nil, decimal.Zero, err
	}
	totalPaid := decimal.NewFromInt(0)
	for _, value := range customer.Payment {
		totalPaid = totalPaid.Add(value.Amount)
	}

	var remainingAmount decimal.Decimal
	if accountType == constants.MonetaryAccount {
		remainingAmount = customer.Totality.Sub(totalPaid)
	} else if accountType == constants.WeightAccount {
		remainingAmount = customer.Weight.Sub(totalPaid)
	} else {
		return nil, decimal.Zero, errors.New("invalid accountType")
	}

	return customer.Payment, remainingAmount, nil
}
