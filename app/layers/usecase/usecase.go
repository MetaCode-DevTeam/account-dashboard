package usecase

import (
	"paysee2/constants"
	"paysee2/layers/models"
)

// اینجا قرارداد های برامه نوشته میشه

type UserRepository interface {
	CreateUser(user *models.User) error
	GetAllUsers() (*[]models.User, error)
}

type CustomerRepository interface {
	CreateCustomer(customer *models.Customer) error
	GetAllCustomers() (*[]models.Customer, error)
	GetCustomersByType(t constants.CustomerType, uId int) (*[]models.Customer, error)
	UpdateCustomer(id int, customer *models.Customer) (*models.Customer, error)
	GetCustomerById(id int) (*models.Customer, error)
}

type PaymentRepository interface {
	CreatePayment(payment *models.Payment) error
	UpdatePayment(new *models.Payment) error
	DeletePayment(payment *models.Payment) error
}
