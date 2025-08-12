package password

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (hashedPassword string, err error) {
	bcryptHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost) // bcrypt.DefaultCost براساس قدرت کامپیوتر های امروزی هستش و با اپدیت بروزرسانی میشه لازم نیست هربار خودمون عدد را زیاد یا کم کنیم
	hashedPassword = string(bcryptHash)
	return
}
