package repository

import "paysee2/layers/models"

func (database *GormDB) CreatePayment(payment *models.Payment) error {
	db := database.DB
	return db.Create(payment).Error
}

func (database *GormDB) UpdatePayment(newPayment *models.Payment) error {
	db := database.DB
	return db.Model(&models.Payment{}).Where("id = ?", newPayment.ID).Update("amount", newPayment.Amount).Error
}

func (database *GormDB) DeletePayment(payment *models.Payment) error {
	db := database.DB
	return db.Delete(payment).Error
}
