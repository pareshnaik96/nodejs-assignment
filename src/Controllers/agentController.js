const agentModel = require('../Models/agentModel')
const csv = require('csvtojson')


const importAgent = async function (req, res) {

    try {

        var agentData = []

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    agentData.push({
                        agent: response[x].agent,
                        producer: response[x].producer,
                    })
                }
                await agentModel.insertMany(agentData)
            })
        res.status(200).send({ status: true, message: "agent csv imported successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.importAgent = importAgent;