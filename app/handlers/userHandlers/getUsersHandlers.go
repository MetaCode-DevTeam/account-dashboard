package userHandlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"paysee2/constants"
)

func (handler *UserHandlers) GetAllUsersHandler(c *gin.Context) {

	// role
	role, exist := c.Get("role")
	if !exist {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "کلیدی از توکن وجود ندارد"})
		return
	}

	if role != constants.Admin {
		c.JSON(http.StatusForbidden, gin.H{"error": "کاربر غیر ادمین مجاز نیست!!!"})
		return
	}

	// if user => admin , exp => true
	users, err := handler.userServ.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}
