
// User Model 

const { Model } = require('objection');

class Comment extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'comment';
  }

  static get relationMappings(){
    const Reply=require("./replyModel");
    const Teacher=require('../Teacher/teacherModel');
    return{
        reply:{
            relation:Model.HasManyRelation,
            modelClass:Reply,
            join:{
                from:"comment.id",
                to:"reply.commentId"
            }


        },
        
            teacher:{
              relation:Model.BelongsToOneRelation,
              modelClass:Teacher,
              join:{
                  from:"comment.userId",
                  to:"teacher.id"
              }
  
  
          }
    }
}


}

module.exports = Comment;