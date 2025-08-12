package services

import (
	"paysee2/constants"
	"paysee2/layers/models"
	"paysee2/layers/usecase"
)

type CustomerService struct {
	repo usecase.CustomerRepository
}

func NewCustomerService(customerRepo usecase.CustomerRepository) *CustomerService {
	return &CustomerService{repo: customerRepo}
}

func (cusService CustomerService) GetCustomersByType(t constants.CustomerType, uId int) (*[]models.Customer, error) {
	return cusService.repo.GetCustomersByType(t, uId)
}

func (cusService CustomerService) GetAllCustomers() (*[]models.Customer, error) {
	return cusService.repo.GetAllCustomers()
}

func (cusService CustomerService) GetCustomerById(id int) (*models.Customer, error) {
	return cusService.repo.GetCustomerById(id)
}

func (cusService CustomerService) CreateCustomer(customer *models.Customer) error {
	return cusService.repo.CreateCustomer(customer)
}

func (cusService CustomerService) UpdateCustomer(id int, customer *models.Customer) (*models.Customer, error) {
	return cusService.repo.UpdateCustomer(id, customer)
}
