const { Model } = require("objection");

class Skill extends Model{
    static get tableName(){
        return "skills"
    }

    static get relationMappings(){
        const teacher = require("./teacherModel");
        return {
            skills : {
                relation : Model.HasManyRelation,
                modelclass : teacher,
                join : {
                    from : "skills.teacherId",
                    to : "teacher.teacherId"
                } 
            }
        }
    } 
}

module.exports = Skill;