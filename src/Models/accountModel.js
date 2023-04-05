const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
    {
        userType: {
            type: String
        },
        account_type: {
            type: String
        },
        account_name: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true }
);


module.exports = mongoose.model("Account", accountSchema);