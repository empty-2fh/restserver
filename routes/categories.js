const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validateJWT, validateData, hasRole, hasAdminRole } = require('../middlewares');

const { checkDataType } = require( '../helpers/validate-dataType' ); 
const { categoryIdExists, categoryNameExists } = require('../helpers/db-validators');

const { createCategory, readCategories, readCategory, updateCategory, deleteCategory } = require('../controllers/categories');

const router = Router();

// Obtener todas las categorias - publico

router.get( '/', 

    [
        
        check( 'skip' ).custom( async ( value ) => await checkDataType( value, 'Number' ) ),
        check( 'limit' ).custom( async ( value ) => await checkDataType( value, 'Number' ) ),
        
        validateData
    ]

    , readCategories );

// Obtener una categoria en especifico( por ID ) - publico

router.get( '/:id',

    [

        check( 'id', 'El id no es valido' ).isMongoId(),
        check( 'id' ).custom( categoryIdExists ),
        validateData   

    ]

, readCategory );

// Crear una nueva categoria - privado - solo usuarios con jwt valido

router.post( '/', 

    [

        validateJWT,

        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),

        validateData

    ], 
    
    createCategory );

// Actualizar una categoria - privado - solo usuarios con jwt valido

router.put( '/:id', 

    [

        validateJWT,

        check( 'id', 'El id no es valido' ).isMongoId(),
        check( 'id' ).custom( categoryIdExists ),
        check( 'name', 'El nombre es obligatorio ').notEmpty(),
        check( 'name' ).custom( categoryNameExists ),

        validateData

    ], 
    
    updateCategory );

// Remover una categoria - privado - solamente administradores

router.delete( '/:id', 

    [

        validateJWT,

        hasRole( 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE' ),
        hasAdminRole,

        check( 'id', 'El id no es valido' ).isMongoId(),
        check( 'id' ).custom( categoryIdExists ),

        validateData

    ],

    deleteCategory );

module.exports = router;