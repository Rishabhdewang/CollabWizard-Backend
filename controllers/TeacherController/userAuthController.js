const { badRequestError, to, okResponse, createdResponse, notFoundError } = require("../../global_functions");
const Teacher = require("../../Models/Teacher/teacherModel");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../middlewares/authenticate");
const jwt = require("jsonwebtoken");

const TeacherRegister = async (req,res)=>{

    const data = req.body;

    const [error,TeacherCreated] = await to(Teacher.query().skipUndefined().insertGraph(data).returning("*"));
    // return Error Response while creating user;
    console.log(error);
    if(error) return badRequestError(res,error.message);

    delete TeacherCreated.password;

    return createdResponse(res,TeacherCreated,"Teacher Created Successfully");
}

const TeacherLogin = async (req,res) =>{

    const { email, password } = req.body;

    if(!email || email === '' || password === '' || !password ){
        return badRequestError(res,"Invalid credential");
    }

    const [TeacherNotFound,TeacherExist] = await to(Teacher.query().skipUndefined().where("email",email).first().throwIfNotFound());
    if(TeacherNotFound) return notFoundError(res,"Invalid email");

    const validPassword = await bcrypt.compareSync(password,TeacherExist.password);

    if(!validPassword) return badRequestError(res,"Invalid Password");

    if(validPassword){
        const token = generateAccessToken({email:TeacherExist.email,id:TeacherExist.TeacherId,role:"Teacher"},'2d');

        return okResponse(res,token,"Teacher login successfully");
    }

}

const TeacherDetail = async(req,res)=>{
    console.log("Teacher Detail");

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);

        const [noUser,fetchedUser] = await to(Teacher.query().skipUndefined().where("email",user.email).throwIfNotFound().returning("*"));
        if(noUser) return badRequestError(res,"Invalid Token");
        console.log(fetchedUser);
        delete fetchedUser[0].password; //to remove password field from details
        
        res.status(200).json({
            success: true,
            data : fetchedUser,
            code : 200,
            message : "Teacher Details"
          })
    })

}

const ChangePassword = async (req,res)=>{
    console.log("Change Password");

    const { oldPassword, newPassword } = req.body;
    const { Id  } = req.user;

    const [noUser,user] = await to(Teacher.query().skipUndefined().where("id",Id).throwIfNotFound().returning("*"));
    if(noUser) return badRequestError("Invalid User");

    if(user){
        const validOldPassword = await bcrypt.compareSync(oldPassword,user.password);
        if(validOldPassword){
            const newHashedPassword = await bcrypt.hashSync(newPassword, 10);

            // @ts-ignore
            const [error,updatedPassword] = await to(Teacher.query().skipUndefined().where("TeacherId",Id).update({
                password : newHashedPassword
            }).returning("*"));
            if(error) return badRequestError("Error in changing password");

            return okResponse(res,"Password Changed Successfully");
        }else{
            return badRequestError(res,"Invalid Old Password");
        }
    }
}

const ForgotPassword = async (req,res)=>{
    console.log("Forgot Password");

    const { email } = req.body;

    const [noUser,user] = await to(Teacher.query().skipUndefined().where("email",email).throwIfNotFound().returning("*"));
    if(noUser) return badRequestError(res,"Enter registered email");
    
    if(user){
        const currentTime = Date.now();
        console.log(currentTime);

        // @ts-ignore
        const [error,updatedTime] = await to(Teacher.query().skipUndefined().where("email",email).update({
            // @ts-ignore
            forgotPasswordRequestedAt : currentTime,
            isForgotPasswordRequested : true
        }).returning("*"));

        if(updatedTime){
            const token = await jwt.sign({
                requestedTime : currentTime,
                email : email
            }, process.env.JWT_SECRET,{expiresIn : "15m"});
            const url = process.env.BASE_URL + `verifyLink?token=${token}`;

            return okResponse(res,{url},"req");
        }
    }
}

const VerifyForgotPassword = async (req,res) =>{
    console.log("Verify Forgot Link");

    const { token } = req.query;
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        console.log(err);
        if (err) return badRequestError(res,"Invalid url or link expired");

        if(decoded){
            console.log(decoded);
            const [error,userExist] = await to(Teacher.query().skipUndefined().where("email",decoded.email).throwIfNotFound().first().returning("*"));
            if(error) return badRequestError(res,"Invalid url or link expired");

            if(userExist.forgotPasswordRequestedAt === decoded.requestedTime.toString()){
                // @ts-ignore
                const [error,userUpdated] = await to(Teacher.query().skipUndefined().where("email",decoded.email).update({
                    // @ts-ignore
                    forgotPasswordRequestedAt : null,
                    isForgotPasswordRequested : false
                }).returning("*"));

                return okResponse(res,{},"Link Verified");
            }else{
                return badRequestError(res,"Link already verified");
            }
        }
    })
}


const ResetPassword = async (req,res) => {
    console.log("Reset Password");
    
    const { passowrd } = req.body;

}

module.exports = {
    TeacherRegister,
    TeacherLogin,
    TeacherDetail,
    ChangePassword,
    ForgotPassword,
    VerifyForgotPassword
}