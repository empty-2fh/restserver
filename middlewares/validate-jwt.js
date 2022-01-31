const jwt = require( 'jsonwebtoken' );

const { request, response } = require( 'express' );

const User = require( '../models/user' );
const user = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => 

{

    const token = req.header( 'xxx-token' );

    if ( !token )
    
    {

        return res.status( 401 ).json( { msg : 'Se requiere de un token de autenticacion' } );

    }

    try
    
    {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const userAuth = await User.findById( uid );

        if ( !userAuth ) 
        
        {
                 
            res.status( 401 ).json( { msg : 'Token no valido - El usuario no existe' } );

        }

        if ( !userAuth.status )
        
        {

            res.status( 401 ).json( { msg : 'Token no valido - El usuario esta inactivo' } );
            
        }

        req.userAuth = userAuth;

        next();    

    }

    catch ( err )
    
    {

        console.log( err );

        return res.status( 401).json( { msg : 'Token de autenticacion no valido' } )

    }

}

module.exports = 

{

    validateJWT

}