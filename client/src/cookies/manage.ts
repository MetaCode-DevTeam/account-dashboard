export function setCookie(cname: string, cvalue: string, milliSecond: number) {
    const d = new Date()
    d.setTime(d.getTime() + milliSecond)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function getAccessToken(): string {
    const arrTkn = document.cookie.split(/[= ;]/)
    const indexOfAccessTkn = arrTkn.indexOf('accessToken')
    const tkn = arrTkn[indexOfAccessTkn + 1]
    return tkn
}

export function getRefreshToken(): string {
    const arrTkn = document.cookie.split(/[= ;]/)
    const indexOfRefrshTkn = arrTkn.indexOf('refreshToken')
    const tkn = arrTkn[indexOfRefrshTkn + 1]

    return tkn
}
