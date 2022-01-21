const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validateData } = require( '../middlewares/validate-data' );
const { validateJWT } = require('../middlewares/validate-jwt');

const { login } = require( '../controllers/auth' );

const router = Router();

router.post( '/login', 

    [
        
        check( 'email', 'Verifique su correo electronico' ).isEmail(),
        check( 'password', 'Verifique su contrasenia' ).not().isEmpty(),
        validateData

    ], login );

module.exports = router;