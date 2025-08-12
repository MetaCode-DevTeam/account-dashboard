package userHandlers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"paysee2/constants"
	"paysee2/internalFunc/checkValidations"
	"paysee2/internalFunc/jwtTkn"
	"paysee2/internalFunc/password"
	"paysee2/layers/models"
)

func (handler *UserHandlers) LoginHandler(c *gin.Context) {
	claims := struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
	}{}

	//گرفتن مقادیر از ریسپانس
	err := c.BindJSON(&claims)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": constants.ErrorBindUser})
		return
	}

	// چک کردن فرمت ایمیل
	isEmail := checkValidations.CheckEmailFormat(claims.Email)
	if !isEmail {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email format is invalid"})
		return
	}

	var user models.User
	//گرفتن کاربر از دیتابیس
	if err := handler.db.Where("email = ?", claims.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//چک کردن پسورد
	isTruePassword := password.CheckHashPassword(claims.Password, user.PasswordHash)
	if !isTruePassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not valid inputs"})
		return
	}

	//ساخت اکسس توکن
	accessTkn, err := jwtTkn.GenerateJWTAccessTkn(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//ساخت رفرش توکن
	refreshTkn, err := jwtTkn.GenerateJWTRefreshTkn(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	sendUser := struct {
		Email    string `json:"email"`
		Username string `json:"username"`
		Role     string `json:"role"`
	}{Email: user.Email, Username: user.Username}

	if user.Role == constants.Admin {
		sendUser.Role = "admin"
	} else if user.Role == constants.User {
		sendUser.Role = "user"
	}
	log.Println("accessToken:", accessTkn)
	c.JSON(http.StatusOK, gin.H{"result": constants.SuccessFull, "accessToken": accessTkn, "refreshToken": refreshTkn, "user": sendUser})
}
