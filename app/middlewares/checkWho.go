package middlewares

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
	"log"
	"net/http"
	"os"
	"paysee2/constants"
	"strings"
)

func CheckWho(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		auth := c.GetHeader("Authorization")
		tokenSTR := strings.TrimPrefix(auth, "Bearer ")
		if auth == "" || tokenSTR == "" {
			log.Println("CheckWho مشکل اینجاست خط 19 ")
			log.Println("auth == \"\" || tokenSTR == \"\" ")
			c.JSON(http.StatusForbidden, gin.H{"error": "no found token"})
			c.Abort()
			return
		}
		claim := &struct {
			UserId uint           `json:"user_id"`
			Role   constants.Role `json:"role"`
			jwt.RegisteredClaims
		}{}
		secretAccessTkn := os.Getenv(constants.AccessTknEnv)
		token, err := jwt.ParseWithClaims(tokenSTR, claim, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("there was an error")
			}
			return []byte(secretAccessTkn), nil
		})
		if err != nil {
			log.Println("CheckWho مشکل اینجاست خط36 ")
			log.Println(err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		if !token.Valid {
			log.Println("CheckWho مشکل اینجاست خط 43 ")
			log.Println(err)
			c.JSON(http.StatusForbidden, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		c.Set("userId", claim.UserId)
		c.Set("role", claim.Role)
		c.Set("exp", claim.ExpiresAt.Time)
		c.Next()
	}
}
