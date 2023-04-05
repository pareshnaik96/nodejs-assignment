const accountModel = require('../Models/accountModel')
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


//======================================== controller for upload account csv data to DB ====================================================//


const importAccount = async function (req, res) {

    try {

        var data = []

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    data.push({
                        userType: response[x].userType,
                        account_type: response[x].account_type,
                        account_name: response[x].account_name,
                    })
                }
                await accountModel.insertMany(data)
            })
        res.status(200).send({ status: true, message: "users account csv imported successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//============================================== get account Controller =================================================================//


const getAccount = async function (req, res) {

    try {

        let accountId = req.params.accountId

        if (!isValidObjectId(accountId))
            return res.status(400).send({ status: false, message: "accountId is invalid" });

        let findAccount = await accountModel.findById(accountId)
        if (!findAccount) return res.status(404).send({ status: false, message: "No Account found" });

        return res.status(200).send({ status: true, message: "User account details", data: findAccount });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//================================================ get account by query Controller ========================================================//


const filterAccount = async function (req, res) {

    try {

        let queryParams = req.query

        const { userType, account_type, account_name } = queryParams

        const filter = { isDeleted: false, ...req.query }

        if (userType) {
            if (!isValid(userType))
                return res.status(400).send({ status: false, message: 'userType is invalid' })
            filter['userType'] = userType
        }

        if (account_type) {
            if (!isValid(account_type))
                return res.status(400).send({ status: false, message: 'account_type is invalid' })
            filter['account_type'] = account_type
        }

        if (account_name) {
            if (!isValid(account_name))
                return res.status(400).send({ status: false, message: 'account_name is invalid' })
            filter['account_name'] = account_name
        }


        const accounts = await accountModel.find({ ...filter })

        if (!(accounts.length)) return res.status(404).send({ status: false, message: 'No data found' })

        return res.status(200).send({ status: true, message: "Account details", data: accounts })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//=============================================== update account ==========================================================================//


const updateAccount = async function (req, res) {

    try {

        let accountId = req.params.accountId
        let accountData = req.body

        const { userType, account_type, account_name } = accountData

        if (!isValidObjectId(accountId))
            return res.status(400).send({ status: false, message: "AccountId is invalid" });

        let findAccount = await accountModel.findById(accountId)
        if (!findAccount) return res.status(404).send({ status: false, message: "No Account found" });

        let updatedAccount = await accountModel.findOneAndUpdate({ _id: accountId }, { $set: { userType, account_type, account_name } }, { new: true })

        return res.status(200).send({ status: true, message: "User Account updated", data: updatedAccount });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//============================================== delete account ============================================================================//


const deleteAccount = async function (req, res) {

    try {

        let accountId = req.params.accountId

        if (!isValidObjectId(accountId))
            return res.status(400).send({ status: false, message: "AccountId is invalid" });

        let findAccount = await accountModel.findOne({ _id: accountId, isDeleted: false })
        if (!findAccount) return res.status(404).send({ status: false, message: "No Account found" });

        await accountModel.findOneAndUpdate(({ _id: accountId }, { isDeleted: true }))

        return res.status(200).send({ status: true, message: "User account deleted successfully" });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.importAccount = importAccount;
module.exports.getAccount = getAccount;
module.exports.filterAccount = filterAccount;
module.exports.updateAccount = updateAccount;
module.exports.deleteAccount = deleteAccount;