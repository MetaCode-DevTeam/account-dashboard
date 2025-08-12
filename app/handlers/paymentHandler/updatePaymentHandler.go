package paymentHandler

import (
	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
	"log"
	"net/http"
	"paysee2/constants"
	"paysee2/internalFunc/calculateRemainingAmount"
	"paysee2/internalFunc/check"
	"paysee2/layers/models"
	"strconv"
)

func (handler *PaymentHandler) UpdatePaymentHandler(c *gin.Context) {
	uID, exist := c.Get("userId")
	if !exist {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "UserId not exist"})
		return
	}
	uIDUint := uID.(uint)
	uIDInt := int(uIDUint)

	// گرفتن ایدی قسط از api
	paymentID := c.Param("paymentID")
	paymentIDInt, err := strconv.Atoi(paymentID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payment id"})
		return
	}

	//پیدا کردن قسط با ایدی
	var oldPayment models.Payment
	if handler.DB.First(&oldPayment, paymentIDInt).Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "payment not found"})
		return
	}

	// چک کردن تطابق ایدی کاربر و ایدی کاستومر و ایدی قسط
	customer, err := check.CheckCustomerByUserID(handler.DB, oldPayment.CustomerId, uIDInt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newPayment := struct {
		Amount decimal.Decimal `json:"amount"`
	}{}
	err = c.ShouldBind(&newPayment)
	if err != nil || !newPayment.Amount.IsPositive() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't bind payment"})
		return
	}

	_, remainingAmount, err := calculateRemainingAmount.CalculatorAmount(handler.DB, int(customer.ID), customer.AccountType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	newRemainingAmount := remainingAmount.Sub(newPayment.Amount).Add(oldPayment.Amount)
	if newRemainingAmount.IsNegative() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "amount is wrong"})
		return
	}

	if newRemainingAmount.IsZero() {
		err := handler.DB.Model(&models.Customer{}).Where("id = ?", customer.ID).Update("settled_status", constants.Settled).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	}

	oldPayment.Amount = newPayment.Amount // الان مقدار oldPayment بروز شد برخلاف اسمش دیگه قدیمی نیست

	err = handler.PaymentServ.UpdatePayment(&oldPayment)
	if err != nil {
		log.Println(err, "-----> error")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "update payment failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"payment": oldPayment})

}
