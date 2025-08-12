package userHandlers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"paysee2/constants"
	"paysee2/internalFunc/checkIsAdmin"
	"paysee2/internalFunc/checkValidations"
	"paysee2/internalFunc/jwtTkn"
	"paysee2/internalFunc/password"
	"paysee2/layers/models"
	"strings"
)

func (handler *UserHandlers) RegisterHandler(c *gin.Context) {
	claim := struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
		Username string `json:"username" binding:"required,min=3,max=20"`
	}{}

	//خواندن از ریسپانس
	err := c.ShouldBind(&claim)
	if err != nil {
		log.Println("error c.ShouldBind(&claim)", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": constants.ErrorBindUser})
		return
	}

	//چک کردن مقادیر
	err = checkValidations.CheckExistUser(claim.Username, claim.Email, handler.db)
	if err != nil {
		log.Println("error checkValidations.CheckExistUser(claim.Username, claim.Email, handler.db)", err.Error())
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	//چک کردن ادمین
	admin, err := checkIsAdmin.CheckIsAdmin(claim.Password, claim.Email, claim.Username)
	if err != nil {
		log.Println("error checkIsAdmin.CheckIsAdmin(claim.Password, claim.Email, claim.Username)", err.Error())
		c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
		return
	}

	//هش کردن پسورد
	hashedPassword, err := password.HashPassword(claim.Password)
	if err != nil {
		log.Println("error password.HashPassword(claim.Password)", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//مقدار دهی یوزر اصلی
	mainUser := &models.User{
		Email:        strings.TrimSpace(claim.Email),
		Username:     strings.TrimSpace(claim.Username),
		PasswordHash: hashedPassword,
	}

	if admin {
		mainUser.Role = constants.Admin
	}

	// ذخیره در دیتابیس
	err = handler.userServ.CreateUser(mainUser)
	if err != nil {
		log.Println("error handler.userServ.CreateUser(mainUser)", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": constants.ErrorCreateUser})
		return
	}

	//ساخت اکسس توکن
	accessTkn, err := jwtTkn.GenerateJWTAccessTkn(mainUser)
	if err != nil {
		log.Println("error jwtTkn.GenerateJWTAccessTkn(mainUser)", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//ساخت رفرش توکن
	refreshTkn, err := jwtTkn.GenerateJWTRefreshTkn(mainUser)
	if err != nil {
		log.Println("error jwtTkn.GenerateJWTRefreshTkn(mainUser)", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	sendUser := struct {
		Email    string `json:"email"`
		Username string `json:"username"`
		Role     string `json:"role"`
	}{Email: mainUser.Email, Username: mainUser.Username}

	if mainUser.Role == constants.Admin {
		sendUser.Role = "admin"
	} else if mainUser.Role == constants.User {
		sendUser.Role = "user"
	}
	c.JSON(http.StatusCreated, gin.H{"result": constants.SuccessFull, "accessToken": accessTkn, "refreshToken": refreshTkn, "user": sendUser})
}
