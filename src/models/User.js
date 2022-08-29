const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema({
    
roles:{
    type:String,
    default:"student",
    enum:["admin","student"]
}
,

email: {
    type: String,
    required: [true, 'Email must be Provided'],
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

},
name: {
    type: String,
    required: [true, 'Name must be Provided'],
},
password: {
    type: String,
    required: true,
   
},
phone: {
    type: String,
    default: null,
},

startDate:{
    type:Date,
   
},
endDate:{
    type:Date,
    
},
rollNumber:{
    type:String
},
course:{
   type:String
}

})

//

const SALT_FACTOR = 10;

//console.log(this); // global / window

userSchema.pre('save', function (done) {
    // DO NOT use arrow function here
    const user = this; // const user -> new User()

    if (!user.isModified('password')) {
        done();
        return;
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err); // Mongoose will not insert the user document
        }

        bcrypt.hash(user.password, salt, function (err, hashedPassword) {
            if (err) {
                return done(err);

            }

            user.password = hashedPassword;
            done(); // pass no arguments to done() to signify success
        });
    });

    console.log('executes immediately');
});

userSchema.methods.checkPassword = async function (plainTextPassword) {
    const hashedPassword = this.password;

    // this line will throw an error sometimes
    // if on the other hand bcrypt is able to compare it will return true / false
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch; 
};

module.exports = mongoose.model('User', userSchema);