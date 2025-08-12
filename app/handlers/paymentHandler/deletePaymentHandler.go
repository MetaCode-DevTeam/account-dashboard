package paymentHandler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"paysee2/internalFunc/check"
	"paysee2/layers/models"
	"strconv"
)

func (handler *PaymentHandler) DeletePaymentHandler(c *gin.Context) {
	// گرفتن ایدی کاربر
	uID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No user_id found"})
		return
	}
	uIDUInt := uID.(uint)
	uIDInt := int(uIDUInt)

	// گرفتن ایدی قسط
	paymentID := c.Param("paymentID")
	paymentIDInt, err := strconv.Atoi(paymentID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payment id"})
		return
	}

	// پیدا کردن قسط به واسطه ایدی
	var payment models.Payment
	if handler.DB.First(&payment, paymentIDInt).Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "payment not found"})
		return
	}

	_, err = check.CheckCustomerByUserID(handler.DB, payment.CustomerId, uIDInt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var p models.Payment
	p.Model.ID = payment.ID

	handler.DB.Delete(&p)
	c.JSON(http.StatusOK, gin.H{"message": "Payment deleted"})
}
