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
                modelClass : teacher,
                join : {
                    from : "skills.teacherId",
                    to : "teacher.id"
                } 
            }
        }
    } 
}

module.exports = Skill;