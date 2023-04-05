const userModel = require('../Models/userModel')
const csv = require('csvtojson')
const mongoose = require('mongoose')


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

//============================= controller for upload user csv data to DB ====================================================================//


const importUser = async function (req, res) {

    try {

        var userData = []

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    userData.push({
                        name: response[x].firstname,
                        gender: response[x].gender,
                        dob: response[x].dob,
                        phone: response[x].phone,
                        email: response[x].email,
                        address: response[x].address,
                        city: response[x].city,
                        state: response[x].state,
                        zip: response[x].zip
                    })
                }
                await userModel.insertMany(userData)
            })
        res.status(200).send({ status: true, message: "csv imported successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//=========================================== get user Controller =========================================================================//


const getUser = async function (req, res) {

    try {

        let userId = req.params.userId

        if (!isValidObjectId(userId))
            return res.status(400).send({ status: false, message: "UserId is invalid" });

        let findUser = await userModel.findById(userId)
        if (!findUser) return res.status(404).send({ status: false, message: "No user found" });

        return res.status(200).send({ status: true, message: "User profile details", data: findUser });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//================================================= update user controller ==================================================================//


const updateUser = async function (req, res) {

    try {

        let userId = req.params.userId
        let userData = req.body

        let { name, gender, dob, phone, email, address, city, state, zip } = userData

        if (!isValidObjectId(userId))
            return res.status(400).send({ status: false, message: "UserId is invalid" });

        let findUser = await userModel.findById(userId)
        if (!findUser) return res.status(404).send({ status: false, message: "No user found" });

        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { name, gender, dob, phone, email, address, city, state, zip } }, { new: true })

        return res.status(200).send({ status: true, message: "User profile updated", data: updatedUser });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//===================================================== delete user Controller ===========================================================//


const deleteUser = async function (req, res) {

    try {

        let userId = req.params.userId

        if (!isValidObjectId(userId))
            return res.status(400).send({ status: false, message: "UserId is invalid" });

        let findUser = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!findUser) return res.status(404).send({ status: false, message: "No user found" });

        await userModel.findOneAndUpdate(({ _id: userId }, { isDeleted: true }))

        return res.status(200).send({ status: true, message: "User profile deleted successfully" });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.importUser = importUser
module.exports.getUser = getUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser



