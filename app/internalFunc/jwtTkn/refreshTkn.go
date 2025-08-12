package jwtTkn

import (
	"github.com/golang-jwt/jwt/v5"
	"log"
	"os"
	"paysee2/constants"
	"paysee2/layers/models"
	"time"
)

func GenerateJWTRefreshTkn(user *models.User) (strToken string, err error) {
	secretRefreshTkn := os.Getenv(constants.RefreshTknEnv)
	claims := &jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	strToken, err = token.SignedString([]byte(secretRefreshTkn))
	log.Println("tkn refresh in GenerateJWTRefreshTkn ====>", strToken)
	return
}
