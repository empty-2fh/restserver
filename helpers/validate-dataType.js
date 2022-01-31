const { request, response } = require( 'express' );

const checkDataType = async ( value, type = 'number' ) =>

{

    // Number,
    // Boolean

    let coincidence = false;

    if ( value !== undefined )
    
    {

        try 
        
        {

            if ( typeof JSON.parse( value ) === type.toLowerCase() ) coincidence = true;

        }

        catch ( err ) 
        
        {

            throw new Error ( `El valor tiene que ser de tipo ${ type.toUpperCase() }` );

        } 

        if ( !coincidence ) 
        
        {
            
            throw new Error ( `El valor tiene que ser de tipo ${ type.toUpperCase() }` );

        }

    }

}

module.exports = { checkDataType }
