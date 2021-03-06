const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, minlength: 3 },
    name: String,
    passwordHash: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

userSchema.plugin(uniqueValidator)

module.exports = User