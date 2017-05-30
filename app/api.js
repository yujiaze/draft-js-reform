const promisify = (url, type = 'GET', data = {}, ...args) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            type,
            data,
            args,
            success(data) {
                resolve(data)
            },
            error(e) {
                reject(e.responseText)
            }
        })
    })
}

export { promisify }

const api = {
   
}

export default api