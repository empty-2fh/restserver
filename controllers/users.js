const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const usersGet = async ( req = request, res = response ) => 

{

    const { begin = 0, limit = 5, active } = req.query;

    let query = { '' : '' };

    if ( active === "false" ) query = { status : false };
    else if ( active === "true" ) query = { status : true };
 
    const [ users, total ] = await Promise.all( 
        
        [

            User.find( query )
            
                .skip( Number( begin ) )
                .limit( Number( limit ) ),

            User.countDocuments( query )

        ] );

    res.json( 
        
        { 

            total,
            users

        } ); 

}


const usersPost = async ( req = request, res = response ) => 

{

    const { name, email, password, role } = req.body;

    const user = new User( { name, email, password, role } );

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.json( { user } );

}

const usersPut = async ( req = request, res = response ) => 

{
    
    const { id } = req.params;
    const { _id, email, password, ...body_data } = req.body;

    if ( password )

    {
    
        const salt = bcryptjs.genSaltSync();
        body_data.password = bcryptjs.hashSync( password, salt );    

    }

    const user_data = await User.findByIdAndUpdate( id, body_data );

    res.json( 
        
        { 
            
            msg : 'Put API - Controller', 
            user_data
        
        } );

}
    
const usersDelete = async ( req, res = response ) =>

{

    const { id } =  req.params;

    const user = await User.findByIdAndUpdate( id, { status : false } );

    res.json( { user } );

}

const usersPatch = ( req, res = response ) => res.json( { msg : 'Patch API - Controller' } );

module.exports = 

{

    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch

}