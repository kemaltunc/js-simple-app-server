
const Response = require('../utils/BaseResponse')


exports.getPosts = async (req, res, next) => {
    try {
        var data = {
            "message": "Postlar listeleniyor"
        }

        return new Response(res).success(data)

    } catch (err) {
        next(err)
    }

}