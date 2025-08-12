package customerHandler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"paysee2/constants"
	"strings"
)

func (handler *CustomerHandlers) GetCustomerByTypeHandler(c *gin.Context) {

	// id
	uId, exist := c.Get("userId")
	if !exist {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "کلیدی از توکن وجود ندارد"})
		return
	}
	userIdAsUint, ok := uId.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user id in context has an unexpected type"})
		return
	}

	userIdAsInt := int(userIdAsUint)

	types := strings.ToLower(c.Param("customerType"))
	var customerType constants.CustomerType
	if types == "debtor" {
		customerType = constants.Debtor
	} else if types == "creditor" {
		customerType = constants.Creditor
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid customer type"})
		return
	}

	customerArr, err := handler.CustomerServ.GetCustomersByType(customerType, userIdAsInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, customerArr)
}
