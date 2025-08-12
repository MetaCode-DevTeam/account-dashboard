package customerHandler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"paysee2/internalFunc/calculateRemainingAmount"
	"strconv"
)

func (handler *CustomerHandlers) GetCustomerByIdHandler(c *gin.Context) {
	uid, exist := c.Get("userId")
	if !exist {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user id not found in context"})
		return
	}
	var intIDUser = uid.(uint)
	customerId := c.Param("id")

	intIdCustomer, err := strconv.Atoi(customerId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	customer, err := handler.CustomerServ.GetCustomerById(intIdCustomer)
	if err != nil || customer == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "can't find customer by id"})
		return
	}
	if customer.UserID != intIDUser {
		c.JSON(http.StatusForbidden, gin.H{"error": "can't access to this customer"})
		return
	}

	paymentArr, remainingAmount, err := calculateRemainingAmount.CalculatorAmount(handler.db, intIdCustomer, customer.AccountType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	customer.RemainingAmount = remainingAmount
	customer.Payment = paymentArr

	c.JSON(http.StatusOK, customer)
}
