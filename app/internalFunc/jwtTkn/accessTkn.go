package jwtTkn

import (
	"github.com/golang-jwt/jwt/v5"
	"os"
	"paysee2/constants"
	"paysee2/layers/models"
	"time"
)

func GenerateJWTAccessTkn(user *models.User) (strToken string, err error) {
	secretAccessTkn := os.Getenv(constants.AccessTknEnv)
	claims := &jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Minute * 15).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	strToken, err = token.SignedString([]byte(secretAccessTkn))
	return
}
