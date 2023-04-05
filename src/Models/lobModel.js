const mongoose = require('mongoose')

const lobSchema = new mongoose.Schema(
    {
        csr: {
            type: String
        },

    }
)

module.exports = mongoose.model("Lob", lobSchema);