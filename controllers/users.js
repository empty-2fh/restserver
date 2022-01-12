const { request, response } = require( 'express' );

const usersGet = ( req = request, res = response ) => 

{
    
    const 
    
    { 
        
        q, 
        name = 'No name', 
        page = 1, 
        limit = 10 
    
    } = req.query;

    res.json( 
        
    { 
        
        msg : 'Get API - Controller',
        q,
        name,
        page,
        limit 
    
    } ); 

}


const usersPost = ( req = request, res = response ) => 

{ 
    const { name, age } = req.body;

    res.json( 
        
    { 
            
        msg : 'Post API - Controller',
        name,
        age
    
    } );

}

const usersPut = ( req = request, res = response ) => 

{
    
    const { id } = req.params;

    res.json( 
        
    { 
        
        msg : 'Put API - Controller', 
        id 
    
    } );

}
    
const usersDelete = ( req, res = response ) => res.json( { msg : 'Delete API - Controller' } );
const usersPatch = ( req, res = response ) => res.json( { msg : 'Patch API - Controller' } );

module.exports = 

{

    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch

}