const mongoose = require('mongoose')

exports.create = new mongoose.Schema({
    createdAt: {
        type: String,
        default: Math.round(new Date().getTime() / 1000)
    },
    updatedAt: {
        type: String,
        default: Math.round(new Date().getTime() / 1000)
    }
})

exports.schema = (Schema, obj) => (
    new mongoose.Schema(
        Object.assign({}, Schema.obj, obj), { versionKey: false }
    )
)