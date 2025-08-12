package repository

import (
	"paysee2/constants"
	"paysee2/layers/models"
)

func (database *GormDB) GetAllCustomers() (*[]models.Customer, error) {
	db := database.DB
	var customers []models.Customer

	result := db.Model(&models.Customer{}).Find(&customers)
	if result.Error != nil {
		return nil, result.Error
	}

	return &customers, nil
}

func (database *GormDB) GetCustomersByType(t constants.CustomerType, uId int) (*[]models.Customer, error) {
	db := database.DB
	var customers []models.Customer
	result := db.Where("user_id = ? And customer_type = ?", uId, t).Find(&customers)
	if result.Error != nil {
		return nil, result.Error
	}
	return &customers, nil
}

func (database *GormDB) CreateCustomer(customer *models.Customer) error {
	db := database.DB
	return db.Model(&models.Customer{}).Create(customer).Error
}

func (database *GormDB) UpdateCustomer(id int, updated *models.Customer) (*models.Customer, error) {
	db := database.DB
	result := db.Model(&models.Customer{}).Where("id = ?", id).Updates(updated)
	if result.Error != nil {
		return nil, result.Error
	}

	var c models.Customer
	result = db.First(&c, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &c, nil
}

func (database *GormDB) GetCustomerById(id int) (*models.Customer, error) {
	db := database.DB
	var customer models.Customer
	result := db.Model(&models.Customer{}).First(&customer, "id = ?", id)
	//result := db.Where("id = ?", id).First(&customer)
	//result := db.Where("id = ?", id).Find(&customer)
	if result.Error != nil {
		return nil, result.Error
	}
	return &customer, nil
}
