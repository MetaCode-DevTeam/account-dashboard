package constants

type Role int

const (
	User Role = iota
	Admin
)

type CustomerType int

const (
	Debtor   CustomerType = iota // مشتری بدهکار
	Creditor                     // مشتری طلب کار
)

type CustomerAccountType int

const (
	MonetaryAccount CustomerAccountType = iota
	WeightAccount
)

type CustomerStatus int

const (
	NotSettled CustomerStatus = iota
	Settled
)
