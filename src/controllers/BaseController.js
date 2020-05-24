
const Response = require('../utils/BaseResponse')

exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        return new Response(res).success(doc)
    } catch (error) {
        next(error)
    }
}