
// User Model 

const { Model } = require('objection');

class Post extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'post';
  }
  
  static get relationMappings(){
    const Teacher=require('../Teacher/teacherModel');
    const Like=require("./likeModel");
    const Comment=require("./commentModel");
    

    return{
        teacher:{
            relation:Model.BelongsToOneRelation,
            modelClass:Teacher,
            join:{
                from:"post.userId",
                to:"teacher.id"
            }
        },
        like:{
            relation:Model.HasManyRelation,
            modelClass:Like,
            join:{
                from:"post.id",
                to:"like.postId"
            }
        },
        comment:{

            relation:Model.HasManyRelation,
            modelClass:Comment,
            join:{
                from:"post.id",
                to:"comment.postId"
            }
        }
    }
  }
}

module.exports = Post;