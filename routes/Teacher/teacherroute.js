const router = require("express").Router();
const auth = require("../../controllers/TeacherController/userAuthController");
const authenticate = require('../../middlewares/authenticate');

// Teacher
router.post("/T_Register",auth.TeacherRegister);
router.post("/T_Login",auth.TeacherLogin)
router.post("/T_Detail",auth.TeacherDetail)
router.post("/T_ChangePassword",auth.ChangePassword)
router.post("/T_ForgotPassword",auth.ForgotPassword)
router.post("/T_VerifyForgotPassword",auth.VerifyForgotPassword)


module.exports = router ;