const express = require('express')
const multer = require('multer')
const router = express.Router()
const agentController = require('../Controllers/agentController')
const userController = require('../Controllers/userController')
const accountController = require('../Controllers/accountController')
const lobController = require('../Controllers/lobController')
const carrierController = require('../Controllers/carrierController')
const policyController = require('../Controllers/policyController')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

// API for upload csv data into mongoDB
router.post('/api/agent', upload.single('file'), agentController.importAgent)
router.post('/api/user', upload.single('file'), userController.importUser)
router.post('/api/account', upload.single('file'), accountController.importAccount)
router.post('/api/lob', upload.single('file'), lobController.importLob)
router.post('/api/carrier', upload.single('file'), carrierController.importCarrier)
router.post('/api/policy', upload.single('file'), policyController.importPolicy)

//user APIS
router.get('/api/user/:userId', userController.getUser)
router.put('/api/user/:userId', userController.updateUser)
router.delete('/api/user/:userId', userController.deleteUser)

//user's Account APIS
router.get('/api/account/:accountId', accountController.getAccount)
router.get('/api/account', accountController.filterAccount)
router.put('/api/account/:accountId', accountController.updateAccount)
router.delete('/api/account/:accountId', accountController.deleteAccount)

//Policy APIS
router.get('/api/policy/:policyId', policyController.getPolicy)
router.get('/api/policy', policyController.filterPolicy)
router.put('/api/policy/:policyId', policyController.updatePolicy)
router.delete('/api/policy/:policyId', policyController.deletePolicy)


module.exports = router;

