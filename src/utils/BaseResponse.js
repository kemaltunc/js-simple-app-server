class BaseResponse {
    constructor(res) {
        this.res = res
    }

    success(data) {
        this.res.status(200).json(data)
    }
    error(status, message) {
        this.res.status(510).json({
            "status": status,
            "message": message
        })
    }
}

module.exports = BaseResponse