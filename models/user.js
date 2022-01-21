const { Schema, model } = require( 'mongoose' );

const UserSchema = Schema(
    
    {

        name : 
        
        {

            type : String,
            required : [ true, 'El nombre es obligatorio' ]

        },

        email : 
        
        {

            type : String,
            required : [ true, 'El correo es obligatorio' ],
            unique : true

        },

        password : 
        
        {

            type : String,
            required : [ true, 'La contrasenia es obligatoria' ]

        },

        img : 
        
        {

            type : String

        },

        role : 
        
        {

            type : String,
            required : [ true, 'El rol de usuario es obligatorio' ],
            enum : [ 'ADMIN_ROLE', 'USER_ROLE' ]

        },

        status : 
        
        {

            type : Boolean,
            default : true

        },

        google : 
        
        {

            type : Boolean,
            default : false

        }

    } );

UserSchema.methods.toJSON = function() 

{

    const { _id, password, __v, ...user_data } = this.toObject();

    user_data.uid = _id

    return user_data;

}

module.exports = model( 'User', UserSchema );