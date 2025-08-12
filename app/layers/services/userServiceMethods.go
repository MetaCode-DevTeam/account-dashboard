package services

import (
	"paysee2/layers/models"
	"paysee2/layers/usecase"
)

type UserService struct {
	repo usecase.UserRepository
}

func NewUserService(ucRepo usecase.UserRepository) *UserService {
	return &UserService{repo: ucRepo}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
func (uService UserService) CreateUser(user *models.User) error {
	return uService.repo.CreateUser(user)

}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
func (uService UserService) GetAllUsers() (*[]models.User, error) {
	return uService.repo.GetAllUsers()
}
