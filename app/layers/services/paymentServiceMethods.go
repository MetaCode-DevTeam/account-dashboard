package services

import (
	"paysee2/layers/models"
	"paysee2/layers/usecase"
)

type PaymentService struct {
	repo usecase.PaymentRepository
}

func NewPaymentService(repo usecase.PaymentRepository) *PaymentService {
	return &PaymentService{
		repo: repo,
	}
}

func (p *PaymentService) CreatePayment(payment *models.Payment) error {
	return p.repo.CreatePayment(payment)
}

func (p *PaymentService) DeletePayment(payment *models.Payment) error {
	return p.repo.DeletePayment(payment)
}
func (p *PaymentService) UpdatePayment(payment *models.Payment) error {
	return p.repo.UpdatePayment(payment)
}
