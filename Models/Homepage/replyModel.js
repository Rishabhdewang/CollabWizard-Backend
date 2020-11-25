
const { Model } = require('objection');

class Reply extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'reply';
  }

  static get relationMappings(){
    const Teacher=require('../Teacher/teacherModel');
    return{
     
      user:{
        relation:Model.BelongsToOneRelation,
        modelClass:Teacher,
        join:{
            from:"reply.userId",
            to:"teacher.id"
        }
      }
    }
  }
}

module.exports = Reply;