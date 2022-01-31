const { Category, Role, User, Product } = require( '../models/' )

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

const categoryIdExists = async ( id ) =>

{

    const exists = await Category.findById( id );

    if ( !exists ) throw new Error( 'El id no existe' );

}

const categoryNameExists = async ( name ) =>

{

    const exists = await Category.findOne( { name } );

    if ( exists ) throw new Error( 'Ya existe una categoria con este nombre' );

}

const productIdExists = async ( id ) =>

{

    const exists = await Product.findById( id );

    if ( !exists ) throw new Error( 'El id no existe' );

}

const productNameExists = async ( name ) =>

{

    const exists = await Product.findOne( { name } );

    if ( exists ) throw new Error( 'Ya existe un producto con este nombre' );

}

module.exports = 

{

    categoryIdExists,
    categoryNameExists,
    emailExists,
    productIdExists,
    productNameExists,
    roleExists,
    userIdExists

}