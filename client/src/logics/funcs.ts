export function getNameById(id: number, data: { id: number; name: string }[]): string {
    // از متد find برای پیدا کردن اولین آبجکتی که شرط را برآورده می‌کند، استفاده می‌کنیم
    const person = data.find((p) => p.id === id)

    // اگر شخص پیدا شد، نام او را برگردان، در غیر این صورت undefined برگردان
    return person ? person.name : ''
}

export function getJalaliDateByClock(createAt: string): string {
    const date = new Date(createAt)

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Tehran',
    } as const

    const shamsiDate = new Intl.DateTimeFormat('fa-IR', options).format(date)
    return shamsiDate
}

export function getJalaliDate(createAt: string): string {
    const date = new Date(createAt)

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    } as const

    const shamsiDate = new Intl.DateTimeFormat('fa-IR', options).format(date)
    return shamsiDate
}
