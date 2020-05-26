const mongoose = require('mongoose')
const base = require('./BaseModel')


const postSchema = base.schema(base.create, {
    title: {
        type: String,
        required: [true, 'Lütfen şiir için bir başlık girin']
    },
    content: {
        type: String,
        required: [true, 'Lütfen şiir içeriğini boş geçmeyin']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
    likeCount: {
        type: Number,
        required: [false]
    }
}, {
    versionKey: false
})


const Post = mongoose.model('Post', postSchema)
module.exports = Post