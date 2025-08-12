package repository

import (
	"paysee2/constants"
	"paysee2/layers/models"
)

func (database *GormDB) CreateUser(user *models.User) error {

	db := database.DB
	result := db.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (database *GormDB) GetAllUsers() (*[]models.User, error) {
	var users []models.User
	result := database.DB.Where("role <> ?", constants.Admin).Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return &users, nil
}
