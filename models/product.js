const { Schema, model } = require( 'mongoose' );

const ProductSchema = new Schema( 
    
    {

        name : 
        
        {

            type : String,
            required : true

        },

        status : 
        
        {

            type : Boolean,
            default : true

        },

        user :
        
        {

            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true

        },

        category : 
        
        {

            type : Schema.Types.ObjectId,
            ref : 'Category',
            required : true

        },

        price : 
        
        {

            type : Number,
            default : 0

        },

        description : 
        
        {

            type : String,

        },

        available : 
        
        {

            type : Boolean,
            default : true

        }

    } );

ProductSchema.methods.toJSON = function() 

{

    const { __v, status, ...data } = this.toObject();

    return data;

}

module.exports = model( 'Product', ProductSchema );