
const Response = require('../utils/BaseResponse')
const APIFeatures = require('../utils/ApiFeatures')
const User = require('../models/UserModel')

exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body)
        new Response(res).success(doc)
    } catch (error) {
        next(error)
    }
}

exports.getOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id)

        if (!doc) {
            return new Response(res).error("Kayıt bulunamadı")
        }
        return doc
    } catch (error) {
        next(error);
    }
}

exports.getAll = Model => async (req, res, next) => {
    try {
        new APIFeatures(Model.find().populate( 'user', 'name surname').exec(function (err, feature) {
            new Response(res).success(feature)
        }))

    } catch (error) {
        next(error)
    }
}

