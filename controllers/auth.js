const { request, response } = require( 'express' );

const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );
const { generateJWT } = require( '../helpers/generate-jwt' );

const login = async ( req = request, res = response ) =>

{

    try 
    
    {

        const { email, password } = req.body;

        const user = await User.findOne( { email } );

        if ( !user ) 
        
        {
            
            return res.json( { msg : 'Correo o contrasenia no validos - email' } );

        }

        if ( !user.status ) 
        
        {
            
            return res.json( { msg : 'Correo o contrasenia no validos - status' } );

        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) 
        
        {
            
            return res.json( { msg : 'Correo o contrasenia no validos - password' } );

        }

        const token = await generateJWT( user.id );

        res.json( { user, token } );

    }

    catch ( err )
    
    {

        console.log( err );

        res.status( 500 ).json( { msg : 'Pongase en contacto con el administrador' } )

    }
}

module.exports = 

{

    login

}