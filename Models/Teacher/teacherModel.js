const { Model, ValidationError } = require('objection');
const validator = require('validator');
const { to, notFoundError } = require("../../global_functions");
const bcrypt = require("bcrypt");

class Teacher extends Model{
    static get tableName(){
        return "Teachers"
    }
    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);

        if(!this.email || this.email === '' || !validator.isEmail(this.email)){
          throw new ValidationError({
            message: "Please enter a valid email",
            type: "ModelValidation"
          })
        }

        if(this.password === '' || !this.password){
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

        let [emailNotFound,emailExist] = await to(this.constructor.query().skipUndefined().where('email', this.email).first());
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
        return {

        }
    }
}

module.exports = Teacher;