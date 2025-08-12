package checkValidations

import (
	"errors"
	"gorm.io/gorm"
	"paysee2/layers/models"
	"regexp"
	"strings"
)

// اگر ارور نبود پوزر هست
func CheckExistUser(userName, email string, db *gorm.DB) error {
	err := CheckEmail(email, db)
	if err != nil {
		return err
	}

	err = CheckUsername(userName, db)
	if err != nil {
		return err
	}

	return nil
}

// username part
func CheckUsername(userName string, db *gorm.DB) error {
	userName = strings.TrimSpace(userName)
	err := db.Where("username = ?", userName).First(&models.User{}).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	} else if err != nil {
		return err
	}
	return errors.New("user already exist")
}

// id part
func CheckID(id int, db *gorm.DB) (*models.User, error) {
	user := &models.User{}
	err := db.First(user, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return user, nil
}

// email part
func CheckEmail(email string, db *gorm.DB) error {
	email = strings.TrimSpace(email)

	isEmail := CheckEmailFormat(email)
	if !isEmail {
		return errors.New("email format error")
	}

	err := CheckEmailAvailable(email, db)
	if err != nil {
		return err
	}

	return nil
}

func CheckEmailAvailable(email string, db *gorm.DB) error {
	var user models.User
	err := db.Where("email = ?", email).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	}

	if err != nil {
		return err
	}

	return errors.New("user already exist")
}

func CheckEmailFormat(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}
