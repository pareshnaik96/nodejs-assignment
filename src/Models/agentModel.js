const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema(
    {
        agent: {
            type: String
        },
        producer: {
            type: String
        }
    }
)

module.exports = mongoose.model("Agent", agentSchema);