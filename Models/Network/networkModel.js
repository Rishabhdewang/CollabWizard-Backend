const { Model } = require('objection');

class Network extends Model {
    // Table name is the only required property.

    static get tableName() {
        return 'networks';
    }
    static get jsonSchema() {
        return {

        }
    }
    
static get relationMappings() {
    const Teacher=require('../Teacher/teacherModel.js');

        return {
            networks : {
                relation : Model.HasManyRelation,
                modelClass : Teacher,
                join : {
                    from : "networks.teacherId",
                    to : "teacher.id"
                } 
            }
        }
    }
    
}
module.exports = Network;