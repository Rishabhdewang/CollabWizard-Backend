const teacher = require('../../Models/Teacher/teacherModel')
const education = require('../../Models/Teacher/teacherEducationModel')
const experience = require('../../Models/Teacher/teacherExpModel');
const interest = require('../../Models/Teacher/interestmodel');
const skill = require('../../Models/Teacher/teacherSkillModel');

const {
    to,
    badRequestError
} = require('../../global_functions');

const allTeachers = async(req,res)=>{

    const [noteacher,teachers] = await to(teacher.query().returning("*"));
    //if(noUser) return badRequestError(res,"No user found");
    if(noteacher) return badRequestError(res,noteacher.message);
    console.log(teachers);
    
    res.status(200).json({
        success: true,
        data : teachers,
        code : 200,
        message : "All Teachers"
        })
    
}

const updateTeacherProfile = async (req, res) => {
    const { Id } = req.params;

    console.log(req.params);
    const [notupdated, updated] = await to(teacher.query().findById(Id,"teacherId").patch(req.body));
    if (notupdated) return res.status(400).send(notupdated), console.log(notupdated);
    console.log(updated);

    res.status(200).json({
        success: true,
        data : updated,
        code : 200,
        message : "Profile Updated"
        })
    
}

const addTeacherEducation = async(req,res) =>{

    const eduDetails = req.body;

    const [notadded,added] = await to(education.query().insert(eduDetails).where("teacherId",eduDetails.teacherId))
    if(notadded) return badRequestError(res,notadded.message)
    console.log(added);

    res.status(200).json({
        success: true,
        data : added,
        code : 200,
        message : "Teacher Education Details"
    })

}

const teacherEducation = async(req,res) => {
    console.log("Teacher Education Detail");

    const [notfound,educationDetails] = await to(education.query().skipUndefined().withGraphFetched('education').throwIfNotFound().returning("*"));
    //if(noUser) return badRequestError(res,"No user found");
    if(notfound) return badRequestError(res,notfound.message);
    console.log(educationDetails);
    
    res.status(200).json({
        success: true,
        data : educationDetails,
        code : 200,
        message : "Teacher Education Details"
        })
    
}

const addTeacherExperience = async(req,res) =>{

    const expDetails = req.body;

    const [expNotAdded,expAdded] = await to(experience.query().insert(eduDetails).where("teacherId",expDetails.teacherId))
    if(expNotAdded) return badRequestError(res,expNotAdded.message)
    console.log(expAdded);

    res.status(200).json({
        success: true,
        data : expAdded,
        code : 200,
        message : "Teacher Experience Details"
    })

}

const TeacherExperience = async(req,res) => {
    console.log("Teacher Experience Detail");

    const [expnotfound,expDetails] = await to(experience.query().skipUndefined().withGraphFetched('experience').throwIfNotFound().returning("*"));
    //if(noUser) return badRequestError(res,"No user found");
    if(expnotfound) return badRequestError(res,expnotfound.message);
    console.log(expDetails);
    
    res.status(200).json({
        success: true,
        data : expDetails,
        code : 200,
        message : "Teacher Experience Details"
    })
    
}


const addTeacherSkills = async(req,res) =>{

    const skills = req.body;

    const [skillNotAdded,skillAdded] = await to(skill.query().insert(skills).where("teacherId",skills.teacherId))
    if(skillNotAdded) return badRequestError(res,skillNotAdded.message)
    console.log(skillAdded);

    res.status(200).json({
        success: true,
        data : skillAdded,
        code : 200,
        message : "Teacher Experience Details"
    })

}

const TeacherSkills = async(req,res) => {
    console.log("Teacher Skills");

    const [skillNotfound,skillDetails] = await to(skill.query().skipUndefined().withGraphFetched('skills').throwIfNotFound().returning("*"));
    //if(noUser) return badRequestError(res,"No user found");
    if(skillNotfound) return badRequestError(res,skillNotfound.message);
    console.log(skillDetails);
    
    res.status(200).json({
        success: true,
        data : skillDetails,
        code : 200,
        message : "Teacher Skills"
    })
    
}


const addTeacherInterest = async(req,res) =>{

    const interests = req.body;

    const [intNotAdded,intAdded] = await to(interest.query().insert(interest).where("teacherId",interests.teacherId))
    if(intNotAdded) return badRequestError(res,intNotAdded.message)
    console.log(intAdded);

    res.status(200).json({
        success: true,
        data : intAdded,
        code : 200,
        message : "Teacher Interests"
    })

}

const TeacherInterests = async(req,res) => {
    console.log("Teacher Interests");

    const [intNotfound,interests] = await to(interest.query().skipUndefined().withGraphFetched('interest').throwIfNotFound().returning("*"));
    //if(noUser) return badRequestError(res,"No user found");
    if(intNotfound) return badRequestError(res,intNotfound.message);
    console.log(interests);
    
    res.status(200).json({
        success: true,
        data : interests,
        code : 200,
        message : "Teacher Interests"
    })
    
}

module.exports = {
    allTeachers,
    updateTeacherProfile,
    addTeacherEducation,
    teacherEducation,
    addTeacherExperience,
    TeacherExperience,
    addTeacherSkills,
    TeacherSkills,
    addTeacherInterest,
    TeacherInterests
}