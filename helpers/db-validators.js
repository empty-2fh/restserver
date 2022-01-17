const Role = require( '../models/role' );
const User = require( '../models/user' );

const roleExists = async ( role = '' ) =>

{

    const exists = await Role.findOne( { role } );

    if ( !exists ) throw new Error( `El rol <${ role }> no existe` );

}

const emailExists = async ( email ) =>

{

    const exists = await User.findOne( { email } );

    if ( exists ) throw new Error( 'El email ya pertenece a un usuario' );

}

const userIdExists = async ( id ) =>

{

    const exists = await User.findById( id );

    if ( !exists ) throw new Error( 'El id no existe' );

}

module.exports = 

{

    roleExists,
    emailExists,
    userIdExists
}