package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"paysee2/constants"
	"paysee2/handlers"
	"paysee2/handlers/customerHandler"
	"paysee2/handlers/paymentHandler"
	"paysee2/handlers/userHandlers"
	"paysee2/internalFunc/configs"
	"paysee2/layers/models"
	"paysee2/layers/repository"
	"paysee2/layers/services"
	"paysee2/routers"
	"time"
)

var db *gorm.DB

func main() {

	dsn := configs.CreateDsn()

	// اتصال db
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(constants.ErrorConnectDB)
		return
	}

	err = db.AutoMigrate(
		&models.User{},
		&models.Payment{},
		&models.Customer{},
		&models.Transaction{},
	)
	if err != nil {
		log.Fatalln(constants.ErrorCreateTable)
		return
	}

	userRepo := repository.NewGormDB(db)
	userServ := services.NewUserService(userRepo)
	uH := userHandlers.NewUserHandlers(*userServ, db)

	customerRepo := repository.NewGormDB(db)
	customerServ := services.NewCustomerService(customerRepo)
	cH := customerHandler.NewCustomerHandlers(*customerServ, db)

	paymentRepo := repository.NewGormDB(db)
	payServ := services.NewPaymentService(paymentRepo)
	pH := paymentHandler.NewPaymentHandler(*payServ, db)

	handler := handlers.NewHandlers(uH, cH, pH, db)

	r := gin.Default()
	r.RedirectTrailingSlash = false

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // for greater security you can enter the site address : "http://localhost:5174" (react project default)
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           time.Hour,
	}))

	routers.Router(r, handler)
	err = r.Run(":3000")
	if err != nil {
		panic(err)
	}
}
