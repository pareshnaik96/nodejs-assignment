const carrierModel = require('../Models/carrierModel')
const csv = require('csvtojson')


const importCarrier = async function (req, res) {

    try {

        var data = []

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    data.push({
                        company_name: response[x].company_name,
                        category_name: response[x].category_name,
                    })
                }
                await carrierModel.insertMany(data)
            })
        res.status(200).send({ status: true, message: "carrier csv imported successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.importCarrier = importCarrier;