package models

import (
	"gorm.io/gorm"
	"paysee2/constants"
	// "your/project/path/constants" // اگر از enum برای نقش‌ها استفاده می‌کنید
)

// User نشان‌دهنده کاربر سیستم (طلافروش) است که لاگین می‌کند.
type User struct {
	gorm.Model
	Email    string         `json:"email" gorm:"uniqueIndex"`
	Username string         `json:"username" gorm:"uniqueIndex"`
	Role     constants.Role `json:"role"`
	// هروقت خواستید اطلاعات کاربر را در API برگردانید، این فیلد ارسال نمی‌شود.
	PasswordHash string     `json:"-"`
	Customer     []Customer `json:"customer"`
}
