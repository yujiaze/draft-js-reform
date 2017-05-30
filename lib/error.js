export default class ErrorOverRide extends Error {
    constructor(message = '', status = '500') {
        super(message)
        this.status = status
    }
}

