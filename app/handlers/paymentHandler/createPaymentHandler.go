package paymentHandler

import (
	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
	"log"
	"net/http"
	"paysee2/constants"
	"paysee2/internalFunc/calculateRemainingAmount"
	"paysee2/layers/models"
	"strconv"
)

func (handler *PaymentHandler) CreatePaymentHandler(c *gin.Context) {
	// گرفتن ایدی کاربر از middle ware
	uID, exist := c.Get("userId")
	if !exist {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "UserId not exist"})
		return
	}

	// گرفتن ایدی مشتری از api و تبدلیش به عدد مثبت
	customerIDSTR := c.Param("customerID")
	customerIdInt, err := strconv.Atoi(customerIDSTR)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid customer ID"})
	}
	customerIdUint := uint(customerIdInt)

	// گرفتن amount برای قسط
	payClient := struct {
		Amount decimal.Decimal `json:"amount"`
	}{}
	err = c.ShouldBind(&payClient)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// چک کردن وجود مشتری و تطابق ایدی های کاربر
	var customer models.Customer
	if handler.DB.First(&customer, customerIdUint).Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "customer not found"})
		return
	}
	if customer.UserID != uID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "can't access to this customer"})
		return
	}

	// ساخت مدل
	var payment models.Payment
	payment.Amount = payClient.Amount
	payment.CustomerId = customerIdUint

	//چک کردن مقدار - نباید کمتر از 0 بشه
	_, remainingAmount, err := calculateRemainingAmount.CalculatorAmount(handler.DB, customerIdInt, customer.AccountType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	newRemainingAmount := remainingAmount.Sub(payment.Amount)
	if newRemainingAmount.IsNegative() {
		log.Println(
			"\nremainingAmount: ", remainingAmount,
			"\npayment.Amount: ", payment.Amount,
			"\n",
			newRemainingAmount,
		)
		c.JSON(http.StatusBadRequest, gin.H{"error": "remaining amount is negative"})
		return
	}

	if newRemainingAmount.IsZero() {
		err := handler.DB.Model(&models.Customer{}).Where("id = ?", customer.ID).Update("settled_status", constants.Settled).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	}

	//ذخیره مدل در دیتا بیس
	err = handler.PaymentServ.CreatePayment(&payment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusCreated, payment)
}
