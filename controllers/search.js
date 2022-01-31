const { request, response } = require( 'express' );
const { ObjectId } = require( 'mongoose' ).Types;

const { User, Category, Product } = require( '../models/' );

const collections = 

[

    'categories',
    'products',
    'roles',
    'users',

];

const users = async ( term = '', res = response ) => 

{

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId )
    
    {

        const user = await User.findById( term );

        return res.json( { results : ( user ) ? [ user ] : [] } );

    }

    const regexp = new RegExp( term, 'i' );

    const query = 

    {  

        $or : [ { name : regexp }, { email : regexp } ],
        $and : [ { status : true } ]

    };

    const [ users, total ] = await Promise.all( 
        
        [ 
            
            User.find( query ),
            User.countDocuments( query ),

        ] );

    return res.json( { results : { total, users } } );

}

const categories = async ( term, res = response ) => 

{

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId )
    
    {

        const category = await Category.findById( term );

        if ( category )
        
        {

            return res.json( { results : [ category ] } );

        }

    }

    const regexp = new RegExp( term, 'i' );

    const query = ( isMongoId ) ? { user : term, status : true } : { name : regexp, status: true };

    const [ categories, total ] = await Promise.all( 
        
        [ 
            
            Category.find( query ),
            Category.countDocuments( query )
        
        ] );

    res.json( { results : { total, categories } } );

}

const products = async ( term, res = response ) =>

{

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId )
    
    {

        const product = await Product.findById( term )
                                     .populate( 'category', 'name' )
                                     .populate( 'user', 'name' );

        if ( product )
        
        {

            return res.json( { results : [ product ] } );

        }

    }

    const regexp = new RegExp( term, 'i' );

    const query = ( isMongoId ) 
                                ? 
                                
                                { 
                                    
                                    $or : [ { user : term }, { category : term } ], 
                                    $and : [ { status : true } ] 
                                
                                } 
                                
                                : { name : regexp, status : true };

    const [ products, total ] = await Promise.all ( 
        
        [
            
            Product.find( query )
                   .populate( 'category', 'name' )
                   .populate( 'user', 'name' ),

            Product.countDocuments( query )

        ] );

    res.json( { results : { total, products } } )

}

const search = async ( req = request, res = response ) =>

{

    const { collection, term } = req.params;

    if ( !collections.includes( collection ) )
    
    {

        return res.status( 400 ).json( { msg : `${ collection } no es una coleccion valida` } );

    }


    switch ( collection )
    
    {


        case 'users' :

            await users( term, res );

        break;

        case 'categories' :

            await categories( term, res );

        break;

        case 'products' :

            await products( term, res );

        break;

        default : 

            return res.status( 500 ).json( 'Coleccion no tratada...' )

        break;

    }   

}

module.exports = 

{

    search

}