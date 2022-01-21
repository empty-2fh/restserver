const { Router } = require( 'express' );
const { check } =  require( 'express-validator' );

const 

{

    validateJWT,
    validateData,
    hasRole,
    hasAdminRole

} = require( '../middlewares/' );

const

{ 
    
    roleExists, 
    emailExists, 
    userIdExists, 

} = require( '../helpers/db-validators' );

const 

{

    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch

} = require( '../controllers/users' );

const router = Router();

router.get( '/', usersGet );

router.post( '/', 

    [ 
        
        check( 'name', 'El nombre de usuario es obligatorio' ).not().isEmpty(),
        check( 'email', 'El correo no es valido' ).isEmail(), 
        check( 'email' ).custom( emailExists ),
        check( 'password', 'La contrasenia debe de contener al menos 6 caracteres' ).isLength( { min : 6 } ),
        check( 'role' ).custom( roleExists ),

        validateData

    ], usersPost );

router.put( '/:id', 

    [

        check( 'id', 'El id no es un id valido de mongoose' ).isMongoId(),
        check( 'id' ).custom( userIdExists ),
        check( 'role' ).custom( roleExists ),

        validateData
        
    ] , usersPut );


router.delete( '/:id',    

    [

        validateJWT,
        hasRole( 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE' ),
        hasAdminRole,
        check( 'id', 'El id no es un id valido de mongoose' ).isMongoId(),
        check( 'id' ).custom( userIdExists ),

        validateData
        
    ], usersDelete );

router.patch( '/', usersPatch );

module.exports = router;