const { Schema, model } = require( 'mongoose' );

const CategorySchema = new Schema( 
    
    {

        name : 
        
        {

            type : String,
            required : [ true, 'El nombre es obligatorio' ]

        },

        status : 
        
        {

            type : Boolean,
            default : true,
            required : [ true, 'El estado es obligatrio' ]

        },

        user : 
        
        {

            type : Schema.Types.ObjectId,
            ref : 'User',
            required : [ true, 'El usuario es obligatorio' ]

        }

    } );

CategorySchema.methods.toJSON = function()

{

    const { __v, status, ...data } = this.toObject();

    return data;

}

module.exports = model( 'Category', CategorySchema );