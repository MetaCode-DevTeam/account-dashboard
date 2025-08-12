export type formData = {
    username?: string
    email?: string
    password?: string
}

export type userType = {
    email: string
    role: string
    username: string
}

export type RegisterResponse = {
    result: string
    accessToken: string
    refreshToken: string
    user: userType
}

export type Customer = {
    ID: number
    firstName: string
    lastName: string
    type: number
    weight: number
    totality: number
    phoneNumber: string
    description: string
    status: number
}

// تایپ آپدیت شده و نهایی برای User
export type User = {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    email: string
    username: string
    role: string
    customer: Customer[]
}

export type refreshTokenType = {
    accessToken: string
}

export type customerType = {
    ID?: number
    customerType: number
    accountType: number
    firstName: string
    lastName: string
    phoneNumber: string
    totality: number
    weight: number
    description: string
    CreatedAt?: string
    remainingAmount?: number
    payment?: paymentType[]
}

export type paymentType = {
    amount: number
    ID?: number
    CreatedAt?: string
}

export type paymentTypeResponse = {
    amount: number
    ID: number
    CreatedAt: string
}

export type responseCustomerType = {
    customer: customerType
}

export type CustomerTypeSearch = 'debtor' | 'creditor'
