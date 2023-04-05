const lobModel = require('../Models/lobModel')
const csv = require('csvtojson')


const importLob = async function (req, res) {

    try {

        var data = []

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    data.push({
                        csr: response[x].csr,
                    })
                }
                await lobModel.insertMany(data)
            })
        res.status(200).send({ status: true, message: "lob csv imported successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.importLob = importLob;