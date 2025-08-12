package models

import (
	"gorm.io/gorm"
)

// Transaction یک رویداد مالی (خرید از مشتری یا فروش به او) را ثبت می‌کند.
// این مدل، مفهوم "حساب باز" و قانون "آپدیت حساب قبلی" شما را پیاده‌سازی می‌کند.
type Transaction struct {
	gorm.Model
	// نوع تراکنش: "SALE" (فروش به مشتری) یا "PURCHASE" (خرید از مشتری)
	Type string `json:"type" gorm:"index"`

	// مبلغ کل این حساب. طبق قانون شما، این مبلغ با تراکنش‌های جدید آپدیت می‌شود.
	TotalAmount float64 `json:"totalAmount"`

	// مبلغی که هنوز تسویه نشده است. با هر پرداخت، این مقدار کم می‌شود.
	RemainingAmount float64 `json:"remainingAmount"`

	// وضعیت حساب: "UNPAID", "PARTIALLY_PAID", "PAID"
	// این فیلد برای پیدا کردن حساب‌های باز (تسویه نشده) بسیار مفید است.
	Status string `json:"status" gorm:"index"`

	// توضیحات اختیاری برای تراکنش (مثلا: یک عدد النگو طرح X).
	Description string `json:"description"`

	// کلیدهای خارجی برای اتصال به مشتری و کاربر (طلافروش).
	CustomerID uint `json:"customerId"`
	UserID     uint `json:"userId"`

	// این فیلدها برای نمایش اطلاعات مرتبط در پاسخ‌های API استفاده می‌شوند.
	Customer Customer `json:"customer"`
}
