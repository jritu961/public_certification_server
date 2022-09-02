const { createHttpError } = require('../errors/custom-error');

const User = require("../models/User.js");
const {registerSvc,
  getUserByEmail,
  checkPassword,
  // updateCertificateSvc,
  addCertificateSvc,
  deleteCertificateSvc,
  getCertificateSvc,
  getAllDetailsSvc}=require('../services/user.services')
const jwt=require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const jwtKey='789456ritu123'


const register = async(req , res, next) =>{
  const user=req.body
  if (Object.keys(user).length === 0) {
    const httpError = createHttpError('Body is missing', 400);
    next(httpError);
    return;
}
const insertedUser = await registerSvc(user);
const userToSend = {...insertedUser.toObject(),};
delete userToSend.password;


  res.status(201).json({sucess:'register',data:userToSend})

}



const login = async(req , res, next) =>{
  

  const credentials = req.body;
  if (!(credentials?.email && credentials?.password)) {
      const httpError = createHttpError('Bad request', 400);
      next(httpError);
      return;
  }
  const { email, password } = credentials;

  const user = await getUserByEmail(email);

  await checkPassword(user, password);
  const claims = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles:user.roles
  };
  jwt.sign(claims, jwtKey
    
    , function (error, token) {
      // some problem in generating JWT
      if (error) {
          const httpError = createHttpError('Internal Server Error', 500);
          next(httpError);
      }
     
      
      res.status(201).json({
          status: 'success',
          data: {
              name: user.name,
              email: user.email, // useful for frontend app
              // token: token
              token,
              _id:user._id,
              roles:user.roles,
              course:user.course
          },
      });
  });
  
  }
//   const addCertificate = async(req , res, next) =>{
    
//     console.log( 'claims = ', res.locals.claims );
//     const certificate = req.body;
    
//     try {
//         let updatedCertificate = await addCertificateSvc( certificate );
        
//         res.status( 201 ).json({
//             status: 'success',
//             data: {updatedCertificate,
//               _id: new mongoose.Types.ObjectId(),
//               name: req.body.name,
//                     course: req.body.course,
//                     email: req.body.email,
//                     rollNumber: req.body.rollNumber
//             }  
//         });
//     } catch( error ) {
//         const httpError = new HttpError( error.message, 400 );

//         next( httpError );
//     }
    
  
// }
  
  const addCertificate = async(req , res, next) =>{
         const details= req.body;
         const email=req.params.email
        const updatedData=await addCertificateSvc(details,email)
        res.status(201).json({sucess:'certificate Updated',details:updatedData})
      
  }
  
  const getAllDetails = async(req , res, next) =>{
     const allUser=await getAllDetailsSvc()
    res.status(201).json({sucess:'getAllDetails',details:allUser})
    
};
  
  
  
  const getCertificate = async(req , res, next) =>{
    const userId = req.params.id;
const userDetail = await getCertificateSvc(userId);
    res.status(201).json({sucess:'getCertificate',details:userDetail})
    
  }
  

  const deleteCertificate = async(req , res, next) =>{
    const userId = req.params.id;
const userDetail = await deleteCertificateSvc(userId);
    res.status(201).json({sucess:'deleteCertificate',details:userDetail})
  
  }


  
  
  


module.exports= {register,login,getAllDetails,getCertificate,deleteCertificate,addCertificate};
