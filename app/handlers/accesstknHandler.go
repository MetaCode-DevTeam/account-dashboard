package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"log"
	"net/http"
	"os"
	"paysee2/constants"
	"paysee2/internalFunc/jwtTkn"
	"paysee2/layers/models"
)

type RefreshTokenRequest struct {
	RefreshToken string `json:"refreshToken" binding:"required"`
}

func (handler *Handlers) AccessTokenHandler(c *gin.Context) {
	var tokenSTR RefreshTokenRequest
	err := c.ShouldBindJSON(&tokenSTR)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("tkn refresh in handler ====>", tokenSTR.RefreshToken)

	claim := &struct {
		UserId uint `json:"user_id"`
		jwt.RegisteredClaims
	}{}

	secretRefreshTkn := os.Getenv(constants.RefreshTknEnv)
	token, err := jwt.ParseWithClaims(tokenSTR.RefreshToken, claim, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("there was an error")
		}
		return []byte(secretRefreshTkn), nil
	})
	if err != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{"error": err.Error()})
		return
	}

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		return
	}

	user := &models.User{}
	result := handler.DB.Where("id = ?", claim.UserId).First(user)
	if result.Error != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": result.Error.Error()})
		return
	}

	accessTkn, err := jwtTkn.GenerateJWTAccessTkn(user)

	c.JSON(http.StatusOK, gin.H{"accessToken": accessTkn})
}
