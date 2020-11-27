const {
  Model,
  ValidationError
} = require('objection');
const validator = require('validator');
const {
  to,
  notFoundError
} = require("../../global_functions");
const bcrypt = require("bcrypt");


class Teacher extends Model {

  static get tableName() {
    return "teacher"
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    if (!this.email || this.email === '' || !validator.isEmail(this.email)) {
      throw new ValidationError({
        message: "Please enter a valid email",
        type: "ModelValidation"
      })
    }

    if (this.password === '' || !this.password) {
      throw new ValidationError({
        message: "Please enter a password",
        type: "ModelValidation"
      })
    }

    // if(this.username === '' || !this.username){
    //     throw new ValidationError({
    //         message: "Please enter a username",
    //         type: "ModelValidation"
    //     })
    // }

    let [emailNotFound, emailExist] = await to(this.constructor.query().skipUndefined().where('email', this.email).first());
    console.log(emailExist);
    if (emailExist) {
      throw new ValidationError({
        message: "Account with this email already exists!",
        type: "UniqueViolationError",
      });
    }

    this.password ? this.password = await bcrypt.hash(this.password, 10) : null;
  }


  static get relationMappings() {
    const Education = require("./profile/teacherEducationModel");
    const Experience = require("./profile/teacherExpModel");
    const Skills = require("./profile/teacherSkillModel");
    const Interest = require("./profile/interestmodel");
    const Post = require('../Homepage/postModel');
    
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "teacher.id",
          to: "post.teacherId"
        }
      },
      education: {
        relation: Model.HasManyRelation,
        modelClass: Education,
        join: {
          from: "teacher.id",
          to: "education.teacherId"
        }
      },
      experience: {
        relation: Model.HasManyRelation,
        modelClass: Experience,
        join: {
          from: "teacher.id",
          to: "experience.teacherId"
        }
      },
      skill: {
        relation: Model.HasManyRelation,
        modelClass: Skills,
        join: {
          from: "teacher.id",
          to: "skills.teacherId"
        }
      },
      interest: {
        relation: Model.HasManyRelation,
        modelClass: Interest,
        join: {
          from: "teacher.id",
          to: "interests.teacherId"
        }
      }
    }
  }
}

module.exports = Teacher;