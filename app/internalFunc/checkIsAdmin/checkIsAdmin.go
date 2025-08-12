package checkIsAdmin

import (
	"errors"
	"os"
)

func CheckIsAdmin(password, email, username string) (bool, error) {
	adminName := os.Getenv("USERNAME_ADMIN")
	adminPass := os.Getenv("PASSWORD_ADMIN")
	adminEmail := os.Getenv("EMAIL_ADMIN")

	if adminName == username && adminPass == password && adminEmail == email {
		return true, nil
	}
	if adminName == username || adminEmail == email {
		return false, errors.New(" با این مشخصات کاربری قبلا لاگین کرده")
	}
	return false, nil
}
