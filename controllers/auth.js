const { request, response } = require( 'express' );

const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const { generateJWT } = require( '../helpers/generate-jwt' );
const { googleVerify } = require( '../helpers/google-jwt-validator' );

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

const googleSignIn = async ( req = request, res = response ) =>

{

    const { id_token } = req.body;

    try 
    
    {

        const { email, name, picture  } = await googleVerify( id_token );

        let user = await User.findOne( { email } );

        if ( !user )
        
        {

            const data = 
            
            {

                name,
                email,
                password : 'googleSign',
                picture,
                google : true

            }

            user = new User( data );
            
            await user.save();

        }

        if ( !user.status )
        
        {

            return res.json( { msg : 'Usuario bloqueado, pongase en contacto con el administrador' } )

        }

        const token = await generateJWT( user.id );

        res.json( 
        
            {
                 
                msg : 'Google SignIn ok', 
                user,
                token
            
            } );        

    }

    catch ( err ) 
    
    {

        console.log( err );

        res.status( 500 ).json( { msg : 'El id_token no es valido' } )

    }

}

module.exports = 

{

    login,
    googleSignIn

}