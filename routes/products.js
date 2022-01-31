const { Router } = require( 'express' );
const { check } = require('express-validator');

const { checkDataType } = require( '../helpers/validate-dataType' );
const { productIdExists, productNameExists, categoryIdExists } = require('../helpers/db-validators');

const { validateData, validateJWT, hasAdminRole, hasRole } = require('../middlewares');

const 

{ 
    
    createProducts, 
    readProducts, 
    readProduct, 
    updateProduct,     deleteProduct 

} = require( '../controllers/products' );
    
const router = Router();

// Obtener productos - publico - populate - paginacion

router.get( '/', 

    [

        check( 'skip' ).custom( async ( value ) => checkDataType( value, 'Number' )  ),
        check( 'limit' ).custom( async ( value ) => checkDataType( value, 'Number' ) ),
        check( 'available' ).custom( async ( value ) => checkDataType( value, 'Boolean' ) ),

        validateData

    ], readProducts );


// Obtener producto en especifico - publico - populate

router.get( '/:id', 

    [

        check( 'id', 'El id no es valido' ).isMongoId(),
        check( 'id' ).custom( productIdExists ),

        validateData

    ], 
    readProduct )
    ;

// Crear producto - JWT valido\
router.post( '/', 

    [

        validateJWT,

        check( 'name', 'El nombre es obligatorio' ).notEmpty(),
        check( 'name' ).custom( productNameExists ),

        check( 'category', 'El id de la categoria no es valido' ).isMongoId(),
        check( 'category' ).custom( categoryIdExists ),
        
        check( 'price' ).custom( async ( value ) => await checkDataType( value, 'Number' ) ),

        validateData

    ], createProducts );

module.exports = router;

// Actualizar producto - JWT valido

router.put( '/:id',

    [

        validateJWT,

        check( 'category' ).isMongoId(),
        check( 'category' ).custom( categoryIdExists ),
        
        check( 'available' ).custom( async ( value ) => checkDataType( value, 'Boolean' ) ),
        check( 'price' ).custom( async ( value ) => checkDataType( value, 'Number' ) ),

        validateData

    ], updateProduct );

// Eliminar un producto - JWT valido - Admin

router.delete( '/:id',

    [

        validateJWT,
        
        hasRole( 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE' ),
        hasAdminRole,

        check( 'id', 'El id no es valido' ).isMongoId(),
        check( 'id' ).custom( productIdExists ),

        validateData

    ]

    , deleteProduct );