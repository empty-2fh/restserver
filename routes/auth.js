const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validateData } = require( '../middlewares/validate-data' );

const { login, googleSignIn } = require( '../controllers/auth' );

const router = Router();

router.post( '/login', 

    [
        
        check( 'email', 'Verifique su correo electronico' ).isEmail(),
        check( 'password', 'Verifique su contrasenia' ).not().isEmpty(),
        
        validateData

    ], login );

router.post( '/google', 

    [

        check( 'id_token', 'Se require del id_token' ).not().isEmpty(),
        
        validateData

    ], googleSignIn );

module.exports = router;