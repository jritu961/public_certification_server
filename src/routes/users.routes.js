const express = require('express')
const {
    authenticate,
    authorize
} = require( '../middleware/auth')
const router = express.Router();
const {register,login,getAllDetails,getCertificate,deleteCertificate, addCertificate} = require('../controllers/users.controller')


router.post('/register',register)
router.post('/login',login)
// router.post('/student/:id',authenticate,addCertificate)

router.patch('/student/:email',authenticate,authorize(["admin"]),addCertificate)
router.get('/student/:id',authenticate,getCertificate)
router.get('/student',authenticate,authorize(["admin"]),getAllDetails)
router.delete('/student/:id',authenticate,authorize(["admin"]),deleteCertificate)

module.exports=router;