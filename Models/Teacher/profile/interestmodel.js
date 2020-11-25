const { Model } = require("objection");

class Interest extends Model{
    static get tableName(){
        return "interests"
    }

    static get relationMappings(){
        const teacher = require("../teacherModel");
        return {
            interest : {
                relation : Model.HasManyRelation,
                modelClass : teacher,
                join : {
                    from : "interests.teacherId",
                    to : "teacher.id"
                } 
            }
        }
    } 
}

module.exports = Interest;