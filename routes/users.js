const { Router } = require( 'express' );

const router = Router();

const 

{

    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch

} = require( '../controllers/users' );

router.get( '/', usersGet );
router.post( '/', usersPost );
router.put( '/:id', usersPut );
router.delete( '/', usersDelete );
router.patch( '/', usersPatch );

module.exports = router;