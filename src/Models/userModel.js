const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        gender: {
            type: String
        },
        dob: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zip: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true });



module.exports = mongoose.model("User", userSchema);