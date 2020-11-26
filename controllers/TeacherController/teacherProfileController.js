const {
    to,
    badRequestError,
    okResponse
} = require('../../global_functions');
const Education = require('../../Models/Teacher/profile/teacherEducationModel');
const Experience = require('../../Models/Teacher/profile/teacherExpModel');
const Skill = require('../../Models/Teacher/profile/teacherSkillModel');
const Interest = require('../../Models/Teacher/profile/interestmodel');
const Teacher = require('../../Models/Teacher/teacherModel');

const Teachers = async(req,res)=>{

    const [noteacher,teachers] = await to(Teacher.query().returning("*"));
    if(noteacher) return badRequestError(res,"No teacher found");
    
    return okResponse(res,teachers,"Teachers");
    
}

const GetTeacherProfile = async (req, res) => {

    const [noprofile, profile] = await to(Teacher.query().skipUndefined().where("id",req.user.id).withGraphFetched('[education,experience,skill,interest]').first().returning("*"));
    if (noprofile) return badRequestError(res,noprofile);

    return okResponse(res,profile,"Profile");
}

const UpdateTeacherProfile = async (req, res) => {

    const [notupdated, updated] = await to(Teacher.query().skipUndefined().where("id",req.user.id).patch(req.body).first().returning("*"));
    if (notupdated) return badRequestError(res,"Error in updating profile");

    return okResponse(res,updated,"Profile Updated");
}

//Education
const AddTeacherEducation = async(req,res) =>{

    const data = req.body;
   
    const education = Object.assign({},{
        ...data,
        teacherId : req.user.id
    })

    const [notadded,added] = await to(Education.query().skipUndefined().insert(education).first().returning("*"));
    if(notadded) return badRequestError(res,"Error in adding education");

    return okResponse(res,added,"Teacher Education Details");

}

const GetTeacherEducation = async(req,res) => {
    console.log("Teacher Education Detail");
    const { teacherId } = req.user;
    const { id } = req.params;
    console.log(id)
    const [notfound,educationDetails] = await to(Education.query().skipUndefined().where("id",req.params.id).andWhere("teacherId",teacherId).first().throwIfNotFound().returning("*"));
    if(notfound) return badRequestError(res,"No education found");

    return okResponse(res,educationDetails,"Teacher Education Detail");
    
    
}

const GetTeacherEducations = async (req,res) => {
    console.log("Teacher Educations");

    const [notfound,educations] = await to(Education.query().skipUndefined().returning("*"));
    if(notfound) return badRequestError(res,"No Teacher Education found");

    return okResponse(res,educations,"Teacher Educations");
}

const UpdateTeacherEducation = async (req, res) => {

    const data = req.body;
    const { id } = req.params;
    const { teacherId } = req.user;

    const [notupdated, updated] = await to(Education.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).patch(data).first().returning("*"));
    if (notupdated) return badRequestError(res,"Error in updating education");
    console.log(updated);

    return okResponse(res,updated,"Education Updated");
    
}


const DeleteTeacherEducation = async (req, res) => {

    const { id } = req.params;
    const { teacherId } = req.user;

    const [notdeleted, deleted] = await to(Education.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).delete().first().returning("*"));
    if (notdeleted) return badRequestError(res,"Error in deleting education");
    console.log(deleted);

    return okResponse(res,deleted,"Education Deleted");
    
}


// //Experience
const AddTeacherExperience = async(req,res) =>{

    const data = req.body;
   
    const experience = Object.assign({},{
        ...data,
        teacherId : req.user.id
    })
    console.log(experience);

    const [notadded,added] = await to(Experience.query().skipUndefined().insert(experience).first().returning("*"));
    if(notadded) return badRequestError(res,"Error in adding Experience");

    return okResponse(res,added,"Teacher Experience Details");

}

const GetTeacherExperience = async(req,res) => {
    console.log("Teacher Experience Detail");
    const { teacherId } = req.user;
    const { id } = req.params;
    console.log(id)
    const [notfound,experienceDetails] = await to(Experience.query().skipUndefined().where("id",req.params.id).andWhere("teacherId",teacherId).first().throwIfNotFound().returning("*"));
    if(notfound) return badRequestError(res,"No experience found");

    return okResponse(res,experienceDetails,"Teacher Experience Detail");
    
    
}

const GetTeacherExperiences = async (req,res) => {
    console.log("Teacher Experiences");

    const [notfound,experiences] = await to(Experience.query().skipUndefined().returning("*"));
    if(notfound) return badRequestError(res,"No Teacher experience found");

    return okResponse(res,experiences,"Teacher Experiences");
}

const UpdateTeacherExperience = async (req, res) => {

    const data = req.body;
    const { id } = req.params;
    const { teacherId } = req.user;

    const [notupdated, updated] = await to(Experience.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).patch(data).first().returning("*"));
    if (notupdated) return badRequestError(res,"Error in updating experience");
    console.log(updated);

    return okResponse(res,updated,"Experience Updated");
    
}


const DeleteTeacherExperience = async (req, res) => {

    const { id } = req.params;
    const { teacherId } = req.user;

    const [notdeleted, deleted] = await to(Experience.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).delete().first().returning("*"));
    if (notdeleted) return badRequestError(res,"Error in deleting experience");
    console.log(deleted);

    return okResponse(res,deleted,"Experience Deleted");
    
}
// Skill
const AddTeacherSkill = async(req,res) =>{

    const data = req.body;
   
    const skill = Object.assign({},{
        ...data,
        teacherId : req.user.id
    })
    console.log(skill);

    const [notadded,added] = await to(Skill.query().skipUndefined().insert(skill).first().returning("*"));
    if(notadded) return badRequestError(res,"Error in adding skill");

    return okResponse(res,added,"Teacher Skill Details");

}

const GetTeacherSkill = async(req,res) => {
    console.log("Teacher Skill Detail");
    const { teacherId } = req.user;
    const { id } = req.params;

    const [notfound,skillDetails] = await to(Skill.query().skipUndefined().where("id",req.params.id).andWhere("teacherId",teacherId).first().throwIfNotFound().returning("*"));
    if(notfound) return badRequestError(res,"No skill found");

    return okResponse(res,skillDetails,"Teacher Skill Detail");
    
    
}

const GetTeacherSkills = async (req,res) => {
    console.log("Teacher Skills");

    const [notfound,skills] = await to(Skill.query().skipUndefined().returning("*"));
    if(notfound) return badRequestError(res,"No Teacher skill found");

    return okResponse(res,skills,"Teacher Skills");
}

const UpdateTeacherSkill = async (req, res) => {

    const data = req.body;
    const { id } = req.params;
    const { teacherId } = req.user;

    const [notupdated, updated] = await to(Skill.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).patch(data).first().returning("*"));
    if (notupdated) return badRequestError(res,"Error in updating skill");
    console.log(updated);

    return okResponse(res,updated,"Skill Updated");
    
}


const DeleteTeacherSkill = async (req, res) => {

    const { id } = req.params;
    const { teacherId } = req.user;

    const [notdeleted, deleted] = await to(Skill.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).delete().first().returning("*"));
    if (notdeleted) return badRequestError(res,"Error in deleting skill");
    console.log(deleted);

    return okResponse(res,deleted,"Skill Deleted");
    
}

// //Interests
const AddTeacherInterest = async(req,res) =>{

    const data = req.body;

    const interestData = Object.assign({},{
       ...data,
       teacherId : req.user.id
    });

    const [notadded,added] = await to(Interest.query().skipUndefined().insert(interestData).first().returning("*"));
    if(notadded) return badRequestError(res,"Error in adding interest");

    return okResponse(res,added,"Teacher Interest Details");

}

const GetTeacherInterest = async(req,res) => {
    console.log("Teacher Interest Detail");
    const { teacherId } = req.user;
    const { id } = req.params;

    const [notfound,interestDetails] = await to(Interest.query().skipUndefined().where("id",req.params.id).andWhere("teacherId",teacherId).first().throwIfNotFound().returning("*"));
    if(notfound) return badRequestError(res,"No interest found");

    return okResponse(res,interestDetails,"Teacher Interest Detail");
    
    
}

const GetTeacherInterests = async (req,res) => {
    console.log("Teacher Interests");

    const [notfound,interests] = await to(Interest.query().skipUndefined().returning("*"));
    if(notfound) return badRequestError(res,"No Teacher interest found");

    return okResponse(res,interests,"Teacher Interests");
}

const UpdateTeacherInterest = async (req, res) => {

    const data = req.body;
    const { id } = req.params;
    const { teacherId } = req.user;

    const [notupdated, updated] = await to(Interest.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).patch(data).first().returning("*"));
    if (notupdated) return badRequestError(res,"Error in updating interest");
    console.log(updated);

    return okResponse(res,updated,"Interest Updated");
    
}


const DeleteTeacherInterest = async (req, res) => {

    const { id } = req.params;
    const { teacherId } = req.user;

    const [notdeleted, deleted] = await to(Interest.query().skipUndefined().where("id",id).andWhere("teacherId",teacherId).delete().first().returning("*"));
    if (notdeleted) return badRequestError(res,"Error in deleting interest");
    console.log(deleted);

    return okResponse(res,deleted,"Interest Deleted");
    
}

module.exports = {
    Teachers,
    GetTeacherProfile,
    UpdateTeacherProfile,
    AddTeacherEducation,
    GetTeacherEducation,
    GetTeacherEducations,
    UpdateTeacherEducation,
    DeleteTeacherEducation,
    AddTeacherExperience,
    GetTeacherExperience,
    GetTeacherExperiences,
    UpdateTeacherExperience,
    DeleteTeacherExperience,
    AddTeacherSkill,
    GetTeacherSkill,
    GetTeacherSkills,
    UpdateTeacherSkill,
    DeleteTeacherSkill,
    AddTeacherInterest,
    GetTeacherInterest,
    GetTeacherInterests,
    UpdateTeacherInterest,
    DeleteTeacherInterest
}