const { request, response } = require( 'express' );

const hasAdminRole = ( req = request, res = response, next ) =>

{

    if ( !req.userAuth )
    
    {

        return res.status( 401 ).json( { msg : 'Intento anticipado de verificacion de rol' } );

    }

    const { name, role } = req.userAuth;

    if ( role !== 'ADMIN_ROLE' )
    
    {

        return res.status( 401 ).json( { msg : `${ name } no es administrador` } );

    }

    next();

}

const hasRole = ( ...roles ) =>

{

    return ( req = request, res = response, next ) =>
    
    {

        if ( !req.userAuth )
        
        {

            res.status( 401 ).json( { msg : 'Intento anticipado de verificacion de rol' } );

        }

        if ( !roles.includes( req.userAuth.role ) )
        
        {

            res.status( 401 ).json( { msg : 'Rol de usuario no valido' } );

        }

        next();

    }

}

module.exports = 

{ 
    
    hasRole,
    hasAdminRole

}