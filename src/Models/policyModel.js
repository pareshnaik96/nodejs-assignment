const mongoose = require('mongoose')


const policySchema = new mongoose.Schema(
    {
        policy_mode: {
            type: Number
        },
        policy_type: {
            type: String
        },
        policy_number: {
            type: String
        },
        policy_amount_written: {
            type: String
        },
        premium_amount: {
            type: Number
        },
        policy_start_date: {
            type: String
        },
        policy_end_date: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);