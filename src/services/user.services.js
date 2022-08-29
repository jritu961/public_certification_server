const { createHttpError } = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const registerSvc= async (user) =>{
 const insertedUser = await User.create(user)
 if (!insertedUser) {
    const error = createHttpError('Bad Credentials', 400);
    throw error;
}
return insertedUser;
}

const getUserByEmail= async (email) =>{
    const user = await User.findOne({ email });
    if (user === null) {
        const error = createHttpError('Bad Credentials', 400);
        throw error;
    }

    return user;
}
const checkPassword= async (user,plainTextPassword) =>{
    let isMatch;
    isMatch = await user.checkPassword(plainTextPassword);
    if (!isMatch) {
        const error = createHttpError('Bad Credentials Pass', 400);
        throw error;
    }
    return isMatch;
}
 
// const addCertificateSvc= async (user) =>{
    
//     try {
//         const insertedCertificate = await User.find(certificate);
//         return insertedCertificate;
//     } catch (error) {
//         if (error.name === "ValidationError") {
//             const dbError = new Error(`Validation error : ${error.message}`);
//             dbError.type = "ValidationError";
//             throw dbError;
//         }

//         if (error.name === "CastError") {
//             const dbError = new Error(`Data type error : ${error.message}`);
//             dbError.type = "CastError";
//             throw dbError;
//         }
        
//     }
//     return user;
// };

const addCertificateSvc= async (details,email) =>{
        const updatedData=await User.findOneAndUpdate({email:email},details,{
        new:true,
        runValidators:true
     })
       if (!updatedData){
        return createHttpError("no User Found",404)
       }
       return updatedData;
    };
    


const getAllDetailsSvc= async () =>{
   const allUser= await User.find({})
   if(!allUser){
    return createHttpError("error",404)
   }
   return allUser;
}
const getCertificateSvc= async (id) =>{
   const userDetail= await User.findById(id)
   if (!userDetail){
    return createHttpError("no User Found",404)
   }
   return userDetail;
}
const deleteCertificateSvc= async (id) =>{
   const userDetail= await User.findByIdAndDelete(id)
   if (!userDetail){
    return createHttpError("no User Found",404)
   }
   return userDetail;
}





module.exports={
    registerSvc,
    getUserByEmail,
    checkPassword,
    addCertificateSvc,
    // updateCertificateSvc,
    getAllDetailsSvc,
    getCertificateSvc,
    deleteCertificateSvc

}
