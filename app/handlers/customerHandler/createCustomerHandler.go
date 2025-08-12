package customerHandler

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"paysee2/constants"
	"paysee2/layers/models"
)

func (handler *CustomerHandlers) CreateCustomerHandler(c *gin.Context) {
	uId, ok := c.Get("userId")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user id not found in context"})
		return
	}

	cCustomer := models.ClaimCustomer{}

	err := c.ShouldBind(&cCustomer)
	if err != nil && (cCustomer.Weight.IsPositive() || cCustomer.Totality.IsPositive()) {
		log.Println("invalid binding , error is => ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	customer := models.Customer{
		FirstName:     cCustomer.FirstName,
		LastName:      cCustomer.LastName,
		PhoneNumber:   cCustomer.PhoneNumber,
		Weight:        cCustomer.Weight,
		Totality:      cCustomer.Totality,
		Description:   cCustomer.Description,
		UserID:        uId.(uint),
		AccountType:   cCustomer.AccountType,
		CustomerType:  cCustomer.CustomerType,
		SettledStatus: constants.NotSettled,
	}

	//if cCustomer.CustomerType == 0 {
	//	customer.CustomerType = constants.Debtor
	//} else if cCustomer.CustomerType == 1 {
	//	customer.CustomerType = constants.Creditor
	//} else {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": "invalid customer type"})
	//	return
	//}

	err = handler.CustomerServ.CreateCustomer(&customer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"customer": customer})
}
