package customerHandler

import (
	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
	"net/http"
	"paysee2/layers/models"
	"strconv"
)

func (handler *CustomerHandlers) updateCustomer(c *gin.Context) {
	cId := c.Param("id")
	id, err := strconv.Atoi(cId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	claimCustomer := struct {
		FirstName   string          `json:"firstName"`
		LastName    string          `json:"lastName"`
		PhoneNumber string          `json:"phoneNumber"`
		Weight      decimal.Decimal `json:"weight"`
		Totality    decimal.Decimal `json:"totality"`
		Description string          `json:"description"`
	}{}

	err = c.ShouldBind(&claimCustomer)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	customer := models.Customer{
		FirstName:   claimCustomer.FirstName,
		LastName:    claimCustomer.LastName,
		PhoneNumber: claimCustomer.PhoneNumber,
		Weight:      claimCustomer.Weight,
		Totality:    claimCustomer.Totality,
		Description: claimCustomer.Description,
	}

	updatedCustomer, err := handler.CustomerServ.UpdateCustomer(id, &customer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"customer": *updatedCustomer})

}
