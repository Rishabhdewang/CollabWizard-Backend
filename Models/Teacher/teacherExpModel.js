const { Model } = require("objection");

class Experience extends Model{
    static get tableName(){
        return "experience"
    }
    static get relationMappings(){
        const teacher = require("./teacherModel");
        return {
            experience : {
                relation : Model.HasManyRelation,
                modelclass : teacher,
                join : {
                    from : "experience.teacherId",
                    to : "teacher.teacherId"
                } 
            }
        }
    } 
} 

module.exports = Experience;