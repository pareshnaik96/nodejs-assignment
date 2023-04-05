const policyModel = require('../Models/policyModel')
const csv = require('csvtojson')
const mongoose = require('mongoose')


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


//============================================== controller for upload policy csv data to DB ===============================================//


const importPolicy = async function (req, res) {

    try {

        var data = []

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    data.push({
                        policy_mode: response[x].policy_mode,
                        policy_type: response[x].policy_type,
                        policy_number: response[x].policy_number,
                        policy_amount_written: response[x].policy_amount_written,
                        premium_amount: response[x].premium_amount,
                        policy_start_date: response[x].policy_start_date,
                        policy_end_date: response[x].policy_end_date,
                    })
                }
                await policyModel.insertMany(data)
            })
        res.status(200).send({ status: true, message: "policy csv imported successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//=========================================== get policy controller ======================================================================//


const getPolicy = async function (req, res) {

    try {

        let policyId = req.params.policyId

        if (!isValidObjectId(policyId))
            return res.status(400).send({ status: false, message: "policyId is invalid" });

        let findPolicy = await policyModel.findById(policyId)
        if (!findPolicy) return res.status(404).send({ status: false, message: "No Policy found" });

        return res.status(200).send({ status: true, message: "policy details", data: findPolicy });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//======================================= get policy by query Controller ====================================================================//


const filterPolicy = async function (req, res) {

    try {

        let queryParams = req.query

        const { policy_mode, policy_type, policy_number, policy_start_date, policy_end_date } = queryParams

        const filter = { isDeleted: false, ...req.query }

        if (policy_mode) {
            if (!isValid(policy_mode))
                return res.status(400).send({ status: false, message: 'policy_mode is invalid' })
            filter['policy_mode'] = policy_mode
        }

        if (policy_type) {
            if (!isValid(policy_type))
                return res.status(400).send({ status: false, message: 'policy_type is invalid' })
            filter['policy_type'] = policy_type
        }

        if (policy_number) {
            if (!isValid(policy_number))
                return res.status(400).send({ status: false, message: 'policy_number is invalid' })
            filter['policy_number'] = policy_number
        }

        if (policy_start_date) {
            if (!isValid(policy_start_date))
                return res.status(400).send({ status: false, message: 'policy_start_date is invalid' })
            filter['policy_start_date'] = policy_start_date
        }

        if (policy_end_date) {
            if (!isValid(policy_end_date))
                return res.status(400).send({ status: false, message: 'policy_start_date is invalid' })
            filter['policy_end_date'] = policy_end_date
        }


        const policies = await policyModel.find({ ...filter })

        if (!(policies.length)) return res.status(404).send({ status: false, message: 'No data found' })

        return res.status(200).send({ status: true, message: "Policy details", data: policies })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//============================================ update policy Controller ==================================================================//


const updatePolicy = async function (req, res) {

    try {

        let policyId = req.params.policyId
        let policyData = req.body

        const { policy_mode, policy_type, policy_number, policy_amount_written, premium_amount, policy_start_date, policy_end_date } = policyData

        if (!isValidObjectId(policyId))
            return res.status(400).send({ status: false, message: "PolicyId is invalid" });

        let findPolicy = await policyModel.findById(policyId)
        if (!findPolicy) return res.status(404).send({ status: false, message: "No policy found" });

        let updatedPolicy = await policyModel.findOneAndUpdate({ _id: policyId }, { $set: { policy_mode, policy_type, policy_number, policy_amount_written, premium_amount, policy_start_date, policy_end_date } }, { new: true })

        return res.status(200).send({ status: true, message: "User Policy updated", data: updatedPolicy });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//=============================================== delete policy Controller =============================================================//


const deletePolicy = async function (req, res) {

    try {

        let policyId = req.params.policyId

        if (!isValidObjectId(policyId))
            return res.status(400).send({ status: false, message: "PolicyId is invalid" });

        let findPolicy = await policyModel.findOne({ _id: policyId, isDeleted: false })
        if (!findPolicy) return res.status(404).send({ status: false, message: "No Policy found" });

        await policyModel.findOneAndUpdate(({ _id: policyId }, { isDeleted: true }))

        return res.status(200).send({ status: true, message: "Policy deleted successfully" });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.importPolicy = importPolicy;
module.exports.getPolicy = getPolicy;
module.exports.filterPolicy = filterPolicy;
module.exports.updatePolicy = updatePolicy;
module.exports.deletePolicy = deletePolicy;

