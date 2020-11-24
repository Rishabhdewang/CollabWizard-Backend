const { Model } = require("objection");

class Education extends Model{
    static get tableName(){
        return "education"
    }

    static get relationMappings(){
        const teacher = require("./teacherModel");
        return {
            education : {
                relation : Model.HasManyRelation,
                modelclass : teacher,
                join : {
                    from : "education.teacherId",
                    to : "teacher.id"
                } 
            }
        }
    } 
}

module.exports = Education;